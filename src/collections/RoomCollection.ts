import mongoose from "mongoose";
import Pusher from "pusher";

interface IRoom {
  name: string;
  id: string[];
}

const RoomCollection = (db: mongoose.Connection, pusher: Pusher) => {
  const roomCollection = db.collection("rooms");
  const roomChangeStream = roomCollection.watch();

  roomChangeStream.on("change", (change) => {
    console.log("Room change stream:");
    console.log(change);

    if (change.operationType === "insert") {
      const roomDetails: IRoom = change.fullDocument;

      console.log("Room details:");
      console.log(roomDetails);

      pusher.trigger("rooms", "inserted", {
        name: roomDetails.name,
      } as IRoom);
    } else if (change.operationType === "update") {
      const roomDetails = change.documentKey._id;

      console.log("Room details:");
      console.log(roomDetails);

      pusher.trigger("rooms", "updated", {
        id: roomDetails as string,
      } as any);
    } else {
      console.log("Error triggering puhser or other action was triggered");
    }
  });
};

export default RoomCollection;
