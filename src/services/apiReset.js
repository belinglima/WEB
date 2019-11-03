import axios from "axios";

const apiReset = axios.create({
    baseURL: "http://localhost:3333"
});

export default apiReset;