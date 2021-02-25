const localStorageKey='notes';
let notes=[];

document.querySelector('#addBtn').addEventListener('click', onNewNote);

function onNewNote() {
    const title = document.querySelector('#noteTitle').value;
    const content = document.querySelector('#noteContent').value;
    console.log(title,content);
}

// nowa notatka
const note ={
    title: 'notatka tytuł',
    content: 'zawartość',
    colour: 'black',
    pinned: false,
    createDate: new Date() 
};

// dodawanie notatek
notes.push(note);
notes.push(note);
notes.push(note);

// tablica zapisana w localStorage
localStorage.setItem(localStorageKey, JSON.stringify(notes));

// odczytanie tablicy notatek z localStorage
const notesFromStorage = JSON.parse(localStorage.getItem(localStorageKey));
notes = notesFromStorage.map(note => {
    note.createDate = new Date(note.createDate);
    return note;
});

// zmiana html-a z pozoimu js-a 
for (let note of notes){
    const htmlNote =`
        <section class="note">
        <h2>${note.title}</h2>
        <p>${note.content}</p>
        <h4>${note.createDate.toLocaleString()}</h4>
        </section>
    `;
    const main=document.querySelector('main');
    main.innerHTML += htmlNote;
}

