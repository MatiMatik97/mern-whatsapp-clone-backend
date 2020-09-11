// imports
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// app config
const app = express();
dotenv.config();
const port = process.env.APP_PORT;
const db_user = process.env.DB_USER;
const db_passowrd = process.env.DB_PASSOWRD;
const db_name = process.env.DB_NAME;

// db config
const db_url = `mongodb+srv://${db_user}:${db_passowrd}@cluster0.w3fj2.mongodb.net/${db_name}?retryWrites=true&w=majority`;

const db_options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(db_url, db_options);

// api routes
app.get('/', (req, res) => res.status(200).send("Hello World!"));

// listen
app.listen(port, () => console.log(`Listening to ${port}`));