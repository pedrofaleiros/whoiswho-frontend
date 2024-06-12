import axios, { isAxiosError } from "axios";
import { BASE_URL } from "./api";

export const createUserService = async () => {
    try {
        const res = await axios.post(`${BASE_URL}/auth`)
        return res.data
    } catch (error) {
        return null
    }
}

export const sessionUserService = async (userId: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/auth/session/${userId}`)
        return res.data
    } catch (e) {
        return null;
    }
}

export const updateUsernameService = async (userId: string, username: string) => {
    try {
        const res = await axios.put(
            `${BASE_URL}/auth/${userId}`,
            { username: username },
        )
        return res.data
    } catch (error) {
        if (isAxiosError(error) && error.response?.data.message) {
            return {
                message: error.response.data.message
            }
        }
    }
}
