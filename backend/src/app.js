import express from "express";
import cors from "cors"; 
import helmet from "helmet";
import session from "express-session";
import { config } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";

const app = express();
if (config.nodeEnv === "production") {
    app.set("trust proxy", 1);
}

app.use(helmet());

app.use(
    cors({
        origin: config.frontendUrl,
        credentials: true,
    }),
);

app.use(
    express.json({
        limit: "10kb",
    }),
);

app.use(
    session({
        name: "Cookie.sid",
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: config.nodeEnv === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 2,
        },
    }),
);

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Reana Restaurant API is running.",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found.",
    });
});
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({
        success: false,
        message: "Internal server error.",
    });
});

export default app;

