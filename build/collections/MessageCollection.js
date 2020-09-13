const MessageCollection = (db, pusher) => {
    const messageCollection = db.collection("messages");
    const messageChangeStream = messageCollection.watch();
    messageChangeStream.on("change", (change) => {
        console.log("Message change stream:");
        console.log(change);
        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            console.log("Message details:");
            console.log(messageDetails);
            pusher.trigger("messages", "inserted", {
                _id: messageDetails._id,
                name: messageDetails.name,
                message: messageDetails.message,
                user_id: messageDetails.user_id,
                room_id: messageDetails.room_id,
                timestamp: messageDetails.timestamp,
            });
        }
        else {
            console.log("Error triggering puhser or other action was triggered");
        }
    });
};
export default MessageCollection;
