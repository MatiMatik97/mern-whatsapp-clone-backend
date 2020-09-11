import mongoose from "mongoose";
import Pusher from "pusher";

const MessageCollection = (db: mongoose.Connection, pusher: Pusher) => {
  const messagesCollection = db.collection("messages");
  const messagesChangeStream = messagesCollection.watch();

  messagesChangeStream.on("change", (change) => {
    console.log("Messages change stream:");
    console.log(change);

    if (change.operationType === "insert") {
      const messageDetails: IMessage = change.fullDocument;

      console.log("Message details:");
      console.log(messageDetails);

      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
      } as IMessage);
    } else {
      console.log("Error triggering puhser to send a message");
    }
  });
};

export default MessageCollection;
