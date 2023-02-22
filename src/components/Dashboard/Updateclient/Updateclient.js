import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DefaultContext } from '../../../context/DefaultContext/Context';
import useGetMonthSummaryData from '../../../hooks/useGetMonthSummaryData';

const Updateclient = () => {
    const { store } = useParams();
    const {addStoreTitle} = useContext(DefaultContext);
    const {currMonth,currYear} = addStoreTitle;
    const [updateClientData,setUpdateClientData] = useState({});
    //call custom hooks for summary data by month
    const [getMonthSummary] = useGetMonthSummaryData();
     //conditional destructure from summary API data

    useEffect(()=>{

        fetch(`http://localhost:5001/api/client/${store}`)
        .then(res => res.json())
        .then(data => {
            setUpdateClientData(data)
        })
        .catch(console.error())
        
    },[store]);
  
   const navigate = useNavigate();
console.log(updateClientData.reviewAsk);
    //client data get and create oibject 
    const handleUpdateClient = e => {
       
        e.preventDefault();
     
        

        const storeUrl = e.target.storeUrl.value.trim();
        const bType = e.target.bType.value;
        const reasonFromGivRev = e.target.reasonFromGivRev.value;
        const reasonFromAskRev = e.target.reasonFromAskRev.value;
        const reviewGiven = e.target.reviewGiven.value;
        const reviewAsk = e.target.reviewAsk.value;
        const comment = e.target.comment.value;
        const noOfCalls = e.target.noOfCalls.value;
        const app = e.target.selectApp.value;

        const updatedClient = { storeUrl, bType, reasonFromGivRev, reasonFromAskRev, reviewGiven, reviewAsk, comment, noOfCalls,app }



         // variable with condition for summary data

         let totalAskRev = !getMonthSummary.error ? getMonthSummary?.summary?.totalAskRev : parseInt(0);
         totalAskRev = (reviewAsk === "yes") ? totalAskRev + 1 : totalAskRev;
        
     
     
         let totalReviewGive = !getMonthSummary.error ? getMonthSummary?.summary?.totalReviewGive : parseInt(0);
           totalReviewGive = (reviewGiven === "yes") ? totalReviewGive + 1 : totalReviewGive;


            
         
         const summaryObj = {totalAskRev,totalReviewGive};
         console.log(summaryObj)
       // post data to api 

        fetch(`http://localhost:5001/api/client/${updateClientData._id}`,{
            method:'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedClient)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })

 
         // send updated data to API to upadte current data


        fetch(`http://localhost:5001/api/summary/${currMonth}-${currYear}`,{
            method:'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(summaryObj)
        })
        .then(res => res.json())
        .then(data => {
           
            if(data.result.acknowledged){
                toast.success('Updated Client Data  Successfully')
                 navigate('/')
            }
            else{
                toast.error('Data Not Updated Successfully')
            }
        });


    }
    
    return (
        <div className='form-container'>
            <h3 className='addClienttitle title text-center'> Update Client : {updateClientData.storeUrl} </h3>
            <form onSubmit={handleUpdateClient}>
                <div className="storeUrl flex-column">
                    <label htmlFor="storeUrl">Store URL</label>
                    <input type="text" name="storeUrl" placeholder='ADD Sotr URL' defaultValue={updateClientData.storeUrl} />
                </div>

                <div className="businessType flex-column">
                    <label htmlFor="bType">Business Type</label>
                    <input type="text" name="bType" placeholder='Business Type(ex. cloths,car)' defaultValue={updateClientData.bType} />
                </div>

                <div className="comment flex-column">
                    <label htmlFor="comment">Comment</label>
                    <input type="text" name="comment" placeholder='Add additional info about client' defaultValue={updateClientData.comment}/>
                </div>
                <div className="noOfcalls flex-column">
                    <label htmlFor="noOfCalls">No Of calls</label>
                    <input type="number" name="noOfCalls" placeholder='Type Number' defaultValue={updateClientData.noOfCalls} />
                </div>
                { updateClientData.reviewAsk !== undefined &&
                <div className="inputConditionGroup">
                    <h4>Review Asked</h4>
                    <div className="reviewAskDiv flex-row">
                        <div className="reviewAskYesDiv">
                            <input type="radio" name="reviewAsk" id="reviewAskY" value='yes'
                            defaultChecked ={updateClientData.reviewAsk === 'yes' ? true : false}
                            />
                            <label>Yes</label>

                            <div className="reviewGivenDiv">
                                <h4>Review Given</h4>
                                <div className='flex-row'>
                                    <div className="reviewGivenYes">
                                        <input type="radio" name="reviewGiven" id="reviewGivenY" value='yes' 
                                      defaultChecked = {updateClientData.reviewGiven === 'yes' ? true : false}
                                        />
                                        <label >Yes</label>
                                        <div className="reviewGivenCele">
                                            <h5 className=''>Your hard work and perseverance have paid off. Congratulations!</h5>
                                        </div>
                                    </div>
                                    <div className="reviewGivenNo">
                                        <input type="radio" name="reviewGiven" id="reviewGivenN" value='no' 
                                           defaultChecked = {updateClientData.reviewGiven === 'no' ? true : false}
                                        />
                                        <label >No</label>
                                        <div className="reasonDiv">
                                            <input type="text" name="reasonFromGivRev" placeholder='Write a reason for Not given review' defaultValue={updateClientData.reasonFromGivRev}
                                        
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="reviewAskNoDiv">
                            <input type="radio" name="reviewAsk" id="reviewAskN" value="no"
                           defaultChecked ={updateClientData.reviewAsk === 'no' ? true : false}
                            />
                            <label>No</label>
                            <div className="reasonDiv">
                                <input type="text" name="reasonFromAskRev" placeholder='Write a reason for not asking review' defaultValue={updateClientData.reasonFromAskRev} />
                            </div>
                        </div>
                    </div>
                    <div className="selectApp">
            <label>Select App</label>
            <select defaultValue={updateClientData.app} name="selectApp">
              <option value="ib">Inkybay</option>
              <option value="mv">Multivariants</option>
              <option value="dr">Discount Ray</option>
            </select>
          </div>
                </div>
                    }
                <div className='submitBtnDiv'>
                    <input className='btn' type="submit" value="Update Client" />
                </div>

            </form>
        </div>
    );
};

export default Updateclient;