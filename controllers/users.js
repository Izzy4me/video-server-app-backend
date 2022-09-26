import User from "../models/User.js";
import Video from "../models/Video.js";
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

// TODO: check if you already subscribed or not becore operating on subscribtions table
export const subscribe = async (request, response, next) => {
  try {
    await User.findByIdAndUpdate(request.user.id, {
      $push: { subscribedUsers: request.params.id },
    });
    await User.findByIdAndUpdate(request.params.id, {
      $inc: { subscribers: 1 }
    });
    response.status(200).json("Subscribe action successful!");
  } catch (error) {
    next(error);
  }
};

export const unsubscribe = async (request, response, next) => {
  try {
    await User.findByIdAndUpdate(request.user.id, {
      $pull: { subscribedUsers: request.params.id },
    });
    await User.findByIdAndUpdate(request.params.id, {
      $inc: { subscribers: -1 },
    });
    response.status(200).json("Unsubscribe action successful!");
  } catch (error) {
    next(error);
  }
};

export const like = async (request, response, next) => {
  const userId = request.user.id;
  const videoId = request.params.videoId;
  try {
    // $addToSet Atlas method is really cleaver method which won't duplicate my id 
    // like $push 
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: userId },
      $pull: { dislikes: userId },
    });
    response.status(200).json("Video has been liked!");
  } catch (error) {
    next(error);
  }
};

export const dislike = async (request, response, next) => {
  const userId = request.user.id;
  const videoId = request.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: userId },
      $pull: { likes: userId },
    });
    response.status(200).json("Video has been disliked!");
  } catch (error) {
    next(error);
  }
};
