 //retrieve credentials from the local storage
 const savedPasswordsList = document.querySelector('#saved-passwords-list');

 for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const storedCredential = JSON.parse(localStorage.getItem(key));
    //create list item from nothing, insert to the DOM
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');
    deleteBtn.className= 'deleteBtn';
    deleteBtn.innerText = 'Delete';

    //add text node inside the li (list) element with the name value
    // ` ` is a template literal (template string)
    // Create divs for each piece of information
    const ulDivCard = document.createElement('div');
    ulDivCard.className = 'card';
    ulDivCard.className = 'card';
    li.innerHTML = `<strong>Name:</strong> ${storedCredential.name}<br>
    <strong>Username:</strong> ${storedCredential.username}<br>
    <strong>URL:</strong> ${storedCredential.url}<br>
    <strong>Password:</strong> ${storedCredential.password}`;
   //sets credential's ID for the card dataset 
    ulDivCard.dataset.id = key; 
    // Append
    ul.appendChild(li);
    ulDivCard.appendChild(ul);
    ulDivCard.appendChild(deleteBtn);
    //append li to ul (which was set to variable passwordsList previously)
    savedPasswordsList.appendChild(ulDivCard);
   //add to each card Delete btn event listener
    ulDivCard.addEventListener('click', onDelete);
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
      //check that password was deleted
      if (localStorage.getItem(id) !== null) {
         console.log('Credential has not been deleted');
         return;
      }
      else if (localStorage.getItem(id) == null){
         console.log(`credential ${id} is deleted`);
      }
   }
      //check if browser supports view transitions
      if(!document.startViewTransition){
         //just remove the card
         parentEl.remove();
         return;
      }
      //set button's parent element as a target
      parentEl.style.viewTransitionName = 'target-card';
		document.startViewTransition(() => {
			parentEl.remove();
      });
   }
