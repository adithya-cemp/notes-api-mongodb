const mongoose = require("mongoose");
const Note = require("../models/Note");

const validCategories = ["General", "Work", "Personal", "Ideas"];

const sendError = (res, error) => {
    if (error.name === "ValidationError" || error.name === "CastError") {
        return res.status(400).json({ message: error.message });
    }
    console.error("Notes API error:", error);
    return res.status(500).json({ message: "Internal server error" });
};

// GET /api/notes?category=Work
const getAllNotes = async (req, res) => {
    try {
        const filter = {};
        if (req.query.category !== undefined) {
            if (!validCategories.includes(req.query.category)) {
                return res.status(400).json({
                    message: `Invalid category. Allowed categories: ${validCategories.join(", ")}`
                });
            }
            filter.category = req.query.category;
        }

        const notes = await Note.find(filter);
        return res.status(200).json(notes);
    } catch (error) {
        return sendError(res, error);
    }
};

// GET /api/notes/:id
const getNoteById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid note ID" });
        }
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.status(200).json(note);
    } catch (error) {
        return sendError(res, error);
    }
};

// POST /api/notes
const createNote = async (req, res) => {
    try {
        const { title, content, category } = req.body || {};
        if (typeof title !== "string" || !title.trim() || typeof content !== "string" || !content.trim()) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const note = new Note({ title, content, category });
        await note.save();
        return res.status(201).json(note);
    } catch (error) {
        return sendError(res, error);
    }
};

// PUT /api/notes/:id
const updateNote = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid note ID" });
        }
        const { title, content, category } = req.body || {};
        const updates = {};
        if (title !== undefined) updates.title = title;
        if (content !== undefined) updates.content = content;
        if (category !== undefined) updates.category = category;

        if (updates.title !== undefined && (typeof updates.title !== "string" || !updates.title.trim())) {
            return res.status(400).json({ message: "Title cannot be empty" });
        }
        if (updates.content !== undefined && (typeof updates.content !== "string" || !updates.content.trim())) {
            return res.status(400).json({ message: "Content cannot be empty" });
        }

        const note = await Note.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.status(200).json(note);
    } catch (error) {
        return sendError(res, error);
    }
};

// DELETE /api/notes/:id
const deleteNote = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid note ID" });
        }
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.status(200).json({
            message: "Note deleted successfully",
            note: deletedNote
        });
    } catch (error) {
        return sendError(res, error);
    }
};

module.exports = { getAllNotes, getNoteById, createNote, updateNote, deleteNote };
