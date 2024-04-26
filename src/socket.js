import io from "socket.io-client";

const socket = io("http://172.30.4.48:8080", {
  autoConnect: false,
});

export default socket;
