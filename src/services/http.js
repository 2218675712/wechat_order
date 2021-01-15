import axios from "axios";

export default axios
axios.interceptors.request.use((config) => {
    return config
})
axios.interceptors.response.use((res) => {
    return res.data
})
