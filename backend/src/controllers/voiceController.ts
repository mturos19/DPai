import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middleware/errorHandler';
import { processVoiceWithElevenLabs } from '../services/voiceService';
import VoiceModel from '../models/VoiceModel';

export const processVoiceSamples = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      throw new AppError('No voice samples provided', 400);
    }

    const files = req.files as Express.Multer.File[];
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    // Process voice samples with ElevenLabs
    const voiceModelId = await processVoiceWithElevenLabs(files, userId);

    // Save voice model reference to database
    await VoiceModel.create({
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
  } catch (error) {
    next(error);
  }
};

export const getVoiceModel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const voiceModel = await VoiceModel.findOne({ userId });

    if (!voiceModel) {
      throw new AppError('Voice model not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: {
        voiceModel,
      },
    });
  } catch (error) {
    next(error);
  }
}; 