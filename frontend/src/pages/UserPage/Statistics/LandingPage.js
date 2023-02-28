import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import Navigation from '../../../components/Navigation'
import TestNavigation from "../../../components/TestNavigation";
import Footer from '../../../components/Footer';

import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Paper from "@mui/material/Paper";


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './Statistics.css';
import DonutChart from './DonutChart';
import ColumnChart from './ColumnChart';
import axios from 'axios';
import CountUp from 'react-countup';

//유저 정보
import { useSelector } from "react-redux";




const LandingPage = () => {




  const [contract, setcontract] = useState(); // 소정 근로 일수
  const [average, setAverage] = useState(); // 하루 평균 근로시간


  // 조회 년/월 초기 값은 나중에 현재 날짜 구하는 함수 통해 줄 것.
  const [yearSelect, setYearSelect] = useState("2022"); // 조회 연도
  const [monthSelect, setMonthSelect] = useState("08"); // 조회 월
  const [days, setDays] = useState()  // 조회한 연도의 날짜 

  // 해당 년/월 유저 정보
  const [workHours, setworkHours] = useState();
  const [workCount, setWorkCount] = useState();


  //조회 범위 설정
  const years = ["2022", "2023", "2024"];
  const months = ["01", "02", "03", "04",
    "05", "06", "07", "08",
    "09", "10", "11", "12"]


  const userData = useSelector(state => state.user.userData)
  
  

  useEffect(() => {
    if (userData != null) Contract();
  }, [userData, yearSelect, monthSelect])








  // 4. 소정 근로 일수 조회 ( 유저 번호 만 설정 / 함수명 fetchData로 추후 변경예정 ) 
  const Contract = async () => {

    try {
      
      // 조회 년/월 소정 근로 일수 조회( 완료 )
      await axios.get(`/api/statistics/contract?year=${yearSelect}&month=${monthSelect}`).then(res => {
        setcontract(res.data.data["contract"])
        setDays(res.data.data["days"])
      })

      // 유저 번호 기준 하루 평균 근로 시간
      await axios.get(`/api/statistics/avg?userNo=${userData.data.no}`).then(res => {
  
        setAverage(res.data.data[0]["workHours"])
      })

      // 조회 년/월 해당 유저의 근무 일수( 유저 번호 빼고 완료 ) 
      await axios.get(`/api/statistics/workCount?year=${yearSelect}&month=${monthSelect}&userNo=${userData.data.no}`)
        .then(res => {
          setWorkCount(res.data.data)
        })

      // 조회 년/월 해당 유저의 실제 근무시간 조회 (유저 번호 빼고 완료)
      await axios.get(`/api/statistics/workHours?year=${yearSelect}&month=${monthSelect}&userNo=${userData.data.no}`)
        .then(res => {
          setworkHours(res.data.data)
        })

    } catch {
      console.log('오류가 발생했습니다.')
    }

  }





  const test = (value) => {
    console.log(value)
  }
  console.log()




  return (
    <>

      <TestNavigation />
      {/* <Navigation /> */}
      <div className="back-img">
        <Header />
        <Box style={{ height: "1500px", minHeight: "100%", paddingTop: "10px", paddingLeft: "15%", paddingRight: "5%", paddingBottom: "auto" }}>
          <div className="container">
            <div className="wethego-h">
              <h2 className="my-4">근태 통계</h2>
            </div>
      

            <Paper elevation={5} style={{ padding: "3% 5% 10%" }}>
              <div style={{ width: '100%', height: '100%', padding: '25px', border: '1px solid #999' }}>

                <div style={{ marginBottom: '25px' }}>김더존 님의 근태 통계</div>

                <div className='select'>
                  조회 기간 선택 :
                </div>
      
                <form>
                  <div className='select' style={{ width: "7%" }}>
                    <select className="form-control" defaultValue={yearSelect} onChange={e => {
                      setYearSelect(e.target.value);
                    }}>
                      {years.map((e, i) =>
                        <option key={i} value={e}>{e}</option>
                      )}
                    </select>
                  </div>
          
                  <div className='select'>년</div>

                  <div className='select'>
                    <select className="form-control" defaultValue={monthSelect} onChange={e => {
                      setMonthSelect(e.target.value);
                    }}>
                      {months.map((e, i) =>
                        <option key={i} value={e}>{e}</option>
                      )}
                    </select>
                  </div>
                  <div style={{ clear: 'both', float: 'none' }} />
                </form>



                <div style={{ width: '100%', height: '40%', border: '1px solid green', marginTop: '2%' }}>
                  <div className="upper" id="upper-left">
                    {/* { workHours != null && days == workHours.length && monthSelect == workHours[0]["inOutDay"]? 
            <DonutChart monthday={days} workHours={workHours} /> : null } */}

                    {userData != null ?
                      <ColumnChart monthday={days} workHours={workHours} /> : null}
                  </div>
                  <div className="upper" id="upper-right">
                    {userData != null && workHours != null && days == workHours.length && monthSelect == workHours[0]["inOutDay"] ?
                      <DonutChart monthday={days} workHours={workHours} /> : null}
                    {/* <ColumnChart monthday={days} workHours={workHours} /> */}
                  </div>
                </div>

                <div style={{ clear: "both", float: "none" }}></div>

                <div style={{ width: '100%', height: '22%', border: '1px solid red', margin: '1% 0%' }}>
                  <div className="middle">3. 주중 평균 근로시간
                    <br></br>
                    <CountUp
                      className='num'
                      end={average * 5}
                      decimals={1}
                      duration={3.5} />
                  </div>
          
                  <div className="middle">
                    5. 실제 근무 일수

                    <br></br>
                    <CountUp
                      className='num'
                      end={workCount}
                      duration={2} />
                  </div>
          
                  <div className="middle">

                    4. {monthSelect}월 소정 근로 일수(쿼리완■)
                    <br></br>
                    <CountUp
                      className='num'
                      end={contract}
                      duration={1.2} />
                  </div>
                </div>

                <div style={{ clear: "both", float: "none" }}></div>

                {/* <div style={{width: '100%', height:'40%' ,border: '1px solid #555'}}>
        <div className='lower'>

        혹시 만든다면...

        </div>
        </div> */}

                {/* <div style={{width: '100%', height:'22%' ,border: '1px solid #555'}}>
          <div className="lower">6.월 별 그래프를 띄어 줍니다.
          <br></br>
            <input type="button" value="test" onClick={()=>{
              fetchData();
            }}></input> 
          </div>
 
          <div className="lower">7. 폐기할 겁니다.</div>
          <div className="lower">8. 폐기할 겁니다.</div>
        </div> */}

              </div>
            </Paper>
          </div>
        </Box>
      </div>
      <Footer />

    </>)
}

export default LandingPage

