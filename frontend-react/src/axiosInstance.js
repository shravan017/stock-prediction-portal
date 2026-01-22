import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API
const axiosInstance = axios.create({
    baseURL : baseURL,
    headers :{
        'Content-Type':'application/json',
    } 
})

// Request interceptor to add auth token to headers
axiosInstance.interceptors.request.use(
    function(config){
        
        const accessToken = localStorage.getItem('access_token')
        if(accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
    },
    function(error){
        return Promise.reject(error);
    }
)

//Response Interceptorsto send refresh token to server and get new access token
axiosInstance.interceptors.response.use(
    function(response){
        return response;
    }, 
    // handle failed responses
    async function(error){
        const originalRequest = error.config
        if(error.response.status === 401 && !originalRequest.retry){
            originalRequest.retry = true
            const refreshToken = localStorage.getItem('refresh_token')
            try{
                const response = await axiosInstance.post('/token/refresh/', {refresh:refreshToken})
                //console.log('accesstoken ===>>',response.data.access)
                localStorage.setItem('access_token', response.data.access)
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
                return axiosInstance(originalRequest)
            }catch(error){
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                
            }
        }
        return Promise.reject(error);
    }
)


export default axiosInstance