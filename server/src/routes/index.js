import express from "express";
const router = express.Router();
import verifyToken from "../middleware/verifyToken.js";

import { adminLogin, changePassword, logout, addAdmin } from "../controllers/auth.controller.js";
import { getProfile, editProfile } from "../controllers/profile.controller.js";
import { getAllSkills, addSkill, updateSkill, deleteSkill } from "../controllers/skill.controller.js";
import { getAllProjects, addProject, updateProject, deleteProject } from "../controllers/project.controller.js";
import { getAllExperiences, addExperience, updateExperience, deleteExperience } from "../controllers/experience.controller.js";
import { getAllEducation, addEducation, updateEducation, deleteEducation } from "../controllers/education.controller.js";
import { getAllBlogs, addBlog, updateBlog, deleteBlog, getBlogById } from "../controllers/blog.controller.js";
import { getAllResearchPapers, addResearchPaper, updateResearchPaper, deleteResearchPaper } from "../controllers/research.controller.js";
import { getAllCaseStudies, getAllCaseStudiesAdmin, addCaseStudy, updateCaseStudy, deleteCaseStudy } from "../controllers/casestudy.controller.js";
import { getAllMessages, addMessage } from "../controllers/message.controller.js";

/* =========================
   Auth Routes
========================= */
router.post("/admin/login", adminLogin);
router.post("/admin", addAdmin);
router.put("/admin/change-password", verifyToken, changePassword);
router.post("/admin/logout", verifyToken, logout);

/* =========================
   Profile Routes
========================= */
router.get("/profile", getProfile);
router.put("/profile", verifyToken, editProfile);

/* =========================
   Skill Routes
========================= */
router.get("/skills", getAllSkills);
router.post("/skills", verifyToken, addSkill);
router.put("/skills/:id", verifyToken, updateSkill);
router.delete("/skills/:id", verifyToken, deleteSkill);

/* =========================
   Project Routes
========================= */
router.get("/projects", getAllProjects);
router.post("/projects", verifyToken, addProject);
router.put("/projects/:id", verifyToken, updateProject);
router.delete("/projects/:id", verifyToken, deleteProject);

/* =========================
   Experience Routes
========================= */
router.get("/experiences", getAllExperiences);
router.post("/experiences", verifyToken, addExperience);
router.put("/experiences/:id", verifyToken, updateExperience);
router.delete("/experiences/:id", verifyToken, deleteExperience);

/* =========================
   Education Routes
========================= */
router.get("/education", getAllEducation);
router.post("/education", verifyToken, addEducation);
router.put("/education/:id", verifyToken, updateEducation);
router.delete("/education/:id", verifyToken, deleteEducation);

/* =========================
   Blog Routes
========================= */
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.post("/blogs", verifyToken, addBlog);
router.put("/blogs/:id", verifyToken, updateBlog);
router.delete("/blogs/:id", verifyToken, deleteBlog);

/* =========================
   Case Study Routes
========================= */
router.get("/casestudies", getAllCaseStudies);
router.get("/casestudies/admin", verifyToken, getAllCaseStudiesAdmin);
router.post("/casestudies", verifyToken, addCaseStudy);
router.put("/casestudies/:id", verifyToken, updateCaseStudy);
router.delete("/casestudies/:id", verifyToken, deleteCaseStudy);

/* =========================
   Research Paper Routes
========================= */
router.get("/research-papers", getAllResearchPapers);
router.post("/research-papers", verifyToken, addResearchPaper);
router.put("/research-papers/:id", verifyToken, updateResearchPaper);
router.delete("/research-papers/:id", verifyToken, deleteResearchPaper);

/* =========================
   Message Routes
========================= */
router.get("/messages", verifyToken, getAllMessages);
router.post("/messages", addMessage);

export default router;