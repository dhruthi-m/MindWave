import express from "express";
import { chatWithAI } from "../controllers/aiController.js";

const router = express.Router();

router.post("/chat", (req, res, next) => {
    console.log("AI route reached");
    next();
}, chatWithAI);

export default router;