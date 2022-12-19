import { BoulderResponse } from "@backend/boulders.types";
import axios from "axios";

export const fetchBoulder = async (id: string): Promise<BoulderResponse> => {
  const res = await fetch(`/api/boulders/${id}`);
  return res.json();
};

export const attemptBoulder = async (id: string): Promise<void> => {
  await axios.post(`/api/boulders/${id}/attempt`);
};

export const completeBoulder = async (id: string): Promise<void> => {
  await axios.post(`/api/boulders/${id}/complete`);
};
