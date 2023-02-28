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
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import "./swal2.css";
import FormControlLabel from '@mui/material/FormControlLabel';

export default function ScheduleEditModal ({ShowModal2,setShowModal2,planList2,getPlanList, eno, userName,levelList,getTodayList}){

    const [values, setValues] = useState({
        no: planList2.no,
        content: planList2.content,
        startDate: planList2.startDate,
        endDate: planList2.endDate,
        employeesNo: planList2.employeesNo,
        level:planList2.level
      });

      const handleChange = (e) => {
            const { name, value } = e.target;
            setValues({ ...values, [name]: value });
      };

    const scheduleUpdate = async (values) => {
        Swal.fire({
            title: "[" + userName + "] 님의",
            text: "일정을 수정하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "수정",
            cancelButtonText: "취소",
        }).then((result)=>{
            if(result.isConfirmed) {
                axios.post("/api/schedule/update", values).then((res)=>{
                    const Data = {level1:levelList[0], level2:levelList[1], level3:levelList[2], level4:levelList[3], level5:levelList[4], no:eno}
                    getPlanList(Data)
                    setShowModal2(false)
                    getTodayList(Data.no)
                    Swal.fire({
                        icon: "success",
                        title: "[" + userName + "] 님의",
                        text: "일정이 수정되었습니다.",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                })
            }
        })
    }

    const scheduleDelete = async () => {
        Swal.fire({
            title: "[" + userName + "] 님의",
            text: "일정을 삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
        }).then((result)=>{
            if(result.isConfirmed) {
                axios.delete("/api/schedule/" + planList2.no).then(()=>{
                    Swal.fire({
                        icon: "success",
                        title: "[" + userName + "] 님의",
                        text: "일정이 삭제되었습니다.",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    const Data = {level1:levelList[0], level2:levelList[1], level3:levelList[2], level4:levelList[3], level5:levelList[4], no:eno}
                    getPlanList(Data)
                    getTodayList(Data.no)
                    setShowModal2(false)
                })
            }
        })
    }

    return(
        <>
            <Modal
                open={ShowModal2}
                onClose={() => setShowModal2(false)}>

                <Box sx={style} style={{ width: "530px", height: "400px" }}>
                    <div id="modal-modal-title" variant="h6" component="h2">
                        <h5>DAY / PLAN UPDATE</h5>
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
                      defaultValue={planList2.content}
                     
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
                        defaultValue={planList2.startDate}
                        
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
                        defaultValue={planList2.endDate}
                />
                    <FormControl component="fieldset" variant="standard" fullWidth>
                        <FormLabel id="demo-row-radio-buttons-group-label">업무종류(외근과 기타는 출근외 업무입니다.)</FormLabel>
                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" defaultValue={planList2.level} style={{margin:'auto'}}>
                                <FormControlLabel value="1" name= "level" control={<Radio size="small" color="secondary" />} label="1순위" onChange={handleChange} defaultChecked />
                                <FormControlLabel value="2" name= "level" control={<Radio size="small"color="success" />} label="2순위" onChange={handleChange}/>
                                <FormControlLabel value="3" name= "level" control={<Radio size="small"/>} label="3순위" onChange={handleChange}/>
                                <FormControlLabel value="4" name= "level" control={<Radio size="small"color="error" />} label="외근" onChange={handleChange}/>
                                <FormControlLabel value="5" name= "level" control={<Radio size="small"color="warning" />} label="기타" onChange={handleChange}/>
                            </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" variant="standard" style={{marginTop:'30px'}}>
                        <Stack required spacing={3} direction="row">
                            <Button 
                                style={{maxHeight: '50px', width: '50%'}} 
                                type="submit" 
                                position="absolute" 
                                color="primary" 
                                variant="contained"
                                onClick={()=>{
                                    if(values.content == null || values.content == ""){
                                        Swal.fire({
                                            icon: "error",
                                            title: "[" + userName + "] 님의",
                                            text: "일정 내용을 입력해주세요.",
                                            showConfirmButton: false,
                                            timer: 2000,
                                          });
                                    } else if(values.content != null) scheduleUpdate(values)
                                }}>
                                수정
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                                onClick={() => scheduleDelete()}>
                                삭제
                                </Button>
                            <Button style={{maxHeight: '50px', width: '50%'}} position="absolute" color="error" variant="outlined" onClick={() => setShowModal2(false)}>취소</Button>
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