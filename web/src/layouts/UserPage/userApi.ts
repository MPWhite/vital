import { UserResponse } from "@backend/users.types";

export const fetchUser = async (id: string): Promise<UserResponse> => {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
};
