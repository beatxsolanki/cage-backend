const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ===================================
// GEMINI AI
// ===================================

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// ===================================
// HOME
// ===================================

app.get("/", (req, res) => {
    res.json({
        name: "CAGE AI",
        status: "ONLINE",
        message: "Hello Boss! CAGE Backend is ready."
    });
});

// ===================================
// HEALTH
// ===================================

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        server: "CAGE AI",
        ai: process.env.GEMINI_API_KEY
            ? "Gemini configured"
            : "Gemini key missing"
    });
});

// ===================================
// CHAT
// ===================================

app.post("/chat", async (req, res) => {

    const message = req.body.message;

    if (!message) {
        return res.status(400).json({
            error: "Message is required"
        });
    }

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message
        });

        const reply =
            response.text ||
            "Sorry Boss, mujhe response nahi mila.";

        res.json({
            reply: reply
        });

    } catch (error) {

        console.error(
            "Gemini Error:",
            error
        );

        res.status(500).json({
            error: "Gemini request failed",
            reply: "Sorry Boss, abhi AI se connection nahi ho pa raha."
        });
    }
});

// ===================================
// SERVER
// ===================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `CAGE SERVER RUNNING ON PORT ${PORT}`
    );
});
