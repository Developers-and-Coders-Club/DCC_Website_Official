import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProgram extends Document {
  name: string;
  slug: string;
  team: 'programming' | 'development';
  description: string;
  rules?: string;
  status: 'upcoming' | 'active' | 'completed';
  startDate: Date;
  endDate: Date;
  codeforcesGymId?: string;
  githubRepo?: string;
  participants: Array<{
    userId: mongoose.Types.ObjectId;
    enrolledAt: Date;
  }>;
  edition: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProgramSchema = new Schema<IProgram>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    team: { type: String, enum: ['programming', 'development'], required: true },
    description: { type: String, required: true },
    rules: { type: String },
    status: { type: String, enum: ['upcoming', 'active', 'completed'], default: 'upcoming' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    codeforcesGymId: { type: String },
    githubRepo: { type: String },
    participants: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        enrolledAt: { type: Date, default: Date.now },
      },
    ],
    edition: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Program: Model<IProgram> = mongoose.models.Program || mongoose.model<IProgram>('Program', ProgramSchema);

export default Program;
