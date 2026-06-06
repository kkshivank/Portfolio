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

// Message controller

// Get Messages

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({
      createdAt: -1,
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Get Messages Error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Add Message

export const addMessage = async (req, res) => {
  try {
    const { senderName, senderEmail, subject, content } = req.body;

    const message = await Message.create({
      senderName,
      senderEmail,
      subject,
      content,
    });

    return res.status(201).json({
      message: "Message sent successfully",
      messageData: message,
    });
  } catch (error) {
    console.log("Add Message Error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
