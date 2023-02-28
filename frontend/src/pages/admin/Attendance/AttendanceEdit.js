import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { padding } from "@mui/system";
import axios, { AxiosError } from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Swal from "sweetalert2";
import "../Employees/swal2.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  show,
  attendances,
  callback,
  fetchData,
  selected,
  searchValue,
  setAttendance,
  pickDate,
  setTotalCount,
}) {
  const [values, setValues] = useState({
    no: attendances.no,
    inTime: attendances.inTime,
    outTime: attendances.outTime,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  /** 출퇴근기록 수정 START **/
  const clickModalUpdate = async (values) => {
    try {
      const res = await axios.post("/api/attendance/update", values);
      Swal.fire({
        icon: "success",
        title: "[" + attendances.name + "] 님의",
        text: "출퇴근 정보가 수정되었습니다!",
        showConfirmButton: false,
        timer: 2000,
      });
      callback(true);
      if (searchValue == null) {
        fetchData(); //검색조건 없는 경우
      } else if (searchValue != null) {
        fetchData2(); //검색조건 있는 경우
      }
    } catch {
      alert("오류 발생했습니다");
    }
  };
  /** 출퇴근기록 수정 END **/

  /** 출퇴근 수정 시 DateTime 양식 확인 START **/
  const confirmDate = () => {
    if (
      (isDatetime(values.inTime) == true &&
        isDatetime(values.outTime) == true) ||
      (isDatetime(values.inTime) == true && values.outTime == null) ||
      (isDatetime(values.inTime) == true && values.outTime == "")
    ) {
      Swal.fire({
        title: "[" + attendances.name + "] 님의",
        text: attendances.inoutDay  + " 날짜의 출퇴근 정보를 수정하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "수정",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          clickModalUpdate(values);
        }
      });
    } else if (isDatetime(values.inTime) == false) {
      Swal.fire({
        icon: "error",
        title: "[" + attendances.name + "] 님의",
        text: "출근시간 양식을 확인해주세요.",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (isDatetime(values.outTime) == false) {
      Swal.fire({
        icon: "error",
        title: "[" + attendances.name + "] 님의",
        text: "퇴근시간 양식을 확인해주세요.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const isDatetime = (d) => {
    var res =
      /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;
    return res.test(d);
  };
  /** 출퇴근 수정 시 DateTime 양식 확인 END **/

  /** 검색조건있는 경우 목록 호출 START **/
  const fetchData2 = async () => {
    try {
      const res = await axios.get(
        "/api/attendance?" + selected + "=" + searchValue + "&date=" + pickDate
      );
      setAttendance(res.data.data);
      setTotalCount(res.data.data.totalCount);
    } catch {
      alert("오류가 발생했습니다.");
    }
  };
  /** 검색조건있는 경우 목록 호출 END **/
  return (
    <div>
      <Modal
        open={show}
        onClose={() => callback()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ width: "530px", height: "400px" }}>
          <div>
            <TextField
              id="outlined-basic"
              name="name"
              label="ID"
              margin="normal"
              variant="filled"
              inputProps={{ readOnly: true }}
              defaultValue={attendances.userId}
            />
            <TextField
              id="outlined-basic"
              name="userId"
              label="이름"
              margin="normal"
              variant="filled"
              inputProps={{ readOnly: true }}
              defaultValue={attendances.name}
              style={{ marginLeft: "23px" }}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              name="inoutDay"
              label="날짜"
              margin="normal"
              variant="filled"
              inputProps={{ readOnly: true }}
              defaultValue={attendances.inoutDay}
            />
            <TextField
              id="outlined-basic"
              label="출퇴근시간 양식"
              margin="normal"
              variant="filled"
              inputProps={{ readOnly: true }}
              defaultValue={"yyyy-mm-dd hh:ii:ss"}
              style={{ marginLeft: "23px" }}
            />
          </div>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              id="outlined-basic"
              name="inTime"
              label="출근시간"
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              defaultValue={attendances.inTime}
            />
            <TextField
              id="outlined-basic"
              name="outTime"
              label="퇴근시간"
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              defaultValue={attendances.outTime}
              style={{ marginLeft: "15px" }}
            />
          </div>
          <div className="attModal_button">
            <div>
              <Button
                position="absolute"
                variant="contained"
                color="primary"
                onClick={() => {
                  confirmDate();
                }}
              >
                수정
              </Button>
              <Button
                position="absolute"
                variant="outlined"
                color="error"
                onClick={() => callback()}
                style={{ marginLeft: "10px" }}
              >
                취소
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
