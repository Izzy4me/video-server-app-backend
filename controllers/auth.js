import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../models/User.js";


export const signup = async (request, response, next) => {
  console.log(request.body);

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
