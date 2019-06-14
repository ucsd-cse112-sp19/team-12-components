//import path, file system, and line reader
const path = require('path');
const fs = require('fs');
const lineByLine = require('n-readlines');



//defines all the guides. To add your guide into the guide list the sidebar
//name and the filename
const guides = [
    ['Getting-started', 'tut_getting_started'],
    ['For Vue/React Developers', 'tut_vue']
]



//find all files in directory, read them line by line
//then if comments, place into array and convert to json
function searchFilesInDirectory(dir, ext) {
    if (!fs.existsSync(dir)) {
        console.log(`The directory: ${dir} does not exist`);
        return;
    }

    //get all files with ext in dir, this is a list
    const found = getFilesInDirectory(dir, ext);
    //main wrapper array (to be json later)
    var componentsList = [];
    var allComponentNames = [];
    //keep track of total files to know when we are done looping
    totalFiles = 0;

    //loop through each found file
    found.forEach(file => {
        
        const liner = new lineByLine(file);
        //variables
        attributeArray = [];
        var name, description;
        let current, line;

        while (current = liner.next()) {
            //convert line buffer to string
            line = current.toString('ascii');

            //---- Get all comments and add to array (to be json later) ----
            if(line.includes('@component_name')){
                name = line.replace('* @component_name','').trim();
                var fileName = name.replace(/ +/g, '-').toLowerCase();
                allComponentNames.push([name,fileName]);
            }
            if(line.includes('@component_desc')){
                description = line.replace('* @component_desc','').trim();
            }
            if(line.includes('@attribute')){
                var attribute = line.replace('* @attribute','').trim();
                var attributeItems = attribute.replace(/\t/g, '').split(',');
                //if last item in array is empty, delete
                if(attributeItems[attributeItems.length - 1] ==''){
                    attributeItems.pop()
                }
                //if total length of array is not five, investigate
                if(attributeItems.length != 5){
                    //get next line
                    current = liner.next();
                    line = current.toString('ascii');
                    //if new attribute is found, we must be missing a comma, throw error
                    if (line.search('@attribute') != -1){
                        console.log('Error, less than 5 objects for attribute in file: ', file);
                        console.log('On line: ', attributeItems);
                    }
                    //else, needs cleaning
                    else{
                    //clean next line
                    var attNextLine = line.replace('*','').trim(); 
                    var attNextLineItems = attNextLine.replace(/\t/g, '').split(',');

                    //check last char if not complete attribute
                    f = attribute;
                    a = attNextLine;
                    //check if last char in first line was a ','
                    var lastCharFirst = f[f.length -1].charAt(f[f.length - 1].length -1)
                    //check if first char in next line is a ','
                    var firstCharNext = a[0].charAt(a[0][0])
                    //if not one was a ',' = concat strings
                    if(firstCharNext != ',' && lastCharFirst != ','){
                        attributeItems[attributeItems.length - 1] = attributeItems[attributeItems.length - 1] + ' ' + attNextLineItems[0];
                        //deleted from latter array
                        attNextLineItems.shift();
                    } 
                    //merge both arrays
                    attributeItems = attributeItems.concat(attNextLineItems);
                    }
                }
                attributeArray.push({
                    AttributeName: attributeItems[0],
                    AttributeDescription: attributeItems[1],
                    AttributeType: attributeItems[2],
                    AttributeAcceptedValues: attributeItems[3],
                    AttributeDefault: attributeItems[4],
                });
            }
        }

        //if finished reading the file, push indiv component to array as an object
        if(liner.next() == false){
            componentsList.push({
                ComponentName: name,
                Description: description,
                Attributes: attributeArray,
                AllComponents: [],
                AllGuides: guides,
            });

            //clear temp array
            attributeArray = [];
            //update total files read so far
            totalFiles++;
            //check if done reading all files, change into JSON
            if (totalFiles == found.length){

                for(var j = 0; j<componentsList.length; j++){
                    componentsList[j].AllComponents = allComponentNames; 
                }
                //console.log(componentsList);
                var json = JSON.stringify(componentsList);
                fs.writeFile("./templates/components.json", json, (err) => {
                    if (err) {  console.error(err);  return; };
                    console.log("File: './templates/components.json' has been created");
                });
            }
        }
    });
}


// Finds all files based on extension in a given directory
function getFilesInDirectory(dir, ext) {
    if (!fs.existsSync(dir)) {
        console.log(`The directory: ${dir} does not exist`);
        return;
    }

    let files = [];
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.lstatSync(filePath);

        // If directory, recursively go into it and search
        if (stat.isDirectory()) {
            const nestedFiles = getFilesInDirectory(filePath, ext);
            files = files.concat(nestedFiles);
        } else {
            //make sure file is not a test or stories file
            if(path.basename(file).includes('_test') == false && path.basename(file).includes('.stories') == false && path.basename(file).includes('_uitest') == false){
                //get all js files for building json
                //copy js files to docs/js for website
                if (path.extname(file) === ext) {
                    files.push(filePath);
                    
                }
            }
        }
    });

    return files;
}

//call function from command line
searchFilesInDirectory(process.argv[2], process.argv[3]);