import mongoose from "mongoose";

interface IMessageSchema extends mongoose.Document {
  name: string;
  users: string;
  user_id: string;
  room_id: string;
  timestamp: string;
}

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  user_id: { type: String, required: true },
  room_id: { type: String, required: true },
  timestamp: { type: String, required: true },
});

const Message: mongoose.Model<IMessageSchema> = mongoose.model(
  "messages",
  MessageSchema
);

export default Message;
