export function requireAdmin(req, res, next) {
    if (!req.session || !req.session.admin) {
        return res.status(401).json({
            success: false,
            message: "Unathorized. Admin login required.",
        });
    }
    next();
}