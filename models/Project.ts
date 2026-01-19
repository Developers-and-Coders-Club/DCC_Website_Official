import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  team: 'programming' | 'development';
  techStack: string[];
  images: string[];
  thumbnail?: string;
  teamMembers: Array<{
    userId: mongoose.Types.ObjectId;
    role: string;
  }>;
  links: {
    liveDemo?: string;
    github?: string;
    documentation?: string;
  };
  status: 'ongoing' | 'completed';
  featured: boolean;
  year: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    team: { type: String, enum: ['programming', 'development'], required: true },
    techStack: [{ type: String }],
    images: [{ type: String }],
    thumbnail: { type: String },
    teamMembers: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        role: String,
      },
    ],
    links: {
      liveDemo: String,
      github: String,
      documentation: String,
    },
    status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' },
    featured: { type: Boolean, default: false },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
