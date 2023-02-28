import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../../assets/App.css";
import Navigation from "../../../components/Navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import IndexAttendanceBox from "./IndexAttendanceBox";
import IndexNoticeBox from "./IndexNoticeBox";
import IndexProfileBox from "./IndexProfileBox";
import IndexTitle from "./IndexTitle";
import IndexTplanBox from "./IndexTplanBox";
import IndexTvactionBox from "./IndexTvactionBox";
import QuickChat from "../../../components/QuickChat";
import TestNavigation from "../../../components/TestNavigation";
import { Box } from "@mui/material";

const LandingPage = () => {
  return (
    <>
      <TestNavigation/>
      {/* <Navigation /> */}
      <div className="back-img">
        <Header />
        <Box style={{height: "1500px", minHeight: "100%", paddingTop: "10px", paddingLeft: "15%", paddingRight: "5%", paddingBottom: "auto"}}>
        <div className="container">
          {/* {상단 wethego 제목 시작} */}
          <IndexTitle/>
          {/* {-----------1번째 줄 시작-----------} */}
          <div className="row">
            {/* {profile box 1 시작} */}
            <IndexProfileBox />

            <div className="col-1"></div>

            {/* {출근,휴가 등 카운트 box 2 시작} */}
            <IndexAttendanceBox />
          </div>

          {/* {-----------2번째 줄 시작-----------} */}
          <div className="row" style={{ height: "405px", marginTop: "40px" }}>
            {/* {팀원일정 box 시작} */}
            <IndexTplanBox />

            <div className="col-1"></div>
            
            {/* {팀 휴가일정 box 시작} */}
            <IndexTvactionBox />
          </div>

          {/* {-----------3번 째 줄 시작-----------} */}
          <div className="min-width">
            <div className="row" style={{ height: "360px", marginTop: "40px" }}>
              {/* {3번 째 줄 공지사항} */}
              <IndexNoticeBox />
            </div>
          </div>
          {/* {-----------container 끝-----------} */}
        </div>
        </Box>
      </div>
      <Footer />
       {/* {Side 팀챗} */}
      {/* <QuickChat /> */}
    </>
  );
};



export default LandingPage;
