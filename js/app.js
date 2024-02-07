
const addBox = document.querySelector('.add-box'),
popupBox = document.querySelector('.popup-box'),
popupTitle = popupBox.querySelector('header p'),
closeIcon = document.querySelector('header i'),
titleEl = document.querySelector('input'),
descEl = document.querySelector('textarea'),
addBtn = document.querySelector('button ');


const months= ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const notes = JSON.parse(localStorage.getItem('notes') || '[]');
let isUpdate = false, updateId;

function showNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((note, index)=>{
        let liEl=`<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onClick="updateNote(${index}, '${note.title}', '${note.description}')"  class="uil uil-edit">✏️</i>
                                <i onClick="deleteNote(${index})" class="uil uil-trash">🗑️</i>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML('afterend', liEl);
    });
}

showNotes();

function deleteNote(noteId) {
    let confirmDelete= confirm("Are you sure you want to delete this note?");
    if(!confirmDelete) return;
    notes.splice(noteId, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleEl.value = title;
    descEl.value = desc;
    addBtn.innerText = 'Save Note';
    popupTitle.innerText = 'Editing a Note';
}

function darkLightMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }


addBox.addEventListener('click', ()=>{
    titleEl.focus();
    popupBox.classList.add('show')
});

closeIcon.addEventListener('click', ()=>{
    isUpdate = false;
    titleEl.value = '';
    descEl.value = '';
    addBtn.innerText = 'Add Note';
    popupTitle.innerText = 'Add a new Note';
    popupBox.classList.remove('show');
});

addBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let noteTitle = titleEl.value,
    noteDesc = descEl.value;
    if (noteTitle || noteDesc) {
        let dateEl= new Date(),
        month = months[dateEl.getMonth()],
        day = dateEl.getDate(),
        year = dateEl.getFullYear();


        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day} ${year}`
        }
        
        if (!isUpdate) {
            notes.push(noteInfo);
        }else{
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        
        localStorage.setItem('notes', JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});

/*function highlightText() {
    // Get the user's selection
    let selection = window.getSelection();

    if (selection.rangeCount > 0) {
      // Get the first range of the selection
      let range = selection.getRangeAt(0);

      // Create a span element with a class for styling
      let span = document.createElement('span');
      span.className = 'highlight';

      // Surround the selected text with the span
      range.surroundContents(span);

      // Clear the selection
      selection.removeAllRanges();
    }

    // Hide the button after highlighting
    document.getElementById('highlightButton').style.display = 'none';
  } 

  document.addEventListener('selectionchange', function() {
    // Check if there is a selection
    let selection = window.getSelection();
    if (selection && selection.toString().trim() !== '') {
      // Display the button if there is a selection
      document.getElementById('highlightButton').style.display = 'inline-block';
    } else {
      // Hide the button if there is no selection
      document.getElementById('highlightButton').style.display = 'none';
    }
  }); */

