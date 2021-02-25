const localStorageKey='notes';
let notes=[];

document.querySelector('#addBtn').addEventListener('click', onNewNote);

// odczytanie tablicy notatek z localStorage
let notesFromStorage = JSON.parse(localStorage.getItem(localStorageKey));
notes = notesFromStorage.map(note => {
    note.createDate = new Date(note.createDate);
    return note;
});

// dodawanie notatek
function onNewNote() {
    let title = document.querySelector('#noteTitle').value;
    let content = document.querySelector('#noteContent').value;
    console.log(title,content);

    if (notesFromStorage == null){
        notes = [];
    }else{
        notes=notesFromStorage;
    }

    // nowa notatka
    let note ={
        title: 'notatka tytuł',
        content: 'zawartość',
        colour: 'black',
        pinned: false,
        createDate: new Date() 
    };

    note.title=title;
    note.content=content;
    note.createDate = new Date();

    notes.push(note);
    notes = localStorage.setItem(localStorageKey, JSON.stringify(notes));

    title.value='';
    content.value='';

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
        <section class="note">
        <h2>${element.title}</h2>
        <p>${element.content}</p>
        <h4>${element.createDate.toLocaleString()}</h4>
        <button id ="${index}" onclick ="edit(this.id)"
        class="editNote">Edit</button>
        <button id ="${index}" onclick ="delete(this.id)"
        class="deleteNote">Delete</butto>
        </section>
    `;
        let main=document.querySelector('main');
        if(notes.length!=0)
            main.innerHTML = htmlNote;
        else   main.innerHTML='biasdda';
    });
}

showNotes();