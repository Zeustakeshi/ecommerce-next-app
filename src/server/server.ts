import express from "express";
import { nextApp, nextHandler } from "./nextUtill";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const bootstrap = async () => {
    app.use((req, res) => nextHandler(req, res));

    nextApp.prepare().then(() => {
        app.listen(PORT, () => {
            console.log(`Node server is running on port: ${PORT}`);
        });
    });
};

bootstrap();
