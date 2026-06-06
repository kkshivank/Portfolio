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


// Skill controller

// Get Skills
export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();

    return res.status(200).json(skills);
  } catch (error) {
    console.log("Get Skills Error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Add Skill
export const addSkill = async (req, res) => {
  try {
    const { category, name } = req.body;

    const skill = await Skill.create({
      category,
      name,
    });

    return res.status(201).json({
      message: "Skill added successfully",
      skill,
    });
  } catch (error) {
    console.log("Add Skill Error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Skill
export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    return res.status(200).json({
      message: "Skill deleted successfully",
    });
  } catch (error) {
    console.log("Delete Skill Error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
