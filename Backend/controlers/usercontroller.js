import User from "../models/usermodel.js";
import passport from "passport";
export const register = async (req, res) => {
    try {
        const { email, password,securityQuestion} = req.body;

        if (!email || !password|| !securityQuestion) {
            return res.status(400).json({ message: "Email and password or Security question are required" });
        }
        const existingUser = await User.findOne({ username: email });
        if (existingUser) {
            return res.status(409).json({ message: "User already registered" });
        }
        const newUser = new User({ username: email, email: email, Squestion: securityQuestion });

        await User.register(newUser, password);

        console.log("User registered successfully");
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ message: err.message });
    }
};


export const login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return res.status(500).json({ message: "Server error", error: err.message });
        if (!user) return res.status(401).json({ message: info?.message || "Invalid credentials" });

        req.login(user, (err) => {
            if (err) return res.status(500).json({ message: "Login failed", error: err.message });
            res.status(200).json({ message: "Login successful", user });
        });
    })(req, res, next);
};

export const authcheck = (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ message: "User is authenticated", user: req.user });
    } else {
        res.status(401).json({ message: "User is not authenticated" });
    }
};
export const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
           console.log(err) // Handle any errors
        }
        res.status(200).json({ message: "User logged out successfully" });
    });
};

export const changepassword = async (req, res) => {
    try {
        const { email, password, securityQuestion } = req.body;

        if (!email || !password || !securityQuestion) {
            return res.status(400).json({ message: "Email, password, and security question are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.Squestion !== securityQuestion) {
            return res.status(403).json({ message: "Security question is incorrect" });
        }

        // Use passport-local-mongoose method to update the password
        user.setPassword(password, async (err) => {
            if (err) {
                return res.status(500).json({ message: "Error setting password" });
            }
            await user.save();
            res.status(200).json({ message: "Password changed successfully" });
        });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
