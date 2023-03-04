import { Stack } from "@mui/material";
import axios from "axios";
import React,{useState, useEffect} from "react";
import { useSelector } from "react-redux";
import dayjs from 'dayjs';

const IndexAttendanceBox = () => {
  const [OnOff, setOnOff] = useState(null); 
  const [DayOff, setDayOff] = useState(null);
  const [dateDayOff, setdateDayOff] = useState(null);
  const now = new Date();

  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user.userData) {
      const Data = {
        "year": now.getFullYear(),
        "month": ('0' + (now.getMonth() + 1)).slice(-2),
        "date": now.getDate(),
        "no": (user.userData && user.userData.data) ? user.userData.data.no : null,
      }
      // console.log(user);

      axios.post('/api/attendance/show', Data).then(res => {
        setOnOff(res.data.data); // 출근, 결근, 지각
        // console.log("OnOff", res.data.data);
      })

      axios.post('/api/attendance/showDayOff', Data).then(res => {
        setDayOff(res.data.data);
        // console.log("DayOff", res.data.data);
      })

      axios.post('/api/attendance/dateDayOff', Data).then(res => {
        setdateDayOff(res.data.data);
        console.log("date", res.data.data);
      })
    }

  }, [user])
  
  if (DayOff) {
    let num = 0;
    DayOff.map(e => {
      if (e.v_list != '반차')
        num += dayjs(e.vac_end).diff(dayjs(e.vac_start), 'day') + 1;
      else
        num += 0.5;
    })
    if (OnOff && OnOff.length === 3)
      setOnOff([...OnOff, num]);
  }

  if (dateDayOff) {
    let num = 0;
    dateDayOff.map(e => {
      if (e.v_list != '반차')
        num += dayjs(e.vac_end).diff(dayjs(e.vac_start), 'day') + 1;
      else
        num += 0.5;
    })
    if (OnOff && OnOff.length === 4)
      setOnOff([...OnOff, num]);
  }

  return (
    <>
      <div className="col-5 box-basic" style={{ minWidth: "400px" }}>
        <div style={{ width: "100%", height: "100%" }}>
          <div
            className="card"
            style={{
              borderTop: "5px solid #00a4ed",
              boxShadow: "1px 1px 1px 0px gray",
              width: "45%",
              height: "45%",
              float: "left",
              marginTop: "2%",
              marginLeft: "3%",
              fontSize: "20px",
            }}
          >
            <div className="card-body d-flex justify-content-between">
              <div style={{ width: "100%", textAlign: "center", color: "#00a4ed" }}>
                <Stack spacing={2} direction={'row'}>
                  <div style={{ fontFamily: "'Open Sans', sons-serif", width: "50%", fontSize: "15px", lineHeight: "40px", textAlign: "right" }}> {now.getMonth() + 1}월</div>
                  <div className="card-text mb-2" style={{ fontFamily: "'Open Sans', sons-serif", width:"80%", fontSize: "25px", marginLeft:"2%", textAlign:"left"}}>출근</div></Stack>
                <h1 style={{fontSize: "40px", fontWeight: "700"}}>{ OnOff && OnOff[0] + OnOff[2] }</h1>
              </div>                            
            </div>
          </div>

          <div
            className="card"
            style={{
              borderTop: "5px solid #ffa500",
              boxShadow: "1px 1px 1px 0px gray",
              width: "45%",
              height: "45%",
              float: "left",
              marginTop: "2%",
              marginLeft: "3%",
              fontSize: "20px",
            }}
          >
            <div className="card-body d-flex justify-content-between">
              <div style={{width: "100%", textAlign: "center", color: "#ffa500" }}>
              <Stack spacing={2} direction={'row'}>
                  <div style={{ fontFamily: "'Open Sans', sons-serif", width: "50%", fontSize: "15px", lineHeight: "40px", textAlign: "right" }}> {now.getMonth() + 1}월</div>
                  <div className="card-text mb-2" style={{ fontFamily: "'Open Sans', sons-serif", width:"80%", fontSize: "25px", marginLeft:"2%", textAlign:"left"}}>지각</div></Stack>
                <h1 style={{ fontSize: "40px", fontWeight: "700"}}>{ OnOff && OnOff[2] }</h1>
              </div>
            </div>
          </div>
          <div style={{ clear: "both" }}></div>
          <div
            className="card"
            style={{
              borderTop: "5px solid #EB0000",
              boxShadow: "1px 1px 1px 0px gray",
              width: "45%",
              height: "45%",
              float: "left",
              marginTop: "2%",
              marginLeft: "3%",
              fontSize: "20px",
            }}
          >
            <div className="card-body d-flex justify-content-between">
              <div style={{width: "100%", textAlign: "center", color: "#EB0000" }}>
              <Stack spacing={2} direction={'row'}>
                  <div style={{ fontFamily: "'Open Sans', sons-serif", width: "50%", fontSize: "15px", lineHeight: "40px", textAlign: "right" }}> {now.getMonth() + 1}월</div>
                  <div className="card-text mb-2" style={{ fontFamily: "'Open Sans', sons-serif", width:"80%", fontSize: "25px", marginLeft:"2%", textAlign:"left"}}>결근</div></Stack>
                <h1 style={{fontSize: "40px", fontWeight: "700"}}>{ OnOff && ((OnOff[1] - OnOff[4]) < 0 ? 0 : OnOff[1] - OnOff[4] )}</h1>
              </div>             
            </div>
          </div>
          <div
            className="card"
            style={{
              borderTop: "5px solid #228B22",
              boxShadow: "1px 1px 1px 0px gray",
              width: "45%",
              height: "45%",
              float: "left",
              marginTop: "2%",
              marginLeft: "3%",
              fontSize: "20px",
            }}
          >
            <div className="card-body d-flex justify-content-between">
              <div style={{width: "100%", textAlign: "center", color: "#228B22" }}>
              <Stack spacing={2} direction={'row'}>
                  <div style={{ fontFamily: "'Open Sans', sons-serif", width: "50%", fontSize: "15px", lineHeight: "40px", textAlign: "right" }}> {now.getMonth() + 1}월</div>
                  <div className="card-text mb-2" style={{ fontFamily: "'Open Sans', sons-serif", width:"80%", fontSize: "25px", marginLeft:"2%", textAlign:"left"}}>휴가</div></Stack>
                <h1 style={{fontSize: "40px", fontWeight: "700"}}>{ OnOff && OnOff[3] }</h1>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexAttendanceBox;
