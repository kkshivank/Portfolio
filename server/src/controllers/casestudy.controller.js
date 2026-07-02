import { CaseStudy } from "../database/index.js";
import cloudinary from "../config/cloudinary.js";

// Case Study controller

// Get All Published Case Studies (Public)
export const getAllCaseStudies = async (req, res) => {
  try {
    const caseStudies = await CaseStudy.find({ isPublished: true }).sort({ createdAt: -1 });
    return res.status(200).json(caseStudies);
  } catch (error) {
    console.log("Get Case Studies Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Get All Case Studies (Admin - Published + Unpublished)
export const getAllCaseStudiesAdmin = async (req, res) => {
  try {
    const caseStudies = await CaseStudy.find().sort({ createdAt: -1 });
    return res.status(200).json(caseStudies);
  } catch (error) {
    console.log("Get All Case Studies Admin Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Add Case Study
export const addCaseStudy = async (req, res) => {
  try {
    const { title, client, industry, category, problem, solution, result, techStack, thumbnail, isPublished } = req.body;

    let imageUrl = "";
    if (thumbnail) {
      const uploadedImage = await cloudinary.uploader.upload(thumbnail, {
        folder: "casestudy_thumbnails",
      });
      imageUrl = uploadedImage.secure_url;
    }

    const techStackArray = Array.isArray(techStack) ? techStack : techStack.split(",").map((t) => t.trim()).filter((t) => t !== "");

    const caseStudy = await CaseStudy.create({
      title,
      client,
      industry,
      category,
      problem,
      solution,
      result,
      techStack: techStackArray,
      thumbnail: imageUrl,
      isPublished: isPublished || false,
    });

    return res.status(201).json({
      message: "Case study added successfully",
      caseStudy,
    });
  } catch (error) {
    console.log("Add Case Study Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Update Case Study
export const updateCaseStudy = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, client, industry, category, problem, solution, result, techStack, thumbnail, isPublished } = req.body;

    const caseStudy = await CaseStudy.findById(id);
    if (!caseStudy) {
      return res.status(404).json({ message: "Case study not found" });
    }

    let imageUrl = caseStudy.thumbnail; // keep existing image by default

    // If a new base64 image is sent, upload it to Cloudinary
    if (thumbnail && thumbnail.startsWith("data:")) {
      const uploadedImage = await cloudinary.uploader.upload(thumbnail, {
        folder: "casestudy_thumbnails",
      });
      imageUrl = uploadedImage.secure_url;
    } else if (thumbnail && thumbnail.startsWith("http")) {
      // Already a Cloudinary URL — no re-upload needed
      imageUrl = thumbnail;
    }

    const techStackArray = Array.isArray(techStack) ? techStack : techStack.split(",").map((t) => t.trim()).filter((t) => t !== "");

    const updatedCaseStudy = await CaseStudy.findByIdAndUpdate(
      id,
      { title, client, industry, category, problem, solution, result, techStack: techStackArray, thumbnail: imageUrl, isPublished },
      { new: true }
    );

    return res.status(200).json({
      message: "Case study updated successfully",
      caseStudy: updatedCaseStudy,
    });
  } catch (error) {
    console.log("Update Case Study Error:", error);
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Case study not found (Invalid ID format)" });
    }
    return res.status(500).json({ message: "Server Error" });
  }
};

// Delete Case Study
export const deleteCaseStudy = async (req, res) => {
  try {
    const { id } = req.params;
    const caseStudy = await CaseStudy.findByIdAndDelete(id);
    if (!caseStudy) {
      return res.status(404).json({ message: "Case study not found" });
    }
    return res.status(200).json({ message: "Case study deleted successfully" });
  } catch (error) {
    console.log("Delete Case Study Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
