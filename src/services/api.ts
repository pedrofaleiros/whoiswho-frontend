import axios from "axios";

export const BASE_URL: string = "http://172.30.4.48:8080";
// export const BASE_URL = "http://192.168.0.129:8080";
// export const BASE_URL = "http://ec2-54-233-244-221.sa-east-1.compute.amazonaws.com:8080";

interface AuthParams {
  username: string
  password: string
}

export const loginService = async (p: AuthParams) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth`, {
      username: p.username,
      password: p.password,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const signupService = async (p: AuthParams) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/signup`, {
      username: p.username,
      password: p.password,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const sessionService = async (token: string) => {
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
