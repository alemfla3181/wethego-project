import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from "@fullcalendar/timegrid";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box,Stack,FormControl, FormLabel, RadioGroup, Radio } from '@mui/material';
import Swal from "sweetalert2";
import "./swal2.css";
import FormControlLabel from '@mui/material/FormControlLabel';




export default function ScheduleAddModal ({clickDay1,ShowModal,values,setShowModal,setValues,eno,getPlanList,userName,levelList,getTodayList}){

    const clickSubmit = async (values) => {
        Swal.fire({
            title: "[" + userName + "] 님의",
            text: clickDay1 +"일 일정을 등록하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "등록",
            cancelButtonText: "취소",
          }).then((result)=>{
            if (result.isConfirmed) {
            axios.post("/api/schedule/add", values).then((res)=>{
                Swal.fire({
                    icon: "success",
                    title: "[" + userName + "] 님의",
                    text: clickDay1 + "일정이 등록되었습니다.",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                setShowModal(false)
                const Data ={level1:levelList[0], level2:levelList[1], level3:levelList[2], level4:levelList[3], level5:levelList[4], no:eno}
                getPlanList(Data)
                getTodayList(Data.no)
            });
        }
          })
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value, employeesNo:eno});
    };
    return(
        <>
            <Modal
                open={ShowModal}
                onClose={() => setShowModal(false)}>

                <Box sx={style} style={{ width: "530px", height: "400px" }}>
                    <div id="modal-modal-title" variant="h6" component="h2">
                        <h5>DAY {clickDay1} / PLAN RECORD</h5>
                    </div>
                <TextField 
                      required 
                      fullWidth
                      size='small' 
                      name="content"
                      label="일정 내용" 
                      margin="normal" 
                      variant="outlined" 
                      onChange={handleChange}
                />
               <TextField 
                        required
                        fullWidth
                        size='small'
                        name="startDate"
                        InputLabelProps={{ shrink: true }}
                        label="시작 날짜"
                        type="date"
                        margin="normal" 
                        variant="outlined" 
                        onChange={handleChange}
                        defaultValue={clickDay1}
                        // error={validation()}
                        // helperText={validation() ? "시작 날짜를 입력해 주세요.":null}
                        
                />
                <TextField 
                        required
                        fullWidth
                        size='small'
                        name="endDate"
                        InputLabelProps={{ shrink: true }}
                        label="종료 날짜"
                        type="date"
                        margin="normal" 
                        variant="outlined"
                        onChange={handleChange}
                        defaultValue={clickDay1}
                />
                <FormControl fullWidth>
                        <FormLabel id="demo-row-radio-buttons-group-label" variant="outlined">업무종류(외근과 기타는 출근외 업무입니다.)</FormLabel>
                        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" defaultValue="3" style={{margin:'auto'}}>
                            <FormControlLabel value="1" name= "level" control={<Radio size="small" color="secondary" />} label="1순위" onChange={handleChange} defaultChecked />
                            <FormControlLabel value="2" name= "level" control={<Radio size="small"color="success" />} label="2순위" onChange={handleChange}/>
                            <FormControlLabel value="3" name= "level" control={<Radio size="small"/>} label="3순위" onChange={handleChange}/>
                            <FormControlLabel value="4" name= "level" control={<Radio size="small" color="error"/>} label="외근" onChange={handleChange}/>
                            <FormControlLabel value="5" name= "level" control={<Radio size="small" color="warning"/>} label="기타" onChange={handleChange}/>
                        </RadioGroup>
                    <Stack required spacing={2} direction="row">
                        <Button 
                            style={{maxHeight: '50px', width: '50%'}} 
                            type="submit" 
                            position="absolute" 
                            color="primary" 
                            variant="contained"
                            onClick={()=>{
                                if(values.content == null){
                                    Swal.fire({
                                        icon: "error",
                                        title: "[" + userName + "] 님의",
                                        text: "일정 내용을 입력해주세요.",
                                        showConfirmButton: false,
                                        timer: 2000,
                                      });
                                } else if(values.content != null) clickSubmit(values)
                            }}>
                            등록
                        </Button>
                        <Button style={{maxHeight: '50px', width: '50%'}} position="absolute" color="error" variant="outlined" onClick={() => setShowModal(false)}>취소</Button>
                    </Stack>
                </FormControl>
                </Box>
            </Modal>
        
        
        </>

    )
}

const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };