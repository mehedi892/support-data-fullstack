import { useEffect, useState } from "react";


const useCurrentMonth = () => {
    const [month, setMonth] = useState('');

    useEffect(() => {
        let today = new Date();


        const getmonth = today.toLocaleString('default', { month: 'long' }).toLowerCase();

        setMonth(getmonth);
    }, []);

    return [month, setMonth]


}

export default useCurrentMonth