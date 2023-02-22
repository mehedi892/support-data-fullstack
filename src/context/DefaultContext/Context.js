import jwt_decode from "jwt-decode";
import React, { createContext, useState } from 'react';
export const DefaultContext = createContext(null);

function Context({children}) {
  const getLoginObj = localStorage.getItem('loginToken');
  let decodeUser = {}
  if(getLoginObj){
   decodeUser = jwt_decode(getLoginObj)
  }else{
    decodeUser ={}
  }
  console.log(decodeUser)
  const [addStoreTitle, setaAdStoreTitle] = useState({reviewAsk:'yes',reviewGiven:'no',currMonth:new Date().getMonth() + 1,currYear: new Date().getFullYear()});

  const [dataTemp,setDataTemp] = useState({login:decodeUser});



  const contextVal ={addStoreTitle, setaAdStoreTitle,dataTemp,setDataTemp}


  return (
    <DefaultContext.Provider value={contextVal}>
    {children}
    </DefaultContext.Provider>
  )
}

export default Context;
