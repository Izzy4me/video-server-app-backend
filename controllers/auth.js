import mongoose from "mongoose";

import User from "../models/User.js"


export const signup = async (request, response) => {
  console.log(request.body);
  console.log(response);

  try {
    const newUser = new User(request.body);
  } catch(err) {
    // TODO: handle me
    console.error(err);
  }
};
