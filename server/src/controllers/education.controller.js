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

// Education controller

// Get Education

export const getAllEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({
      createdAt: -1,
    });

    return res.status(200).json(education);
  } catch (error) {
    console.log("Get Education Error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Add Education

export const addEducation = async (req, res) => {
  try {
    const { degree, institution, period, description } = req.body;

    const education = await Education.create({
      degree,
      institution,
      period,
      description,
    });

    return res.status(201).json({
      message: "Education added successfully",
      education,
    });
  } catch (error) {
    console.log("Add Education Error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

//Delete Education

export const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const education = await Education.findByIdAndDelete(id);

    if (!education) {
      return res.status(404).json({
        message: "Education not found",
      });
    }

    return res.status(200).json({
      message: "Education deleted successfully",
    });
  } catch (error) {
    console.log("Delete Education Error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
