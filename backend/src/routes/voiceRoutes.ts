import express from 'express';
import multer from 'multer';
import { processVoiceSamples, getVoiceModel } from '../controllers/voiceController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Configure multer for audio file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an audio file! Please upload only audio files.'));
    }
  },
});

// Routes
router.post('/process', protect, upload.array('recordings', 5), processVoiceSamples);
router.get('/model/:userId', protect, getVoiceModel);

export default router; 