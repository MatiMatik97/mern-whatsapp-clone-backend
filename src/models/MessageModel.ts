import tsMongoose from "ts-mongoose";

const { createSchema, typedModel } = tsMongoose;

const MessageSchema = createSchema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: String, required: true },
});

const Message = typedModel("message", MessageSchema);

export default Message;
