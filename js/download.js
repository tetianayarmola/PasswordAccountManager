const downloadBtn = document.querySelector('#downloadBtn');
const blobLinkEl = document.querySelector('#blob-link');
downloadBtn.addEventListener('click', onDownload);
function onDownload(event) {
    event.preventDefault();
    console.log('Download clicked!');
    const credentialsObj = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const storedCredential = JSON.parse(localStorage.getItem(key));
        // Add to the empty object
        credentialsObj[key] = storedCredential;
    }
    const jsonString = JSON.stringify(credentialsObj, null, 2);
    //creating Blob
    const blob = new Blob([jsonString], { type: 'application/json' });

    //download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    //file name
    downloadLink.download = 'PasswordsData.json';
    //Append to DOM
    blobLinkEl.appendChild(downloadLink);
    downloadLink.click(); //trigger downloads

    blobLinkEl.removeChild(downloadLink);
}