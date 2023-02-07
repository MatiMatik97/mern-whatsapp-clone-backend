import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    user_id: { type: String, required: true },
    room_id: { type: String, required: true },
    timestamp: { type: String, required: true },
});
const Message = mongoose.model("messages", MessageSchema);
export default Message;
