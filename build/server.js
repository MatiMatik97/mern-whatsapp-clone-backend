import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";
import dotenv from "dotenv";
import messageController from "./controllers/MessageController.js";
import messageCollection from "./collections/MessageCollection.js";
import roomController from "./controllers/RoomController.js";
import roomCollection from "./collections/RoomCollection.js";
// app config
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
// pusher
const pusherOptions = {
    appId: "1071422",
    key: "cde362d7c383a6381e2f",
    secret: "215c404fa6f3c534fb1a",
    cluster: "eu",
    encrypted: true,
};
const pusher = new Pusher(pusherOptions);
// middleware
app.use(express.json());
app.use(cors());
// db config
const db_username = process.env.DB_USERNAME;
const db_passowrd = process.env.DB_PASSOWRD;
const db_cluster = process.env.DB_CLUSTER;
const db_name = process.env.DB_NAME;
const db_url = `mongodb+srv://${db_username}:${db_passowrd}@${db_cluster}.w3fj2.mongodb.net/${db_name}?retryWrites=true&w=majority`;
const db_options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect(db_url, db_options);
const db = mongoose.connection;
db.once("open", () => {
    console.log("DB Connected");
    messageCollection(db, pusher);
    roomCollection(db, pusher);
});
// controllers
messageController(app);
roomController(app);
// listen
app.listen(port, () => console.log(`Listening to port: ${port}`));
