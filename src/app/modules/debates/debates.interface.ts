import { Types } from "mongoose";

export interface IDebate {
  title: string;
  description: string;
  tags?: string[];
  category: string;
  bannerImage?: string;
  creator: Types.ObjectId; // Reference to User
  startTime?: Date;
  duration: number; // in hours
  status?: 'active' | 'closed';
  winningSide?: 'support' | 'oppose' | 'tie' | null;
  supportCount?: number;
  opposeCount?: number;
  participants?: {
    user: Types.ObjectId; // Reference to User
    side: 'support' | 'oppose';
  }[];
}
