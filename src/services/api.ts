import axios from "axios";
import { PlaceModel } from "../models/PlaceModel";
import { CategoryModel } from "../models/CategoryModel";

// export const BASE_URL: string = "http://192.168.0.129:8080";
// export const BASE_URL: string = "https://wiwback-jk7g6zx7pq-rj.a.run.app";
export const BASE_URL: string = "https://back-jk7g6zx7pq-rj.a.run.app";
// export const BASE_URL: string = "http://172.30.4.48:8080";

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

export const getUserRoomService = async (token: string) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/room/last`,
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

export const getPlacesByCategoryService = async (token: string, categoryId: string): Promise<PlaceModel[]> => {
  try {
    const res = await axios.get(
      `${BASE_URL}/place/category/${categoryId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    return res.data
  } catch (error) {
    throw error
  }
}

export const getCategoriesService = async (token: string): Promise<CategoryModel[]> => {
  try {
    const res = await axios.get(
      `${BASE_URL}/category`,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    return res.data
  } catch (error) {
    throw error
  }
}