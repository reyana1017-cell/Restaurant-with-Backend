import dotenv from "dotenv";

dotenv.config();

const requiredVariables = [
    "ADMIN_USERNAME",
    "ADMIN_PASSWORD",
    "SESSION_SECRET",
];

for (const variable of requiredVariables) {
    if (!process.env[variable]) {
        throw new Error(`Missing required environment variable: ${variable}`);
    }
}

export const config = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
    adminUsername: process.env.ADMIN_USERNAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    sessionSecret: process.env.SESSION_SECRET,
};