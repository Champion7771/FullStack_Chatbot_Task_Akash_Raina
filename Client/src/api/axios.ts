import axios from "axios";

const api = axios.create({
  baseURL: "https://fullstack-chatbot-task-akash-raina.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
