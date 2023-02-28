import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const IndexTvactionBox = () => {
  const [VacationList, setVacationList] = useState(null);
  const userData = useSelector(state => state.user.userData);
  const now = new Date();

  useEffect(() => {
    if (userData) {
      const Data = {
        "year": now.getFullYear(),
        "month": ("0" + (now.getMonth() + 1)).slice(-2),
        "date": now.getDate(),
        "no": (userData && userData.data) ? userData.data.no : null,
      }
      /** 팀원 전체 휴가 일정 조회 */
      axios.post('/api/dayoff/team', Data).then(res => {
        // console.log(res.data.data);
        setVacationList(res.data.data);
      })
    }
  }, [userData])

  return (
    <>
      <div
        className="col-5 box-basic"
        style={{ height: "100%", minWidth: "400px" }}
      >
        <h6 className="box-h" style={{ float: "left", minWidth: "30%" }}>
          월간 팀 휴가내역
        </h6>
        <h6 className="tplan-week"> {now.getFullYear()}년 {now.getMonth()+1}월</h6>
        <div style={{ clear: "both", float: "none" }}></div>
        <div style={{ marginTop: "5px", width: "100%", height: "100%" , textAlign : "center"}}>
          <TableContainer style={{overflow: 'auto', maxHeight: '310px'}}>
          <Table stickyHeader className="scrolltable" style={{overflow: 'auto'}}>
            <TableHead className="thead-dark">
              <TableContainer>
                <TableRow>
                  <TableCell style={{width:"1%"}} align="center">No</TableCell>
                  <TableCell style={{width:"20%"}} align="center">이름 / 직책</TableCell>
                  <TableCell style={{width:"16%"}} align="center">사유</TableCell>
                  <TableCell align="center">기간</TableCell>
                </TableRow>
                </TableContainer>
              </TableHead>
            <TableBody>
            <TableContainer className="scrollBar" style={{width:"100%", maxHeight:"300px",overflow: "auto"}}>
              {VacationList && VacationList.map((e, i) =>
                <TableRow key={i}>
                  <TableCell style={{width:"1%"}} align="center">{i+1}</TableCell>
                  <TableCell style={{width:"23%"}} align="center">{e.name} {e.pname}</TableCell>
                  <TableCell style={{width:"15%"}} align="center">{e.vlist}</TableCell>
                  <TableCell align="center">
                    {e.vlist !== '반차' ? 
                      dayjs(e.vacStart).format("M월 D일 ~ ") + dayjs(e.vacEnd).format("M월 D일") : 
                      dayjs(e.vacStart).format("M월 D일 HH:mm ~ ") + dayjs(e.vacEnd).format("M월 D일 HH:mm")
                    }
                  </TableCell>
                </TableRow>
                )}
                </TableContainer>
            </TableBody>
          </Table>
          </TableContainer>
          <div style={{ clear: "both", float: "none" }}></div>
        </div>
      </div>
    </>
  );
};

export default IndexTvactionBox;
