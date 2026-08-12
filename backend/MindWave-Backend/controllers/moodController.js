import db from "../config/db.js";

// Add Mood
export const addMood = (req, res) => {
    const { mood, note } = req.body;
    const userId = req.user.id;

    if (!mood) {
        return res.status(400).json({
            message: "Mood is required"
        });
    }

    db.query(
        "INSERT INTO moods (user_id, mood, note) VALUES (?, ?, ?)",
        [userId, mood, note],
        (err) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Mood added successfully"
            });
        }
    );
};

// Get All Moods
export const getMoods = (req, res) => {
    const userId = req.user.id;

    db.query(
        "SELECT * FROM moods WHERE user_id = ? ORDER BY created_at DESC",
        [userId],
        (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );
};

// Update Mood
export const updateMood = (req, res) => {
    const { mood, note } = req.body;
    const { id } = req.params;
    const userId = req.user.id;

    db.query(
        "UPDATE moods SET mood = ?, note = ? WHERE id = ? AND user_id = ?",
        [mood, note, id, userId],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Mood not found"
                });
            }

            res.json({
                message: "Mood updated successfully"
            });
        }
    );
};

// Delete Mood
export const deleteMood = (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    db.query(
        "DELETE FROM moods WHERE id = ? AND user_id = ?",
        [id, userId],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Mood not found"
                });
            }

            res.json({
                message: "Mood deleted successfully"
            });
        }
    );
};