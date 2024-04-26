import axios from "axios";

const BASE_URL = "http://172.30.4.48:8080";

export const loginService = async (username, password) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth`, {
      username,
      password,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const sessionService = async (token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/session`,
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
