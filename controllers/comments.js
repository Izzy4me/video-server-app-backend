import { createError } from "../utils/error.js";
import Comment from "../models/Comment.js"
import Video from "../models/Video.js";

export const addComment = async (request, response, next) => {
  const newComment = new Comment({ ...request.body, userId: request.user.id });
  try {
    const savedComment = await newComment.save();
    response.status(200).json(savedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (request, response, next) => {
  try {
    const comment = await Comment.findById(request.params.id);
    const video = await Video.findById(comment.videoId);

    // You can delete comment only if you are author of comment or author of video
    if (
        request.user.id === comment.userId ||
        request.user.id === video.userId
      ) {
        await Comment.findByIdAndDelete(request.params.id);
        response.status(200).json("Comment has been deleted!");
    } else {
      return next(createError(403, "You don't have permission to delete this comment!"));
    }
    
  } catch (error) {
    next(error);
  }
};

export const getComments = async (request, response, next) => {
  try {
    const comments = await Comment.find({ videoId: request.params.videoId });
    response.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
