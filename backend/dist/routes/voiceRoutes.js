"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const voiceController_1 = require("../controllers/voiceController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Configure multer for audio file uploads
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('audio/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Not an audio file! Please upload only audio files.'));
        }
    },
});
// Routes
router.post('/process', auth_1.protect, upload.array('recordings', 5), voiceController_1.processVoiceSamples);
router.get('/model/:userId', auth_1.protect, voiceController_1.getVoiceModel);
exports.default = router;
