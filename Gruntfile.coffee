module.exports = ( grunt ) ->
  srcs = [
    'src/sonic.coffee'
    'src/signal.coffee'
    'src/iterator.coffee'

    'src/abstract_list.coffee'
    'src/list.coffee'
    'src/unit.coffee'
    'src/flat_map_list.coffee'

    'src/export.coffee'
  ]

  specs = [
    # '.grunt/sonic/spec_compiled/sonic.js'
    '.grunt/sonic/spec_compiled/iterator.js'
    # '.grunt/sonic/spec_compiled/generator.js'

    # '.grunt/sonic/spec_compiled/sorted_entry.js'

    '.grunt/sonic/spec_compiled/abstract_list.js'
    '.grunt/sonic/spec_compiled/list.js'
    '.grunt/sonic/spec_compiled/flat_map_list.js'
    # '.grunt/sonic/spec_compiled/transformed_list.js'

    # '.grunt/sonic/spec_compiled/concatenated_list.js'
    # '.grunt/sonic/spec_compiled/unique_list.js'
    # '.grunt/sonic/spec_compiled/sorted_list.js'
    # '.grunt/sonic/spec_compiled/reversed_list.js'
    # '.grunt/sonic/spec_compiled/take_list.js'
    # '.grunt/sonic/spec_compiled/generated_list.js'

    # '.grunt/sonic/spec_compiled/export.js'
  ]

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    coffee:
      dist:
        options:
          join: true
        files:
          'dist/sonic.js': srcs

      build:
        options:
          join: true
          sourceMap: true
        files:
          'build/sonic.js': srcs

      spec:
        files: [
          expand: true
          cwd: 'spec'
          src: ['**/*.coffee']
          dest: '.grunt/sonic/spec_compiled'
          ext: '.js'
        ]

    jasmine:
      build:
        src: ['build/**/*.js']
        options:
          keepRunner: true
          specs: specs #'.grunt/sonic/spec_compiled/**/*.js'
          # template: require('grunt-template-jasmine-istanbul')
          # templateOptions:
          #   coverage: 'statistics/coverage/coverage.json'
          #   report:
          #     type: 'lcovonly'
          #     options:
          #       dir: 'statistics/coverage/lcov'
          #   thresholds:
          #     lines: 60
          #     statements: 60
          #     branches: 60
          #     functions: 60

    clean:
      build: ['build']
      spec:  ['.grunt/sonic/spec_compiled']
      grunt: ['.grunt']

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

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-codo'

  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'build',   ['coffee:build']
  grunt.registerTask 'dist',    ['coffee:dist']
  grunt.registerTask 'spec',    ['clean:spec', 'coffee:build', 'coffee:spec', 'jasmine:build', 'clean:spec']



# module.exports = ( grunt ) ->
#   srcs = [
#     'src/list.coffee'
#   ]

#   grunt.initConfig
#     pkg: grunt.file.readJSON('package.json')

#     meta:
#       banner:
#         '// Collection\n' +
#         '// version: <%= pkg.version %>\n' +
#         '// contributors: <%= pkg.contributors %>\n' +
#         '// license: <%= pkg.licenses[0].type %>\n'

#     coffee:
#       dist:
#         options:
#           join: true
#         files:
#           'dist/list.js': 'src/list.coffee'

#       build:
#         options:
#           join: true
#           sourceMap: true
#         files:
#           'build/list.js': 'src/list.coffee'

#       spec:
#         files: [
#           expand: true
#           cwd: 'spec'
#           src: ['**/*.coffee']
#           dest: '.grunt/list/spec_compiled'
#           ext: '.js'
#         ]

#     jasmine:
#       build:
#         src: ['build/list.js']
#         options:
#           specs: '.grunt/list/spec_compiled/**/*.js'
#           vendor: []
#           template: require('grunt-template-jasmine-istanbul')
#           templateOptions:
#             coverage: 'statistics/coverage/coverage.json'
#             report:
#               type: 'lcovonly'
#               options:
#                 dir: '.grunt/list/coverage/lcov'
#             thresholds:
#               lines: 60
#               statements: 60
#               branches: 60
#               functions: 60
#       html:
#         src: ['build/list.js']
#         options:
#           specs: '.grunt/list/spec_compiled/**/*.js'
#           vendor: []
#           template: require('grunt-template-jasmine-istanbul')
#           templateOptions:
#             coverage: 'statistics/coverage/coverage.json'
#             report:
#               type: 'html'
#               options:
#                 dir: 'statistics/coverage/html'
#             thresholds:
#               lines: 60
#               statements: 60
#               branches: 60
#               functions: 60

#     plato:
#       all:
#         options:
#           jshint: false
#         files:
#           'statistics/complexity' : ['.grunt/list/src_compiled/**/*.js']


#     clean:
#       build: ['build']
#       spec:  ['.grunt/list/spec_compiled']
#       grunt: ['.grunt']

#     watch:
#       all:
#         files: 'src/**/*.coffee'
#         tasks: ['build', 'spec']

#   grunt.registerTask 'watch',   ['coffee:build', 'watch']
#   grunt.registerTask 'spec',    ['clean:spec', 'coffee:build', 'coffee:spec', 'jasmine:build', 'clean:spec']
#   grunt.registerTask 'build',   ['coffee:build']
#   grunt.registerTask 'dist',    ['coffee:dist']
#   grunt.registerTask 'analyze', ['coffee','jasmine:html', 'plato']
