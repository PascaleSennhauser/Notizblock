// Arrays
let notes = [];
let deletedNotes = [];


/**
 * This function loads the data in the beginning.
 */
load();


/**
 * This function loads the saved notes and deleted notes as Strings from the local Storage and converts it to a Arrays.
 */
function load() {
    let notesAsText = localStorage.getItem('notes');
    let notesAsDeletedText = localStorage.getItem('deletedNotes');
    if (notesAsText) {
        notes = JSON.parse(notesAsText);
    }
    if (notesAsDeletedText) {
        deletedNotes = JSON.parse(notesAsDeletedText);
    }
}


/**
 * This function renders the input box, as well as the notes or the text, when there are no notes.
 */
function render() {
    setButtonNotes();
    noteInputBox();
    let contentShowNotes = document.getElementById('contentShowNotes');
    contentShowNotes.innerHTML = '';
    if (notes.length > 0) {
        renderNotes(contentShowNotes);
    }
    else {
        contentShowNotes.innerHTML = showNoNotes();
    }
}


/**
 * The notes button gets the background-color.
 */
function setButtonNotes() {
    document.getElementById('deletedNotesActiv').classList.remove('btn-color');
    document.getElementById('notesActiv').classList.add('btn-color');
}


/**
 * This functions shows the input box.
 */
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


/**
 * This function renders the notes.
 * @param {HTMLElement} contentShowNotes - The HTML element, in which the flex-wrap-container with the notes comes.
 */
function renderNotes(contentShowNotes) {
    contentShowNotes.innerHTML = /*html*/`
        <div class="flex-wrap-container" id="flexWrapContainer"></div>
    `;
    for (let i = 0; i < notes.length; i++) {
        const flexWrapContainer = document.getElementById('flexWrapContainer');
        const note = notes[i];
        flexWrapContainer.innerHTML += addContentNotes(note, i);
    }
}


/**
 * This function makes a note.
 * @param {String} note - This is the note from the Array with the current index.
 * @param {Number} i - This is the index of the note.
 * @returns - The HTML element of the note.
 */
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



/**
 * This function gets selected, when there are no notes.
 * @returns - The HTML element, when there are no notes.
 */
function showNoNotes() {
    return /*html*/`
    <img class="main-icon rose" src="./img/logo-icon.svg">
    <p class="p-without" >Hier werden hinzugefügte Notizen angezeigt</p>
    `;
}


/**
 * This functions adds the note to the array and shows it under the input field.
 */
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


/**
 * This function saves the notes in the localStorage.
 */
function save() {
    let notesAsText = JSON.stringify(notes);
    let deletedNotesAsText = JSON.stringify(deletedNotes);

    localStorage.setItem('notes', notesAsText);
    localStorage.setItem('deletedNotes', deletedNotesAsText);
}


/**
 * This function shifts the notes from the array notes to the array deleted notes.
 * @param {Number} noteElement - The index of the element, which gets shifted.
 */
function shiftNotesToTrash(noteElement) {
    const removedNote = notes[noteElement];
    deletedNotes.push(removedNote);
    notes.splice(noteElement, 1);
    save();
    render();
}


/**
 * This function deletes the notes from the trash.
 * @param {Number} i - The index of the element, which gets deleted.
 */
function deleteNote(i) {
    deletedNotes.splice(i, 1);
    showDeletedNotes();
    save();
}


/**
 * This function refreshes the side.
 */
function refresh() {
    render();
    save();
}


/**
 * This function renders the notes, when you click on the notepad-icon.
 */
function showNotes() {
    render();
}


/**
 * This function renders the deleted notes or the text, when there are no deleted notes.
 */
function showDeletedNotes() {
    setButtonDeletedNotes();
    let deletedContent = document.getElementById('content');
    deletedContent.innerHTML = '';
    if (deletedNotes.length > 0) {
        renderDeletedNotes(deletedContent);
    }
    else {
        content.innerHTML = showNoDeletedNotes();
    }
}


/**
 * The trash button gets the background-color.
 */
function setButtonDeletedNotes() {
    document.getElementById('deletedNotesActiv').classList.add('btn-color');
    document.getElementById('notesActiv').classList.remove('btn-color');
}


/**
 * This function renders the deleted notes.
 * @param {HTMLElement} deletedContent - The HTML element, in which the flex-wrap-container with the notes comes.
 */
function renderDeletedNotes(deletedContent) {
    deletedContent.innerHTML = /*html*/`
    <div class="flex-wrap-container" id="flexWrapContainer"></div>
    `;
    for (let i = 0; i < deletedNotes.length; i++) {
        const flexWrapContainer = document.getElementById('flexWrapContainer');
        const deletedNote = deletedNotes[i];
        flexWrapContainer.innerHTML += addDeletedContentNotes(deletedNote, i);
    }
}


/**
 * This function shows the deleted notes.
 * @param {String} deletedNote - The current deleted note.
 * @param {Number} i - This is the index of the deleted note.
 * @returns The html-element of the deleted note.
 */
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


/**
 * This function gets showed, when there are no deleted notes.
 * @returns - The html element gets returned.
 */
function showNoDeletedNotes() {
    return /*html*/ `
    <img class="main-icon rose" src="./img/logo-icon.svg">
    <p class="p-without" >Hier werden gelöschte Notizen angezeigt</p>
    `;
}


/**
 * This function reloads a note from the trash.
 * @param {Number} noteElement - The index of the deleted note, which gets reloaded.
 */
function reloadNote(noteElement) {
    const reloadNote = deletedNotes[noteElement];
    notes.push(reloadNote);
    deletedNotes.splice(noteElement, 1);
    save();
    showDeletedNotes();
}