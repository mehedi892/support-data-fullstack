import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DefaultContext } from '../../../context/DefaultContext/Context';
import useGetClientCount from '../../../hooks/useGetClientCount';
import useGetClientData from '../../../hooks/useGetclientData';
import Loader from '../../Loader/Loader';

import './Content.css';
import Tabledata from './Table/Tabledata/Tabledata';
;

const Content = () => {
    //for pagination
    const [clientCount] = useGetClientCount()
    const [page,setPage] = useState(0);
    const [size,setSize] = useState(10);

    const pages = Math.ceil(clientCount/size)

    const {addStoreTitle, setaAdStoreTitle} = useContext(DefaultContext);
    const [monthName,setMonthName] = useState('');
    const navigate = useNavigate();
    //load data from API

    const [clients, setClients] = useState([]);
    const [allCLient] = useGetClientData();
   
    const [deleteClient,setDeleteClient] = useState([]);
    //filter search result and set state
    const [searchEmpty, setSearchEmpty] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const [searchNotFoundAdd, setSearchNotFoundAdd] = useState(false);
    //increase call this month state
    const [callThisMonth, setCallThisMonth] = useState({});
    //call summary API current month  state
    const [getMonthSummaryData, setGetMonthSummaryData] = useState({});
    // loading spiner
    const [loading,setLoading] = useState(true);
      
    const {currMonth,currYear} = addStoreTitle;
    
    useEffect(() => {
        fetch(`http://localhost:5001/api/client/?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setClients(data);
                setSearchEmpty(data)
                setLoading(false)
            })
            

    }, [callThisMonth,deleteClient,page,size]);


    useEffect(()=>{
        fetch(`http://localhost:5001/api/summary/${currMonth}-${currYear}`)
        .then(res => res.json())
        .then(data => {
            if(data.summary){
            setGetMonthSummaryData(data.summary);
            setMonthName(data.monthName)
            }
            else{
                setGetMonthSummaryData(data)
            }
        })
        .catch(error =>{
            setGetMonthSummaryData(error)
        })
    },[currMonth,currYear,callThisMonth]);


    //increase call count by increasing no of class
//console.log('getMonthSummaryData', getMonthSummaryData);
    const handleCallThisMonth = (clickClientId) => {
        
        
        const getUpdateClientCall = clients.find(client => client._id === clickClientId);
        const increaseCalls = parseInt(getUpdateClientCall.noOfCalls) + 1;
        const callThisMonth = getUpdateClientCall.callThisMonth === 0 ? getUpdateClientCall.callThisMonth + 1 : getUpdateClientCall.callThisMonth;
        const newUpdatedObj = { noOfCalls: increaseCalls,callThisMonth}
        console.log(newUpdatedObj);
       
       if(window.confirm('Are you sure want to increase')){
        //post client id to server
        const url = `http://localhost:5001/api/client/${clickClientId}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUpdatedObj)

        })
            .then(res => res.json())
            .then(data => {

                setCallThisMonth(data);
                console.log(data)
            })
            .catch(error =>{
                console.log(error);
            })

             // update data to summary API total call and total store count
            
            let totalStore = getMonthSummaryData.error ? parseInt(0) : getMonthSummaryData?.totalStore; 

             totalStore = getUpdateClientCall.callThisMonth === 0 ?  totalStore + 1 : totalStore;
             console.log('call this month',getMonthSummaryData.totalStore);

            const totalCallCurrMonth = getMonthSummaryData.error ?  1 : getMonthSummaryData?.totalCallCurrMonth + 1; 
            
             const updateSummaryData = {totalStore,totalCallCurrMonth}
               //update data to summary API
 
         fetch(`http://localhost:5001/api/summary/${currMonth}-${currYear}`,{
             method:'PUT',
             headers:{
                 'content-type': 'application/json'
             },
             body: JSON.stringify(updateSummaryData)
         })
         .then(res => res.json())
         .then(data => {
            if(data.result.acknowledged){
                toast.success('Updated Data and Call Successfully')
            }
            else{
                toast.error('Data Not Updated Successfully')
            }
         });

       }else{
        toast.warn('You have selected No',{
          
        })
       }
    }

