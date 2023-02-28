import React from 'react'
import Header from '../../../components/Header'
import Navigation from '../../../components/Navigation'
import TestNavigation from "../../../components/TestNavigation";
import Footer from '../../../components/Footer';
import { Box } from '@mui/material';
import Paper from "@mui/material/Paper";
import Calendar from './Calendar';

const LandingPage = () => {
  return (
    <>
      {/* <Navigation /> */}
      <TestNavigation />
      <div className="back-img">
        <Header />
        <Box style={{height: "1500px", minHeight: "100%", paddingTop: "10px", paddingLeft: "15%", paddingRight: "5%", paddingBottom: "auto" }}>
          <div className="container">
            <div className="wethego-h">
              <h2 className="my-4">근무 일정</h2>
            </div>
            <Paper className="calbox" elevation={5} style={{ marginBottom: "50px" }}>
              <div style={{ width: '100%', padding: '40px' }} className="calback" >
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