import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import Navigation from '../../../components/Navigation'
import TestNavigation from "../../../components/TestNavigation";
import Footer from '../../../components/Footer';

import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Paper from "@mui/material/Paper";

import Stack from "@mui/material/Stack";
import { styled } from '@mui/material/styles';


import BasicModal from './Modal'
import AdminModal from './AdminModal'

import './Organization.css';
import axios from 'axios';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';


import Chip from '@mui/material/Chip';


import Card from '@mui/material/Card';




const LandingPage = () => {

  const [ShowModal, setShowModal] = useState(false)  // 범용 
  const [ShowAdminModal, setShowAdminModal] = useState(false) // 개인용  

  // 직원별로 정보담는 내용
  const [employees, setEmployees] = useState();
  
  // 직원 개인 정보
  const [one, setOne] = useState();

  // 부서명 정보
  const [dptList, setDptList] = useState();


  useEffect(() => {
    if (employees == null) fetchData();
  })



   
  const fetchData = async () => {

    await axios.get('/api/organization/getList').then(res => {

      // 부서명 받아오기
      let list = []
      let dptNames = new Set()
      
      for (let i = 0; i < res.data.data.length; i++) {
        dptNames.add(res.data.data[i]["department"])
      }
      dptNames.forEach(e => { list.push(e) })

      setEmployees(res.data.data)
      setDptList(list)
    })

  }


  return (<>

    {/* <Navigation /> */}
    <TestNavigation />
    <div className="back-img">
      <Header />
      <Box style={{height: "1500px", minHeight: "100%", paddingTop: "10px", paddingLeft: "15%", paddingRight: "5%", paddingBottom: "auto" }}>
        <div className="container">
          <div className="wethego-h">
            <h2 className="my-4">조직도</h2>
          </div>
        
          <Paper elevation={5} style={{ padding: "3% 5% 10%" }}>
            <div style={{ width: '100%', height: '100%', padding: '25px', overflow: 'auto' }}>

              {/* <h1>범용</h1>
    <input type="button" value='눌러' onClick={()=>{
      setShowModal(true)
      fetchData();
    }}></input> */}



              {/* <div className='orgDepartment' style={{}}>
    <div style={{border:'1px solid #999', textAlign:'center', height:'12%' }}>
        <Chip style={{fontSize:'25px', width:'50%', height:'40px' , margin:'2%' }} label={`영업부`} color="success" />
    </div>

    <div style={{height:'88%', overflow: 'auto'}}>
    <List>
      { employees != null ? employees.map((e, i)=>
        <ListItem key={i} style={{borderBottom:'1px solid #999'}}  button onClick={ () => { 
          setShowAdminModal (true)
        }}>
          <ListItemAvatar>
            <Avatar src="https://t1.daumcdn.net/cfile/tistory/243BF3445932AD1C26" />
          </ListItemAvatar>
          <ListItemText primary={e.name} secondary={e.pname} />
        </ListItem>
       ) : null }
    </List>
    </div>
  </div> */}



              {/* 부서별 출력 */}

              {dptList != null ? dptList.map((dptName, i) => <>
                <div key={i} className='orgDepartment' style={{}}>


                  <div style={{ textAlign: 'center', height: '14%', }}>
                    <Chip style={{ fontSize: '25px', width: '80%', height: '40px', margin: '2%', background:'#1471ef'}} label={dptName} color="success" />
                  </div>


                  <List id="listItem">

                    {employees.map((employee, j) => <>

                      {/* 부서명과 직원부서가 같으면 출력 */}
                      {dptName === employee.department ? <>
    
                        <ListItem key={j} style={{}} button onClick={() => {
                          setOne(employee)
                          setShowAdminModal(true)
                        }} style={{borderBottom:'1px lightgray solid'}}>
                          <ListItemAvatar>
                            <Avatar src="https://t1.daumcdn.net/cfile/tistory/243BF3445932AD1C26" />
                          </ListItemAvatar>
                          <ListItemText primary={employee.name} secondary={`${employee.dname} ${employee.pname}`} />
                        </ListItem>

                      </> : null}
                    </>)}

                  </List>

                </div>
              </>) : null}

            
              <div className='orgDepartment'></div>


            </div>
          </Paper>
{/* 
          <br></br>
          <h1>개인용</h1>
          <input type="button" value='눌러' onClick={() => {
            setShowAdminModal(true)
            fetchData();
          }}></input> */}
        </div>
      </Box>
    </div>
    <Footer />

    {/* {ShowModal ? (
      <BasicModal
        show={ShowModal}
        callback={() => {
          setShowModal(false)
          console.log('달창이형 끝!!')
        } }
      />
      ) : null} */}

    {ShowAdminModal ? (
      <AdminModal
        employee={one}
        show={ShowAdminModal}
        callback={() => {
          setShowAdminModal(false)
        }}
      />
    ) : null}
  </>)
}

export default LandingPage