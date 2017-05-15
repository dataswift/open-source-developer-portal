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

              har_file = Tempfile.new('har')
              har_file << convert_to_har(code)
              har_file.flush

              targets = {
                'shell'      => ['curl'],
                'javascript' => ['jquery'],
                'php'        => ['native'],
                'python'     => ['native'],
                'ruby'       => ['native']
              }

              # Loop through each target and generate the snippets
              button = "<button class=\"btn alternative\">copy</button>"
              alt_output = ''
              targets.each do |lang_to, value|
                value.each do |client|
                  new_code = `httpsnippet #{har_file.path} -t #{lang_to} -c #{client}`
                  new_code = new_code.lines.to_a[1..-1].join.gsub('<', '&lt;').gsub('>', '&gt;').gsub('"', '&quot;')

                  if lang_to == 'shell'
                    lang_to = 'raw'
                  end

                  new_code = "<pre>#{new_code}</pre>"
                  lang_to = lang_to + 'nohide' if nohide

                  alt_output << "<div class=\"code-snippet js-code-snippet language-#{lang_to}\">" + button + selector + "<div class=\"code-snippet__cnt highlight\">"
                  alt_output << add_code_tags(new_code, lang_to)
                  alt_output << "</div></div>"
                end
              end

              har_file.close

              return alt_output
            end

            code = "<pre>#{super}</pre>"

            lang = lang + 'nohide' if nohide

            # Button
            button = "<button class=\"btn alternative\">copy</button>"

            output = "<div class=\"code-snippet js-code-snippet language-#{lang}\">" + button + selector + "<div class=\"code-snippet__cnt highlight\">"
            output << add_code_tags(code, lang)
            output << "</div></div>"
          end

          protected
          def rouge_formatter(lexer)
            Rouge::Formatters::HTML.new(:wrap => false)
          end

          private
          def convert_to_har(postman_request)
            # TODO: Make this work with non-raw postman request bodies

            postman_request = JSON.parse(postman_request)['request']

            # Create the HAR object
            har = {'method' => postman_request['method'], 'url' => postman_request['url']}

            # Add headers if present
            all_har_headers = []
            postman_request['header'].each do |elem|
              all_har_headers << {'name' => elem['key'], 'value' => elem['value']}
            end

            har['headers'] = all_har_headers

            # Add request body if present
            if postman_request['body'].find {|h| h.member? 'raw' }
              har['postData'] = {'mimeType' => 'application/json', 'text' => postman_request['body']['raw'].to_json}
            end

            har.to_json
          end

        end

      end
    end
  end
end
