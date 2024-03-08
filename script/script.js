// Array
let notes = [];
let deletedNotes = [];
load();


function render() {
    document.getElementById('deletedNotesActiv').classList.remove('btn-color');
    document.getElementById('notesActiv').classList.add('btn-color');

    noteInputBox();
    let contentShowNotes = document.getElementById('contentShowNotes');
    contentShowNotes.innerHTML = '';

    if (notes.length > 0) {
        for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        contentShowNotes.innerHTML += addContentNotes(note, i);
        }
    }
    else {
        contentShowNotes.innerHTML = showNoNotes();
    }
}


function noteInputBox() {
    let content = document.getElementById('content');
    content.innerHTML = /*html*/ `
    <div class="noteInput-box">
        <button class="save-button hover" onclick="addNote()">
            <img class="save-icon gray" src="./img/save-icon.svg">
        </button>
        <div class="textarea">
            <textarea class="note-input" placeholder="Notiz schreiben..." id="noteInput"></textarea>
        </div> 
    </div>
    <div class="contentShowNotes" id="contentShowNotes">
    </div>
    `;
}


function addContentNotes(note, i) {
   return /*html*/ `
    <div class="note-section withInput">
        <p class="note">${note}</p>
        <div class="container-trash">
            <img onclick="shiftNotesToTrash(${i})" src="./img/trash-icon.svg" class="trash-icon-content">
        </div>
    </div>
    `
}


function showNoNotes() {
    return /*html*/`
    <img class="main-icon rose" src="./img/logo-icon.svg">
    <p class="p-without" >Hier werden hinzugefügte Notizen angezeigt</p>
    `;
} 


function addNote() {
    let noteInput = document.getElementById('noteInput');
    let updatedNote = noteInput.value.replace(/\n/g, '<br>');
    if (noteInput.value === '') {
        alert('Bitte gebe eine Notiz ein.');
    } else {
        notes.push(updatedNote);

        save();
        render();
        noteInput.value = '';
    }
}



function save() {
    let notesAsText = JSON.stringify(notes);
    let deletedNotesAsText = JSON.stringify(deletedNotes);

    localStorage.setItem('notes', notesAsText);
    localStorage.setItem('deletedNotes', deletedNotesAsText);
}


function load() {
    let notesAsText = localStorage.getItem('notes');
    let notesAsDeletedText = localStorage.getItem('deletedNotes');
    if(notesAsText) {
        notes = JSON.parse(notesAsText);
    }
    if(notesAsDeletedText) {
        deletedNotes = JSON.parse(notesAsDeletedText);
    }
}


function shiftNotesToTrash(noteElement) {
    const removedNote = notes[noteElement];
    deletedNotes.push(removedNote);
    notes.splice(noteElement, 1);
    save();
    render();
}


function deleteNote(i) {
    deletedNotes.splice(i, 1);

    showDeletedNotes();
    save();
}


function refresh() {
    render();
    save();
}


function showNotes() {
    render();
}


function showDeletedNotes() {
    document.getElementById('deletedNotesActiv').classList.add('btn-color');
    document.getElementById('notesActiv').classList.remove('btn-color');

    let deletedContent = document.getElementById('content');
    deletedContent.innerHTML = '';

    if (deletedNotes.length > 0) {
        for (let i = 0; i < deletedNotes.length; i++) {
        const deletedNote = deletedNotes[i];
        content.innerHTML += addDeletedContentNotes(deletedNote, i);
        }
    }
    else {
        content.innerHTML = showNoDeletedNotes();
    }
}

function addDeletedContentNotes(deletedNote, i) {
    return /*html*/ `
    <div class="note-section withInput">
        <p class="note">${deletedNote}</p>
        <div class="container-trash">
            <img onclick="reloadNote(${i})" src="./img/reload-icon.svg" class="reload-icon">
            <img onclick="deleteNote(${i})" src="./img/trash-icon.svg" class="trash-icon-content">
        </div>
    </div>
    `;
}

function showNoDeletedNotes() {
    return /*html*/ `
    <img class="main-icon rose" src="./img/logo-icon.svg">
    <p class="p-without" >Hier werden gelöschte Notizen angezeigt</p>
    `;
}

function reloadNote(noteElement) {
    const reloadNote = deletedNotes[noteElement];
    notes.push(reloadNote);
    deletedNotes.splice(noteElement, 1);
    save();
    showDeletedNotes();
}

