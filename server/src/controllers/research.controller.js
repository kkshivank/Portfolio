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

// Get Research Papers
export const getAllResearchPapers = async (req, res) => {
  try {
    const researchPapers = await ResearchPaper.find().sort({ createdAt: -1 });

    return res

      .status(200)

      .json(researchPapers);
  } catch (error) {
    console.log(
      "Get Research Papers Error:",

      error,
    );

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Add Research Paper

export const addResearchPaper = async (req, res) => {
  try {
    const { title, authors, venue, year, summary, pdfLink, keywords } =
      req.body;

    const researchPaper = await ResearchPaper.create({
      title,
      authors,
      venue,
      year,
      summary,
      pdfLink,
      keywords,
    });

    return res.status(201).json({
      message: "Research paper added successfully",
      researchPaper,
    });
  } catch (error) {
    console.log("Add Research Paper Error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Research Paper

export const deleteResearchPaper = async (req, res) => {
  try {
    const { id } = req.params;

    const researchPaper = await ResearchPaper.findByIdAndDelete(id);

    if (!researchPaper) {
      return res.status(404).json({
        message: "Research paper not found",
      });
    }

    return res.status(200).json({
      message: "Research paper deleted successfully",
    });
  } catch (error) {
    console.log("Delete Research Paper Error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
