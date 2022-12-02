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
};

export type BoulderDescription = {
  id: string;
  name: string;
  primaryPhotoUrl: string;
  rating: string;
  xLocation: number;
  yLocation: number;
  namedBy?: string;
};

export type BouldersResponse = Array<BoulderDescription>;
