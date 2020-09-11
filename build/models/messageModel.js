import tsMongoose from "ts-mongoose";
const { createSchema, typedModel } = tsMongoose;
const MessageSchema = createSchema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    user_id: { type: String, required: true },
    room_id: { type: String, required: true },
    timestamp: { type: String, required: true },
});
const Message = typedModel("messages", MessageSchema);
export default Message;
