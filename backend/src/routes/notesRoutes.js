import express from "express";
import { getAllNotes, createNote, updateNote, deleteNote, getNoteById } from "../controllers/noteController.js";

const router = express.Router();

router.get("/getAllNotes", getAllNotes);

router.get("/getNote/:id", getNoteById);

router.post("/createNote", createNote);

router.put("/updateNote/:id", updateNote);

router.delete("/deleteNote/:id", deleteNote);

export default router;