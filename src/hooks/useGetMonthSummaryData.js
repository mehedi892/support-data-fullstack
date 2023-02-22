import { useContext, useEffect, useState } from "react";
import { DefaultContext } from "../context/DefaultContext/Context";



const useGetMonthSummaryData = () => {

    const [getMonthSummary, setGetMonthSummary] = useState({});
    const {addStoreTitle} = useContext(DefaultContext);
    const {currMonth,currYear} = addStoreTitle;
    useEffect(() => {
        const url = `http://localhost:5001/api/summary/${currMonth}-${currYear}`;
  
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        setGetMonthSummary(data);
                        console.log(data);
                      
                    })
                    .catch(error =>{
                     console.log(error);
                    })
        
            }, [currMonth,currYear]);

    return [getMonthSummary, setGetMonthSummary]
}

export default useGetMonthSummaryData