import express from "express";
import {
    addMood,
    getMoods,
    updateMood,
    deleteMood
} from "../controllers/moodController.js";

import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, addMood);
router.get("/", verifyToken, getMoods);
router.put("/:id", verifyToken, updateMood);
router.delete("/:id", verifyToken, deleteMood);

export default router;