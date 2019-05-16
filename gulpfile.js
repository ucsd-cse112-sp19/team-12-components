const gulp = require('gulp');
    handlebars = require('gulp-compile-handlebars');
    Handlebars = require('handlebars'); 
    rename = require('gulp-rename');
    components = require('./docs/components.json');

    //import templates for partials:
    sidebar = require('./docs/templates/sidebar.handlebars');


    //takes the components.handlebars template and json file
    //--- and compiles in the data, creating html files destination
    function compileComponents(done) {
        for(var i=0; i<components.length; i++) {
            var component = components[i],
                fileName = component.ComponentName.replace(/ +/g, '-').toLowerCase();
    
            //gulp.src('./docs/templates/*.handlebars')
            gulp.src('./docs/templates/component.handlebars')
                //only passing in objects for each handlebar page render
                .pipe(handlebars(component))
                .pipe(rename(fileName + ".html"))
                .pipe(gulp.dest('./docs/site/'));
        }
        done();
    }

      /* ifEquals check */
    Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

      //register all partitals:
    Handlebars.registerPartial('sidebar', sidebar);

    exports.compileComponents = compileComponents;