import { Box, Fade, Paper, Popper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from 'moment';
import dayjs from 'dayjs';
import '../../../assets/Scroll.css';

const IndexTplanBox = () => {
  const [Weeks, setWeeks] = useState(null);
  const [Poppers, setPoppers] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [PopAttendance, setPopAttendance] = useState(null);
  const [TeamsAttendance, setTeamsAttendance] = useState(null);
  const userData = useSelector(state => state.user.userData);
  const now = new Date();

  const [WeeksCount, setWeeksCount] = useState([0, 0, 0, 0, 0, 0, 0]);
  const days = now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2);

  useEffect(() => {
    if (userData) {
      const Data = {
        "year": now.getFullYear(),
        "month": ("0" + (now.getMonth() + 1)).slice(-2),
        "date": now.getDate(),
        "day": now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2),
        "no": (userData && userData.data) ? userData.data.no : null,
      }
      /** 달력 조회 */
      if (!Weeks) axios.post('/api/attendance/weeks', Data).then(res => {
        // console.log(res.data.data);
        setWeeks(res.data.data);
      })
      /** 팀원 일정 조회 */
      if (!TeamsAttendance) axios.post('/api/attendance/team', Data).then(res => {
        // console.log(res.data.data);
        setTeamsAttendance(res.data.data);
      })
    }
    
    if (JSON.stringify(WeeksCount) === JSON.stringify([0, 0, 0, 0, 0, 0, 0]))
      WeeksCountCheck();
  
  }, [userData, Weeks, TeamsAttendance, WeeksCount])

  /** 팀원 일정 뱃지 생성 */
  const WeeksCountCheck = () => {
    if (Weeks && TeamsAttendance) {
      Weeks.filter((e, i) => {
        TeamsAttendance.filter(el => {
          if (dayjs(e.db_date).isBetween(dayjs(el.start_date).subtract(1, 'day'), dayjs(el.end_date).add(1, 'day'), "day")) {
            const array = WeeksCount;
            array[i] += 1;
            setWeeksCount(array);
          }
        });
      })
    }
  }

  /** 주중 날짜 클릭 시 팝업 생성 */
  const daysClickHandler = (e, data) => {
    setPopAttendance(null);
    setAnchorEl(e.currentTarget);
    if (window.localStorage.getItem("timer"))
      window.localStorage.removeItem("timer");
    if (PopAttendance && PopAttendance.length > 0 && PopAttendance[0].inout_day === data) {
      setPoppers(false);
    } else {
      const Data = {
        "day": data,
        "no": (userData && userData.data) ? userData.data.no : null,
      }
      axios.post('/api/attendance/team', Data).then(res => {
        setPopAttendance(res.data.data);
        setPoppers(true);
        window.localStorage.setItem("timer", moment().add("3", "s").format("YYYY-MM-DD HH:mm:ss"));
        setTimeout(() => {
          if (window.localStorage.getItem("timer") && window.localStorage.getItem("timer") === moment().format("YYYY-MM-DD HH:mm:ss")) {
            setPoppers(false);
            setPopAttendance(null);
          }
        }, 3000)
      })
    }
  }

  const DayNameTrans = (day) => {
    switch (day) {
      case 'Mon': return '월';
      case 'Tue': return '화';
      case 'Wed': return '수';
      case 'Thu': return '목';
      case 'Fri': return '금';
      case 'Sat': return '토';
      case 'Sun': return '일';
    }
  }
  
  return (
    <>
      <div
        className="col-5 box-basic"
        style={{ height: "100%", minWidth: "400px" }}
      >
        <Box className="box-h" style={{ float: "left" }} boxShadow={"3"}>
          주간 팀원일정
        </Box>
        <h6 className="tplan-week"> {now.getFullYear()}년 {now.getMonth() + 1}월 {Weeks && Math.floor(now.getDate() / 7) + 1}주 차 </h6>
        <div style={{ clear: "both", float: "none" }}></div>
        <div style={{ width: "100%", height: "35%", marginLeft: "5%" }}>
          {Weeks && Weeks.map((el, i) => {
            return (
              <Paper key={i}
                className={"tplan-box"}
                style={
                  days === el.db_date ? {backgroundColor: "#65cefb", color: i > 4 ? i > 5 ? "red" : "blue" : null, borderTop: i > 4 ? i > 5 ? "3px solid red" : "3px solid blue" : "3px solid black"} :
                  {color: i > 4 ? i > 5 ? "red" : "blue" : null, borderTop: i > 4 ? i > 5 ? "3px solid red" : "3px solid blue" : "3px solid black"
                }}
                onClick={(e) => daysClickHandler(e, el.db_date)}
                
              >
                {WeeksCount[i] > 0 ? <a className="nav-link">
                  <span className="badge bg-danger tpa">{WeeksCount[i]}</span>
                </a> : null}
                {DayNameTrans(el.day_name.slice(0, 3))}<br />
                {el.day}
              </Paper>
            )
          })}
          <Popper open={Poppers} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={150}>
                <Paper sx={{ width: "200%", bgcolor: 'background.paper' }}>
                  {PopAttendance && PopAttendance.map((e, i) =>
                    <div key={i} >
                      <div className="tplan-role">{e.level === 4 ? '외근' : '기타'}</div>
                      <p> {e.name} {e.p_name}</p>
                    </div>
                  )}
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
        <div className='scrollBar' style={{width:"100%", maxHeight: "200px", overflow: "auto"}}>
          {TeamsAttendance && TeamsAttendance.map((e, i) => {
            return (
              <div key={i} style={{ width: "95%", marginTop: "0%", marginLeft: "5%", lineHeight: "25px", padding: "0"}}>
                <div style={{ width: "40%", marginLeft: "10px", float: "left" }}>
                  <div className="tplan-role">{e.level === 4 ? '외근' : '기타'}</div>
                  <p style={{ fontWeight: "bold" }}>{e.name} {e.p_name}</p>
                </div>
                <div style={{ width: "35%", float: "left", textAlign: "center" }}>
                  <p>{dayjs(e.start_date).format("M월 D일")}~{dayjs(e.end_date).format("M월 D일")}</p>
                </div>
              </div>)
          })}
        </div>
      </div>
    </>
  );
};

export default IndexTplanBox;
