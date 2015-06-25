
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
        // If localStorage is available, enable functionality and display notes.

        var submitButton = document.getElementById("submit");
        submitButton.onclick = createNote;
		loadNotes();
	}


    // Click handler used to remove notes
    var deleteNotesButton = document.getElementById("delete-notes");
	deleteNotesButton.onclick = deleteNotes;

    // Save data to the current local store
    localStorage.setItem("username", "John");

    // Access some stored data
    alert( "username = " + localStorage.getItem("username"));
}
