const RoomCollection = (db, pusher) => {
    const roomCollection = db.collection("rooms");
    const roomChangeStream = roomCollection.watch();
    roomChangeStream.on("change", (change) => {
        console.log("Room change stream:");
        console.log(change);
        if (change.operationType === "insert") {
            const roomDetails = change.fullDocument;
            console.log("Room details:");
            console.log(roomDetails);
            pusher.trigger("rooms", "inserted", {
                _id: roomDetails._id,
                name: roomDetails.name,
                users: roomDetails.users,
                image: roomDetails.image,
            });
        }
        else if (change.operationType === "update") {
            const documentDetails = change.documentKey._id;
            const roomDetails = change.updateDescription
                .updatedFields;
            console.log("Room details:");
            console.log(roomDetails);
            pusher.trigger("rooms", "updated", {
                _id: documentDetails._id,
                users: roomDetails.users,
            });
        }
        else {
            console.log("Error triggering puhser or other action was triggered");
        }
    });
};
export default RoomCollection;
