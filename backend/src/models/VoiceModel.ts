import mongoose, { Document, Schema } from 'mongoose';

export interface IVoiceModel extends Document {
  userId: string;
  voiceModelId: string;
  createdAt: Date;
}

const VoiceModelSchema: Schema = new Schema({
  userId: { type: String, required: true },
  voiceModelId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const VoiceModel = mongoose.model<IVoiceModel>('VoiceModel', VoiceModelSchema);
export default VoiceModel; 