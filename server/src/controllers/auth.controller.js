import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  Admin,
  Profile,
  Skill,
  Project,
  Experience,
  Blog,
  Education,
  ResearchPaper,
  Message,
} from "../database/index.js";

const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_key";

// Add Admin

export const addAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check existing admin
    const existingAdmin = await Admin.findOne({});

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Admin created successfully",
      admin,
    });
  } catch (error) {
    console.log("Add Admin Error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Admin Login

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: admin._id }, jwtSecret, {
      expiresIn: "15d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Change Password

export const changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;

    const admin = await Admin.findOne();

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;

    await admin.save();

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log("Change Password Error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Logout

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Logout Error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
