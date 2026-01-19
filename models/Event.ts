import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  type: 'workshop' | 'hackathon' | 'contest' | 'talk' | 'other';
  team: 'programming' | 'development' | 'both';
  date: Date;
  endDate?: Date;
  venue: string;
  mode: 'online' | 'offline' | 'hybrid';
  bannerImage?: string;
  images: string[];
  registrationOpen: boolean;
  registrationDeadline?: Date;
  maxParticipants?: number;
  teamSize?: {
    min: number;
    max: number;
  };
  registrations: Array<{
    userId: mongoose.Types.ObjectId;
    teamName?: string;
    registeredAt: Date;
    attended: boolean;
  }>;
  prizes?: string;
  schedule?: string;
  contact?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  reportContent?: string;
  winners?: Array<{
    position: number;
    teamName: string;
    members: string[];
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['workshop', 'hackathon', 'contest', 'talk', 'other'], required: true },
    team: { type: String, enum: ['programming', 'development', 'both'], required: true },
    date: { type: Date, required: true },
    endDate: { type: Date },
    venue: { type: String, required: true },
    mode: { type: String, enum: ['online', 'offline', 'hybrid'], required: true },
    bannerImage: { type: String },
    images: [{ type: String }],
    registrationOpen: { type: Boolean, default: true },
    registrationDeadline: { type: Date },
    maxParticipants: { type: Number },
    teamSize: {
      min: { type: Number },
      max: { type: Number },
    },
    registrations: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        teamName: String,
        registeredAt: { type: Date, default: Date.now },
        attended: { type: Boolean, default: false },
      },
    ],
    prizes: { type: String },
    schedule: { type: String },
    contact: { type: String },
    status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' },
    reportContent: { type: String },
    winners: [
      {
        position: Number,
        teamName: String,
        members: [String],
      },
    ],
  },
  { timestamps: true }
);

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;
