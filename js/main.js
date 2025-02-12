const passwordForm = document.querySelector('#password_form');
const nameInput = document.querySelector('#name');
const usernameInput = document.querySelector('#username');
const urlInput = document.querySelector('#url_input');
const passwordInput = document.querySelector('#new_password_by_user');
const message = document.querySelector('.msg');
const passwordsList = document.querySelector('#passwords');
//const passwordsList = document.getElementById('passwords');

const saveBtn = document.querySelector('#saveButton');


//Creating JSON data
//Defining object literal:
function credentialsToJSON(name, username, url, password) {
    const objectCredentials = {
        name: name,
        username: username,
        url: url,
        password: password
    };
    //convert object to JSON tring
    const jsonString = JSON.stringify(objectCredentials);
    return jsonString;
}




// tell the saveButton to listen for the event
//('event we listen to', function)
saveBtn.addEventListener('click', onSave);

function onSave(event) {
    //prevent default so it works once
    event.preventDefault();
    //making sure all requires fields are filled out
    if(nameInput.value === '' || usernameInput.value === ''|| passwordInput.value === '') {
        //alert('Please, enter all required fields.');
        //add error styling and class to message
        message.classList.add('error');
        message.innerHTML = 'Please, enter all required fields';
        //remove error message after 3 seconds
        setTimeout(() => message.remove(), 3000);
    
    } else{
        newJsonString = credentialsToJSON(nameInput.value, usernameInput.value, urlInput.value, passwordInput.value);
        console.log(newJsonString);
        console.log('success');
        console.log(passwordsList);
        //create list item from nothing, insert to the DOM
        const li = document.createElement('li');
        //add text node inside the li (list) element with the name value
        // ` ` is a template literal (template string)
        li.appendChild(document.createTextNode(`${nameInput.value} : ${usernameInput.value} : ${urlInput.value} : ${passwordInput.value}`));
        //append li to ul (which was set to variable passwordsList previously)
        passwordsList.appendChild(li);

        // clear all fields
        nameInput.value = '';
        usernameInput.value = '';
        urlInput.value = 'https://';
        passwordInput.value = '';
    }
}


function generate(){
    
    //get user input reference
    const length = document.querySelector('#length').value;
    const numbers = document.querySelector('#numbers').checked;
    const uppercase = document.querySelector('#uppercase').checked;
    const lowercase = document.querySelector('#lowercase').checked;
    const symbols = document.querySelector('#symbols').checked;
    const no_duplicates = document.querySelector('#no_duplicates').checked;
    //generate a random password
    const password = handlePasswordGenerator(parseInt(length), numbers, lowercase, uppercase, symbols, no_duplicates);
    
    //display the password
    document.querySelector('#output').textContent = password;
    if (!input_error){
        document.querySelector('#new_password_by_user').value = password;
    }
    
}


//hide the password visibility
function PasswordVisibility(){
    var item = document.querySelector('#output');
    if (item.type === "password"){
        item.type = "text";
    }
    else {
        item.type = "password";
    }
}

//creting a function to generate a random password
function handlePasswordGenerator(length, numbers, lowercase, uppercase, symbols, no_duplicates){
    input_error = false;
    //create a variable to hold characters set
    let charSet = '';
    //set max characters length variable
    let maxLength = 0;

    //handle negative length input
    if (length < 1)
    {
        input_error = true;
        message.classList.add('error');
        message.innerHTML = 'Password length must be a positive number. Please, try again';
        
        return;
    }

    //if numbers are allowed
    if(numbers){
        charSet += '0123456789'; //adds set of numbers
        maxLength += 10;
    }

    if(lowercase){
        charSet += 'abcdefghijklmnopqrstuvwxyz';
        maxLength += 26;
    }

    if(uppercase){
        charSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        maxLength += 26;
    }

    if(symbols){
        charSet += '!@#$%^&*';
        maxLength += 10;
    }

    //check if the length input by user does not exceed maxLength, so it won't generate duplicates
    if (no_duplicates && length > maxLength){
        input_error = true;
        message.classList.add('error');
        message.innerHTML = 'Password length must be less than ' + maxLength.toString() + ' characters. Please, try again.';
        return;
    }
    //creating an empty array to hold each char of the password
    let passwordArray = [];

    //unless we reach the specified by user length of passwordGenerator, we add a random character from the charSet to array
    while (passwordArray.length < length){
        const randomChar = charSet[Math.floor(Math.random() * charSet.length)];

        //check if noDuplication is off and char is not in the array already
        if (!no_duplicates || !passwordArray.includes(randomChar)){
            passwordArray.push(randomChar); //add random character to an array

        } 
    }

    //return joined random characters
    return passwordArray.join('');
}