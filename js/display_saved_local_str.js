 //retrieve credentials from the local storage
 const savedPasswordsList = document.querySelector('#saved-passwords-list');

 for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const storedCredential = JSON.parse(localStorage.getItem(key));
    console.log(storedCredential);
    //create list item from nothing, insert to the DOM
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');
    deleteBtn.className= 'deleteBtn';
    deleteBtn.innerText = 'Delete';
    deleteBtn.id = storedCredential.id;
    //add text node inside the li (list) element with the name value
    // ` ` is a template literal (template string)
    // Create divs for each piece of information
    const ulDiv = document.createElement('div');
    ulDiv.className = 'card';
    ulDiv.className = 'card';
    li.innerHTML = `<strong>ID:</strong> ${storedCredential.id}<br>
    <strong>Name:</strong> ${storedCredential.name}<br>
    <strong>Username:</strong> ${storedCredential.username}<br>
    <strong>URL:</strong> ${storedCredential.url}<br>
    <strong>Password:</strong> ${storedCredential.password}`;
   //sets credential's ID for the card
    ulDiv.dataset.id = storedCredential.id; 
    // Append
    ul.appendChild(li);
    ulDiv.appendChild(ul);
    ulDiv.appendChild(deleteBtn);
    //append li to ul (which was set to variable passwordsList previously)
    savedPasswordsList.appendChild(ulDiv);
   //add to each card Delete btn event listener
    ulDiv.addEventListener('click', onDelete);
    }



function onDelete(event) {
   event.preventDefault();
   const parentEl = event.target.parentElement;
   const targetClass = event.target.classList;
   const id = event.target.parentElement.dataset.id;
   //check if deleteBtn was clicked
   if (targetClass.contains('deleteBtn')){
      //remove credential from local storage
      localStorage.removeItem(id);
      //check if browser supports view transitions
      if(!document.startViewTransition){
         //just remove the card
         parentEl.remove();
         return;
      }
      //set btn parent element as a target
      parentEl.style.viewTransitionName = 'target-card';
		document.startViewTransition(() => {
			parentEl.remove();
      });
   }
}
