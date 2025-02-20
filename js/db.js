const application = document.querySelector('#app');

//IndexedDB section - START
const IDB = (function init() {
    let db = null; //database object variable
    let objectStore = null; //stores - objects created inside the database
    //open the database request(if named database does not exist yet - it will create a new one)
    //('database_name', optional_version_number)
    let DBOpenRequest = indexedDB.open('PasswordsDB', 7);

    DBOpenRequest.addEventListener('error', (err) => {
        //error occured while opening DB
        console.warn(err);
    });
    DBOpenRequest.addEventListener('success', (ev) => {
        // DB is opened after upgradeneeded
        db = ev.target.result;
       console.log('success', db);
    });
    DBOpenRequest.addEventListener('upgradeneeded', (ev) => {
        //when open this DB fo the first time
        // OR new version was passed into open() => this code block activates
        //upgradeneeded is the only place where we can create Stores
        db = ev.target.result;
        let oldVersion = ev.oldVersion; //oldVersion is an property of the event we passed
        let newVersion = ev.newVersion || db.version; //ev.newVersion is the same value as db.version;
        console.log('Database upgrated from v', oldVersion, 'to v', newVersion);
        console.log('upgrade', db);
        //if not yet exists
        if (!db.objectStoreNames.contains('passwordsStore')) {   
            //create a new store
            objectStore = db.createObjectStore('passwordsStore', {
                keyPath: 'id' //unique value to each object
            });
        }
        // db.createObjectStore('StoreToDelete');
        // remove Store with the names StoreToDelete
        // if(db.objectStoreNames.contains('StoreToDelete')) {
            // db.deleteObjectStore('StoreToDelete');
        // }

    });

    application.addEventListener('submit', (ev) => {
        ev.preventDefault();
        //one of the buttons was clicked on
    });
})();

//IndexedDB section - END
