import { ApiError } from "./errors/ApiError";

const requestFunction = async (apiUrl:string, options:RequestInit = {}) => {
    const response = await fetch(`http://localhost:3000/${apiUrl}`, {
        credentials: "include",
        ...options,
    })

    const data = await response.json();

    if(response.ok === false){
        if(response.status === 401){
            const refreshResponse = await fetch("http://localhost:3000/auth/refresh-token", {
                method: "POST",
                credentials: "include"
            })

            const refreshData = await refreshResponse.json();

            if(!refreshResponse.ok){
                throw new ApiError(refreshResponse.status, refreshData.message, data?.code)
            }

            if(refreshResponse.status === 200){
                const retriedResponse = await fetch(`http://localhost:3000/${apiUrl}`, {
                    credentials: "include",
                    ...options,
                })
                
                const retiredData = await retriedResponse.json();

                if(!retriedResponse.ok){
                    throw new ApiError(retriedResponse.status, retiredData.message, data?.code)
                }

                return retiredData;
            }
        }
        throw new ApiError(response.status, data.message, data?.code)
    }

    return data;

}

export default requestFunction