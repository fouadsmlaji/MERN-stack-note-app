import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // sort by createdAt in descending order
    if (!notes) {
      return res.status(404).json({ success: false, message: "No notes found" });
    }
    res.status(200).json({ success: true, data: notes, message: "Notes fetched successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    res.status(200).json({ success: true, data: note, message: "Note fetched successfully" });
  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body; 
    const note = await Note.create({ title, content });
    await note.save();
    res.status(201).json({ success: true, data: note, message: "Note created successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};