// Motheo Morena u24666981

import express from "express";
import cors from "cors";

import upload from "./multer.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Allow uploaded images to be accessed
app.use("/uploads", express.static("uploads"));

/*
===================== AUTHENTICATION ENDPOINTS =====================
*/

    // Login endpoint
    app.post("/api/auth/login", (req, res) => {
        const { username, email, password } = req.body;

        console.log("Login:", {
            username,
            email,
            password,
        });

        res.json({
            success: true,
            message: "Login successful",
            user: {
                username: username,
                email: email,
            },
        });
    });

    // Signup endpoint
    app.post("/api/auth/signup", (req, res) => {
        const {
            username,
            email,
            password,
        } = req.body;

        console.log("Signup:", {
            username,
            email,
            password,
        });

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: {
                username: username,
                email: email,
            },
        });
    });

/*
===================== IMAGE UPLOAD ENDPOINT =====================
*/

    // Image upload endpoint
    app.post("/api/upload", upload.single("image"), (req, res) => {
        const { username, caption } = req.body;

        console.log("New Post:", {
            username: username,
            caption: caption,
            image: req.file ? req.file.filename : null,
        });

        res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            post: {
                username: username,
                caption: caption,
                image: req.file ? req.file.filename : null,
            },
        });
    });

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});