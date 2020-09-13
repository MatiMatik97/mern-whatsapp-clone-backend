import mongoose from "mongoose";

interface IRoomSchema extends mongoose.Document {
  name: string;
  users: string[];
  image: string;
}

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  users: { type: [String], required: true },
  image: { type: String, required: true },
});

const Room: mongoose.Model<IRoomSchema> = mongoose.model("rooms", RoomSchema);

export default Room;
