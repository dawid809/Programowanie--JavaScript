const localStorageKey='notes';
let notes=[];

document.querySelector('#addBtn').addEventListener('click', onNewNote);
let addTitle = document.getElementById('noteTitle');
let addContent = document.getElementById('noteContent');
let selectColor = document.querySelector('#noteColor');

// dodawanie notatek
function onNewNote() {

    if(addTitle.value === '' || addContent.value === ''){
        return alert('Podaj tytuł i zawartość!');
    }
    console.log(addTitle.value,addContent.value);

    CheckLocalStorage();

    // obiekt notatki
    let  note ={
        title: addTitle.value,
        content: addContent.value,
        colour: selectColor.value,
        pinned: false,
        createDate: new Date().toLocaleString(),
    };
    notes.push(note);

    notes = localStorage.setItem(localStorageKey, JSON.stringify(notes));
   
    addTitle.value = '';
    addContent.value = '';

    showNotes();
}

function showNotes() {

    CheckLocalStorage();

    // sortowanie według pinned a następnie daty
    notes.sort(sortByDate);
    notes.sort(sortByIsPinned);

    let htmlNote='';
    notes.forEach(function (element,index) {
        htmlNote +=`
        <section class="note" style="background-color:${element.colour};">
            <div class="pinWrapper">
                <button id ="${index}" onclick ="onPinned(this.id,${element.pinned})"
                 class="pinNoteBtn" style="background-color:${element.colour};">
                    <img id ="src${index}" src="images/pin.png"  />
                </button>
            </div>
            <h2>${index+1}. ${element.title}</h2>
            <p>${element.content}</p>
            <h4>Date: ${element.createDate.toLocaleString()}</h4>
        <div class="noteBtnWrapper">
            <button id ="${index}" onclick ="deleteNote(this.id)"
                class="deleteNoteBtn">Delete</button>
            <button id ="${index}" onclick ="editNote(this.id)"
                class="editNoteBtn">Edit</button>
        </div>
        </section>
    `;
        let main=document.querySelector('main');
      
        main.innerHTML = htmlNote;
    });
    console.log('sordted',notes);
}

// eslint-disable-next-line no-unused-vars
function editNote(index) {

    CheckLocalStorage();

    if (addTitle.value !== '' || addContent.value !== ''){
        return alert('Proszę wyczyść formularz przed edycją');
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
    if (index == 0 || notes === null) {
        window.location.reload();}
}

function CheckLocalStorage() {
    let notesFromStorage = localStorage.getItem(localStorageKey);

    if (notesFromStorage == null){
        notes = [];
    }else{
        notes = JSON.parse(notesFromStorage);
    }
}

// malejąco
function sortByDate (a,b) {
    if(a.createDate > b.createDate)
        return -1;
    else if (a.createDate < b.createDate)
        return 1;
    else
        return 0;
}

// po true
function sortByIsPinned (a,b) {
    if(a.pinned > b.pinned)
        return -1;
    else if (a.pinned < b.pinned)
        return 1;
    else
        return 0;
}

// eslint-disable-next-line no-unused-vars
function onPinned(index, pinValue) {
    CheckLocalStorage();
    console.log('clicked', index);
 
    let  p = document.getElementById(`src${index}`).classList.toggle('pinToggle');
    console.log('toggle',p);
    

    //showNotes();
}
showNotes();