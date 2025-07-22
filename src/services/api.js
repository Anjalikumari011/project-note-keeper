import axios from "axios"; //You're using the Axios library to send HTTP requests (like GET, POST) from your React app.

const api = axios.create({
    baseURL: "https://notekeeper-mrsi.onrender.com",
});
//This creates a custom tool called api.
//All requests will go to this base URL (your server address).

api.interceptors.request.use((config) =>{
    const user =JSON.parse(localStorage.getItem("user"));
    if(user?.token){
        config.headers.Authorization=`Bearer ${user.token}`;
    }
    return config;
});
//It checks if a user is logged in by reading from localStorage.
// If the user has a token (from login), it adds it to the request header like this:

export default api;