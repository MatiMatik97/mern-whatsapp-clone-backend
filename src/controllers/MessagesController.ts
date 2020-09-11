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
      console.log("Successfuly sent a message");
    } catch (error) {
      res.status(500).send(error);
      console.log("Error with sending a message:");
      console.log(error);
    }
  });

  app.get(rest("/sync"), async (req, res) => {
    try {
      const response = await Message.find();
      res.status(200).send(response);
      console.log("Successfuly got messages");
    } catch (error) {
      res.status(500).send(error);
      console.log("Error with syncing messages:");
      console.log(error);
    }
  });
};

export default MessageController;
