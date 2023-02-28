import React from 'react'
import Header from '../../../components/Header'
import Navigation from '../../../components/Navigation'
import TestNavigation from "../../../components/TestNavigation";
import Footer from '../../../components/Footer';
import Calendar from './Calendar';
import { Box } from '@mui/material';
import Paper from "@mui/material/Paper";
import './calendar.css';
import CalendarColor from './CalendarColor';

const LandingPage = () => {
  return (
    <>
      <TestNavigation />
      <Navigation />
      <div className="back-img">
        <Header />
        <Box style={{height: "1500px", minHeight: "100%", paddingTop: "10px", paddingLeft: "15%", paddingRight: "5%", paddingBottom: "auto" }}>
          <div className="container">
            <div className="wethego-h">
              <h2 className="my-4">출퇴근 기록</h2>
            </div>
            <Paper elevation={5} style={{ marginBottom: "50px" }}>
              <CalendarColor />
              <div style={{ width: '100%', padding: '40px' }} className="calback">
                <Calendar />
              </div>
            </Paper>
          </div>
        </Box>
      </div>
      <Footer />
    </>
  )
}

export default LandingPage