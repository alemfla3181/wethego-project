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
import { Box,Stack,FormControl,Paper,Checkbox,FormGroup,FormControlLabel, Chip, Badge, Table,TableHead,TableCell,TableRow,TableBody } from '@mui/material';
import ScheduleAddModal from "./ScheduleAdd";
import ScheduleEditModal from "./ScheduleEdit";
import '../Attendance/calendar.css';
import '../../../assets/Calendar.css';
import { func } from "prop-types";

const Calendar = () => {

    const userData = useSelector(state => state.user.userData);
    const[ShowModal, setShowModal] = useState(false)
    const[ShowModal2, setShowModal2] = useState(false)
    const[clickDay1,setClickDay1] = useState(null)
    const[planList, setPlanList] = useState(null)
    const[planList2, setPlanList2] = useState(null)
    const[userName, setUserName] = useState(null)
    const[levelList, setLevelList] = useState(["1","2","3","4","5"])
    const[todayList, setTodayList] = useState(null)
    const[eno, setEno] = useState(null)
    // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    
    /** Date 클릭시 일정 추가 모달 START **/
    const clickModalHandler = (info) => {   
        setClickDay1(info.dateStr)
        setValues({startDate:info.dateStr, endDate:info.dateStr, level:"3"})
        setShowModal(true)
    }
    /** Date 클릭시 일정 추가 모달 END **/

    /** Event 클릭시 일정 수정,삭제 모달 START **/
    const clickModalHandler2 = async (info) =>{
        if(info.event._def.publicId != "null"){
            const no = info.event._def.publicId;
            await axios.get("/api/schedule/" + no).then((res) => {
                setPlanList2(res.data.data)
                !ShowModal2 ? setShowModal2(true) : setShowModal2(false);
            });
        }
    }
    /** Event 클릭시 일정 수정,삭제 모달 END **/

    /** 스케줄 등록 START **/
        const [values, setValues] = useState({
            content: '',
            startDate: clickDay1,
            endDate: clickDay1,
            employeesNo: '',
            level:''
        });
    /** 스케줄 등록 END **/

    /** 좌측 우선순위 START **/
    const checkSummary = (checked, checkValue) =>{
        if (checked) {
            setLevelList([...levelList, checkValue]);
        } else if (!checked) {
            setLevelList(levelList.filter(el => el !== checkValue));
        }
    }

    const checkSummaryList = async (levelList) => {
        const Data = { level1:levelList[0], level2:levelList[1], level3:levelList[2], level4:levelList[3], level5:levelList[4], no:eno}
        await axios.post("/api/schedule", Data).then((res)=> {
            setPlanList(res.data.data)
        })
    }

    useEffect(()=>{
        checkSummaryList(levelList)
    },[levelList])
    /** 좌측 우선순위 END **/

    /** 좌측 TODAY 오늘기준 가장마지막 등록 EVENT START **/
    const getTodayList = async (e) => {
        var today = new Date();
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        var dateString = year + '-' + month  + '-' + day;

        const Data = {no:e, startDate:dateString}

        await axios.post("/api/schedule/today", Data).then((res)=>{
            setTodayList(res.data.data)
        })
    }
    /** 좌측 TODAY 오늘기준 가장마지막 등록 EVENT END **/

    /** EVENT DRAG UPDATE START **/
    const dragUpdate = async (info) => {
        const Data = {no:info.event._def.publicId, startDate:info.event._instance.range.start, endDate:info.event._instance.range.end, employeesNo:eno}
        await axios.post("/api/schedule/update", Data).then((res) => {
            const Data ={level1:levelList[0], level2:levelList[1], level3:levelList[2], level4:levelList[3], level5:levelList[4], no:eno}
            getPlanList(Data)
            getTodayList(Data.no)
        })
    }
    /** EVENT DRAG UPDATE END **/

    /** 최초 랜더링시 스케줄 출력 START **/
    const getPlanList = async (Data) => {
        await axios.post("/api/schedule", Data).then((res) => {
        setPlanList(res.data.data)
        });
    }

    useEffect (() => {
        const startList = async ()=> {
            if (userData) {
                const Data = {
                    no: userData && userData.data ? userData.data.no : null,
                    level1:levelList[0],
                    level2:levelList[1],
                    level3:levelList[2],
                    level4:levelList[3],
                    level5:levelList[4],
                };
                setEno(Data.no);
                setUserName(userData && userData.data ? userData.data.name : null);
                await getTodayList(Data.no);
                await getPlanList(Data);
                }
        }
    startList();
    }, [userData]);

    /** 최초 랜더링시 스케줄 출력 END **/

    return (
        <>
        <div className="summarySchedule">
            <Paper elevation={3} style={{height:'715px', textAlign:'center'}}>
                <div className="summaryScheduleTitle"><h5>TODAY SUMMARY</h5></div>
                <div className="summaryScheduleTitleList" style={{width:'100%'}}>
                    <div style={{width:'100%',background:'#6f00cc',height:'30px',color:'white',fontWeight:'bolder'}}>1순위</div>
                    <div className="summaryScheduleUpTitle">{todayList ? todayList.map((e,i)=>{
                        if(e.levelData == "1") {
                            return e.content
                        }
                    }):null}</div>
                    <div style={{width:'100%',background:'#00a000',height:'30px',color:'white',fontWeight:'bolder'}}>2순위</div>
                    <div className="summaryScheduleUpTitle">{todayList ? todayList.map((e,i)=>{
                        if(e.levelData=="2"){
                            return e.content
                        }
                    }):null}</div>
                    <div style={{width:'100%',background:'#0d6efd',height:'30px',color:'white',fontWeight:'bolder'}}>3순위</div>
                    <div className="summaryScheduleUpTitle">{todayList ? todayList.map((e,i)=>{
                        if(e.levelData=="3"){
                        return e.content
                        }
                    }):null}</div>
                    <div style={{width:'100%',background:'#d32f2f',height:'30px',color:'white',fontWeight:'bolder'}}>외근</div>
                    <div className="summaryScheduleUpTitle">{todayList ? todayList.map((e,i)=>{
                        if(e.levelData=="4"){
                        return e.content
                        }
                    }):null}</div>
                    <div style={{width:'100%',background:'#ed6c02',height:'30px',color:'white',fontWeight:'bolder'}}>기타</div>
                    <div className="summaryScheduleUpTitle">{todayList ? todayList.map((e,i)=>{
                        if(e.levelData=="5"){
                        return e.content
                        }
                    }):null}</div>
            </div>
            <div style={{width:'100%'}}>
                <div className="summaryScheduleTitle"><h5>Filter</h5></div>
                <div className="summaryScheduleTitleList2" style={{height:'100%',paddingLeft:'15px', paddingTop:'12px'}}>
                    <FormGroup>
                        <FormControlLabel value="1" name= "level" control={<Checkbox defaultChecked color="secondary"/>} label="1순위" onChange={e => checkSummary(e.target.checked, e.target.value)}/>
                        <FormControlLabel value="2" name= "level" control={<Checkbox defaultChecked color="success" />} label="2순위" onChange={e => checkSummary(e.target.checked, e.target.value)}/>
                        <FormControlLabel value="3" name= "level" control={<Checkbox defaultChecked />} label="3순위" onChange={e => checkSummary(e.target.checked, e.target.value)}/>
                        <FormControlLabel value="4" name= "level" control={<Checkbox defaultChecked color="error" />} label="외근" onChange={e => checkSummary(e.target.checked, e.target.value)}/>
                        <FormControlLabel value="5" name= "level" control={<Checkbox defaultChecked color="warning" />} label="기타" onChange={e => checkSummary(e.target.checked, e.target.value)}/>
                    </FormGroup>
                </div>
            </div>
            </Paper>
        </div>
        <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin,timeGridPlugin ]}
        initialView="dayGridMonth"
        locale={"ko"}
        fixedWeekCount={false}
        buttonText={{
        today: "TODAY",
        }}
        // selectable='true'
        editable='true'
        eventDrop={function(info){
            dragUpdate(info)
        }}
        dateClick={clickModalHandler}
        eventClick={clickModalHandler2}
        events={
            planList ? planList
            .map((e, i) => {
              if (e.startDate != null && e.endDate != null) {
                if(e.level === 1){
                    return {
                        id: e.no,
                        title: e.content,
                        start: e.startDate,
                        end: e.endDate,
                        className: 'planevent',
                        color:'#6f00cc'
                      };
                } else if(e.level === 2){
                    return {
                        id: e.no,
                        title: e.content,
                        start: e.startDate,
                        end: e.endDate,
                        className: 'planevent',
                        color:'#00a000'
                      };
                } else if(e.level === 3){
                    return {
                        id: e.no,
                        title: e.content,
                        start: e.startDate,
                        end: e.endDate,
                        className: 'planevent'
                      };
                }else if(e.level === 4){
                    return {
                        id: e.no,
                        title: e.content,
                        start: e.startDate,
                        end: e.endDate,
                        className: 'planevent',
                        color:'#d32f2f'
                      };
                } else if(e.level === 5){
                    return {
                        id: e.no,
                        title: e.content,
                        start: e.startDate,
                        end: e.endDate,
                        className: 'planevent',
                        color:'#ed6c02'
                      };
                } else return {
                        id: e.no,
                        title: e.content,
                        start: e.startDate,
                        end: e.endDate,
                        className: 'planevent',
                      };
              } else return {};
            }).concat(planList.map((e,i)=>{
                if(planList != null){
                    return{
                    id: e.no,
                    title: e.event,
                    start: e.dbDate,
                    // backgroundColor: "#f7e600",
                    backgroundColor: "#f7e600",
                    borderColor : "#f7e600",
                    overlap: true,
                    display: 'background',
                    className: 'holiday',
                }
            }
            })): null
        }
        />
        <div>
        {ShowModal ?
            <ScheduleAddModal clickDay1={clickDay1} ShowModal={ShowModal} setShowModal={setShowModal} values={values} setValues={setValues} eno={eno} getPlanList={getPlanList} userName={userName} levelList={levelList} getTodayList={getTodayList}/>
        :null}

        {ShowModal2 ?
            <ScheduleEditModal ShowModal2={ShowModal2} setShowModal2={setShowModal2} planList2={planList2} getPlanList={getPlanList} eno={eno} userName={userName} levelList={levelList} getTodayList={getTodayList}/>
        :null}
        </div>

        </>
    )
    }


export default Calendar