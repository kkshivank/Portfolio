
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

// profile controller

//Get Profile

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.log("Get Profile Error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

//Edit profile

export const editProfile = async (req, res) => {
  try {
    const {
      name,
      role,
      bio,
      email,
      resumeLink,
      githubLink,
      linkedinLink,
      profilePicture,
    } = req.body;

    let profile = await Profile.findOne();
    let imageUrl = "";

    if(profilePicture){
      const uploadedImage = await cloudinary.uploader.upload(profilePicture, {
        folder: "profile_pictures",
      });
      imageUrl = uploadedImage.secure_url;
    }

    // If profile doesn't exist, create one
    if (!profile) {
      profile = await Profile.create({
        name,
        role,
        bio,
        email,
        resumeLink,
        githubLink,
        linkedinLink,
        profilePicture: imageUrl ,
      });

      return res.status(201).json({
        message: "Profile created",
        profile,
      });
    }

    // Update existing profile
    profile.name = name || profile.name;
    profile.role = role || profile.role;
    profile.bio = bio || profile.bio;
    profile.email = email || profile.email;
    profile.resumeLink = resumeLink || profile.resumeLink;
    profile.githubLink = githubLink || profile.githubLink;
    profile.linkedinLink = linkedinLink || profile.linkedinLink;
    if(imageUrl) {
      profile.profilePicture = imageUrl;
    } 
    
    await profile.save();

    return res.status(200).json({
      message: "Profile updated",
      profile,
    });
  } catch (error) {
    console.log("Edit Profile Error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};