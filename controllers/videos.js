import Video from "../models/Video.js";
import User from "../models/User.js";
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
    next(error);
  }
};

export const updateVideo = async (request, response, next) => {
  try {
    const video = await Video.findById(request.params.id);
    if (!video) return next(createError(404, "Video not found!")); 
    if (!request.user.id === video.userId) return next(createError(403, "Can't update not your video!"));

    const updatedVideo = await Video.findByIdAndUpdate(
      request.params.id, 
      { 
        $set:request.body
      }, 
      { 
        new: true
      },
    );
    response.status(200).json(updatedVideo);
  } catch(error) {
    next(error);
  }
};

export const deleteVideo = async (request, response, next) => {
  try {
    const video = await Video.findById(request.params.id);
    if (!video) return next(createError(404, "Video not found!")); 
    if (!request.user.id === video.userId) return next(createError(403, "Can't delete not your video!"));

    await Video.findByIdAndRemove(request.params.id);
    response.status(200).json("Video has been deleted!");
  } catch(error) {
    next(error);
  }
};

export const getVideo = async (request, response, next) => {
  try {
    const video = await Video.findById(request.params.id);
    response.status(200).json(video);
  } catch(error) {
    next(error);
  }
};

export const addView = async (request, response, next) => {
  try {
    await Video.findByIdAndUpdate(request.params.id, {
      $inc:{views:1}
    });
    response.status(200).json("The views has been increased!");
  } catch (error) {
    next(error);
  }
};

export const trending = async (request, response, next) => {
  try {
    // Nice trick here! Sort by "1" would give us least liked videos, and -1 give us opposite
    const videos = await Video.find().sort({
      views:-1
    })
    response.status(200).json(videos);
  } catch (error) {
    next(error);
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
    next(error);
  }
};

export const subscribed = async (request, response, next) => {
  try {
        console.log('test');
        console.log(request.user.id);
    const user = await User.findById(request.user.id);
        console.log(user);
    const subscribedChannels = user.subscribedUsers;

    console.log(subscribedChannels);
    const listOfSubbedVideos = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId });
      }),
    );

    response.status(200).json(listOfSubbedVideos.flat()
      .sort((vid1, vid2) => (vid2.createdAt - vid1.createdAt))
    );
  } catch (error) {
    next(error);
  }
};
