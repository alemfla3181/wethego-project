import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";

const Calendar = () => {
  const user = useSelector((state) => state.user);
  const [attList, setAttList] = useState(null);

  /** 최초 랜더링시 출퇴근 출력 START **/

  /** 출퇴근, 휴가 기록 START **/
  const getAttList = async (Data) => {
    await axios.post("/api/attendance/userAttendance", Data).then((res) => {
      setAttList(res.data.data)
    });
  }

  console.log(attList)

  useEffect (() => {
    if (user && attList === null) {
      const Data = {
        no: user.userData && user.userData.data ? user.userData.data.no : null,
      };
      getAttList(Data);
    }
  }, [user]);
  /** 최초 랜더링시 출퇴근 출력 END **/

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        aspectRatio={"1.35"}
        eventShortHeight={"3.5px"}
        locale={"ko"}
        fixedWeekCount={false}
        buttonText={{
          today: "TODAY",
        }}
        selectable={true}
        events=
        {
          (attList
            ? attList.map((e, i) => {
              if (e.vacStart != null) {
                // e.vacStart = e.vacStart.slice(0,10);
                // e.vacEnd = e.vacEnd.slice(0,10);

                // e.vacStart = e.vacStart.replace(/-/g,'');
                // e.vacEnd = e.vacEnd.replace(/-/g,'');

                // e.vacStart = parseInt(e.vacStart);
                // e.vacEnd = parseInt(e.vacEnd);

                // if(e.vacEnd - e.vacStart > 0) {
                //   e.vacEnd = e.vacEnd+1;
                // }
                // e.vacStart = e.vacStart.toString();
                // e.vacEnd = e.vacEnd.toString();
                
                return {
                  id: e.no,
                  title: e.vlist,
                  start: e.vacStart,
                  end: e.vacEnd,
                  color:"lightcoral"
                };
              } else return {};
            }).concat(attList
                .map((e, i) => {
                  if (e.inTime != null) {
                    return {
                      id: e.no,
                      title: "출근 T /  " + e.inTime.slice(11, 16),
                      start: e.inoutDay,
                      className: 'workstart'
                    };
                  } else return {};
                }))
                .concat(
                  attList.map((e, i) => {
                    if (e.outTime != null) {
                      return {
                        id: e.no,
                        title: "퇴근 T /   " + e.outTime.slice(11, 16),
                        start: e.inoutDay,
                        color: "#4B54DC",
                        className: 'attleavework'
                      };
                    } else if (e.outTime === null) {
                      return {};
                    }
                  })
                )
                .concat(
                  attList.map((e, i) => {
                    if (e.totalTime != null && e.totalTime != 0) {
                      return {
                        id: e.no,
                        title:
                          "합계 T /  " + (e.totalTime / 60).toFixed(1) + " H",
                        start: e.inoutDay,
                        color: "#005282",
                        className: 'attTotaltime'
                      };
                    } else return {};
                  })
                ).concat(
                  attList.map((e,i)=>{
                    if(attList != null){
                      return {
                        id: e.id,
                        title: e.event,
                        start: e.dbDate,
                        backgroundColor: "#f7e600",
                        borderColor : "#f7e600",
                        overlap: false,
                        display: 'background',
                        className: 'holiday'
                      };
                    }
                  })
                )
            : null)
          } 
      />
    </>
  );
};

export default Calendar;
