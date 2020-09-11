import { Express } from "express";
import Message from "../models/MessageModel.js";

const MessageController = (app: Express) => {
  const rest = (url: string) => {
    return "/api/messages" + url;
  };

  app.post(rest("/send"), async (req, res) => {
    const message = req.body;
    console.log("Sending a message:");
    console.log(message);

    try {
      const response = await Message.create(message);
      res.status(201).send(response);
      console.log("Successfuly sent a message:");
      console.log(response);
    } catch (error) {
      res.status(500).send(error);
      console.log("Error with sending a message:");
      console.log(error);
    }
  });

  app.get(rest("/sync"), async (req, res) => {
    const { room_id } = req.query;
    console.log("Getting messages by room:");
    console.log(room_id);

    try {
      const response = await Message.find();
      const roomMessages = response.filter(
        (message) => (message.room_id as unknown) === room_id
      );

      res.status(200).send(roomMessages);
      console.log("Successfuly got messages:");
      console.log(roomMessages);
    } catch (error) {
      res.status(500).send(error);
      console.log("Error with syncing messages:");
      console.log(error);
    }
  });
};

export default MessageController;
