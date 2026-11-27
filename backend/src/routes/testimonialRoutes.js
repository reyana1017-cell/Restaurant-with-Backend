import express from "express";
import { randomUUID } from "node:crypto";
import { testimonials } from "../data/testimonials.js";
import { requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        success: true,
        testimonials,
    });
});

router.post("/", requireAdmin, (req, res) => {
    const { name, message } = req.body;

    if (
        typeof name !== "string" ||
        typeof message !== "string" ||
        !name.trim() ||
        !message.trim ||
        name.length > 100 ||
        message.length > 500
    ) {
        return res.status(400).json({
            success: false,
            message:
            "Name and message are required. Name must be at most 100 characters and message at most 500 characters.",
        });
    }

    const newTestimonials = {
        id: randomUUID(),
        name: name.trim(),
        message: message.trim(),
    };

    testimonials.push(newTestimonials);

    res.status(201).json({
        success: true,
        message: "Testimonial added successully.",
        testimonial: newTestimonials,
    });
});

router.put("/:id", requireAdmin, (req, res) => {
    const { id } = req.params;
    const { name, message } = req.body;

    if (
        typeof name !== "string" ||
        typeof message !== "string" ||
        !name.trim() ||
        !message.trim() ||
        name.length > 100 ||
        message.length > 500
    ) {
        return res.status(400).json({
            success: false,
            message:
            "Name and message required. Name must be at most 100 characters and message at most 500 characters.",
        });
    }

    const index = testimonials.findIndex((item) => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Testimonial not found",
        });
    }

    testimonial[index] = {
        ...testimonials[index],
        name: name.trim(),
        message: message.trim(),
    };

    res.json({
        success: true,
        message: "Testimonial updated successfully.",
        testimonial: testimonials[index],
    });
});

router.delete("/id", requireAdmin, (req, res) => {
    const { id } = req.params;

    const index = testimonials.findIndex((item) => item.id === id);
    
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Testimonial not found",
        });
    }

    testimonials.splice(index, 1);

    res.json({
        success: true,
        message: "Testimonial deleted successfully.",
    });
});

export default router;