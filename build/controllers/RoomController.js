var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Room from "../models/RoomModel.js";
const RoomController = (app) => {
    const rest = (url) => {
        return "/api/rooms" + url;
    };
    app.post(rest("/create"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        console.log("Creating a room:");
        console.log(body);
        try {
            const response = yield Room.create(body);
            res.status(201).send(response);
            console.log("Successfuly created a new room:");
            console.log(response);
        }
        catch (error) {
            res.status(500).send(error);
            console.log("Error with creating a room:");
            console.log(error);
        }
    }));
    app.post(rest("/join"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_id, room_id } = req.body;
        console.log("Joining a room:");
        console.log(room_id);
        try {
            const response = yield Room.findOneAndUpdate({ _id: room_id }, { $addToSet: { users: user_id } });
            res.status(201).send(response);
            console.log("Successfuly joined a room:");
            console.log(response);
        }
        catch (error) {
            res.status(500).send(error);
            console.log("Error with joining a room:");
            console.log(error);
        }
    }));
    app.get(rest("/sync"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_id } = req.query;
        console.log("Getting rooms by user_id:");
        console.log(user_id);
        try {
            const response = yield Room.find({ users: user_id });
            res.status(200).send(response);
            console.log("Successfuly got rooms:");
            console.log(response);
        }
        catch (error) {
            res.status(500).send(error);
            console.log("Error with syncing rooms:");
            console.log(error);
        }
    }));
    app.get(rest("/get"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { room_id, user_id } = req.query;
        console.log("Getting rooms by user_id:");
        console.log(room_id);
        try {
            const response = yield Room.find({
                _id: room_id,
                users: user_id,
            });
            if (response.length > 0) {
                res.status(200).send(response);
                console.log("Successfuly got a room:");
                console.log(response);
            }
            else {
                throw new Error("Could not get a room...");
            }
        }
        catch (error) {
            res.status(500).send(error);
            console.log("Error with getting a room:");
            console.log(error);
        }
    }));
    app.get(rest("/search"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, user_id } = req.query;
        console.log("Searching rooms by name and user_id:");
        console.log(name, user_id);
        try {
            const response = yield Room.find({
                name: new RegExp(name, "g"),
                users: user_id,
            });
            if (response.length > 0) {
                res.status(200).send(response);
                console.log("Successfuly found rooms:");
                console.log(response);
            }
            else {
                throw new Error("Could not find rooms...");
            }
        }
        catch (error) {
            res.status(500).send(error);
            console.log("Error with searching rooms:");
            console.log(error);
        }
    }));
};
export default RoomController;
