const localStorageKey='notes';
let notes=[];

document.querySelector('#addBtn').addEventListener('click', onNewNote);

// odczytanie tablicy notatek z localStorage
let notesFromStorage = JSON.parse(localStorage.getItem(localStorageKey));

if(notesFromStorage != null){
    notes = notesFromStorage.map(note => {
        note.createDate = new Date(note.createDate);
        return note;
    });
}

// dodawanie notatek
function onNewNote() {
    let title = document.querySelector('#noteTitle').value;
    let content = document.querySelector('#noteContent').value;
    console.log(title,content);

    notes=notesFromStorage;

    // obiekt notatki
    let note ={
        title: 'notatka tytuł',
        content: 'zawartość',
        colour: 'black',
        pinned: false,
        createDate: new Date() 
    };

    note.title=title;
    note.content=content;
    //note.createDate = new Date();

    notes.push(note);
    notes = localStorage.setItem(localStorageKey, JSON.stringify(notes));

    showNotes();
}

function showNotes() {
    
    notes=notesFromStorage;
    
    let htmlNote='';
    notes.forEach(function (element,index) {
        htmlNote +=`
        <section class="note">
        <h2>${element.title}</h2>
        <p>${element.content}</p>
        <h4>${element.createDate.toLocaleString()}</h4>
        <button id ="${index}" onclick ="edit(this.id)"
        class="editNote">Edit</button>
        <button id ="${index}" onclick ="deleteNote(this.id)"
        class="deleteNote">Delete</butto>
        </section>
    `;
        let main=document.querySelector('main');
      
        main.innerHTML = htmlNote;
    });
}

// eslint-disable-next-line no-unused-vars
function  deleteNote(index) {
    
    notes.splice(index,1);
    localStorage.setItem(localStorageKey, JSON.stringify(notes));
    showNotes();
}

showNotes();