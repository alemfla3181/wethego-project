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


import Avatar from '@mui/material/Avatar';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 380,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius : '2%',
  padding : '1%'

};

export default function BasicModal({ employee ,show, callback }) {


  console.log(employee);

  





  return (

    <div>
      <Modal
        open={show}
        onClose={() => callback()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

      <Box sx={style}>
      {/* , border:'1px solid #999' */}
      <div style={{width:'100%', height:'100%' }}> 


        {/* 모달 상단부 */}
        <div id="org-modalupper" >

          <div className="org-modalUpperIn" id='org-modalupperLeft'>

          <Avatar style={{width:'100%', height:'100%'}} alt="Remy Sharp" src="https://t1.daumcdn.net/cfile/tistory/243BF3445932AD1C26" />

          </div>

          <div className="org-modalUpperIn" id='org-modalupperRight'>

          <table className="w-100 h-100 table border border-dark">
            <tbody>
              <tr>
                <th scope="row" colSpan="1">이름 :</th>
                <td colSpan="2">{employee.name}</td>
              </tr>
              <tr>
                <th scope="row" colSpan="1">직책 :</th>
                <td colSpan="2">{employee.pname}</td>
              </tr>
              <tr>
                <th scope="row" colSpan="1">부서 :</th>
                <td colSpan="2">{employee.department}</td>
              </tr>
              <tr>
                <th scope="row" colSpan="1">E.Num : </th>
                <td colSpan="2">{employee.extNumber}</td>
              </tr>
            </tbody>
          </table>  
            
            
          </div>



        </div>


        <div style={{ clear:'both', float:'none'}}></div>


        {/* 모달 하단부 */}
        <div id="org-modallower">

        <table className="w-100 h-100 table border border-dark">
            <tbody >
              <tr>
                <th scope="row" colSpan="1">재직 현황 :</th>
                <td>{employee.state}</td>
                <th>성별 :</th>
                <td>{employee.gender == 'M' ? '남' : '여'}</td>
              </tr>
              <tr>
                <th scope="row" colSpan="1">입사일 :</th>
                <td >{employee.joinDate}</td>
                <th>생년월일 :</th>
                <td >{employee.birth}</td>
              </tr>
              <tr>
                <th scope="row" colSpan="1">퇴사일 :</th>
                <td >{employee.resignationDate == null ? '-' : employee.resignationDate}</td>
                <th>TEL     :</th>
                <td >{employee.hphone}</td>
              </tr>
            </tbody>
          </table>  


        </div>



      </div>

      </Box>
      </Modal>
    </div>
  );
}



