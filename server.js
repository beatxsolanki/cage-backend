
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        name: "CAGE AI",
        status: "ONLINE",
        message: "Hello Boss! CAGE Backend is ready."
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        server: "CAGE AI"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`CAGE SERVER RUNNING ON PORT ${PORT}`);
});

