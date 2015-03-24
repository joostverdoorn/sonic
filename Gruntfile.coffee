module.exports = ( grunt ) ->
  srcs = [
    'sonic'
    'factory'
    'unique_id'
    'utilities'
    'iterator'
    'abstract_list'
    'list'
    'unit'
    'flat_map_list'
    'group_list'
    'range_list'
  ]

  # Coverage thresholds
  thresholds =
    lines: 60
    statements: 50
    branches: 40
    functions: 50

  # This functions makes the config shorter and clearer later on.
  # It just returns the type specific coverage config
  coverage = ( type, optionsRef ) ->
    optionsRef.template = require('grunt-template-jasmine-istanbul')
    optionsRef.templateOptions =
      coverage: 'stat/coverage/coverage.json'
      thresholds: thresholds
      report:
        type: type
        options:
          dir: "stat/coverage/#{type}"

    return optionsRef

  # Configure all the tasks!
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    coffee:
      src:
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

      perf:
        files: [
          expand: true
          cwd: 'perf'
          src: ['**/*.coffee']
          dest: 'build/perf'
          ext: '.js'
        ]

    browserify:
      default:
        files: 'dist/sonic.browser.js': 'dist/sonic.js'
        options:
          sourceMap: false
          browserifyOptions:
            standalone: 'Sonic'
      istanbul:
        files: 'build/spec/sonic.browser.js': 'dist/sonic.js'
        options:
          sourceMap: true
          transform: [require('browserify-istanbul')]
          browserifyOptions:
            standalone: 'Sonic'

    uglify:
      default:
        files: 'dist/sonic.browser.min.js': 'dist/sonic.browser.js'

    jasmine:
      default:
        src:  ['build/spec/sonic.browser.js']
        options:
          keepRunner: true
          specs: 'build/spec/**/*.js'
      lcovonly:
        src:  ['build/spec/sonic.browser.js']
        options: (coverage 'lcovonly',
          keepRunner: true
          specs: 'build/spec/**/*.js'
        )
      html:
        src: ['build/spec/sonic.browser.js']
        options: (coverage 'html',
          specs: 'build/spec/**/*.js'
        )

    benchmark:
      default:
        src: ['build/perf/**/*.js']
        dest: 'stat/perf/result.csv'

    clean:
      build: ['build']

    watch:
      default:
        files: ['src/**/*.coffee', 'spec/**/*.coffee']
        tasks: ['spec']

    codo:
      files: ['src/**/*.coffee']

  # grunt.loadNpmTasks 'grunt-babel'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-benchmark'
  grunt.loadNpmTasks 'grunt-codo'

  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'dist',    ['coffee:src', 'browserify']
  grunt.registerTask 'spec',    ['clean', 'dist', 'coffee:spec' ,'jasmine:default']
  grunt.registerTask 'perf',    ['clean', 'dist', 'coffee:perf' ,'benchmark:default']
  grunt.registerTask 'test',    ['spec' ,'jasmine:lcovonly']


