const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const Note = require("./models/note");
const app = express();

// mideleware
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

// the following code is for the frontend tester
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// getting all notes
app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

// getting a single note
app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  Note.findById(id).then((note) => {
    res.json(note);
  });
});

// delete a single note
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

// create a new note
app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    createAt: new Date(),
  });

  note.save().then((savedNote) => {
    res.json(savedNote);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
