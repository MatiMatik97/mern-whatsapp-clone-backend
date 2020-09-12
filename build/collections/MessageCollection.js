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
                name: messageDetails.name,
                message: messageDetails.message,
            });
        }
        else {
            console.log("Error triggering puhser or other action was triggered");
        }
    });
};
export default MessageCollection;
