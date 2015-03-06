module.exports = ( grunt ) ->
  srcs = [
    'sonic'
    'signal'
    'iterator'
    'abstract_list'
    'list'
    'unit'
    'flat_map_list'
    'group_list'
    'take_list'
  ]

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    coffee:
      default:
        options:
          sourceMap: true
        files: [
          expand: true
          cwd: 'src'
          src: srcs.map ( src ) -> src + '.coffee'
          dest: 'dist'
          ext: '.js'
        ]

      spec:
        options:
          sourceMap: true
        files: [
          expand: true
          cwd: 'spec'
          src: ['**/*.coffee']
          dest: 'build/spec'
          ext: '.js'
        ]

    browserify:
      default:
        files: 'dist/sonic.browser.js': 'dist/sonic.js'
        options:
          sourceMap: false
          browserifyOptions:
            standalone: 'Sonic'

    jasmine:
      build:
        src: ['dist/sonic.browser.js']
        options:
          keepRunner: true
          specs: 'build/spec/**/*.js'

    clean:
      build: ['build']

    watch:

      dist:
        files: ['src/**/*.coffee']
        tasks: ['coffee:dist']
      spec:
        files: ['**/*.coffee']
        tasks: ['spec']
      build:
        files: ['src/**/*.coffee']
        tasks: ['coffee:build']

    codo:
      files: ['src/**/*.coffee']

  # grunt.loadNpmTasks 'grunt-babel'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-codo'

  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'dist',    ['coffee', 'browserify']
  grunt.registerTask 'spec',    ['clean', 'dist', 'coffee:spec' ,'jasmine']


