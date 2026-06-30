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

// Experience controller

// Get Experiences
export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    return res.status(200).json(experiences);
  } catch (error) {
    console.log("Get Experiences Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Add Experience
export const addExperience = async (req, res) => {
  try {
    const { role, company, period, description } = req.body;
    const experience = await Experience.create({ role, company, period, description });
    return res.status(201).json({
      message: "Experience added successfully",
      experience,
    });
  } catch (error) {
    console.log("Add Experience Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Update Experience
export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, company, period, description } = req.body;

    const experience = await Experience.findByIdAndUpdate(
      id,
      { role, company, period, description },
      { new: true }
    );

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    return res.status(200).json({
      message: "Experience updated successfully",
      experience,
    });
  } catch (error) {
    console.log("Update Experience Error:", error);
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Experience not found (Invalid ID format)" });
    }
    return res.status(500).json({ message: "Server Error" });
  }
};

// Delete Experience
export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findByIdAndDelete(id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    return res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.log("Delete Experience Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};