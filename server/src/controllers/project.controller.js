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
import cloudinary from "../config/cloudinary.js";

// Project controller

// Get Projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return res.status(200).json(projects);
  } catch (error) {
    console.log("Get Projects Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Add Project
export const addProject = async (req, res) => {
  try {
    const { title, summary, tech, liveLink, githubLink, image } = req.body;

    let imageUrl = "";
    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: "project_images",
      });
      imageUrl = uploadedImage.secure_url;
    }

    const project = await Project.create({
      title,
      summary,
      tech,
      liveLink,
      githubLink,
      image: imageUrl,
    });

    return res.status(201).json({
      message: "Project added successfully",
      project,
    });
  } catch (error) {
    console.log("Add Project Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Update Project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, tech, liveLink, githubLink, image } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    let imageUrl = project.image; // keep existing image by default

    if (image && image.startsWith("data:")) {
      const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: "project_images",
      });
      imageUrl = uploadedImage.secure_url;
    } else if (image && image.startsWith("http")) {
      imageUrl = image;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, summary, tech, liveLink, githubLink, image: imageUrl },
      { new: true }
    );

    return res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.log("Update Project Error:", error);
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Project not found (Invalid ID format)" });
    }
    return res.status(500).json({ message: "Server Error" });
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log("Delete Project Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};