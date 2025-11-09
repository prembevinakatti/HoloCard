const authModel = require("../models/auth.model");
const profileModel = require("../models/profile.model");

module.exports.createProfile = async (req, res) => {
  try {
    const { fullName, title, image, bio, link } = req.body;
    const userId = req.userId;

    if (!fullName || !title || !bio || !link) {
      return res
        .status(400)
        .json({ message: "All fields except image are required." });
    }

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. User ID missing." });
    }

    const newProfile = await profileModel.create({
      userId,
      fullName,
      title,
      image,
      bio,
      link,
    });

    if (!newProfile) {
      return res.status(500).json({ message: "Failed to create profile." });
    }

    const user = await authModel.findById(userId);
    user.profileId = newProfile._id;
    await user.save();

    return res.status(201).json({
      message: "Profile created successfully.",
      success: true,
      profile: newProfile,
    });
  } catch (error) {
    console.log("Error in creating profile:", error);
  }
};

module.exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. User ID missing." });
    }

    const profile = await profileModel.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }
    return res.status(200).json({
      message: "Profile fetched successfully.",
      success: true,
      profile,
    });
  } catch (error) {
    console.log("Error in fetching profile:", error);
  }
};
