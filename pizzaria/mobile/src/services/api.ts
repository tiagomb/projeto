import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.56.233.98:3333'
})

export { api };