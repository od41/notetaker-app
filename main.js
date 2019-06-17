// global variables of the title and body
var noteTitles = new Array();
var noteBody = new Array();
var noteIndex = new Array();

// global variable of the note currently being edited
var currentEditIndex;


// add a note
document.getElementById("add-note").addEventListener("click", function() {
    // hide empty-state div
    document.getElementById("empty-state").classList.add("hidden"); // add the hidden class to empty state div
    
    clearInputs();
   
    openEditor();

    showEditorControls();

})


// save a note
document.getElementById("save").addEventListener("click", saveNote);

// close editor
document.getElementById("close").addEventListener("click", closeEditor);

function deleteNote() {
    // get id of current note
    var index = event.currentTarget.parentNode.id;

    // remove in note grid
    var target = document.getElementById(index);
    target.remove();

    // prevent the note editor from opening
    if (event.button == 2) event.stopPropagation();
    
}

function deleteNoteEditor() {
    // remove in editor
    clearInputs();

    // remove in note grid
    var index = currentEditIndex;

    // remove in note grid
    var target = document.getElementById(index);
    target.remove();
}


// edit function
function edit() {
    // open editor screen
    openEditor();

    // get id of current note
    var index = event.currentTarget.id;

    // show the existing title for the referenced id
    var oldTitle = noteTitles[index];
    document.getElementById("title").value = oldTitle;
    // console.log("index in edit: " + index);

    // show the existing body for the referenced id
    var oldBody = noteBody[index];
    document.getElementById("body").value = oldBody;

    // set the current note to be edited
    currentEditIndex = parseInt(index, 10);
    // console.log("from edit(): " + currentEditIndex);
    
    // display editor controls
    showEditorControls();

}

// getElementById('demo').innerHTML=Date()

function showEditorControls() {
    document.getElementById("add-note").classList.add("hidden"); // add the hidden class to save button
    document.getElementById("close").classList.remove("hidden"); // remove the hidden class from save button
    document.getElementById("save").classList.remove("hidden"); // remove the hidden class from save button
    document.getElementById("delete").classList.remove("hidden"); // remove the hidden class from save button
}

function openEditor() {
    document.getElementById("notes").classList.add("hidden"); // add the hidden class to #notes
    document.getElementById("note-editor").classList.remove("hidden"); // remove the hidden class from #editor
}

function clearInputs() {
    //clear title
    document.getElementById("title").value = "";

    //clear body
    document.getElementById("body").value = "";

}

function closeEditor() {
    // closes the editor

    clearInputs();

    document.getElementById("note-editor").classList.add("hidden"); // add the hidden class to #note-editor
    document.getElementById("notes").classList.remove("hidden"); // remove the hidden class from #notes

    document.getElementById("close").classList.add("hidden"); // add the hidden class to close button
    document.getElementById("add-note").classList.remove("hidden"); // remove the hidden class from add-note button

    document.getElementById("save").classList.add("hidden"); // add the hidden class to save button
    document.getElementById("delete").classList.add("hidden"); // add the hidden class to delte button

    // set the currentEditIndex to null when you close
    currentEditIndex = null;

    // check if there are notes and reveal empty-state
    if (noteIndex.length == 0) {
        // hide empty-state div
        document.getElementById("empty-state").classList.remove("hidden"); // add the hidden class to empty state div
    }

}

function saveNote() {

    var index; // an index that identifies each individual note
    // console.log("currentEditIndex: " + currentEditIndex);


    // check if the note exists already
    if ( currentEditIndex != null && noteIndex.includes(currentEditIndex) ) { 
    // if it exists, update it in the noteTitles and noteBody arrays

        index = currentEditIndex;
        // console.log("currentEditIndex: " + currentEditIndex);
        
        // update the title at the currently edited note index
        noteTitles[index] = document.getElementById("title").value;

        // update the title at the currently edited note index
        noteBody[index] = document.getElementById("body").value;

        alert("Note saved.");
        // console.log("notetitles: " + noteTitles[index]);
        // console.log("notebody: " + noteBody[index]);
    
        // get the currently edited note div with id of the index
        var noteDiv = document.getElementById(index);

        // insert noteTitles[index] into title
        noteDiv.querySelector(".title").textContent = noteTitles[index];

        // insert noteBody[index] into body class
        noteDiv.querySelector(".preview").textContent = noteBody[index];

    } else {
    // else, create a new note and save it

        if (noteIndex.length == 0) {
            // on the first note save, no notes exists, so noteIndex should have a zero size
            index = 0;
            noteIndex[index] = index;
        } else {
            index = noteIndex.length;
            noteIndex[index] = index;
        }
        noteTitles[index] = document.getElementById("title").value;
        noteBody[index] = document.getElementById("body").value;
        alert("Note saved.");
        // console.log("notetitles: " + noteTitles[index]);
        // console.log("notebody: " + noteBody[index]);
    
    
        var noteDiv = document.getElementById("notes");
    
        // refactor the statement below to use javascript methods
        var newNoteContent = "<h3 class='title'>" + noteTitles[index] + "</h3><p class='preview'>" + noteBody[index] + "</p><button class='minimal delete' onmousedown='deleteNote()'>Delete</button>";
    
        var newNote = document.createElement("div");
        newNote.className = "note";
        newNote.id = index; // assign the div id to it's index
        newNote.setAttribute("onclick", "edit()"); // set the attribute of the note div to an edit function
    
        newNote.innerHTML = newNoteContent;
    
        var ref = document.querySelector('.note');
    
        noteDiv.insertBefore(newNote, ref);
    }


}