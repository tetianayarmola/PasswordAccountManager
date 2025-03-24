const uploadForm = document.querySelector('#upload-form');
const jsonFile = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');

uploadBtn.addEventListener('clik', onUpload);

function onUpload (event) {
    event.preventDefault();
    //check if there is a file. If not - return
    if (!File.value.length) 
    {
        return;
    }

    // using FileReader API. Create new reader object
    const reader = new FileReader();
    reader.onload = logFile;
    //FileReader.readAsText() method to read a file
    //using the files property of the file fiels, get the first file 
    reader.readAsText(jsonFile.files[0]);
        

}

function logFile (event) {
    let string = event.target.result;
    let json = JSON.parse(str);
    console.log('json', json)
}