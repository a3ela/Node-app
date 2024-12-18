const mongoose = require("mongoose");
const path = require("path");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://abelsintayehu:${password}@cluster0.kxtsypb.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model("Note", noteSchema);

// const note = new Note({
//   content: "Browser can execute only JavaScript",
//   important: false,
// });

// note.save().then((result) => {
//   console.log("note saved");
//   mongoose.connection.close();
// });

Note.find({}).then((result) => {
  console.log(result);
});
