
module.exports = function (grunt) {
  
  grunt.initConfig({
    mochacli: {
      development: {
        options: {
          env: {
            'NODE_ENV': 'development',
            'TEST': true,
            'no-exit': true,
            'bail': false,
            'force': true
          },
          reporter: 'spec',
          filesRaw: ['test/*.test.js']
        }
      }
    },
    watch: {
      test: {
        files: ['./*js', 'services/*.js', 'router/*.js', 'router/views/*.js', 'models/*.js', 'controllers/*.js', 'test/*.js'],
        tasks: ['mochacli']
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['mochacli', 'watch']);
};
