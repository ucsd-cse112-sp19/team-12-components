const gulp = require('gulp');
    const fs = require('fs')
    handlebars = require('gulp-compile-handlebars');
    Handlebars = require('handlebars'); 
    rename = require('gulp-rename');
    components = require('./docs/components.json');

    //import templates for partials:
    sidebar = require('./docs/templates/sidebar.handlebars');
    navbar = require('./docs/templates/navbar.handlebars');


    //takes the components.handlebars template and json file
    //--- and compiles in the data, creating html files destination
    function compileComponents(done) {
        //render all component pages
        for(var i=0; i<components.length; i++) {
            var component = components[i];
                fileName = component.ComponentName.replace(/ +/g, '-').toLowerCase();
                const path = './docs/templates/' + fileName + '.handlebars';

                try {
                //if component template exisits, use that template
                if (fs.existsSync(path)) {
                    gulp.src(path)
                    .pipe(handlebars(component))
                    .pipe(rename(fileName + ".html"))
                    .pipe(gulp.dest('./docs/'));
                }
                //else, use general component template.
                else{
                    gulp.src('./docs/templates/component.handlebars')
                    .pipe(handlebars(component))
                    .pipe(rename(fileName + ".html"))
                    .pipe(gulp.dest('./docs/'));
                }
                } catch(err) {
                    console.error(err)
                }
        }
                //render homepage
                gulp.src('./docs/templates/homepage.handlebars')
                //only passing in objects for each handlebar page render
                .pipe(handlebars())
                .pipe(rename("index.html"))
                .pipe(gulp.dest('./docs/'));

                //render docs page
                gulp.src('./docs/templates/docs.handlebars')
                //only passing in objects for each handlebar page render
                .pipe(handlebars(component))
                .pipe(rename("docs.html"))
                .pipe(gulp.dest('./docs/'));


        done();
    }

      /* ifEquals check */
    Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    //register all partitals:
    Handlebars.registerPartial('sidebar', sidebar);
    Handlebars.registerPartial('navbar', navbar);


    exports.compileComponents = compileComponents;