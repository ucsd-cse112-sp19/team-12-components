const gulp = require('gulp');
    const fs = require('fs')
    handlebars = require('gulp-compile-handlebars');
    Handlebars = require('handlebars'); 
    rename = require('gulp-rename');
    components = require('./templates/components.json');

    //import templates for partials:
    left_sidebar = require('./templates/left_sidebar.handlebars');
    navbar = require('./templates/navbar.handlebars');
    footer = require('./templates/footer.handlebars')
    //const version = process.argv[2];


    //takes the components.handlebars template and json file
    //--- and compiles in the data, creating html files destination
    function compileComponents(done) {
        //get version from params
        const version = process.argv[4]; 
        console.log("version: ", process.argv[4]);
        //supported languages:
        let languages = ['en','es','fr','zh'];
        let path = '';
        //loop through all supported languages and generate docs
        for(var c=0; c<languages.length; c++){
            var versionPath = './docs/' + languages[c] + '/docs/' + version + '/components/';
            //create directories if they don't exist already
            fs.mkdir(versionPath, { recursive: true }, (err) => {
                if (err) throw err;
            });
            //------------render all component doc pages: ------------
            for(var i=0; i<components.length; i++) {
                var component = components[i];
                fileName = component.ComponentName.replace(/ +/g, '-').toLowerCase();
                path = './templates/' + languages[c] + '/' + fileName + '_' + languages[c] + '.handlebars';
                try {
                //if component template exisits, use that template
                if (fs.existsSync(path)) {
                    gulp.src(path)
                    .pipe(handlebars(component))
                    .pipe(rename(fileName + ".html"))
                    .pipe(gulp.dest('./docs/' + languages[c] + '/docs/' + version + '/components/'));
                }
                } catch(err) {
                    console.error(err)
                }
            }

            //---------------Other Pages: -------------------
            try {
                //if component template exisits, use that template
                path = './templates/' + languages[c] + '/homepage' + '_' + languages[c] + '.handlebars';
                if (fs.existsSync(path)) {
                    //render homepage - by language
                    gulp.src(path)
                    //only passing in objects for each handlebar page render
                    .pipe(handlebars())
                    .pipe(rename("index.html"))
                    .pipe(gulp.dest('./docs/' + languages[c] + '/'));
                }

                //render docs page
                path = './templates/' + languages[c] + '/docs' + '_' + languages[c] + '.handlebars';
                if (fs.existsSync(path)) {
                    gulp.src(path)
                    //only passing in objects for each handlebar page render
                    .pipe(handlebars(component))
                    .pipe(rename("overview.html"))
                    .pipe(gulp.dest('./docs/' + languages[c] + '/docs/'));
                }
            }
            catch(err) {
                console.error(err)
            }
            //end of loop
        }

        //Render single homepage default - index.html
        //This must be in root folder for home website
        gulp.src('./templates/en/homepage_en.handlebars')
        //only passing in objects for each handlebar page render
        .pipe(handlebars())
        .pipe(rename("index.html"))
        .pipe(gulp.dest('./docs/'));

        done();
    }



    /* ifEquals check */
    Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    //register all partitals:
    Handlebars.registerPartial('left_sidebar', left_sidebar);
    Handlebars.registerPartial('navbar', navbar);
    Handlebars.registerPartial('footer', footer);


    exports.compileComponents = compileComponents;