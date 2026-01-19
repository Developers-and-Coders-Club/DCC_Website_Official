import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  rollNumber?: string;
  year?: number;
  branch?: string;
  phone?: string;
  profilePhoto?: string;
  role: 'user' | 'admin' | 'alumni';
  isVerified: boolean;
  linkedAccounts: {
    codeforces?: {
      handle: string;
      verified: boolean;
      verificationCode?: string;
      verifiedAt?: Date;
    };
    github?: {
      username: string;
      githubId?: string;
      verified: boolean;
      accessToken?: string;
      verificationCode?: string;
      verifiedAt?: Date;
    };
    linkedin?: string;
    codechef?: string;
  };
  enrolledPrograms: Array<{
    programId: mongoose.Types.ObjectId;
    enrolledAt: Date;
    status: 'active' | 'completed' | 'dropped';
  }>;
  eventsRegistered: Array<{
    eventId: mongoose.Types.ObjectId;
    registeredAt: Date;
    attended: boolean;
  }>;
  achievements: Array<{
    badgeId: mongoose.Types.ObjectId;
    earnedAt: Date;
  }>;
  totalPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    rollNumber: { type: String, unique: true, sparse: true },
    year: { type: Number, min: 1, max: 4 },
    branch: { type: String },
    phone: { type: String },
    profilePhoto: { type: String },
    role: { type: String, enum: ['user', 'admin', 'alumni'], default: 'user' },
    isVerified: { type: Boolean, default: false },
    linkedAccounts: {
      codeforces: {
        handle: String,
        verified: { type: Boolean, default: false },
        verificationCode: String,
        verifiedAt: Date,
      },
      github: {
        username: String,
        githubId: String,
        verified: { type: Boolean, default: false },
        accessToken: String,
        verificationCode: String,
        verifiedAt: Date,
      },
      linkedin: String,
      codechef: String,
    },
    enrolledPrograms: [
      {
        programId: { type: Schema.Types.ObjectId, ref: 'Program' },
        enrolledAt: { type: Date, default: Date.now },
        status: { type: String, enum: ['active', 'completed', 'dropped'], default: 'active' },
      },
    ],
    eventsRegistered: [
      {
        eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
        registeredAt: { type: Date, default: Date.now },
        attended: { type: Boolean, default: false },
      },
    ],
    achievements: [
      {
        badgeId: { type: Schema.Types.ObjectId, ref: 'Badge' },
        earnedAt: { type: Date, default: Date.now },
      },
    ],
    totalPoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Prevent model recompilation during hot reloads
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
