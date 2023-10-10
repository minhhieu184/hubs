import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const productionURL = "https://hub-server.mystg-env.com";
const developmentURL = "https://hub-server.mystg-env.com";
// const developmentURL = "http://localhost:4040";
const URL = process.env.NODE_ENV === "production" ? productionURL : developmentURL;
console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
console.log("URL:", URL);

// const socket = io(URL, { autoConnect: false });
const socket = io(URL, { autoConnect: false });

export { socket };
