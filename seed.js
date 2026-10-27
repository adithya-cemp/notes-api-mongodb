require("dotenv").config();
const mongoose = require("mongoose");
const Note = require("./models/Note");

const sampleNotes = [
    {
        title: "Learning Node.js",
        content: "Review Node.js and Express fundamentals.",
        category: "General"
    },
    {
        title: "Finish Notes API",
        content: "Connect the Notes API to MongoDB using Mongoose.",
        category: "Work"
    },
    {
        title: "Weekly shopping",
        content: "Buy notebooks, pens, and groceries.",
        category: "Personal"
    },
    {
        title: "Project idea",
        content: "Build a simple task planner with reminders.",
        category: "Ideas"
    },
    {
        title: "Revise JavaScript",
        content: "Practice promises, async/await, and array methods.",
        category: "General"
    }
];

async function seedDatabase() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing. Add it to your .env file.");
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected for seeding");

        const existingCount = await Note.countDocuments();
        if (existingCount > 0) {
            console.log(`Seed skipped: database already contains ${existingCount} notes.`);
        } else {
            const insertedNotes = await Note.insertMany(sampleNotes);
            console.log(`Seed complete: inserted ${insertedNotes.length} sample notes.`);
        }
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
        console.log("MongoDB connection closed");
    }
}

seedDatabase();
