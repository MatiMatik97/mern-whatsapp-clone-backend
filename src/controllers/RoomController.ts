import e, { Express } from "express";
import Room from "../models/RoomModel.js";

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
        { $addToSet: { users: user_id } }
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

  app.get(rest("/get"), async (req, res) => {
    const { room_id, user_id } = req.query;
    console.log("Getting rooms by user_id:");
    console.log(room_id);

    try {
      const response = await Room.find({
        _id: room_id,
        users: user_id as string,
      });

      if (response.length > 0) {
        res.status(200).send(response);
        console.log("Successfuly got a room:");
        console.log(response);
      } else {
        throw new Error("Could not get a room...");
      }
    } catch (error) {
      res.status(500).send(error);
      console.log("Error with getting a room:");
      console.log(error);
    }
  });

  app.get(rest("/search"), async (req, res) => {
    const { name, user_id } = req.query;
    console.log("Searching rooms by name and user_id:");
    console.log(name, user_id);

    try {
      const response = await Room.find({
        name: new RegExp(name as string, "g"),
        users: user_id as string,
      });

      if (response.length > 0) {
        res.status(200).send(response);
        console.log("Successfuly found rooms:");
        console.log(response);
      } else {
        throw new Error("Could not find rooms...");
      }
    } catch (error) {
      res.status(500).send(error);
      console.log("Error with searching rooms:");
      console.log(error);
    }
  });
};

export default RoomController;