const deleteClientTopage = (id) =>{
    if(window.confirm('Are you sure? want to Delete!!!')){
    fetch(`http://localhost:5001/api/client/${id}`,{
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
        if(data.length > 0){
        setDeleteClient(data)
        toast.success('Deleted Successfully')
    }
    })
    .catch(error =>{
        console.log(error);
    })
}else{
    toast.warn('You have selected NO !!!!')
}

}

    //get search text state




    //getting search value

    const handleSearchText = e => {
        const inputValue = e.target.value.trim().toLowerCase();

        if (inputValue === '') {
            setClients(searchEmpty);
        }
        else {

            const filterSearch = allCLient.filter(searchRes => searchRes.storeUrl.toLowerCase().includes(inputValue) && searchRes.storeUrl.toLowerCase() === inputValue);
            if (filterSearch.length > 0) {
                setClients(filterSearch);
                setSearchNotFoundAdd(false);

            } else {
                setSearchNotFoundAdd(true);
            }
        }


        setSearchVal(inputValue);

    }

    const getAppSelectdata =(e)=>{
        setaAdStoreTitle({...addStoreTitle,app:e.target.value});
    }
    const serachNotFoundToAddClient = () => {
        setaAdStoreTitle({...addStoreTitle,storeTitle:searchVal});
        
        'app' in addStoreTitle && navigate('/addclient');
        
    }

  
  
 console.log(loading);
  

    return (
        <div className='content-container'>
             {loading ? <Loader></Loader> : ''}
            <div>
               <div className='summaryShowDashboardMainDiv'>
                    <h2>{monthName}</h2>
                    <div className='summaryShowDashboard'>
                    <p><span>Total Unique calls</span> {getMonthSummaryData?.uniqueCalls ?getMonthSummaryData?.uniqueCalls : 0 }</p>
                        <p><span>Total Ask reviews</span>{getMonthSummaryData?.totalAskRev}</p>
                        <p><span>Total Given review</span>{getMonthSummaryData?.totalReviewGive}</p>
                        <p><span>Total Store call this Month</span> {getMonthSummaryData?.totalStore}</p>
                        <p><span>Total Call This Month</span>{getMonthSummaryData?.totalCallCurrMonth}</p>
                    </div>
                       
                    </div>
            </div>
       


           <div className="search-container">
                <input defaultValue={searchVal} onChange={handleSearchText} type="text" name="searchtext" className="textbox" placeholder="Search store URL" />

                <div className="searchResutDiv">
                    <div style={{ display: searchNotFoundAdd && searchVal !== '' ? 'block' : 'none' }}>
                        <p className='wantToaddP'>No exact match . Want to add as unique Store: <span>{searchVal} </span></p>

                        <form className='selectAppSearch' onChange={getAppSelectdata}>
                            <label>Select App : </label>
                            <input type="radio" defaultChecked={addStoreTitle.app === 'ib' ? true : false} name="selectApp" id="" value='ib' />
                            <label>IB</label>
                            <input type="radio" defaultChecked={addStoreTitle.app === 'mv' ? true : false} name="selectApp" id="" value='mv' />
                            <label>MV</label>
                            <input type="radio" defaultChecked={addStoreTitle.app === 'dr' ? true : false} name="selectApp" id="" value='dr' />
                            <label>DR</label>
                        </form>
                            {
                                'app' in addStoreTitle || <h3 className='selctAppWarning'>Please Select App</h3> 
                            }
                        <button className='btn' onClick={serachNotFoundToAddClient}>Add as a New</button>


                    </div>

                    <div className='searchFoundStoreDiv' style={{ display: searchEmpty.length > 0 && searchVal !== '' ? 'block' : 'none' }}>
                        <h4>Store Found/Partially Matched: <span>{clients.length}</span></h4>
                    </div>
                </div>
            </div>

            <div className='tableParent'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>App</th>
                            <th>Store URL</th>
                            <th>B.Type</th>
                            <th>No. of Calls</th>
                            <th>Review Asked</th>
                            <th>Review Given</th>
                            <th>Called This Month</th>
                            <th>Reason</th>
                            <th>Comment</th>
                            <th>Upadate/Delete</th>
                            <th>Call this month</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            
                            clients.map(client => <Tabledata
                                clients={clients}
                                key={client._id}
                                client={client}
                                handleCallThisMonth={handleCallThisMonth}
                                deleteClientTopage = {deleteClientTopage}
                                
                             
                            ></Tabledata>)
                        }
                    </tbody>
                </table>
            </div>
            <div className='pagination'>
               <div className='pageNum'>
                {
                    [...Array(pages).keys()].map(pageNum => <button
                    key={pageNum}
                    onClick={()=>{setPage(pageNum);setLoading(true)} }
                    className = {page === pageNum ? 'selected' : ''}
                    >
                        {pageNum}
                    </button>)
                }
                </div>
                <div className='pageSize'>
                    <select defaultValue={'10'} onChange={event => setSize(event.target.value)} name="size" >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Content;