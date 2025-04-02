const uploadForm = document.querySelector('#upload-form');
const jsonFile = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');

uploadBtn.addEventListener('click', onUpload);

function onUpload (event) {
    event.preventDefault();
    event.stopPropagation();
    //check if there is a file. If not - return
    if (!jsonFile.value.length) 
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
    console.log('Upload triggered');
    let string = event.target.result;
    let json = JSON.parse(string);
    console.log('from JSON File: ', json);
    localStorageUpdateWith(json);
}

function localStorageUpdateWith (jsonData) {
    Object.entries(jsonData).forEach(([id, data]) => {
        //if not yet in local storage -> add
        if (localStorage.getItem(id) === null)
        {
            localStorage.setItem(id, JSON.stringify(data));
            console.log('Local storage added: ',id, JSON.stringify(data));
        } 
        else if ((localStorage.getItem(id) !== null)){
            console.log('Already exists. Skipped the item: ', id, JSON.stringify(data));
        }
        else {console.log('Reading error.')}
    });
    console.log('Local Storage has been updated.');
}