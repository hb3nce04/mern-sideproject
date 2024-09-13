import "dotenv/config";
import createApp from "./app";
import { connectDB } from "./config/db";
import { Application } from "express";

const PORT = process.env.PORT || 5000;
const app: Application = createApp();

app.listen(PORT, () => {
	connectDB();
	console.log(`Server started at http://localhost:${PORT}`);
});
