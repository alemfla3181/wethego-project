import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Header from '../../../components/Header';
import Navigation from "../../../components/Navigation";
import TestNavigation from "../../../components/TestNavigation";
import Footer from "../../../components/Footer";
import { useSelector } from "react-redux";
import { Box, Container, Grid, Paper, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, FormControl, InputLabel, Stack, TableContainer } from '@mui/material';
import dayjs from 'dayjs';

const LandingPage = () => {
  const userData = useSelector(state => state.user.userData);
  const [Dayoff, setDayoff] = useState(null);
  const [Vaction, setVaction] = useState(null);
  const [YearChange, setYearChange] = useState('');
  const date = new Date();
  const currentYear = date.getFullYear();

  const handleYearChange = (event) => {
    setYearChange(event.target.value);
  };

  useEffect(() => {
    if (userData) {
      axios.get("/api/dayoff/" + userData.data.no).then((res) => {
        setDayoff(res.data.data);
        setYearChange(res.data.data[0].dfYear);
      });
      axios.get("/api/dayoff/vacation/" + userData.data.no).then((res) => {
        setVaction(res.data.data);
      });
    }
  }, [userData]);

  return (
    <>
      <TestNavigation />
      {/* <Navigation /> */}
      <div className="back-img">
      <Header />
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3, padding: "5% 10%", backgroundColor: "#E2E2E2"}} /> */}
      
      <Box style={{height: "1500px", minHeight: "100%", paddingTop: "10px", paddingLeft: "15%", paddingRight: "5%", paddingBottom: "auto" }}>
        <div className="container">
          <div className="wethego-h">
            <h2 className="my-4">휴가</h2>
          </div>
          <Paper className="calbox" elevation={5} style={{ marginBottom: "50px" }}>
            <div style={{ width: '100%', padding: '40px' }}>        
          
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                      <Paper
                        sx={{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          height: 240,
                        }}
                      >
                        <Stack required spacing={2} direction="column" style={{ width: "100%", height: "100%" }}>
                          <Typography style={{ width: "100%", height: "50%", fontSize: "30px", lineHeight: "100px", textAlign: "center" }}><strong>{userData && userData.data.name}</strong> {userData && userData.data.pname}님의 <strong>{currentYear}</strong>년도 연차 현황</Typography>
                          <Stack required spacing={3} direction="row" style={{ width: "100%", height: "50%", alignItems: "center", fontSize: "20px", margin: "0px" }}>
                            <Box style={{ height: '70px', width: '50%', backgroundColor: '#0B8ACE', lineHeight: "70px", textAlign: 'center', color: 'white' }} boxShadow="2">
                              총 휴가일수 : <strong>{Dayoff && Dayoff.filter(e => e.dfYear == currentYear)[0].dfTotal}</strong> 일
                            </Box>
                            <Box style={{ height: '70px', width: '50%', backgroundColor: '#0B8ACE', lineHeight: "70px", textAlign: 'center', color: 'white' }} boxShadow="2">
                              사용 휴가일수 : <strong>{Dayoff && Dayoff.filter(e => e.dfYear == currentYear)[0].dfUsed}</strong> 일
                            </Box>
                            <Box style={{ height: '70px', width: '50%', backgroundColor: '#0B8ACE', lineHeight: "70px", textAlign: 'center', color: 'white' }} boxShadow="2">
                              잔여 휴가일수 : <strong>{Dayoff && Dayoff.filter(e => e.dfYear == currentYear)[0].dfTotal - Dayoff.filter(e => e.dfYear == currentYear)[0].dfUsed}</strong> 일
                            </Box>
                          </Stack>
                        </Stack>
                      </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                      <Paper
                        sx={{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          height: 240,
                        }}
                      >
                        <Button
                          style={{
                            width: "70%",
                            height: "70%",
                            // borderRadius: "",
                            fontSize: "35px",
                            marginTop: "33px",
                            marginLeft: "36px"
                          }}
                          variant="contained"
                          component={Link} to="/dayoff/request"
                          disabled={userData && userData.data.level !== '승인' && Dayoff && Dayoff.filter(e => e.dfYear == currentYear)[0].dfTotal - Dayoff.filter(e => e.dfYear == currentYear)[0].dfUsed <= 0 ? true : false}
                        >
                          {userData && userData.data.level === '승인' ? '휴가관리' : '신청'}
                        </Button>
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <div className="employee-head" style={{ display: "block", paddingBottom: "1%" }}>
                          <h3 style={{ display: "inline", float: 'left', marginTop: "1%", marginBottom: "10px" }}>{YearChange ? YearChange + '년도 휴가내역' : '휴가내역 조회'}</h3>
                          <FormControl margin='normal' style={{ float: "right" }}>
                            <InputLabel id="select-label" size='small'>연도</InputLabel>
                            <Select
                              style={{ minWidth: "100px" }}
                              size='small'
                              name="test"
                              label="연도"
                              variant="outlined"
                              defaultValue={YearChange}
                              value={YearChange}
                              onChange={handleYearChange}>
                              {Dayoff ?
                                Dayoff.map((d) =>
                                  <MenuItem key={d.no} value={d.dfYear}>
                                    {d.dfYear}
                                  </MenuItem>
                                )
                                : null}
                            </Select>
                          </FormControl>
                        </div>
                        <TableContainer component={Paper}>
                          <Table sx={{ minWidth: "300px", padding: "5px" }} aria-label="simple table">
                            <TableHead>
                              <TableRow style={{ backgroundColor: "#E2E2E2", padding: "5px 5px" }}>
                                <TableCell align="center">항목</TableCell>
                                <TableCell align="center">시작일</TableCell>
                                <TableCell align="center">종료일</TableCell>
                                <TableCell align="center">사용일수</TableCell>
                                <TableCell align="center">사유</TableCell>
                                <TableCell align="center">처리상태</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {Vaction ? Vaction.map((v) =>
                                <>
                                  {v.vacStart.slice(0, 4) === YearChange ?
                                    <TableRow key={v.no}>
                                      {v.signState === '대기' ? null :
                                        <>
                                          <TableCell align="center">{v.vlist}</TableCell>
                                          <TableCell align="center">{v.vlist !== '반차' ? dayjs(v.vacStart).format("YYYY년 MM월 DD일") : dayjs(v.vacStart).format("YYYY년 MM월 DD일 HH시 mm분")}</TableCell>
                                          <TableCell align="center">{v.vlist !== '반차' ? dayjs(v.vacEnd).format("YYYY년 MM월 DD일") : dayjs(v.vacEnd).format("YYYY년 MM월 DD일 HH시 mm분")}</TableCell>
                                          <TableCell align="center">{v.vlist === "반차" ? '-0.5' : `${dayjs(v.vacEnd).diff(v.vacStart, "day")}` === '0' ? '-1' : -`${dayjs(v.vacEnd).diff(v.vacStart, "day") + 1}`}</TableCell>
                                          <TableCell align="center">{v.vacReason}</TableCell>
                                          <TableCell style={{ backgroundColor: v.signState === '승인' ? `#87C030` : v.signState === '반려' ? `#E70010` : null, color: `${v.signState === '승인' || v.signState === '반려' ? `#FFFFFF` : null}` }} align="center">
                                            {v.signState}
                                          </TableCell>
                                        </>
                                      }
                                    </TableRow>
                                    : null}
                                </>
                              ) : null}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Grid>
                  </Grid>
                </Container>
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