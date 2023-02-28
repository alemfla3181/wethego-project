import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import Navigation from '../../../components/Navigation'
import TestNavigation from "../../../components/TestNavigation";
import Footer from '../../../components/Footer';

import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Paper from "@mui/material/Paper";
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from "react-redux";


const LandingPage = () => {


  const [count, setCount] = useState()

  // 유저 정보
  const userData = useSelector(state => state.user.userData)


  
  console.log('딤?')

  if(userData != null ){
    console.log(userData.data.no)
  }

  const fetchData = () =>{

    axios.get("/api/sseCount").then(res=>{
      console.log(res.data.data)
      setCount(res.data.data)
    })
    

  }


  const test = () =>{

    console.log('켜짐?')
    
    const eventSource = new EventSource(`/api/sse/${userData!=null ? userData.data.no : ''}`)
    eventSource.onmessage = event => {


      console.log(event)

      const p = document.createElement("p")
      

      if(event.data != null ){
        p.innerText = event.data
      toast('알림이 왔어요!!')


      // 알림 띄어 주고 나면 sse 0로 바꾸기
      // axios.post(`/api/sse/${userData!=null ? userData.data.no : ''}`)

      // fetchData();
      }

      document.getElementById("messages").appendChild(p)
    }

    eventSource.addEventListener('error', e=>{
      eventSource.close();
      console.log('연결이 종료되어떠요')
    })

    // eventSource.close();

  }



  const countUp = () => {

    axios.get("/api/sseUp").then(res=>{
      console.log("카운트 올림!")
    })

  }

  const countDown = () => {

    axios.get("/api/sseDown").then(res=>{
      console.log("카운트 내림!")
    })
    let k = new EventSource(`/api/sse`);
    k.close();
  }




  return (
  <>
    <TestNavigation />
    {/* <Navigation /> */}
    <Header />
    <Box style={{ border: '1px solid red' , backgroundColor: "rgb(243, 243, 243)", height: "1500px", minHeight: "100%", paddingTop: "10px", paddingLeft: "10%", paddingRight: "5%", paddingBottom: "auto"}}>
      <div style={{ border: '1px solid blue', height:'60%'}} className="container">
        <div className="wethego-h" style={{width:'20%', height:'4.2%', marginBottom:'1.5%'}}>
          <h2 className="my-4">test용</h2>
        </div>
        <Paper elevation={5} style={{ width:'100%', height:'90%', marginBottom: "50px" }}>
          <div style={{width:'100%', height:'100%', padding:'25px', border:'1px solid #999'}}>


          <input type="button" value="눌러" onClick={()=>{
            test();

          }}></input>    

          <br></br>

          <input type="button" value="신청알림" onClick={()=>{
            countUp();
            fetchData();
          }}></input>    

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 확인해야할 알림 수 : {count}
          <br></br>

          <input type="button" value="알람확인완료" onClick={()=>{
            countDown();
            fetchData();
          }}></input>    
        
        <div>
          <button onClick={()=>{
            toast("알림이 있습니다.")
          }}>Notify!</button>

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

        </div>

        <div id="messages"></div>





        </div>
        </Paper>
      </div>
    </Box>
    <Footer />
  </>)
}

export default LandingPage

