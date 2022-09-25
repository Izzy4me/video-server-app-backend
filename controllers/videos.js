import Video from "../models/Video.js";
import { createError } from "../utils/error.js";

export const addVideo = async (request, response, next) => {
  const newVideo = new Video({
    userId: request.user.id,
    ...request.body,
  });

  try {
    const savedVideo = await newVideo.save();
    response.status(200).json(savedVideo);
  } catch(error) {
    next(err);
  }
};

export const updateVideo = async (request, response, next) => {
  try {
    const video = await Video.findById(request.params.id);
    if (!video) return next(createError(404, "Video not found!")); 
    if (!request.user.id === video.userId) return next(createError(403, "Can't update not your video!"));

    const updatedVideo = await Video.findByIdAndUpdate(
      request.params.video, 
      { 
        $set:request.body
      }, 
      { 
        new: true
      },
    );
    response.status(200).json(updatedVideo);
  } catch(error) {
    next(err);
  }
};

export const deleteVideo = async (request, response, next) => {
  try {
    const video = await Video.findById(request.params.id);
    if (!video) return next(createError(404, "Video not found!")); 
    if (!request.user.id === video.userId) return next(createError(403, "Can't delete not your video!"));

    await Video.findByIdAndRemove(request.params.video);
    response.status(200).json("Video has been deleted!");
  } catch(error) {
    next(err);
  }
};

export const getVideo = async (request, response, next) => {
  try {
    const video = await Video.findById(request.params.id);
    response.status(200).json(video);
  } catch(error) {
    next(err);
  }
};

export const addView = async (request, response, next) => {
  try {
    await Video.findByIdAndUpdate(request.params.id, {
      $inc:{views:1}
    });
    response.status(200).json("The views has been increased!");
  } catch (error) {
    next(err);
  }
};

export const trend = async (request, response, next) => {
  try {
    // Nice trick here! Sort by "1" would give us least liked videos, and -1 give us opposite
    const videos = await Video.find().sort({
      views:-1
    })
    response.status(200).json(videos);
  } catch (error) {
    next(err);
  }
};

export const random = async (request, response, next) => {
  try {
    // Sample will give us something "random", just X sample items from collection, not sorted by any key
    const videos = await Video.aggregate([{
      $sample: {
        size: 30
      },
    }]);
    response.status(200).json(videos);
  } catch (error) {
    next(err);
  }
};

export const subscribed = async (request, response, next) => {
  try {
    const user = await User.findById(request.user.id);
    const subscribedChannels = user.subscribedUsers;
    const listOfSubbedVideos = Promise.all(
      subscribedChannels.map(channelId => {
        return Video.find({ userId: channelId })
      })
    );

    response.status(200).json(listOfSubbedVideos);
  } catch (error) {
    next(err);
  }
};
