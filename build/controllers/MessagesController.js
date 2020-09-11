var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Message from "../models/MessageModel.js";
const MessageController = (app) => {
    const rest = (url) => {
        return "/api/messages" + url;
    };
    app.post(rest("/send"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const message = req.body;
        console.log("Sending a message:");
        console.log(message);
        try {
            const response = yield Message.create(message);
            res.status(201).send(response);
            console.log("Successfuly sent a message");
        }
        catch (error) {
            res.status(500).send(error);
            console.log("Error with sending a message:");
            console.log(error);
        }
    }));
    app.get(rest("/sync"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield Message.find();
            res.status(200).send(response);
            console.log("Successfuly got messages");
        }
        catch (error) {
            res.status(500).send(error);
            console.log("Error with syncing messages:");
            console.log(error);
        }
    }));
};
export default MessageController;
