import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAlumni extends Document {
  name: string;
  photo?: string;
  graduationYear: number;
  branch: string;
  rollNumber?: string;
  currentRole: string;
  company: string;
  location?: string;
  package?: number;
  achievements: string[];
  linkedinUrl?: string;
  githubUrl?: string;
  successStory?: string;
  adviceForJuniors?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AlumniSchema = new Schema<IAlumni>(
  {
    name: { type: String, required: true },
    photo: { type: String },
    graduationYear: { type: Number, required: true },
    branch: { type: String, required: true },
    rollNumber: { type: String },
    currentRole: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    package: { type: Number },
    achievements: [{ type: String }],
    linkedinUrl: { type: String },
    githubUrl: { type: String },
    successStory: { type: String },
    adviceForJuniors: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Alumni: Model<IAlumni> = mongoose.models.Alumni || mongoose.model<IAlumni>('Alumni', AlumniSchema);

export default Alumni;
