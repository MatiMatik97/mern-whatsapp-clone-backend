const MessageCollection = (db, pusher) => {
    const messagesCollection = db.collection("messages");
    const messagesChangeStream = messagesCollection.watch();
    messagesChangeStream.on("change", (change) => {
        console.log("Messages change stream:");
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
            console.log("Error triggering puhser to send a message");
        }
    });
};
export default MessageCollection;
