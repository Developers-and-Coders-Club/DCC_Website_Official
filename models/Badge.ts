import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBadge extends Document {
  name: string;
  description: string;
  icon: string;
  criteria: string;
  points: number;
  createdAt: Date;
}

const BadgeSchema = new Schema<IBadge>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    criteria: { type: String, required: true },
    points: { type: Number, required: true },
  },
  { timestamps: true }
);

const Badge: Model<IBadge> = mongoose.models.Badge || mongoose.model<IBadge>('Badge', BadgeSchema);

export default Badge;
