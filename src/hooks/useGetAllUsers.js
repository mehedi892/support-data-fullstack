import { useEffect, useState } from "react";


const useGetAllUsers = () => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        fetch('http://localhost:5001/api/user/')
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(error => {
            console.log(error)
        })
    }, []);

    return [users, setUsers]


}

export default useGetAllUsers