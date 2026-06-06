import express from "express";
const router = express.Router();
import verifyToken from "../middleware/verifyToken.js";

import {adminLogin,
  changePassword,
  logout,
  addAdmin} from "../controllers/auth.controller.js";
  
import {
  getProfile,
  editProfile,
} from "../controllers/profile.controller.js";

import { 
  getAllSkills,
  addSkill,
  deleteSkill, } from "../controllers/skill.controller.js";

import {
  getAllProjects,
  addProject,
  deleteProject} from "../controllers/project.controller.js"; 

import {
    getAllExperiences,
    addExperience,
    deleteExperience,} from "../controllers/experience.controller.js";

import {
  getAllEducation,
  addEducation,
  deleteEducation,} from "../controllers/education.controller.js";

import {
  getAllBlogs,
  addBlog,
  deleteBlog,
getBlogById} from "../controllers/blog.controller.js";

import {
  getAllResearchPapers,
  addResearchPaper,
  deleteResearchPaper,} from "../controllers/research.controller.js";

import {
  getAllMessages,
  addMessage,} from "../controllers/message.controller.js";
 


/* =========================
   Auth Routes
========================= */

// Admin Login
router.post("/admin/login", adminLogin);

// Add Admin
router.post("/admin", addAdmin);

// Change Password
router.put(
  "/admin/change-password",
  verifyToken,
  changePassword
);

// Logout
router.post(
  "/admin/logout",
  verifyToken,
  logout
);

/* =========================
   Profile Routes
========================= */

// Get Profile
router.get("/profile", getProfile);

// Edit Profile
router.put(
  "/profile",
  verifyToken,
  editProfile
);

/* =========================
   Skill Routes
========================= */

// Get All Skills
router.get("/skills", getAllSkills);

// Add Skill
router.post(
  "/skills",
  verifyToken,
  addSkill
);

// Delete Skill
router.delete(
  "/skills/:id",
  verifyToken,
  deleteSkill
);

/* =========================
   Project Routes
========================= */

// Get All Projects
router.get("/projects", getAllProjects);

// Add Project
router.post(
  "/projects",
  verifyToken,
  addProject
);

// Delete Project
router.delete(
  "/projects/:id",
  verifyToken,
  deleteProject
);

/* =========================
   Experience Routes
========================= */

// Get All Experiences
router.get(
  "/experiences",
  getAllExperiences
);

// Add Experience
router.post(
  "/experiences",
  verifyToken,
  addExperience
);

// Delete Experience
router.delete(
  "/experiences/:id",
  verifyToken,
  deleteExperience
);

/* =========================
   Education Routes
========================= */

// Get All Education
router.get(
  "/education",
  getAllEducation
);

// Add Education
router.post(
  "/education",
  verifyToken,
  addEducation
);

// Delete Education
router.delete(
  "/education/:id",
  verifyToken,
  deleteEducation
);

/* =========================
   Blog Routes
========================= */

// Get All Blogs
router.get("/blogs", getAllBlogs);

// Get Single Blog by ID
router.get("/blogs/:id", getBlogById);

// Add Blog
router.post(
  "/blogs",
  verifyToken,
  addBlog
);

// Delete Blog
router.delete(
  "/blogs/:id",
  verifyToken,
  deleteBlog
);

/* =========================
   Research Paper Routes
========================= */

// Get All Research Papers
router.get(
  "/research-papers",
  getAllResearchPapers
);

// Add Research Paper
router.post(
  "/research-papers",
  verifyToken,
  addResearchPaper
);

// Delete Research Paper
router.delete(
  "/research-papers/:id",
  verifyToken,
  deleteResearchPaper
);

/* =========================
   Message Routes
========================= */

// Get All Messages
router.get(
  "/messages",
  verifyToken,
  getAllMessages
);

// Add Message
router.post(
  "/messages",
  addMessage
);

export default router;