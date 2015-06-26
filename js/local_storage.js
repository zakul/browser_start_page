
// Create empty notes array
var links = [];

// Key to store and retrieve from local storage
var key = "linklist";

window.onload = function() {

    // Check for localStorage capabilities
    if (!window.localStorage) {
        // If localStorage is unavailable, warn user.
		alert("You are using a web browser that is too old for this program. Please upgrade your web browser if you wish to get the full experience.");
	} else {
        // If localStorage is available, enable functionality and display lins.
        var submitButton = document.getElementById("submit");
        submitButton.onclick = createLink;
		loadLinks();
	}

    // Click handler used to remove links
    var deleteNotesButton = document.getElementById("delete-notes");
	deleteNotesButton.onclick = deleteNotes;
}

function createLink() {
    // Get content of note
    var noteText = document.getElementById("note");
	text = noteText.value;

    // Ensure that note text is not empty
    if (text == null || text == "" || text.length == 0) {
		alert("Please enter a note!");
		return;
	}

    // Determine color selected
    var colorSelect = document.getElementById("color");
    var index = colorSelect.selectedIndex;
    var color = colorSelect[index].value;

    // Set note properties
    var note = {};
	note.text = text;
	note.color = color;
	notes.push(note);

    // Store our notes
	storeNotes();

    // Display note on page
	addNoteToPage(note);
}

function addNoteToPage(note) {
    // Determine where to place notes on page
    var notesUl = document.getElementById("notes");
	var li = document.createElement("li");

    // Add class name and attributes to notes
    li.className = "note";
    li.setAttribute('draggable', 'true'); // Enable columns to be draggable.

    // Add event listeners for dragging/dropping notes
    li.addEventListener('dragstart', this.handleDragStart, false);
    li.addEventListener('dragenter', this.handleDragEnter, false);
    li.addEventListener('dragover', this.handleDragOver, false);
    li.addEventListener('dragleave', this.handleDragLeave, false);
    li.addEventListener('drop', this.handleDrop, false);
    li.addEventListener('dragend', this.handleDragEnd, false);

    // Display the note text with appropriate background color
	li.innerHTML = note.text;
	li.style.backgroundColor = note.color;

	if (notesUl.childElementCount > 0) {
		notesUl.insertBefore(li, notesUl.firstChild);
	} else {
		notesUl.appendChild(li);
	}
}

function storeNotes() {
    // Convert array of notes to string
    var jsonNotes = JSON.stringify(notes);

    // Store the note
	localStorage.setItem(key, jsonNotes);
}

function loadLinks() {
    // Get our notes
    var jsonNotes = localStorage.getItem(key);

	if (jsonNotes != null) {
		notes = JSON.parse(jsonNotes);

		for (var i = 0; i < notes.length; i++) {
			addNoteToPage(notes[i]);
		}
	}
}

function deleteNotes() {
    // Remove all notes from local storage
    window.onbeforeunload = function() {
        localStorage.removeItem(key);
        return 'Are you sure you want to delete all of your notes?';
    };
}
