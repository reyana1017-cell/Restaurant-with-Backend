import express from "express";
import { timingSafeEqual } from "node:crypto";
import { config } from "../config/env.js";

const router = express.Router();

function safeCompare(value, expected) {
    const valueBuffer = Buffer.from(value);
    const expectedBuffer = Buffer.from(expected);

    if (valueBuffer.length !== expectedBuffer.length) {
        return false;
    }

    return timingSafeEqual(valueBuffer, expectedBuffer);
}

router.post("/login", (req, res, next) => {
    const { username, password } = req.body;

    if (
        typeof username !== "string" ||
        typeof password !== "string" ||
        username.length > 100 ||
        password.length > 200
    ) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid username and password",
        });
    }

    const validUsername = safeCompare(username, config.adminUsername);
    const validPassword = safeCompare(password, config.adminPassword);

    // TEMPORARY CHECK: remove after the login works
    console.log({
        validUsername,
        validPassword,
        typedUsernameLength: username.length,
        expectedUsernameLength: config.adminUsername.length,
        typedPasswordLength: password.length,
        expectedPasswordLength: config.adminPassword.length,
    });

    if (!validUsername || !validPassword) {
        return res.status(401).json({
            success: false,
            message: "invalid username and password",
        });
    }

    req.session.regenerate((error) => {
        if (error) {
            return next(error);
        }

        req.session.admin = {
            username: config.adminUsername,
            authenticatedAt: new Date().toISOString(),
        };

        req.session.save((saveError) => {
            if (saveError) {
                return next(saveError);
            }

            res.json({
                success: true,
                message: "Login Successful.",
                admin: {
                    username: config.adminUsername,
                },
            });
        });
    });
});

router.get("/me", (req, res) => {
    if (!req.session?.admin) {
        return res.status(401).json({
            success: false,
            message: "Not authenticated.",
        });
    }

    res.json({
        success: true,
        admin: {
            username: req.session.admin.username,
        },
    });
});

router.post("/logout", (req, res, next) => {
    if (!req.session?.admin) {
        return res.json({
            success: true,
            message: "Logged out.",
        });
    }

    req.session.destroy((error) => {
        if (error) {
            return next(error);
        }

        res.clearCookie("Cookie.sid");

        res.json({
            success: true,
            message: "Logout successfully.",
        });
    });
});

export default router;