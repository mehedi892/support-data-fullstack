import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DefaultContext } from '../../context/DefaultContext/Context';

import './Summary.css';

const Summary = () => { 
    const {dataTemp} = useContext(DefaultContext);
    const [getSUmmaryData, setGetSummaryData] = useState({});
    const currMonth = new Date().getMonth() + 1;
    const currYear = new Date().getFullYear();
    let fullDate = currYear+'-'+currMonth;
    const [getDate,setGetDate] = useState(fullDate);
  const navigate = useNavigate();
    const otherMonth = getDate?.split('-')[1]?.charAt( 0 ) === '0' ?getDate?.split('-')[1]?.slice( 1 ) :getDate?.split('-')[1] ;
    const otherYear = getDate?.split('-')[0];

 



    useEffect(() => {
const url = `http://localhost:5001/api/summary/${otherMonth}-${otherYear}`;
console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setGetSummaryData(data);
                console.log(data);
              
            })
            .catch(error =>{
             
            })

    }, [getDate,otherMonth,otherYear]);
   


    //rest button handler

    const handleReset = () =>{
        let noOfCalls = 0;
        let callThisMonth = 0;

      const updateData = {noOfCalls:noOfCalls,callThisMonth:callThisMonth};

        //sending data to backend
        if(window.confirm('Are you sure !!!!')){
        fetch('http://localhost:5001/api/client',{
            method: 'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
        .then(res => res.json())
        .then(data => {
            if(data.updatedClients.acknowledged){
                toast.success('Reset Successful');
                navigate('/');
            }else{
                toast.warn('Reset Unsuccessful')
            }
        })
        .catch(error =>{
            toast.error('Something wrong')
        })
    }else{
        toast.warn('You have selected No !!!!')
    }


    }

    //conditional destructure from summary API data
const {totalAskRev,totalCallCurrMonth,totalReviewGive,totalStore,uniqueCalls} = getSUmmaryData.summary !== undefined  && getSUmmaryData?.summary;

    return (
        <div className='summary-conatiner'>
            <h2>Total Summary : {getSUmmaryData.message ? getSUmmaryData.message  :getSUmmaryData?.monthName} </h2>
            <div className='search-summary-container'>

                <form>

                    <input defaultValue={currMonth.toString().length === 1 ? currYear+'-'+0+currMonth:currYear+'-'+currMonth} type="month" onBlur={(e)=> setGetDate(e.target.value) } name="date" id="" />

                </form>
                {dataTemp.login.role === 'admin' && <button onClick={handleReset} className='btn resetBtn'>Reset</button>}
              
            </div>
            <div className="cards-list">
                <div className="card">
                    <div className="card_image"></div>
                    <div className="card_title title-white">
                        <p>Total Call:</p>
                        <h3>{totalCallCurrMonth !== undefined ? totalCallCurrMonth : 0}</h3>
                    </div>
                </div>
                <div className="card">
                    <div className="card_image"> </div>
                    <div className="card_title title-white">
                        <p>Unique calls:</p>
                        <h3>{uniqueCalls !== undefined ? uniqueCalls : 0}</h3>
                    </div>
                </div>

                <div className="card">
                    <div className="card_image"> </div>
                    <div className="card_title title-white">
                        <p>Total Ask Review:</p>
                        <h3>{totalAskRev !== undefined ? totalAskRev : 0}</h3>
                    </div>
                </div>

                <div className="card">
                    <div className="card_image"> </div>
                    <div className="card_title title-white">
                        <p>Total Given Review:</p>
                        <h3>{totalReviewGive !== undefined ? totalReviewGive : 0}</h3>
                    </div>
                </div>

                <div className="card">
                    <div className="card_image"> </div>
                    <div className="card_title title-white">
                        <p>Total Store:</p>
                        <h3>{totalStore !== undefined ? totalStore : 0}</h3>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Summary;