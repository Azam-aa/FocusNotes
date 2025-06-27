// Get elements
const noteTitle = document.getElementById('note-title');
const noteContent = document.getElementById('note-content');
const addNoteBtn = document.getElementById('add-note');
const notesContainer = document.getElementById('notes-container');

let editIndex = null;

// Load notes from localStorage on page load
window.onload = () => {
  showNotes();
};

// Save or Update note
addNoteBtn.addEventListener('click', () => {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();

  if (!title || !content) {
    alert('Please enter both title and content!');
    return;
  }

  let notes = JSON.parse(localStorage.getItem('notes')) || [];

  if (editIndex !== null) {
    notes[editIndex] = {
      ...notes[editIndex],
      title,
      content,
      modified: new Date().toLocaleString()
    };
    editIndex = null;
    addNoteBtn.textContent = 'Add Note';
  } else {
    const note = {
      title,
      content,
      created: new Date().toLocaleString()
    };
    notes.push(note);
  }

  localStorage.setItem('notes', JSON.stringify(notes));
  noteTitle.value = '';
  noteContent.value = '';
  showNotes();
});

// Display notes with Edit & Delete buttons
function showNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notesContainer.innerHTML = '';

  if (notes.length === 0) {
    notesContainer.innerHTML = '<p style="text-align:center; color:#888;">No notes yet.</p>';
    return;
  }

  notes.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';
    noteDiv.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <small>🕒 Created: ${note.created}</small><br>
      ${note.modified ? `<small>✏️ Modified: ${note.modified}</small><br>` : ''}
      <button onclick="editNote(${index})">Edit</button>
      <button onclick="deleteNote(${index})">Delete</button>
    `;
    notesContainer.appendChild(noteDiv);
  });
}

// Edit note
function editNote(index) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  noteTitle.value = notes[index].title;
  noteContent.value = notes[index].content;
  editIndex = index;
  addNoteBtn.textContent = 'Update Note';
}

// Delete note
function deleteNote(index) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  if (confirm('Are you sure you want to delete this note?')) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
  }
}
