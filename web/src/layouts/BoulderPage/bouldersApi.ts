import { BoulderResponse } from "@backend/boulders.types";

export const fetchBoulder = async (id: string): Promise<BoulderResponse> => {
  const res = await fetch(`/api/boulders/${id}`);
  return res.json();
};
