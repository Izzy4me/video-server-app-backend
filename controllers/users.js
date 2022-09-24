import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const getUser = async (request, response, next) => {
  try {
    const updatedUser = await User.findById(request.params.id);
    response.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (request, response, next) => {
  if (request.params.id === request.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        request.params.id,
        {
          $set: request.body,
        },
        {
          new: true,
        }
      );
      response.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "Can't update not your profile!"));
  }
};

export const removeUser = async (request, response, next) => {
  if (request.params.id === request.user.id) {
    try {
      await User.findByIdAndDelete(request.params.id,);
      response.status(200).json("User has been deleted!");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "Can't remove not your profile!"));
  }
};

export const subscribe = async (request, response, next) => {
  try {
    await User.findById(request.user.id, {
      $push: { subscribedUsers: request.params.id }
    });
    await User.findByIdAndUpdate(request.params.id, {
      $inc: { subscribers: 1 }
    });
    response.status(200).json("Subscribe action successful!");
  } catch (error) {
    next(err);
  }
};

export const unsubscribe = async (request, response, next) => {
  try {
    await User.findById(request.user.id, {
      $pull: { subscribedUsers: request.params.id },
    });
    await User.findByIdAndUpdate(request.params.id, {
      $inc: { subscribers: -1 },
    });
    response.status(200).json("Unsubscribe action successful!");
  } catch (error) {
    next(err);
  }
};

export const like = async (request, response, next) => {
  try {
    console.log("Like feature not implemented yet!");
  } catch (error) {
    next(err);
  }
};

export const dislike = async (request, response, next) => {
  try {
    console.log("Dislike feature not implemented yet!");
  } catch (error) {
    next(err);
  }
};
