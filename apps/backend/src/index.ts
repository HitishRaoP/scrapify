import { config } from "dotenv";
import cors from "cors";
import express from "express";
import { PORT } from "./constants";
import { trpcExpress } from "@scrapify/trpc-server";

config();

const app = express();

app.use(cors({
    origin: "*",
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is up and running");
})

app.use("/trpc", trpcExpress)

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})