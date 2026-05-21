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

// Blog controller

// Get Blogs

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    return res.status(200).json(blogs);
  } catch (error) {
    console.log("Get Blogs Error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Single Blog by ID

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json(blog);
  } catch (error) {
    console.log("Get Single Blog Error:", error);

    // If the ID format is invalid, Mongoose throws a CastError. 
    // We handle it as a 404 rather than a 500 server crash.
    if (error.name === "CastError") {
      return res.status(404).json({
        message: "Blog not found (Invalid ID format)",
      });
    }

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Add Blog

export const addBlog = async (req, res) => {
  try {
    const { title, summary, content, tags, thumbnail } = req.body;

    let imageUrl = "";

    if (thumbnail) {
      const uploadedImage = await cloudinary.uploader.upload(thumbnail, {
        folder: "blog_thumbnails",
      });

      imageUrl = uploadedImage.secure_url;
    }

    const blog = await Blog.create({
      title,
      summary,
      content,
      tags,
      thumbnail: imageUrl,
    });

    return res.status(201).json({
      message: "Blog added successfully",
      blog,
    });
  } catch (error) {
    console.log("Add Blog Error:", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Blog

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log("Delete Blog Error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};





