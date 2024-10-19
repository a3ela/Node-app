import { useState, useEffect } from "react";
import "./App.css";
import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import axios from "axios";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const toggleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `the note '${note.content}' was already deleted from the server`
        );
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  // handle change
  const handleChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleError = () => {
    if (errorMessage !== "") {
      return <Notification message={errorMessage} />;
    }
    return null;
  };

  const showNotes = showAll ? notes : notes.filter((note) => note.important);
  return (
    <div>
      <h1>List Of Notes</h1>
      {handleError()}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Important" : "All"}
        </button>
      </div>

      <ul>
        {showNotes.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
