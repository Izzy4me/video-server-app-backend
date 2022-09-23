import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import User from "../models/User.js";
import { createError } from "../utils/error.js";


export const signup = async (request, response, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(request.body.password, salt);

    const newUser = new User({ ...request.body, password: hashedPassword });
    await newUser.save();

    response.status(200).send("User has been created!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (request, response, next) => {
  try {
    const user = await User.findOne({ name: request.body.name });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcrypt.compare(request.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong credentials!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    const { password, ...userWithoutPassword } = user._doc;

    response
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};
