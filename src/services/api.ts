import axios from "axios";
import { PlaceModel } from "../models/PlaceModel";
import { CategoryModel } from "../models/CategoryModel";

export const BASE_URL: string = "https://backend-bv2updfska-rj.a.run.app";
// export const BASE_URL: string = "http://localhost:8080";

export const createRoomService = async (userId: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/room/${userId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getUserRoomService = async (userId: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/room/last/${userId}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getPlacesService = async (text: string | null): Promise<PlaceModel[]> => {
  try {
    const res = await axios.get(
      `${BASE_URL}/place${text === null ? "" : `?name=${text}`}`
    )
    return res.data
  } catch (error) {
    throw error
  }
}

export const getPlacesByCategoryService = async (categoryId: string): Promise<PlaceModel[]> => {
  try {
    const res = await axios.get(
      `${BASE_URL}/place/category/${categoryId}`
    )
    return res.data
  } catch (error) {
    throw error
  }
}

export const getCategoriesService = async (): Promise<CategoryModel[]> => {
  const res = await axios.get(`${BASE_URL}/category`)
  return res.data
}