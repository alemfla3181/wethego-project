import React, { Component } from "react";
import { Routes, Route } from "react-router";
import Auth from "./hoc/auth";
import AdminEmployeesPage from "./pages/admin/Employees/LandingPage";
import AdminPage from "./pages/admin/Department/LandingPage";
import LandingPage from "./pages/UserPage/MainPage/LandingPage";
import LoginPage from "./pages/UserPage/LoginPage/LoginPage";
import AdminAttendancePage from "./pages/admin/Attendance/LandingPage";
import AdminPositionPage from "./pages/admin/Position/LandingPage";
import AdminBoardPage from "./pages/admin/Board/LandingPage";
import AdminDayoffPage from "./pages/admin/Dayoff/LandingPage";
import AdminDayoffsetPage from "./pages/admin/Dayoff/DayoffLandingPage";
import SchedulePage from "./pages/UserPage/Schedule/LandingPage";
import AttendancePage from "./pages/UserPage/Attendance/LandingPage";
import DayoffPage from "./pages/UserPage/Dayoff/LandingPage";
import BoardPage from "./pages/UserPage/Board/LandingPage";
import OrganizationPage from "./pages/UserPage/Organization/LandingPage";
import StatisticsPage from "./pages/UserPage/Statistics/LandingPage";
import VacationRequest from "./pages/UserPage/Dayoff/VacationRequest";


import TTest from "./pages/UserPage/Test/TTest";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={Auth(LandingPage, true)} />
        <Route path="/login" element={Auth(LoginPage, false)} />
        <Route path="/admin" element={Auth(AdminPage, true, true)} />
        <Route path="/admin/employees" element={Auth(AdminEmployeesPage, true, true)} />
        <Route path="/admin/attendance" element={Auth(AdminAttendancePage, true, true)} />
        <Route path="/admin/position" element={Auth(AdminPositionPage, true, true)} />
        <Route path="/admin/board" element={Auth(AdminBoardPage, true, true)} />     
        <Route path="/admin/dayoff" element={Auth(AdminDayoffPage, true, true)} />     
        <Route path="/admin/dayoffset" element={Auth(AdminDayoffsetPage, true, true)} />     

        <Route path="/schedule" element={Auth(SchedulePage, true)} />      
        <Route path="/attendance" element={Auth(AttendancePage, true)} />
        <Route path="/dayoff" element={Auth(DayoffPage, true)} />
        <Route path="/dayoff/request" element={Auth(VacationRequest, true)} />
        <Route path="/board" element={Auth(BoardPage, true)} />
        <Route path="/department" element={Auth(OrganizationPage, true)} />
        <Route path="/statistics" element={Auth(StatisticsPage, true)} /> 

        {/* <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/employees" element={<AdminEmployeesPage />} />
        <Route path="/admin/attendance" element={<AdminAttendancePage />} />
        <Route path="/admin/position" element={<AdminPositionPage />} />
        <Route path="/admin/board" element={<AdminBoardPage />} />     

        <Route path="/schedule" element={<SchedulePage />} />      
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/dayoff" element={<DayoffPage />} />
        <Route path="/dayoff/request" element={<VacationRequest />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/department" element={<OrganizationPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />  */}

        {/* 테스트용 */}
        <Route path="/test" element={<TTest />} /> 
        
      </Routes>
    </>
  );
}

export default App;
