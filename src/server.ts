import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import dotenv from "dotenv";
import messagesController from "./controllers/MessagesController.js";
import messagesCollection from "./collections/MessagesCollection.js";

// app config
const app = express();
dotenv.config();

const port = process.env.APP_PORT;

// pusher
const pusherOptions: Pusher.Options = {
  appId: process.env.PUSHER_APP_ID as string,
  key: process.env.PUSHER_KEY as string,
  secret: process.env.PUSHER_SECRET as string,
  cluster: "eu",
  encrypted: true,
};

const pusher = new Pusher(pusherOptions);

// middleware
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// db config
const db_username = process.env.DB_USERNAME;
const db_passowrd = process.env.DB_PASSOWRD;
const db_cluster = process.env.DB_CLUSTER;
const db_name = process.env.DB_NAME;

const db_url = `mongodb+srv://${db_username}:${db_passowrd}@${db_cluster}.w3fj2.mongodb.net/${db_name}?retryWrites=true&w=majority`;

const db_options: mongoose.ConnectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(db_url, db_options);

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB Connected");

  messagesCollection(db, pusher);
});

// controllers
messagesController(app);

// listen
app.listen(port, () => console.log(`Listening to port: ${port}`));
