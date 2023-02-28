import React, { useEffect, useState } from "react";
import Navigation from "../Navigation";
import BasicModal from "./PositionEdit";
import axios, { AxiosError } from "axios";
import { margin } from "@mui/system";
import Header from "../../../components/Header";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Footer from "../../../components/Footer";

const LandingPage = () => {

  /** 목록 START **/
  const [position, setPosition] = useState(null); /** 목록 **/
  const [ShowModal, setShowModal] = useState(false);
  const [ update, setUpdate ] = useState(null); /** 수정 **/


  useEffect(() => {
    if (position === null) fetchData();
  }, [position]);


  // <R> - 초기에 읽어오는 내용
  const fetchData = async () => {
    try {
      await axios.get("/api/position").then((res) => {
      setPosition(res.data.data);
      // update 데이터 초기화 
      setUpdate(null)
      })
    } catch {
      console.log('연결 오류가 발생했습니다.');
    }
  };

  // <C> - 직책명 생성
  const create = ()=>{

    console.log('생성구현') 

    // 모달창 띄어주고
    !ShowModal ? setShowModal(true) : setShowModal(false); 

  }

  // <U> - 직책명 수정
  const clickModalHandler = (e) => {
    setUpdate(e);
    !ShowModal ? setShowModal(true) : setShowModal(false);
  };

  // <D> - 직책명 삭제
  const fetchDataDelete = async (position) => {
      try {
        if ( position.positionCount === 0 ) {
          alert('삭제되었습니다.');
        //삭제코드
        const res = await axios.post("/api/position/delete", position);
        } else {
          alert(`해당 직책명을 가진 사원이 존재하여 삭제할 수 없습니다.`)
        }
  
        setShowModal(false);
        fetchData();
      } catch {
        alert('오류 발생했습니다');
      }
      console.log(`${position.pname} 직책이 delete가 완료되었습니다.`) 
  }


  return (
    <>
      <Navigation />
      <Header />
      <Box style={{backgroundColor: "rgb(243, 243, 243)", height: "800px", minHeight: "100%", paddingTop: "10px", paddingLeft: "15%", paddingRight: "5%", paddingBottom: "auto"}}>
      <div className="container">
          <div className="admin_wethego-h">
            <h2 className="my-4">직책 관리</h2>
          </div>
          <Paper elevation={6} style={{padding: "3% 5% 5%"}}>
            <div className="position-head" style={{display: "block", paddingBottom: "3%"}}>
              <Button style={{float: "right"}} variant="contained" size="large" onClick={() => {create()}}>
                직책 생성
              </Button>
            </div>
            <br/>
              <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow style={{backgroundColor: "#E2E2E2"}}>
                        <TableCell align="center">No.</TableCell>
                        <TableCell align="center">명칭</TableCell>
                        <TableCell align="center">현재 사원 수</TableCell>
                        <TableCell align="center">삭제 여부</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {position ? position.map((e, i) => 
                      <TableRow hover style={{cursor: "pointer"}} key={e.no}>
                        <TableCell align="center" onClick={() => clickModalHandler(e)}>{i + 1}</TableCell>
                        <TableCell align="center" onClick={() => clickModalHandler(e)}>{e.pname}</TableCell>
                        <TableCell align="center" onClick={() => clickModalHandler(e)}>{e.positionCount}</TableCell>
                        <TableCell align="center">
                          <Button variant="contained" size="small" color="error" onClick={event => { event.stopPropagation(); { fetchDataDelete(e)} }}>
                            삭제
                          </Button>
                        </TableCell>
                      </TableRow>
                      ) : null}
                    </TableBody>
                  </Table>
                </TableContainer>
        </Paper>
        {ShowModal ? (
              <BasicModal 
                update={update} 
                position={position} 
                show={ShowModal} 
                callback={() => { 
                  setShowModal(false);
                  fetchData();
                } } />
                ) : null}
      </div>
    </Box>
    <Footer />
    </>
  );
};

export default LandingPage;