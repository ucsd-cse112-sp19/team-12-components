const gulp = require('gulp');
    handlebars = require('gulp-compile-handlebars');
    Handlebars = require('handlebars'); 
    rename = require('gulp-rename');
    components = require('./docs/components.json');


    //takes the components.handlebars template and json file
    //--- and compiles in the data, creating html files destination
    function compileComponents(done) {
        for(var i=0; i<components.length; i++) {
            var component = components[i],
                fileName = component.ComponentName.replace(/ +/g, '-').toLowerCase();
    
            gulp.src('./docs/templates/*.handlebars')
                .pipe(handlebars(component))
                .pipe(rename(fileName + ".html"))
                .pipe(gulp.dest('./docs/site/'));
        }
        done();
    }
    //create custom helper funtion 'list', to repeat attributes
    //---used {{#list attributes}}{{/list}}
    Handlebars.registerHelper('list', function(items, options) {
        var out = "<table>";
        for(var i=0, l=items.length; i<l; i++) {
            out = out + "<tr>";
            out = out + "<th>" + items[i]['AttributeName'] + "</th>";
            out = out + "<th>" + items[i]['AttributeDescription'] + "</th>";
            out = out + "<th>" + items[i]['AttributeAcceptedValues'] + "</th>";
            out = out + "<th>" + items[i]['AttributeDefault'] + "</th>";
            out = out + "</tr>";
        }
      
        return out + "</table>";
      });

    
    exports.compileComponents = compileComponents;