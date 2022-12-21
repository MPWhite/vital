import * as cluster from 'cluster';

export type BoulderSend = {
  userId: string;
  userProfilePicUrl: string;
  userName: string;
};

export type BoulderResponse = {
  id: string;
  name: string;
  primaryPhotoUrl: string;
  active: boolean;
  xLocation: number;
  yLocation: number;
  namedBy?: string;
  sends: Array<BoulderSend>;
  tags: Array<string>;
  location: string;
};

export type BoulderDescription = {
  id: string;
  name: string;
  primaryPhotoUrl: string;
  rating: string;
  holdColor: string;
  xLocation: number;
  yLocation: number;
  namedBy?: string;
  tags: Array<string>;
  location: string;
};

export type BouldersResponse = Array<BoulderDescription>;
