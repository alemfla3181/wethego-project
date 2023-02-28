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
  width: 250*1.618,
  height: 250,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ show, callback }) {




  return (

    <div>
      <Modal
        open={show}
        onClose={() => callback()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
      
      <div style={{width:'100%', height:'90%', border:'1px solid #999' }}> 

        <div className="userIn" id="usualLeft">

          사진 쳐 박음

        </div>
  
        <div className="userIn" id="usualRight">

          <li>
            리스트1번
          </li>
          <li>
            리스트2번
          </li>

        </div>

        <input type="button" value="확인" onClick={()=>{
          callback()
        }}></input>

      </div>



      </Box>
      </Modal>
    </div>
  );
}



