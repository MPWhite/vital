export type BoulderAttemptDescription = {
  id: string;
  name: string;
  rating: string;
  attempts: number;
  completionTime: Date;
};

export type UserResponse = {
  id: string;
  email: string;
  displayName: string;
  profilePicUrl: string;
  completedBoulderDescriptions: Array<BoulderAttemptDescription>;
};
