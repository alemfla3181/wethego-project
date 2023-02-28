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
  dayoff,
  setDayoff,
  dayoffes,
  callback,
  fetchData,
  selected,
  searchValue,
  setTotalCount,

}) {
  const [values, setValues] = useState({
    no: dayoffes.no,
    dfYear: dayoffes.dfYear,
    dfTotal: dayoffes.dfTotal,
    dfUsed: dayoffes.dfUsed
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };


  console.log(values)
  /** 연차 수정 START **/
  const confirm = () => {
    Swal.fire({
      title: "[" + dayoffes.name + "] 님의",
      text: "연차 정보를 수정하시겠습니까?",
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
  }

  const clickModalUpdate = async (values) => {
    try {
      const res = await axios.post("/api/dayoff/set/update", values);
      Swal.fire({
        icon: "success",
        title: "[" + dayoffes.name + "] 님의",
        text: "연차 정보가 수정되었습니다!",
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
  /** 연차 수정 END **/

  /** 검색조건있는 경우 목록 호출 START **/
  const fetchData2 = async () => {
    try {
      const res = await axios.get("/api/dayoff/set?" + selected + "=" + searchValue);
      setDayoff(res.data.data);
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
        <Box sx={style} style={{ width: "530px", height: "460px" }}>
          <div>
            <TextField
              id="outlined-basic"
              name="name"
              label="ID"
              margin="normal"
              variant="filled"
              inputProps={{ readOnly: true }}
              defaultValue={dayoffes.userId}
            />
            <TextField
              id="outlined-basic"
              name="userId"
              label="이름"
              margin="normal"
              variant="filled"
              inputProps={{ readOnly: true }}
              defaultValue={dayoffes.name}
              style={{ marginLeft: "23px" }}
            />
          </div>
          <div id="modal-modal-description" sx={{ mt: 1 }}>
            <TextField
              fullWidth
              id="outlined-basic"
              name="dfYear"
              label="연차 년도"
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              defaultValue={dayoffes.dfYear}
            />
          </div>
          <div id="modal-modal-description" sx={{ mt: 1 }}>
            <TextField
              fullWidth
              id="outlined-basic"
              name="dfTotal"
              label="연차 총일수"
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              defaultValue={dayoffes.dfTotal}
            />
          </div>
          <div id="modal-modal-description" sx={{ mt: 1 }}>
            <TextField
              fullWidth
              id="outlined-basic"
              name="dfUsed"
              label="연차 사용일 수"
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              defaultValue={dayoffes.dfUsed}
            />
          </div>
          <div className="attModal_button">
            <div>
              <Button
                position="absolute"
                variant="contained"
                color="primary"
                onClick={() => {
                  confirm();
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
