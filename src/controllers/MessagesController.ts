import { Express } from "express";
import Message from "../models/MessageModel.js";

const MessageController = (app: Express) => {
  const rest = (url: string) => {
    return "/api/messages" + url;
  };

  app.post(rest("/send"), async (req, res) => {
    const message = req.body;
    console.log(message);

    try {
      const response = await Message.create(message);
      res.status(201).send(response);
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  });
};

export default MessageController;
