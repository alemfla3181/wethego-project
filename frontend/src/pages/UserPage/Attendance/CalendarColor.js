import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CalendarColor =() => {

    return (
        <>
        <div style={{width:'100%',height:'90px',padding:'30px 4px 0px 0px'}}>
            <div>                                                                                       
                <div style={{width:'5%',fontWeight:'bold',float:'right',marginLeft:'5px'}}>합계</div><div style={{width:'5%', background:'#005282',float:'right',borderRadius:'3px'}}>ㅤ</div>
                <div style={{width:'7%',float:'right',fontWeight:'bold',marginLeft:'5px'}}>출근 시간</div><div style={{width:'5%', background:'#1471ef',float:'right',borderRadius:'3px'}}>ㅤ</div>
            </div>
            <div style={{clear:'both',float:'none'}}></div>
            <div style={{marginTop:'10px'}}>
                <div style={{width:'5%',float:'right',fontWeight:'bold',marginLeft:'5px'}}>휴가</div><div style={{width:'5%', background:'lightcoral',float:'right',borderRadius:'3px'}}>ㅤ</div>  
                <div style={{width:'7%',fontWeight:'bold',marginLeft:'5px',float:'right'}}>퇴근 시간</div><div style={{width:'5%', background:'#4B54DC',float:'right',borderRadius:'3px'}}>ㅤ</div>
            </div>
        </div>
        <div style={{clear:'both',float:'none'}}></div>
        </>
    )
}

export default CalendarColor