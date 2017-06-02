require 'rubygems'
require 'json'
require 'tempfile'

module Jekyll
  module Converters
    class Markdown
      # In Jekyll, RedcarpetParser is the OOB lexer configuration
      # shell. We need to monkeypatch it.
      class RedcarpetParser
        # We are using Rouge, so let's piggyback on the lexed data
        # provided to WithRouge#block_code
        module WithRouge
          def block_code(code, lang)
            # TODO: figure out more idiomatic way to do this
            nohide = false

            # Selector
            selector = "<div class=\"code-snippet__selector\">
              <nav>
                  <button class=\"selector_switch\" id=\"raw\">raw</button>
                  <button class=\"selector_switch\" id=\"php\">php</button>
                  <button class=\"selector_switch\" id=\"ruby\">ruby</button>
                  <button class=\"selector_switch\" id=\"python\">python</button>
                  <button class=\"selector_switch\" id=\"javascript\">javascript</button>
              </nav>
            </div>"

            if lang.is_a?(String)
              if lang.include?('noselect')
                lang['noselect'] = ''
                selector = ''
                nohide = true
              end
            end

            if lang == 'postman'
              code = '{' + code + '}'
              postman_generate_request(code, nohide, selector)
            elsif lang == 'postmanresponse'
              code = '{' + code + '}'
              postman_generate_response(code, nohide)
            else
              generate_code_block(super, lang, nohide, selector)
            end
          end

          protected
          def rouge_formatter(lexer)
            Rouge::Formatters::HTML.new(:wrap => false)
          end

          private
          def generate_code_block(code, lang, nohide, selector)
            code = "<pre>#{code}</pre>"

            lang = lang + 'nohide' if nohide

            # Button
            button = "<button class=\"btn alternative\">copy</button>"

            output = "<div class=\"code-snippet js-code-snippet language-#{lang}\">" + button + selector + "<div class=\"code-snippet__cnt highlight\">"
            output << add_code_tags(code, lang)
            output << "</div></div>"
          end

          private
          def generate_response_block(response)
            lang = "http"
            headers = ''
            response['headers'].each do |header|
              headers << "#{header['name']}: #{header['value']}\n"
            end

            code = "<pre>
#{response['httpVersion']} #{response['status']} #{response['statusText']}
#{headers}

#{response['content']['text']}
</pre>"
            code_tags = add_code_tags(code, lang)

            "<div class=\"code-snippet js-code-snippet language-#{lang}\">
              <p>#{response['name']}</p>
              <button class=\"btn alternative\">copy</button>
              <div class=\"code-snippet__selector\">
                <nav>
                    <button class=\"selector_switch_\" id=\"http\">#{response['comment']}</button>
                </nav>
              </div>
              <div class=\"code-snippet__cnt highlight\">
                #{code_tags}
              </div>
            </div>"
          end

          private
          def postman_generate_response(code, nohide)
            output = ''
            har_responses = convert_to_har_response(code)
            if har_responses
              har_responses.each do |response|
                if response['content']
                  output << generate_response_block(response)
                end
              end
            end
            output
          end

          private
          def postman_generate_request(code, nohide, selector)
            har_file = Tempfile.new('har')
            har_file << convert_to_har_request(code)
            har_file.flush

            targets = {
              'shell'      => ['curl'],
              'javascript' => ['xhr'],
              'php'        => ['native'],
              'python'     => ['requests'],
              'ruby'       => ['native']
            }

            # Loop through each target and generate the snippets
            button = "<button class=\"btn alternative\">copy</button>"
            alt_output = ''
            targets.each do |lang_to, value|
              value.each do |client|
                new_code = `httpsnippet #{har_file.path} -t #{lang_to} -c #{client}`

                escaped_new_code = new_code.lines.to_a[1..-1].join
                  .gsub('<', '&lt;')
                  .gsub('>', '&gt;')
                  .gsub('"', '&quot;')

                if lang_to == 'shell'
                  lang_to = 'raw'
                end

                alt_output << generate_code_block(escaped_new_code, lang_to, nohide, selector)
              end
            end

            har_file.close

            alt_output
          end

          private
          def convert_to_har_response(postman_response)
            responses = JSON.parse(postman_response)['response']
            har_responses = []
            if responses
              responses.each do |response|
                all_har_headers = []
                response['header'].each do |elem|
                  all_har_headers << {
                    'name' => elem['key'],
                    'value' => elem['value'],
                    'comment' => elem['description']
                  }
                end

                content = {
                  'mimeType' => 'application/json', 
                  'text' => JSON.pretty_generate(JSON.parse(response['body']))
                }

                har_response = {
                  'httpVersion' => "HTTP/1.1",
                  'status' => response['code'],
                  'statusText' => response['status'],
                  'headers' => all_har_headers,
                  'content' => content,
                  'comment' => response['name']
                }
                har_responses << har_response
              end
            end
            har_responses
          end

          private
          def convert_to_har_request(postman_request)
            # TODO: Make this work with non-raw postman request bodies

            postman_request = JSON.parse(postman_request)['request']

            # Create the HAR object
            har = {
              'method' => postman_request['method'],
              'url' => postman_request['url'],
              'comment' => postman_request['description']
            }

            # Add headers if present
            all_har_headers = []
            postman_request['header'].each do |elem|
              all_har_headers << {
                'name' => elem['key'],
                'value' => elem['value'],
                'comment' => elem['description']
              }
            end

            har['headers'] = all_har_headers

            # Add request body if present
            if postman_request['body'].find {|h| h.member? 'raw' } && !postman_request['body']['raw'].empty?
              har['postData'] = {
                'mimeType' => 'application/json', 
                'text' => JSON.parse(postman_request['body']['raw']).to_json}
            end

            har.to_json
          end

        end

      end
    end
  end
end
