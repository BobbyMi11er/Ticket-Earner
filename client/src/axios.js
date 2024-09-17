import axios from "axios";

// this should be either the elastic.IP/api/ OR localhost:ServerPort if testing locally
// i.e. if theres not nginx there as a reverse proxy
const axiosInstance = axios.create({
    baseURL: `http://ELASTIC.IP/api`,
})

export default axiosInstance;
