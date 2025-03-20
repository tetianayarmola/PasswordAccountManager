 //retrieve credentials from the local storage
 const savedPasswordsList = document.querySelector('#saved-passwords-list');

 for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const storedCredential = JSON.parse(localStorage.getItem(key));
    console.log(storedCredential);
    //create list item from nothing, insert to the DOM
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    //add text node inside the li (list) element with the name value
    // ` ` is a template literal (template string)
    // Create divs for each piece of information
    const ulDiv = document.createElement('div');
    ulDiv.className = 'card';
    li.innerHTML = `<strong>ID:</strong> ${storedCredential.id}<br>
    <strong>Name:</strong> ${storedCredential.name}<br>
    <strong>Username:</strong> ${storedCredential.username}<br>
    <strong>URL:</strong> ${storedCredential.url}<br>
    <strong>Password:</strong> ${storedCredential.password}`;

    // Append
    ul.appendChild(li);
    ulDiv.appendChild(ul);
    //append li to ul (which was set to variable passwordsList previously)
    savedPasswordsList.appendChild(ulDiv);
    }

