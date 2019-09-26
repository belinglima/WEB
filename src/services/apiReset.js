import axios from "axios";

const apiReset = axios.create({
    baseURL: "https://pizzabreakapi.herokuapp.com/"
});

export default apiReset;
