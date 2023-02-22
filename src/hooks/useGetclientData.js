import { useEffect, useState } from "react";

const useGetClientData = () =>{
    const [allCLient,setAllClient] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5001/api/client')
        .then(res => res.json())
        .then(data => setAllClient(data))
        .catch(error => {
            console.log(error)
        })
    },[]);
    return [allCLient,setAllClient];
}

export default useGetClientData