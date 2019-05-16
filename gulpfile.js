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
    //create custom helper funtion 'list', to repeat attributes
    //---used {{#list attributes}}{{/list}}
    Handlebars.registerHelper('list', function(items, options) {
        console.log(items);
        var out = '';
        /*
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
        */
       return out;
      });

/*
      Handlebars.registerHelper('listSidebarComponents', function(array) {
        var out = "";
        console.log(array);
        //for(var i=0, l=names.length; i<l; i++) {
            out = out + `<li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              ${array}
            </a>
          </li>`
        //}
        return out;
      });
*/


      //register partitals:
      Handlebars.registerPartial('sidebar', sidebar);


    
    exports.compileComponents = compileComponents;