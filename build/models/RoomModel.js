import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    users: { type: [String], required: true },
});
const Room = mongoose.model("rooms", RoomSchema);
export default Room;
