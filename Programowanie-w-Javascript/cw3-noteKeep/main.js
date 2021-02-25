const localStorageKey='notes';
let notes=[];

document.querySelector('#addBtn').addEventListener('click', onNewNote);

// nowa notatka
const note ={
    title: 'notatka tytuł',
    content: 'zawartość',
    colour: 'black',
    pinned: false,
    createDate: new Date() 
};

// dodawanie notatek
function onNewNote() {
    const title = document.querySelector('#noteTitle').value;
    const content = document.querySelector('#noteContent').value;
    console.log(title,content);

    note.content=content;
    note.title=title;

    notes.push(note);

    showNotes();
}

// tablica zapisana w localStorage
localStorage.setItem(localStorageKey, JSON.stringify(notes));

// odczytanie tablicy notatek z localStorage
const notesFromStorage = JSON.parse(localStorage.getItem(localStorageKey));
notes = notesFromStorage.map(note => {
    note.createDate = new Date(note.createDate);
    return note;
});

function showNotes() {
    notes.forEach(function (element,index) {
        const main=document.querySelector('main');
        const htmlNote =`
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
        main.innerHTML += htmlNote;
    });
}

