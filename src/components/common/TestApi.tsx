import requestFunction from "../../api";
import { useEffect } from "react";

const TestApi = () => {
    useEffect(() => {
        requestFunction().then((data) => {
            console.log("success: ", data)
        }).catch((error) => {
            console.log("error : ", error)
        })
    }, [])

    return <div>testing api component</div>
}

export default TestApi