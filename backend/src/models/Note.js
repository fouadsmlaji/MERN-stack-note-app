import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true // this will automatically add createdAt and updatedAt fields to the schema
});

const Note = mongoose.model("Note", noteSchema);

export default Note;