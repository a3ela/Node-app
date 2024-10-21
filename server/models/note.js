const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connected to ", url);

mongoose
  .connect(url)
  .then((result) => console.log("connected to mongoDB"))
  .catch((error) =>
    console.log("error connecting to mongoDB: ", error.message)
  );

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
