import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:4040";
console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
console.log("URLasdasd:", URL);

// const socket = io(URL, { autoConnect: false });
const socket = io("https://hub-server.mystg-env.com", { autoConnect: false });

export { socket };
