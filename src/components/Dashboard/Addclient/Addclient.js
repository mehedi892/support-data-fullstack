import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DefaultContext } from "../../../context/DefaultContext/Context";
import useGetMonthSummaryData from "../../../hooks/useGetMonthSummaryData";

import "./Addclient.css";

const Addclient = () => {
  const navigate = useNavigate();
  const [getMonthSummary] = useGetMonthSummaryData();
  const {addStoreTitle,setaAdStoreTitle} = useContext(DefaultContext);


  const {currMonth,currYear} = addStoreTitle;
 
  //client data get and create oibject
  const handleAddClient = (e) => {
   
    e.preventDefault();
    

    const storeUrl = e.target.storeUrl.value.trim();
    const bType = e.target.bType.value;
    const reasonFromGivRev = e.target.reasonFromGivRev.value.trim();
    const reasonFromAskRev = e.target.reasonFromAskRev.value.trim();
    const reviewGiven = e.target.reviewGiven.value;
    const reviewAsk = e.target.reviewAsk.value;
    const comment = e.target.comment.value;
    const noOfCalls = e.target.noOfCalls.value;
    const app = e.target.selectApp.value;
    const callThisMonth = parseInt(1);

    const newClient = {
      storeUrl,
      app,
      bType,
      reasonFromGivRev,
      reasonFromAskRev,
      reviewGiven,
      reviewAsk,
      comment,
      noOfCalls,
      callThisMonth,
    };
 

    // variable with condition for summary data
    const uniqueCalls = getMonthSummary.error 
    ? 1 
    : getMonthSummary?.summary?.uniqueCalls + 1;

    let totalAskRev = !getMonthSummary.error ? getMonthSummary?.summary?.totalAskRev : parseInt(0);
    totalAskRev = (reviewAsk === "yes") ? totalAskRev + 1 : totalAskRev;
   


    let totalReviewGive = !getMonthSummary.error ? getMonthSummary?.summary?.totalReviewGive : parseInt(0);
      totalReviewGive = (reviewGiven === "yes") ? totalReviewGive + 1 : totalReviewGive;

     

      
    let totalStore = getMonthSummary.error
     ? 1 
     : getMonthSummary?.summary?.totalStore + 1;
    
     let totalCallCurrMonth = getMonthSummary.error
     ? 1 
     : getMonthSummary?.summary?.totalCallCurrMonth + 1;
     
    const summaryObj = {
      uniqueCalls,
      totalAskRev,
      totalReviewGive,
      totalStore,
      totalCallCurrMonth
     
    };

    //post data to client  api

    fetch("http://localhost:5001/api/client", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newClient),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.existsClient){
          toast.success(data.message);
          setaAdStoreTitle({
            ...addStoreTitle,
            storeTitle: '',
          });
          upSummaryFnc();
        }else{
          toast.warn(data.error)
          
       
        }
        
      })
      .catch(error =>{
        toast.error('Something went wrong');
      })

    //post data to summary API
    const upSummaryFnc = () =>{

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
         navigate('/')
        toast.success('Updated Summary');
       setaAdStoreTitle({...addStoreTitle,reviewAsk:'yes',reviewGiven:'no'});
      }
      else{
        console.log(data)
        toast.warn('Summary updated failed');
      }
        
        
    })
    .catch(error =>{
      toast.error('Something went wrong')
    })
  }

  };
  console.log(addStoreTitle);

  return (
    <div className="form-container">
      <h3 className="addClienttitle title text-center">
       
        {addStoreTitle.storeTitle
          ? `StoreUrl: ${addStoreTitle.storeTitle} App: ${addStoreTitle.app}`
          : 'Add New Client'}
      </h3>
      <form onSubmit={handleAddClient}>
        <div className="storeUrl flex-column">
          <label htmlFor="storeUrl">Store URL</label>
          <input
            type="text"
            name="storeUrl"
            required
            placeholder="ADD Sotr URL"
            defaultValue={addStoreTitle.storeTitle}
          />
        </div>

        <div className="businessType flex-column">
          <label htmlFor="bType">Business Type</label>
          <input
            required
            type="text"
            name="bType"
            placeholder="Business Type(ex. cloths,car)"
          />
        </div>

        <div className="comment flex-column">
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            name="comment"
            placeholder="Add additional info about client/ Optional"
          />
        </div>
        <div className="noOfcalls flex-column">
          <label htmlFor="noOfCalls">No Of calls</label>
          <input
            type="number"
            name="noOfCalls"
            placeholder="Type Number"
            defaultValue="1"
          />
        </div>
        <div className="inputConditionGroup">
          <h4>Review Asked</h4>
          <div className="reviewAskDiv flex-row">
            <div className="reviewAskYesDiv">
              <input
                type="radio"
                onChange={(e) => {
                  setaAdStoreTitle({
                    ...addStoreTitle,
                    reviewAsk: e.target.value,
                  });
                }}
                name="reviewAsk"
                id="reviewAskY"
                value="yes"
                defaultChecked ={addStoreTitle.reviewAsk === 'yes' ? true : false}
              />
              <label>Yes</label>

              <div className="reviewGivenDiv">
                <h4>Review Given</h4>
                <div className="flex-row">
                  <div className="reviewGivenYes">
                    <input
                      type="radio"
                      onChange={(e) => {
                        setaAdStoreTitle({
                          ...addStoreTitle,
                          reviewGiven: e.target.value,
                        });
                      }}
                      name="reviewGiven"
                      id="reviewGivenY"
                      value="yes"
                      defaultChecked ={addStoreTitle.reviewGiven === 'yes' ? true : false}
                    />
                    <label>Yes</label>
                    <div className="reviewGivenCele">
                      <h5 className="">
                        Your hard work and perseverance have paid off.
                        Congratulations!
                      </h5>
                    </div>
                  </div>
                  <div className="reviewGivenNo">
                    <input
                      type="radio"
                      onChange={(e) => {
                        setaAdStoreTitle({
                          ...addStoreTitle,
                          reviewGiven: e.target.value,
                        });
                      }}
                      name="reviewGiven"
                      id="reviewGivenN"
                      value="no"
                      defaultChecked ={addStoreTitle.reviewGiven === 'no' ? true : false}
                    />
                    <label>No</label>
                    <div className="reasonDiv">
                      <input
                        type="text"
                        name="reasonFromGivRev"
                        required={
                          addStoreTitle.reviewGiven === "no" ? true : false
                        }
                        placeholder="Write a reason for not given"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="reviewAskNoDiv">
              <input
                type="radio"
                onChange={(e) => {
                  setaAdStoreTitle({
                    ...addStoreTitle,
                    reviewAsk: e.target.value,
                  });
                }}
                name="reviewAsk"
                id="reviewAskN"
                value="no"
                defaultChecked ={addStoreTitle.reviewAsk === 'no' ? true : false}
              />
              <label>No</label>
              <div className="reasonDiv">
                <input
                  type="text"
                  name="reasonFromAskRev"
                  required={addStoreTitle.reviewAsk === "no" ? true : false}
                  placeholder="Write a reason for not Asking"
                />
              </div>
            </div>
          </div>
          <div className="selectApp">
            <label>Select App</label>
            <select defaultValue={addStoreTitle.app} name="selectApp">
              <option value="ib">Inkybay</option>
              <option value="mv">Multivariants</option>
              <option value="dr">Discount Ray</option>
            </select>
          </div>
        </div>

        <div className="submitBtnDiv">
          <input className="btn" type="submit" value="Add Client" />
        </div>
      </form>
    </div>
  );
};

export default Addclient;
