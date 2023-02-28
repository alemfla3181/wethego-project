import { Button, Card, Paper, Stack } from "@mui/material";
import axios from "axios";
import React,{useState, useEffect} from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import StateChange from "./StateChange";
import './IndexProfileBox.css';

const IndexProfileBox = () => {
  const [OnOff, setOnOff] = useState([false, true]);
  const [ShowModal, setShowModal] = useState(false);
  const now = new Date();

  const userData = useSelector(state => state.user.userData);
  const day = {
    year: now.getFullYear().toString(),
    month: (now.getMonth() + 1).toString(),
    date: now.getDate().toString(),
  }

  useEffect(() => {
    if (userData) {
      const Data = {
        "day": day.year + "-" + day.month + "-" + day.date,
        "no": (userData && userData.data) ? userData.data.no : null,
      }
      axios.post('/api/attendance/check', Data).then(res => {
        if (!res.data.data) {
          /** 출근 안함 */
          setOnOff([false, true]);
        } else {
          /** 이미 출근 함 */
          setOnOff([true, false]);
          if (res.data.data.outTime) {
            setOnOff([true, true]);
          }
        }
      })
    }
  }, [userData])
  
  /** 유저 정보 화면에 표시 */
  const viewUser = () => {
    if (userData && userData.data) {
      return (
        <div>
          <h4>{userData && userData.data.name} {userData && userData.data.pname} <br /></h4>
          <h6>소속 : {userData && userData.data.department} {userData && userData.data.dname} <br /></h6>
          <h6>권한 : {userData && userData.data.level}</h6>
        </div>
      )
    }
    return null;
  }

  /** 출근 버튼 클릭시 */
  const onClickWorkingHandler = async () => {
    setOnOff([true, false]);
    if (userData) {
      const Data = {
        "day": day.year + "-" + day.month + "-" + day.date,
        "no": (userData && userData.data) ? userData.data.no : null,
      }

      /** 출근 유무 확인 */
      await axios.post('/api/attendance/check', Data).then(res => {
        /** 출근 기록이 없으므로 */
        if (!res.data.data) {
          /** 출근 기록 생성 */
          axios.post('/api/attendance', Data).then(res => {
            Swal.fire({
              icon: 'success',
              title: '출근 도장 꾸욱!',
              showConfirmButton: false,
              timer: 1500
            })
            setOnOff([true, false]);
          })
        }
      })
    }
  }

  /** 퇴근 버튼 클릭시 */
  const onClickWorkOutHandler = () => {
    setOnOff([true, true]);
    Swal.fire({
      title: '퇴근 하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '수정',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed && userData) {
        const Data = {
          "day": day.year + "-" + ("0" + day.month).slice(-2) + "-" + day.date,
          "no": (userData && userData.data) ? userData.data.no : null,
        }
        console.log(Data);
        /** 출근 유무 확인 */
        axios.post('/api/attendance/check', Data).then(res => {
          /** 출근 기록이 있고 퇴근 기록이 없으면 */
          if (res.data.data.inTime && !res.data.data.outTime) {
            /** 퇴근 기록 */
            axios.post('/api/attendance/off', Data).then(res => {
              Swal.fire({
                icon: 'success',
                title: '퇴근 완료!',
                showConfirmButton: false,
                timer: 1500
              })
              setOnOff([true, true]);
            })
            /** 출근 기록, 퇴근 기록이 있는 경우 */
          } else if (res.data.data.inTime && res.data.data.outTime) {
            setOnOff([true, true]);
            /** 출근 기록이 없는 경우 */
          } else {
            setOnOff([false, true]);
          }
        })
      } else {
        setOnOff([true, false]);
      }
    })
  }

  return (
    <>
      <div className="col-5 box-basic" style={{ minWidth: "400px" }}>
        <div className="col-6" style={{ float: "left" }}>
          <div className="card" style={{ width: "100%", height: "312px", border: "0px solid white" }}>
            {/*       프로필 사진       */}
            {userData && userData.data && userData.data.profileUrl && <img
              src={'/api/pic' + userData.data.profileUrl}
              className="card-img-top"
              alt="..."
              style={{ width: "100%", height: "100%", overflow: "hidden", marginTop: "2%", marginBottom: "2%" }}
              onError={(e) => e.target.src = require("../../../assets/images/profile.jpg")}
            />}

          </div>
        </div>
        <div className="d-grid gap-3" style={{ padding: "13px 0px 0px 15px" }}>
          <h5
            style={{
              width: "100%",
              background: "linear-gradient(107deg, #00a4ed 10%, #1471ef 89%)",
              borderRadius: "3px",
              margin: "0",
              letterSpacing: "2px",
              padding: "10px 0px 0px 5px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {/* 사용자 정보 표시 */}
            {viewUser()}
          </h5>
          <Stack spacing={2} direction={"row"} height="100px">
            <Button style={{ width: "50%", fontSize: "30px" }} color="primary" type="button" variant="contained" disabled={OnOff[0]} onClick={onClickWorkingHandler}>
              출근
            </Button>
            <Button style={{ width: "50%", fontSize: "30px" }} color="error" type="button" variant="contained" disabled={OnOff[1]} onClick={onClickWorkOutHandler}>
              퇴근
            </Button>
          </Stack>
          <Button style={{ height: "50px", fontSize: "20px" }} color="secondary" type="button" variant="contained" disabled={OnOff[1]} onClick={() => setShowModal(true)}>
            근태사항 변경
          </Button>
          {ShowModal ? <StateChange show={ShowModal} callback={() => setShowModal(false)} /> : null}
          
        </div>
        <div style={{ clear: "both", float: "none" }}></div>
      </div>
    </>
  );
};

export default IndexProfileBox;
