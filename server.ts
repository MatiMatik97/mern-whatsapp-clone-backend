// TODO: przerobic na typescripta

// imports
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// app config
const app = express();
dotenv.config();

const port = process.env.APP_PORT;

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

// api routes
app.get("/", (req, res) => res.status(200).send("Hello World!"));

// listen
app.listen(port, () => console.log(`Listening to ${port}`));
