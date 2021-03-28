const localStorageKey='notes';
let notes=[];

document.querySelector('#addBtn').addEventListener('click', onNewNote);
let addTitle = document.getElementById('noteTitle');
let addContent = document.getElementById('noteContent');
let selectColor = document.querySelector('#noteColor');

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

    if(addTitle.value === '' || addContent.value === ''){
        return alert('Podaj tytuł i zawartość!');
    }

    console.log(addTitle.value,addContent.value);

    let notesFromStorage = localStorage.getItem(localStorageKey);
    
    if (notesFromStorage == null){
        notes = [];
    }else{
        notes= JSON.parse(notesFromStorage);
    }

    // obiekt notatki
    let note ={
        title: addTitle.value,
        content: addContent.value,
        colour: selectColor.value,
        pinned: false,
        createDate: new Date() 
    };

    notes.push(note);

    notes = localStorage.setItem(localStorageKey, JSON.stringify(notes));

    addTitle.value = '';
    addContent.value = '';

    showNotes();
}

function showNotes() {

    let notesFromStorage = localStorage.getItem(localStorageKey);

    if (notesFromStorage == null){
        notes = [];
    }else{
        notes= JSON.parse(notesFromStorage);
    }
    
    let htmlNote='';
    notes.forEach(function (element,index) {
        htmlNote +=`
        <section class="note" style="background-color:${element.colour};">
        <h2>${index+1}. ${element.title}</h2>
        <p>${element.content}</p>
        <h4>Date: ${element.createDate.toLocaleString()}</h4>
        <div class="noteBtnWrapper">
            <button id ="${index}" onclick ="deleteNote(this.id)"
                class="deleteNoteBtn">Delete</button>
            <button id ="${index}" onclick ="editNote(this.id)"
                class="editNoteBtn">Edit</button>
        <div>
        </section>
    `;
        let main=document.querySelector('main');
      
        main.innerHTML = htmlNote;
    });
}

// eslint-disable-next-line no-unused-vars
function editNote(index) {

    let notesFromStorage = localStorage.getItem(localStorageKey);

    if (addTitle.value !== '' || addContent.value !== ''){
        return alert('Proszę wyczyść formularz przed edycją');
    }
     
    if (notesFromStorage == null){
        notes = [];
    }else{
        notes = JSON.parse(notesFromStorage);
    }

    console.log(notes);

    // eslint-disable-next-line no-unused-vars
    notes.findIndex((element, index) => {
        addTitle.value = element.title;
        addContent.value = element.content;
        selectColor.value = element.colour;

    });
    notes.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(notes));
    showNotes();
}

// eslint-disable-next-line no-unused-vars
function  deleteNote(index) {

    notes.splice(index,1);

    localStorage.setItem(localStorageKey, JSON.stringify(notes));

    showNotes();

    // odswieza strone gdy notes(tablica) === null
    if(index === 0 || notesFromStorage === null)  {
        window.location.reload();}
}

showNotes();