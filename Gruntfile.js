module.exports = function(grunt) {
    'use strict';

    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        data: {
            yeoman: {
              app: 'app',
              dist: 'dist'
            }
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
          return grunt.task.run(['build', 'browserSync:dist']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer:dist',
            'browserSync:server',
            'copy:stageOldDevportal',
            'watch'
        ]);
    });
};