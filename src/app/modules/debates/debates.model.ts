import { Schema } from 'mongoose';
import { IDebate } from './debates.interface';
import mongoose from 'mongoose';

const debateSchema = new Schema<IDebate>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    category: { type: String, required: true },
    bannerImage: { type: String },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startTime: { type: Date, default: Date.now },
    duration: { type: Number, required: true }, // in hours
    status: { type: String, enum: ['active', 'closed'], default: 'active' },
    winningSide: {
      type: String,
      enum: ['support', 'oppose', 'tie'],
      default: null,
    },
    supportCount: { type: Number, default: 0 },
    opposeCount: { type: Number, default: 0 },
    participants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        side: { type: String, enum: ['support', 'oppose'] },
      },
    ],
  },
  { timestamps: true }
);

debateSchema.virtual('endTime').get(function () {
  if (!this.startTime || !this.duration) return null;
  return new Date(this.startTime.getTime() + this.duration * 60 * 60 * 1000);
});

debateSchema.methods.isActive = function () {
  return new Date() < this.endTime;
};

export const Debate = mongoose.model('Debate', debateSchema);
