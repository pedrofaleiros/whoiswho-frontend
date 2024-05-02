import axios from "axios";
import { PlaceModel } from "../models/PlaceModel";

export const BASE_URL: string = "http://172.30.4.48:8080";
// export const BASE_URL: string = "http://192.168.0.130:8080";
// export const BASE_URL = "http://ec2-54-233-244-221.sa-east-1.compute.amazonaws.com:8080";

export const createRoomService = async (token: string) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/room`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getPlacesService = async (token: string, text: string | null): Promise<PlaceModel[]> => {
  try {
    const res = await axios.get(
      `${BASE_URL}/place${text === null ? "" : `?name=${text}`}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    return res.data
  } catch (error) {
    throw error
  }
}