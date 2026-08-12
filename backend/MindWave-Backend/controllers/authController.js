import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

// Register
export const register = (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }

    const checkUser = "SELECT * FROM users WHERE email = ?";

    db.query(checkUser, [email], async (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err.message
            });
        }

        if (result.length > 0) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const sql =
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

            db.query(sql, [name, email, hashedPassword], (err) => {
                if (err) {
                    return res.status(500).json({
                        message: "Registration failed",
                        error: err.message
                    });
                }

                res.status(201).json({
                    message: "User registered successfully"
                });
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error.message
            });
        }
    });
};

// Login
export const login = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err.message
            });
        }

        if (result.length === 0) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.json({
            message: "Login Successful",
            token
        });
    });
};

// Profile
export const profile = (req, res) => {
    res.json({
        message: "Profile fetched successfully",
        user: req.user
    });
};