import { Express } from "express";
import Room from "../models/RoomModel.js";
import mongoose from "mongoose";

const RoomController = (app: Express) => {
  const rest = (url: string) => {
    return "/api/rooms" + url;
  };

  app.post(rest("/create"), async (req, res) => {
    const body = req.body;
    console.log("Creating a room:");
    console.log(body);

    try {
      const response = await Room.create(body);
      res.status(201).send(response);
      console.log("Successfuly created a new room:");
      console.log(response);
    } catch (error) {
      res.status(500).send(error);
      console.log("Error with creating a room:");
      console.log(error);
    }
  });

  app.post(rest("/join"), async (req, res) => {
    const { user_id, room_id } = req.body;
    console.log("Joining a room:");
    console.log(room_id);

    try {
      const response = await Room.findOneAndUpdate(
        { _id: room_id },
        { $push: { users: user_id } }
      );
      res.status(201).send(response);
      console.log("Successfuly joined a room:");
      console.log(response);
    } catch (error) {
      res.status(500).send(error);
      console.log("Error with joining a room:");
      console.log(error);
    }
  });

  app.get(rest("/sync"), async (req, res) => {
    const { user_id } = req.query;
    console.log("Getting rooms by user_id:");
    console.log(user_id);

    try {
      const response = await Room.find({ users: user_id as string });
      res.status(200).send(response);
      console.log("Successfuly got rooms:");
      console.log(response);
    } catch (error) {
      res.status(500).send(error);
      console.log("Error with syncing rooms:");
      console.log(error);
    }
  });
};

export default RoomController;
