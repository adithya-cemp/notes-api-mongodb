const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        trim: true
    },
    category: {
        type: String,
        enum: {
            values: ["General", "Work", "Personal", "Ideas"],
            message: "Category must be General, Work, Personal, or Ideas"
        },
        default: "General"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Note", noteSchema);
