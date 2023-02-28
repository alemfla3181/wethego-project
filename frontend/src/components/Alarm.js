import axios from "axios";
import React,{useState, useEffect} from "react";

import { useSelector } from "react-redux";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Alarm = (props) =>{

  
  
  console.log('유저에요')
  console.log(props.user)


  useEffect(()=>{
    
      if(props.user.userData && props.user.userData.data.level === '승인'){
        // 알람용 SSE
        var eventSource = new EventSource(`/api/sse/alarm/${props.user.userData.data.no}`)
    
        eventSource.addEventListener( 'message',e=>{
          let data = JSON.parse(e.data);
          console.log(e.data)
          if ( data > 0 ){
            toast("알림이 있습니다.")
            axios.get(`/api/sse/alarm/reset/${props.user.userData.data.departmentNo}`).then(()=>{
              console.log('통신완')
            })

            
            window.addEventListener('beforeunload', ()=>{
              eventSource.close();
              axios.get(`/api/sse/ttt`).then(()=>{ });
              
            })
            console.log('요 적용됨')

          }

        })
  
      } 
      // eventSource.addEventListener('error', e=>{
      //   eventSource.close();
      //   console.log('연결이 종료되어떠요')
      // })


    


  },[])


  return (<>



  <ToastContainer
    position="bottom-right"
    autoClose={1000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    transition={Slide}

    onClick={()=>{alert('확인!')}}
    />



  </>)
}

export default Alarm;