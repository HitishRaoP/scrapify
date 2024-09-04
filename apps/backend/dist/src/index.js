"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const constants_1 = require("./constants");
const trpc_server_1 = require("@scrapify/trpc-server");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.options("/trpc", (0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ message: "server is up and running" });
});
app.use("/trpc", (0, cors_1.default)(), trpc_server_1.trpcExpress);
app.listen(constants_1.PORT, () => {
    console.log(`server running on http://localhost:${constants_1.PORT}`);
});
