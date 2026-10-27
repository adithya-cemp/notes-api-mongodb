require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
app.use(express.json());
app.use("/api/notes", noteRoutes);

// Handle invalid JSON request bodies.
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ message: "Invalid JSON request body" });
    }
    return next(err);
});

// Fallback for unexpected errors not handled by a controller.
app.use((err, req, res, next) => {
    console.error("Unexpected server error:", err);
    res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("MONGODB_URI is missing. Add it to your .env file.");
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    });
