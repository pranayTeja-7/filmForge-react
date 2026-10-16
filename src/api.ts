import { ApiError } from "./errors/ApiError";

const requestFunction = async () => {
    const response = await fetch("http://localhost:3000/auth/me", {
        method: "get",
        credentials: "include",
    })

    const data = await response.json();

    if(response.ok === false){
        throw new ApiError(response.status, data.message)
    }

    return data;

}

export default requestFunction