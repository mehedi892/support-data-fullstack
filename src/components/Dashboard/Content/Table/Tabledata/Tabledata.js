import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultContext } from '../../../../../context/DefaultContext/Context';
import count_icon from '../../../../../imageIcon/count_icon.svg';
import delete_icon from '../../../../../imageIcon/delete_icon.svg';
import logoDr from '../../../../../imageIcon/logoDr.png';
import logoIb from '../../../../../imageIcon/logoIb.png';
import logoMv from '../../../../../imageIcon/logoMv.png';
import update_icon from '../../../../../imageIcon/update_icon.svg';

const Tabledata = ({client,handleCallThisMonth,deleteClientTopage,clients}) => {
    const navigate = useNavigate();
    const {dataTemp} = useContext(DefaultContext);
    const {_id,storeUrl,bType,noOfCalls,reviewAsk,reviewGiven,reasonFromAskRev,reasonFromGivRev,comment,callThisMonth,app} = client;
    const updateClientTopage = (storeurl) =>{
        navigate(`/upadteclient/${storeurl}`);
    }

    return (
        <tr>
        <td className='clSeriel'>{clients.indexOf(client) + 1}</td>
        <td className='appImg'>
            {app === 'ib' &&  <img src={logoIb} alt='ib' /> } 
            {app === 'mv' &&  <img src={logoMv} alt='mv' /> } 
            {app === 'dr' &&  <img src={logoDr} alt='dr' /> } 
        </td>
        <td className='clstoreUrl'>{storeUrl}</td>
        <td className='clbType'>{bType}</td>
        <td className='clNocalls'>{noOfCalls}</td>
        <td className='clrevAsk'>{reviewAsk}</td>
        <td className='clrevGiv'>{reviewGiven}</td>
        <td className='clCalledMonth'>
            <div title='Count' onClick={()=>handleCallThisMonth(_id)}>
            <img className='icon' src ={count_icon} alt='Count'/>
            </div></td>
        <td className='reason'>{reasonFromAskRev === '' ? reasonFromGivRev: reasonFromAskRev}</td>
        <td className='clComment'>{comment}</td>
        <td className='clBtnUpdateDel'>
            <div title='Update'  onClick={()=>updateClientTopage(storeUrl)}>
                <img className='icon' src={update_icon} alt='Update'/>
            </div>{
            dataTemp.login.role === 'admin' &&
            <div title='Delete'  onClick={()=>deleteClientTopage(_id)}>
            <img className='icon' src ={delete_icon} alt='Delete'/>
            </div>
            }</td>
        <td>{callThisMonth}</td>
    </tr>
    );
};

export default Tabledata;