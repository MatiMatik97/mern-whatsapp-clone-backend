import mongoose from "mongoose";
import Pusher from "pusher";

interface IRoom {
  _id: string;
  name: string;
  users: string[];
  image: string;
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
        _id: roomDetails._id,
        name: roomDetails.name,
        users: roomDetails.users,
        image: roomDetails.image,
      } as IRoom);
    } else if (change.operationType === "update") {
      const documentDetails: IRoom = change.documentKey._id as IRoom;
      const roomDetails: IRoom = change.updateDescription
        .updatedFields as IRoom;

      console.log("Room details:");
      console.log(roomDetails);

      pusher.trigger("rooms", "updated", {
        _id: documentDetails._id as string,
        users: roomDetails.users as string[],
      } as IRoom);
    } else {
      console.log("Error triggering puhser or other action was triggered");
    }
  });
};

export default RoomCollection;
