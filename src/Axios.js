const axios = require("axios");

const Axios = axios.create({
  baseURL: "http://3.18.223.248:8888",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
