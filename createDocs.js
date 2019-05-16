//import path, file system, and line reader
const path = require('path');
const fs = require('fs');
const lineByLine = require('n-readlines');

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
                var attributeItems = attribute.split(',');
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
                fs.writeFile("./docs/components.json", json, (err) => {
                    if (err) {  console.error(err);  return; };
                    console.log("File: './docs/components.json' has been created");
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
            if (path.extname(file) === ext) {
                files.push(filePath);
            }
        }
    });

    return files;
}

//call function from command line
searchFilesInDirectory(process.argv[2], process.argv[3]);