import express, { Application } from "express";
import path from "path";

import apiRoutes from "./routes/api.route";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

export default function createApp(): Application {
	const app: Application = express();

	app.use(
		process.env.NODE_ENV === "development"
			? morgan("dev")
			: morgan("combined")
	);
	app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));
	app.use(helmet());
	app.use(compression());
	app.use(express.json());
    app.use(
        rateLimit({
            windowMs: 5000,
            max: 10
        })
    );

	app.use("/api", apiRoutes);

	if (process.env.NODE_ENV === "production") {
		const __dirname = path.resolve();
		app.use(express.static(path.join(__dirname, "../frontend/dist")));
		app.get("*", (req, res) => {
			res.sendFile(
				path.resolve(__dirname, "frontend", "dist", "index.html")
			);
		});
	}

	return app;
}
