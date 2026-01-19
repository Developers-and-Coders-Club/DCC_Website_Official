import mongoose, { Schema, Document, Model } from 'mongoose';

interface LeaderboardEntry {
  userId: mongoose.Types.ObjectId;
  rank: number;
  codeforcesHandle?: string;
  problemsSolved?: number;
  points?: number;
  githubUsername?: string;
  mergedPRs?: number;
  pendingPRs?: number;
  linesAdded?: number;
  linesDeleted?: number;
  totalPoints?: number;
  lastUpdated: Date;
}

export interface ILeaderboard extends Document {
  programId: mongoose.Types.ObjectId;
  type: 'coding' | 'development';
  entries: LeaderboardEntry[];
  lastFetchedAt: Date;
  createdAt: Date;
}

const LeaderboardSchema = new Schema<ILeaderboard>(
  {
    programId: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
    type: { type: String, enum: ['coding', 'development'], required: true },
    entries: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        rank: Number,
        codeforcesHandle: String,
        problemsSolved: Number,
        points: Number,
        githubUsername: String,
        mergedPRs: Number,
        pendingPRs: Number,
        linesAdded: Number,
        linesDeleted: Number,
        totalPoints: Number,
        lastUpdated: { type: Date, default: Date.now },
      },
    ],
    lastFetchedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Leaderboard: Model<ILeaderboard> =
  mongoose.models.Leaderboard || mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);

export default Leaderboard;
