import express, { Request, Response } from "express";
import User from "../models/UserModel";
import jwt from "jsonwebtoken";
import protectRoute from "../middleware/protectRoute";
import cloudinary from "../utils/cloudinaryConfig";

const router = express.Router();

const signupHandler = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please enter all fields" });
      return;
    }

    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email is already in use" });
      return;
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User registered",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error("Error in signupController:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Please enter all fields");
      res.status(400).json({ message: "Please enter all fields" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      console.log("Invalid credentials");
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await existingUser.comparePassword(password);
    if (!isMatch) {
      console.log("Invalid credentials");
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        profilePic: existingUser.profilePic,
      },
    });
  } catch (error) {
    console.error("Error in loginController:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logoutHandler = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error in logoutController:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateProfilePic = async (req: Request, res: Response) => {
  try {
    const { image } = req.body;
    const userId = req.user?.id;
    if (!image) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "profile_pics", // You can specify the folder name
      transformation: [
        { width: 150, height: 150, crop: "thumb", gravity: "face" },
      ],
    });

    const imageUrl = uploadResponse.secure_url;

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePic: imageUrl },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "Profile picture updated", user });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
    return;
  }
};

router.post("/signup", signupHandler);
router.post("/login", loginHandler);
router.post("/logout", protectRoute, logoutHandler);
router.get("/profile", protectRoute, getProfile);
router.post("/upload-profile-pic", protectRoute, updateProfilePic);

export default router;
