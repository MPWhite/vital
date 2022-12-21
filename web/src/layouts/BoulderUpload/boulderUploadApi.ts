import axios from "axios";

export const createBoulder = async (boulder: {
  xLocation: number;
  yLocation: number;
  location: string;
  rating: string;
  holdColor: string;
  file: File;
}) => {
  const response = await axios.post(
    "/api/boulders/create",
    {
      xLocation: boulder.xLocation.toString(),
      yLocation: boulder.yLocation.toString(),
      location: boulder.location,
      rating: boulder.rating,
      holdColor: boulder.holdColor,
      file: boulder.file,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
