import User from "../models/UserModel";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const signupController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Please make password atleast 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();
    return res.status(201).json({ message: "User registered" });
  } catch (error: any) {
    console.log("Error in signupController", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const isMatch = await existingUser.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      token,
    });
  } catch (error: any) {
    console.log("Error in loginController", error);
  }
};

export const logoutController = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    console.log("Error in logoutController", error);
  }
};
