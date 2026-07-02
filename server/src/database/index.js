import mongoose from "mongoose";

/* =========================
   Admin Schema
========================= */

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Admin = mongoose.model("Admin", adminSchema);

/* =========================
   Profile Schema
========================= */

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    resumeLink: String,

    githubLink: String,

    linkedinLink: String,

    profilePicture: String,
  },
  {
    timestamps: true,
  }
);

export const Profile = mongoose.model("Profile", profileSchema);

/* =========================
   Skill Schema
========================= */

const skillSchema = new mongoose.Schema(
  {
    category: String,

    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Skill = mongoose.model("Skill", skillSchema);

/* =========================
   Project Schema
========================= */

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },

    tech: [String],

    liveLink: String,

    githubLink: String,

    image: String,
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model("Project", projectSchema);

/* =========================
   Experience Schema
========================= */

const experienceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    period: String,

    description: String,
  },
  {
    timestamps: true,
  }
);

export const Experience = mongoose.model("Experience", experienceSchema);

/* =========================
   Education Schema
========================= */

const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: true,
    },

    institution: {
      type: String,
      required: true,
    },

    period: String,

    description: String,
  },
  {
    timestamps: true,
  }
);

export const Education = mongoose.model("Education", educationSchema);

/* =========================
   Blog Schema (UPDATED - category field added)
========================= */

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      default: "General",
    },

    thumbnail: String,
    tags: [String],
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.model("Blog", blogSchema);

/* =========================
   Case Study Schema
========================= */

const caseStudySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      default: "General",
    },
    problem: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    techStack: [String],
    thumbnail: String,
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const CaseStudy = mongoose.model("CaseStudy", caseStudySchema);

/* =========================
   Research Paper Schema
========================= */

const researchPaperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    authors: [String],

    venue: String,

    year: Number,

    summary: String,

    pdfLink: String,

    keywords: [String],
  },
  {
    timestamps: true,
  }
);

export const ResearchPaper = mongoose.model("ResearchPaper", researchPaperSchema);

/* =========================
   Message Schema
========================= */

const messageSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: true,
    },

    senderEmail: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageSchema);