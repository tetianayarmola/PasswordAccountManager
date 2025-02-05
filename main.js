const passwordForm = document.querySelector('#password_form');
var input_error = false;

function getFormCredentials(){
    const name = document.querySelector('#name').value;
    const username = document.querySelector('#username').value;
    const url = document.querySelector('#url_input').value;
    const password_value = document.querySelector('#new_password_by_user').value;
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
    
    //display the pasword
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
    while (length < 1)
    {
        input_error = true;
        return `Password length must be a positive number. Please, try again.`;
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
        return `Password length must be less than ${maxLength} characters. Please, try again.`;
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