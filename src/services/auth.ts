import axios from "axios";
import { BASE_URL } from "./api";

export const createUserService = async () => {
    const res = await axios.post(`${BASE_URL}/auth`)
    return res.data
}

export const sessionUserService = async (userId: string) => {
    const res = await axios.post(`${BASE_URL}/auth/session/${userId}`)
    return res.data
}

export const updateUsernameService = async (userId: string, username: string) => {
    const res = await axios.put(
        `${BASE_URL}/auth/${userId}`,
        { username: username },
    )
    return res.data
}
