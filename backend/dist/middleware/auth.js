"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const protect = (req, res, next) => {
    // TODO: Implement real authentication
    // For now, attach a dummy user
    req.user = { id: 'dummy-user-id' };
    next();
};
exports.protect = protect;
