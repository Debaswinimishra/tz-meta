import axios from "axios";
// const baseURL = "http://localhost:3001/";
const baseURL = "https://thinkzone.in.net/thinkzone/meta/";
// const baseURL = "https://thinkzone.co/thinkzone";

export const Version = {
  version: "1.0",
};

export default axios.create({
  baseURL,
});
