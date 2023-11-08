import axios from "axios";
const apiBase = 'https://46be-188-13-243-49.ngrok-free.app/api/v1/app-service';
const apiBaseForProxy = 'api/v1/app-service';

const axiosInstance  =  axios.create({
    baseURL: apiBaseForProxy,
    headers: {
        'ngrok-skip-browser-warning': '69420'
    }
})

export const getAllApps = (pageNumber = 0, pageSize = 25) =>{
    const body = {
        pageNumber,
        pageSize
    }
     return axiosInstance.put('/get-apps', body)
}

export const getAppOverview = (appId: string) =>{
    return axiosInstance.get(`/get-app-overview/${appId}`)
}


export const getAppUsers = (appId: string) =>{
    return axiosInstance.get(`/get-app-overview-users/${appId}`)
}
