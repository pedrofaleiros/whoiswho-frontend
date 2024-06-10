import axios from "axios";
import { BASE_URL } from "./api";

interface AuthParams {
    username: string
    password: string
}

export const createUserService = async () => {
    try {
        const res = await axios.post(`${BASE_URL}/auth`)
        return res.data
    } catch (error) {
        throw error;
    }
}

export const sessionUserService = async (userId: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/auth/session/${userId}`)
        return res.data
    } catch (error) {
        return null
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
        throw error;
    }
}

// export const loginService = async (p: AuthParams) => {
//     try {
//         const res = await axios.post(`${BASE_URL}/auth`, {
//             username: p.username,
//             password: p.password,
//         });

//         return res.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const signupService = async (p: AuthParams) => {
//     try {
//         const res = await axios.post(`${BASE_URL}/auth/signup`, {
//             username: p.username,
//             password: p.password,
//         });

//         return res.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const sessionService = async (token: string) => {
//     try {
//         const res = await axios.post(
//             `${BASE_URL}/session`,
//             {},
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         );

//         return res.data;
//     } catch (error) {
//         throw error;
//     }
// };
