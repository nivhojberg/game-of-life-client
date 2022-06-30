import axios from "axios"
import { API_URL } from "./App/App";
import { InitStateRequest } from "./messages";

const Api = {
    getBoard: () => axios.get(API_URL),
    getNextStep: () => axios.get(API_URL + "next"),
    getResetBoard: () => axios.get(API_URL + "reset"),
    postInitialState: (body: InitStateRequest) => axios({
        method: "post",
        url: API_URL + "init",
        headers: { "Content-Type": "application/json" },
        data: body
    })
};

export default Api;
