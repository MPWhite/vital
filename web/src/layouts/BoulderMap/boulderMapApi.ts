import { BouldersResponse } from "@backend/boulders.types";

export const fetchBoulders = async (): Promise<BouldersResponse> => {
  const res = await fetch(`/api/boulders`);
  return res.json();
};
