const gulp = require('gulp');
const fs = require('fs-extra');
const handlebars = require('gulp-compile-handlebars');
const Handlebars = require('handlebars');
const rename = require('gulp-rename');
const components = require('./templates/components.json');

//import templates for partials:
const left_sidebar = require('./templates/left_sidebar.handlebars');
const navbar = require('./templates/navbar.handlebars');
const footer = require('./templates/footer.handlebars');
const scripts = require('./templates/scripts.handlebars');

const envPath = process.argv[4];


//takes the components.handlebars template and json file
//--- and compiles in the data, creating html files destination
function compileComponents(done) {

    //supported languages:
    let languages = ['en', 'es', 'fr', 'zh'];
    let path = '';
    //loop through all supported languages and generate docs
    for (var c = 0; c < languages.length; c++) {
        //generate components documentation
        var componentPath = './docs/' + languages[c] + '/docs/components/';
        //remove the directories if they exists first.
        fs.removeSync(componentPath);
        //create directories if they don't exist already
        fs.mkdir(componentPath, { recursive: true }, (err) => {
            if (err) throw err;
        });
        //------------render all component doc pages: ------------
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            fileName = component.ComponentName.replace(/ +/g, '-').toLowerCase();
            path = './templates/' + languages[c] + '/' + fileName + '_' + languages[c] + '.handlebars';
            try {
                //if component template exisits, use that template
                if (fs.existsSync(path)) {
                    gulp.src(path)
                        .pipe(handlebars(component))
                        .pipe(rename(fileName + ".html"))
                        .pipe(gulp.dest('./docs/' + languages[c] + '/docs/components/'));
                }
            } catch (err) {
                console.error(err)
            }
        }

        //------------render all tutorial pages: ------------
        var guidesPath = './docs/' + languages[c] + '/docs/guides/';
        //remove the directories if they exists first.
        fs.removeSync(guidesPath);
        //create directories if they don't exist already
        fs.mkdir(guidesPath, { recursive: true }, (err) => {
            if (err) throw err;
        })

        var tutPath = './templates/' + languages[c]
        //get all tutorial files that start with 'tut_'
        var tutorialNames = fs.readdirSync(tutPath).filter((filename) => {
            return filename.slice(0, 4) == 'tut_';
        })

        for (var i = 0; i < tutorialNames.length; i++) {
            path = './templates/' + languages[c] + "/" + tutorialNames[i]
            fileName = tutorialNames[i].slice(0, -14); // Remove '_xx.handlebars' extension.
            try {
                //if tutorial exists, use that template
                if (fs.existsSync(path)) {
                    gulp.src(path)
                        .pipe(handlebars(components[0]))
                        .pipe(rename(fileName + ".html"))
                        .pipe(gulp.dest('./docs/' + languages[c] + '/docs/guides/'));
                }
                console.debug("Generate tutorial:", './docs/' + languages[c] + '/docs/guides/' + fileName + '.html')
            } catch (err) {
                console.error(err)
            }
        }

        //---------------Other Individual Pages: -------------------
        try {
            //if component template exisits, use that template
            path = './templates/' + languages[c] + '/homepage' + '_' + languages[c] + '.handlebars';
            if (fs.existsSync(path)) {
                //render homepage - by language
                gulp.src(path)
                    //only passing in objects for each handlebar page render
                    .pipe(handlebars(components[0]))
                    .pipe(rename("index.html"))
                    .pipe(gulp.dest('./docs/' + languages[c] + '/'));
            }

            //render overview page
            path = './templates/' + languages[c] + '/docs' + '_' + languages[c] + '.handlebars';
            if (fs.existsSync(path)) {
                gulp.src(path)
                    //only passing in objects for each handlebar page render
                    .pipe(handlebars(components[0]))
                    .pipe(rename("overview.html"))
                    .pipe(gulp.dest('./docs/' + languages[c] + '/docs/'));
            }

            //render tutorial pages
            path = './templates/' + languages[c] + '/tutorials' + '_' + languages[c] + '.handlebars';
            if (fs.existsSync(path)) {
                gulp.src(path)
                    //only passing in objects for each handlebar page render
                    .pipe(handlebars(components[0]))
                    .pipe(rename("tutorials.html"))
                    .pipe(gulp.dest('./docs/' + languages[c] + '/docs/'));
            }

            //render team page
            path = './templates/' + languages[c] + '/team_' + languages[c] + '.handlebars';
            if (fs.existsSync(path)) {
                gulp.src(path)
                    //only passing in objects for each handlebar page render
                    .pipe(handlebars(components[0]))
                    .pipe(rename("team.html"))
                    .pipe(gulp.dest('./docs/' + languages[c] + '/'));
            }

            //render releases page
            path = './templates/' + languages[c] + '/releases_' + languages[c] + '.handlebars';
            if (fs.existsSync(path)) {
                gulp.src(path)
                    //only passing in objects for each handlebar page render
                    .pipe(handlebars(components[0]))
                    .pipe(rename("releases.html"))
                    .pipe(gulp.dest('./docs/' + languages[c] + '/docs/'));
            }
        }
        catch (err) {
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
Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('getUrlBase', function () {
    if (envPath == 'production') {
        return 'https://ucsd-cse112.github.io/team-12-components/';
    }
    else if (envPath == 'dev') {
        return '/docs/';
    }
});

//register all partitals:
Handlebars.registerPartial('left_sidebar', left_sidebar);
Handlebars.registerPartial('navbar', navbar);
Handlebars.registerPartial('footer', footer);
Handlebars.registerPartial('scripts', scripts);


exports.compileComponents = compileComponents;