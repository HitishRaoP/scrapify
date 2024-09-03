import { config } from "dotenv";
import cors from "cors";
import express from "express";
import { PORT } from "./constants";
import { trpcExpress } from "@scrapify/trpc-server/src/index";

config();

const app = express();

app.options("/trpc", cors())

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "server is up and running" });
})

app.use("/trpc", cors(), trpcExpress)

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})