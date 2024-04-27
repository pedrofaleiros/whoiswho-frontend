import io from "socket.io-client";
import { BASE_URL } from "./services/api";

const baseUrl = BASE_URL;

const socket = io(baseUrl, {
  autoConnect: false,
});

export default socket;
