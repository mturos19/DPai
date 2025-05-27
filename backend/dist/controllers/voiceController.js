"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVoiceModel = exports.processVoiceSamples = void 0;
const errorHandler_1 = require("../middleware/errorHandler");
const voiceService_1 = require("../services/voiceService");
const VoiceModel_1 = __importDefault(require("../models/VoiceModel"));
const processVoiceSamples = async (req, res, next) => {
    var _a;
    try {
        if (!req.files || !Array.isArray(req.files)) {
            throw new errorHandler_1.AppError('No voice samples provided', 400);
        }
        const files = req.files;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            throw new errorHandler_1.AppError('User not authenticated', 401);
        }
        // Process voice samples with ElevenLabs
        const voiceModelId = await (0, voiceService_1.processVoiceWithElevenLabs)(files, userId);
        // Save voice model reference to database
        await VoiceModel_1.default.create({
            userId,
            voiceModelId,
            createdAt: new Date(),
        });
        res.status(200).json({
            status: 'success',
            data: {
                voiceModelId,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.processVoiceSamples = processVoiceSamples;
const getVoiceModel = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const voiceModel = await VoiceModel_1.default.findOne({ userId });
        if (!voiceModel) {
            throw new errorHandler_1.AppError('Voice model not found', 404);
        }
        res.status(200).json({
            status: 'success',
            data: {
                voiceModel,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getVoiceModel = getVoiceModel;
