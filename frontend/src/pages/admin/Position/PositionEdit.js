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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  height: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ show, position, callback, update}) {
  
  const [newPositionName, setPosition] = useState(update); // 새 직책명
  const newPosition = update;


  // update 기능 - 중복체크 프론트
  const fetchDataUpdate = async (newPositionName) => {
    let k = position.length ;
    let h = 0;
    
    // 기존 직책명 존재 유무 확인
    for (let i = 0 ; i < position.length ; i++ ){
      h++
      if ( position[i].pname === newPositionName.pname ) {
        alert('존재하는 이름입니다.');
        break;
      }
    }

    if ( h === k & position[k-1].pname != newPositionName.pname ){      
      try {
        const res = axios.post("/api/position/update", newPositionName);
        callback();
      } catch {
        alert('오류 발생했습니다');
      }
    } 
  }

  // create 기능 - 중복체크 백엔드
  const fetchDataCreate = async () => {
    try {
      const res = await axios.post("/api/position/create", newPositionName);
      callback();
    } catch {
      alert('이미 존재하는 이름입니다.');
    }
  }


  return (
    
    <div>
      <Modal
        open={show}
        onClose={() => callback()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>

          <p> { newPositionName != null ? '수정할 새 직책명을 입력해주세요' : '직책명을 입력해주세요' } </p>
          <form onSubmit={ e=>{
            e.preventDefault();
            newPosition != null ? fetchDataUpdate(newPositionName) : fetchDataCreate(newPositionName)
            // 콜백을 두 번 해주어야 바로 반영이 된다.
            callback();
          }}>

            <input type="title" name="newPname" placeholder={ newPositionName != null ? newPositionName.pname : '새 직책명'  } onChange={e=>{
            let lis = {...newPositionName}
            lis.pname = e.target.value;
            setPosition(lis);
            }}></input>

            <input type="submit"></input>
          </form>

        </Box>

      </Modal>
    </div>
  );
}
