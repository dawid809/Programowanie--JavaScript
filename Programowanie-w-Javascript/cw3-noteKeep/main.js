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
    let addTitle = document.querySelector('#noteTitle').value;
    let addContent = document.querySelector('#noteContent').value;
    let selectColor = document.querySelector('#noteColor').value;


    if(addTitle == '' || addContent == ''){
        return alert('Podaj tytuł i zawartość!');
    }
    console.log(addTitle,addContent);

    
    if (notesFromStorage == null){
        notes = [];
    }else{
        notes=notesFromStorage;
    }

    // obiekt notatki
    let note ={
        title: addTitle,
        content: addContent,
        colour: selectColor,
        pinned: false,
        createDate: new Date() 
    };
    note.title=addTitle;
    note.content=addContent;
    //note.createDate = new Date();

    notes.push(note);
    notes = localStorage.setItem(localStorageKey, JSON.stringify(notes));

    showNotes();
}

function showNotes() {
    
    
    if (notesFromStorage == null){
        notes = [];
    }else{
        notes=notesFromStorage;
    }
    
    let htmlNote='';
    notes.forEach(function (element,index) {
        htmlNote +=`
        <section class="note" style="background-color:${element.colour};">
        <h2>${index+1}. ${element.title}</h2>
        <p>${element.content}</p>
        <h4>Date: ${element.createDate.toLocaleString()}</h4>
        <button id ="${index}" onclick ="deleteNote(this.id)"
        class="deleteNoteBtn">Delete</button>
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

    // odswieza strone gdy notes(tablica) == null
    if(index==0 || notesFromStorage == null)  {
        window.location.reload();}
}

showNotes();