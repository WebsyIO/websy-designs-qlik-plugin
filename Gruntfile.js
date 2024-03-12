module.exports = function (grunt) {
  grunt.initConfig({
    import_js: {
      files: {
        expand: true,
        cwd: 'src/',
        src: ['**/*.js'],
        dest: 'temp/',
        ext: '.js'
      }
    },
    includes: {
      js: {
        options: {
          includeRegexp: /include\(+['"]?([^'"]+)['"]?\)*$/
        },
        src: ['**/*.js'],
        dest: 'temp/',
        cwd: 'src'
      },      
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'dist/websy-designs-qlik-plugin.min.css': 'src/websy-designs-qlik-plugin.less'
        }
      }
    },
    stylelint: {
      simple: {
        options: {
          configFile: '.stylelintrc',
          failOnError: true,
          syntax: 'less'
        },
        src: [
          'src/**/*.less'
        ]
      }
    },
    eslint: {
      target: ['src/**/*.js'],
      options: {
        configFile: '.eslintrc'
      }
    },
    watch: {
      clientscript: {
        files: ['src/**/*.less', 'src/**/*.js'], // which files to watch
        tasks: ['includes', 'eslint', 'babel', 'stylelint', 'less', 'uglify', 'copy'],
        options: {
          nospawn: true,
          livereload: true
        }
      }
    },
    express: {
      prod: {
        options: {
          port: 9000,
          script: 'index.js'
        }
      }
    },
    babel: {
      options: {
        sourceMap: false,
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-object-assign', '@babel/plugin-transform-async-to-generator', '@babel/plugin-transform-spread']  		
      },						
      dist: {
        files: [
          {
            'dist/websy-designs-qlik-plugin.js': 'temp/main.js'
          },
          {
            'dist/websy-designs-qlik-plugin-es6.js': 'temp/main-es6.js'
          }
        ]
      }
    },
    uglify: {
      options: {
        beautify: false,
        mangle: true,
        compress: true
      },
      build: {
        files: [
          {
            'dist/websy-designs-qlik-plugin.min.js': ['dist/websy-designs-qlik-plugin.js']
          },
          {
            'dist/websy-designs-qlik-plugin-es6.min.js': ['dist/websy-designs-qlik-plugin-es6.js']
          }
        ]
      }
    },
    copy: {
      main: {
        files: [
          {
            src: ['temp/main.js'],
            dest: 'dist/websy-designs-qlik-plugin.debug.js'
          },
          {
            src: ['temp/main-es6.js'],
            dest: 'dist/websy-designs-qlik-plugin-es6.debug.js'
          }     
        ]
      }
    }
  })
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-import-js')
  grunt.loadNpmTasks('grunt-includes')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-minify-html')
  grunt.loadNpmTasks('grunt-express-server')
  grunt.loadNpmTasks('grunt-stylelint')
  grunt.loadNpmTasks('grunt-eslint')
  grunt.registerTask('default', ['stylelint', 'less', 'includes', 'eslint', 'babel', 'uglify', 'copy', 'watch'])
  grunt.registerTask('build', ['stylelint', 'less', 'includes', 'eslint', 'babel', 'uglify', 'copy'])
  grunt.registerTask('buildcss', ['less'])
}
