import { Schema } from 'mongoose';

export const TrackingEventSchema = new Schema({
  eventName: { type: String, required: true },
  data: { type: Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now },
  sessionId: { type: String }
});
