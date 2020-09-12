import mongoose from "mongoose";
import Pusher from "pusher";

interface IMessage {
  name: string;
  message: string;
}

const MessageCollection = (db: mongoose.Connection, pusher: Pusher) => {
  const messageCollection = db.collection("messages");
  const messageChangeStream = messageCollection.watch();

  messageChangeStream.on("change", (change) => {
    console.log("Message change stream:");
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
      console.log("Error triggering puhser or other action was triggered");
    }
  });
};

export default MessageCollection;
