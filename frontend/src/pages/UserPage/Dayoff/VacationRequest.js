import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from '../../../components/Header';
import Navigation from "../../../components/Navigation";
import TestNavigation from "../../../components/TestNavigation";
import Footer from "../../../components/Footer";
import { useSelector } from "react-redux";
import { Box, Container, Grid, Paper, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, FormControl, InputLabel, Stack, TableContainer, TextField, TableFooter, TablePagination } from '@mui/material';
import Swal from "sweetalert2";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import * as locales from '@mui/material/locale';

const VacationRequest = () => {
  const userData = useSelector(state => state.user.userData);
  const date = new Date();
  const currentYear = date.getFullYear();
  let result;
  
  const [EditVlist, setEditVlist] = useState('');
  const [StartDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState('');
  const [Vaction, setVaction] = useState('');
  const [VacRequest, setVacRequest] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [Dayoff, setDayoff] = useState('');

  useEffect(() => {
    if (userData) fetchData();
  }, [userData]);

  const fetchData = async () => {
    axios.get("/api/dayoff/" + userData.data.no).then((res) => {
      setDayoff(res.data.data);
    });
    await axios.get("/api/dayoff/vacation/" + userData.data.no).then((res) => {
      setVaction(res.data.data);
      console.log(res.data.data);
    });
    await axios.get("/api/dayoff/vacation/request/" + userData.data.no).then((res) => {
      setVacRequest(res.data.data);
      console.log(res.data.data);
    });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  };

  const handleVlistChange = (event) => {
    setEditVlist(event.target.value);
    console.log(event.target.value);
  };

  const cancelVacRequest = (vNo) => {
    Swal.fire({
      title: '신청취소',
      text: "해당 휴가 신청을 취소하시겠습니까?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get('/api/dayoff/vacation/delete/' + vNo)
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: '취소성공!',
                text: '휴가가 취소되었습니다.',
                showConfirmButton: false,
                timer: 1500
              })
              fetchData();
            });
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    console.log(userData.data.departmentNo)
    const data = new FormData(e.currentTarget);
      const requestVac = {
        vlist: data.get('vlist'),
        vacStart: data.get('vacStart'),
        vacEnd: data.get('vacEnd'),
        vacReason: data.get('vacReason'),
        employeesNo: userData && userData.data.no,

        // departmentNo 추가
        departmentNo : userData && userData.data.departmentNo
      };

      onhandleModify(requestVac);
      console.log(requestVac);
  }

  const confirmRequest = (e, result) => {
    console.log('confirmRequest:' + e, result);

    const data = {
      "no": e,
      "result": result
    }

    Swal.fire({
      title: '확인',
      text: "승인하시겠습니까?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '승인',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('/api/dayoff/vacation/request/confirm', data)
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: '승인완료!',
                text: '휴가가 승인되었습니다.',
                showConfirmButton: false,
                timer: 1500
              })
              fetchData();
            });
      }
    })
  }

  const referRequest = (e, result) => {
    console.log('refer:' + e, result);

    const data = {
      "no": e,
      "result": result
    }

    Swal.fire({
      title: '확인',
      text: "반려하시겠습니까?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '반려',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('/api/dayoff/vacation/request/refer', data)
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: '반려처리 성공!',
                text: '휴가가 반려되었습니다.',
                showConfirmButton: false,
                timer: 1500
              })
              fetchData();
            });
      }
    })
  }

  const onhandleModify = async (data) => {
    const { vlist, vacStart, vacEnd, vacReason, employeesNo, departmentNo} = data; // departmentNo추가
    const requestVac = { vlist, vacStart, vacEnd, vacReason, employeesNo, departmentNo };  // departmentNo추가
    console.log(requestVac)
    result = data.vlist === "반차" ? '0.5' : `${dayjs(data.vacEnd).diff(data.vacStart, "day")}` === '0' ? '1' : `${dayjs(data.vacEnd).diff(data.vacStart, "day") + 1}`
    if(data.vlist !== '병가' && Dayoff && Dayoff.filter(e => e.dfYear == currentYear)[0].dfTotal - Dayoff.filter(e => e.dfYear == currentYear)[0].dfUsed < result){
      Swal.fire({
        icon: 'error',
        title: '신청불가!',
        text: '잔여 휴가일수를 초과하여 신청하실 수 없습니다!',
        showConfirmButton: false,
        timer: 2500
      })
      fetchData();
    } else {
      Swal.fire({
        title: '확인',
        text: "신청하시겠습니까?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '신청',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post('/api/dayoff/vacation', requestVac)
              .then(() => {
                Swal.fire({
                  icon: 'success',
                  title: '신청완료!',
                  text: '휴가신청이 접수되었습니다.',
                  showConfirmButton: false,
                  timer: 1500
                })
                fetchData();
              });
        }
      })
    }
  }

  return (
    <>
    {/* <Navigation /> */}
    <TestNavigation />
    <Header />
    <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                    width: 'auto'
                  }}
                >
                 <Stack required spacing={3} direction="column" style={{width: "100%", height: "100%", lineHeight: "16px"}}>
                 <Typography style={{width: "100%", height: "10%", lineHeight: "50px", textAlign: "center"}}>휴가 신청</Typography>
                    <FormControl style={{maxWidth: "100%", display:"flex", alignItems:"center"}} required margin='normal' component="form" onSubmit={handleSubmit}>
                      <Stack spacing={3} direction="row" style={{width: "100%", height: "100%", lineHeight: "16px"}}>
                        <FormControl style={{width: "25%", height: "100%", lineHeight: "16px"}}>
                          <InputLabel required size='normal'>휴가유형</InputLabel>
                          <Select 
                            autoFocus
                            required
                            size='medium'
                            name="vlist"
                            label="휴가유형"
                            variant="outlined" 
                            defaultValue={"연차"}
                            onChange={handleVlistChange}>
                              <MenuItem value={"연차"}>연차</MenuItem>
                              <MenuItem value={"반차"}>반차</MenuItem>
                              <MenuItem value={"병가"}>병가</MenuItem>
                          </Select>
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locales.koKR}>
                          <DateTimePicker
                            renderInput={(params) => <TextField required disabled id="vacStart" name="vacStart" InputLabelProps={{shrink: true}} {...params} error={false} />}
                            label="시작일시"
                            value={StartDate}
                            onChange={(startValue) => {
                              setStartDate(startValue);
                            }}
                            disablePast
                            minutesStep={30}
                            inputFormat={EditVlist === '반차' ? "YYYY-MM-DD HH:00" : "YYYY-MM-DD"}
                            views={EditVlist === '반차' ? ["month", "day", "hours"] : ["month", "day"]}
                            minDateTime={dayjs()}
                            ampm={false}
                            erro
                            shouldDisableTime={
                              EditVlist === '반차' ? (timeValue, clockType) => {
                                return clockType === "hours" && timeValue !== 9 & timeValue !== 14;
                              } : null }
                          />
                          
                          <DateTimePicker 
                            renderInput={(params) => <TextField required disabled={EditVlist === '반차' ? true : false} id="vacEnd" name="vacEnd" InputLabelProps={{shrink: true}} {...params} error={false} />}
                            readOnly={EditVlist === '반차' ? true : false}
                            label="종료일시"
                            value={EditVlist === '반차' ? dayjs(StartDate).add(4, 'h') : EndDate}
                            onChange={(endValue) => {
                              setEndDate(endValue);
                            }}
                            minutesStep={30}
                            ampm={false}
                            inputFormat={EditVlist === '반차' ? "YYYY-MM-DD HH:00" : "YYYY-MM-DD"}
                            views={EditVlist === '반차' ? ["month", "day", "hours"] : ["month", "day"]}
                            minDateTime={dayjs(StartDate)}
                          />
                        </LocalizationProvider>

                        <TextField
                          required
                          style={{width: "28.3%"}}
                          id="vacReason"
                          name="vacReason"
                          label="사유"
                          type="text"
                          color="primary"
                        />

                      </Stack>
                      <br/>
                      <Button style={{height: "50px", width: "25%"}} disabled={Dayoff && Dayoff.filter(e => e.dfYear == currentYear)[0].dfTotal <= Dayoff.filter(e => e.dfYear == currentYear)[0].dfUsed ? true : false } type="submit" position="absolute" color="primary" variant="contained">신청</Button>                      
                    </FormControl>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <div className="employee-head" style={{display: "block", paddingBottom: "1%"}}>
                  <h3 style={{display: "inline", float: 'left', marginTop: "1%", marginBottom: "10px"}}>신청내역</h3>
                  </div>
                  <TableContainer component={Paper}>
                      <Table sx={{ minWidth: "300px", padding: "5px"}} aria-label="simple table">
                        <TableHead>
                          <TableRow style={{backgroundColor: "#E2E2E2", padding: "5px 5px"}}>
                            <TableCell align="center">No</TableCell>
                            <TableCell align="center">항목</TableCell>
                            <TableCell align="center">시작일</TableCell>
                            <TableCell align="center">종료일</TableCell>
                            <TableCell align="center">사용일수</TableCell>
                            <TableCell align="center">사유</TableCell>
                            <TableCell align="center">처리상태</TableCell>
                            <TableCell align="center" />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Vaction ? Vaction
                            .slice(page * rowsPerPage, (page + 1) * (rowsPerPage))
                            .map((v, i) => 
                            <TableRow key={v.no}>
                              {v.signState === '대기' ?
                                <>
                                <TableCell align="center" component="th" scope="row">
                                  {i}
                                </TableCell>
                                <TableCell align="center">{v.vlist}</TableCell>
                                <TableCell align="center">{v.vlist !== '반차' ? dayjs(v.vacStart).format("YYYY년 MM월 DD일") : dayjs(v.vacStart).format("YYYY년 MM월 DD일 / HH시")}</TableCell>
                                <TableCell align="center">{v.vlist !== '반차' ? dayjs(v.vacEnd).format("YYYY년 MM월 DD일") : dayjs(v.vacEnd).format("YYYY년 MM월 DD일 / HH시")}</TableCell>
                                <TableCell align="center">
                                {v.vlist === "반차" ? '0.5' : `${dayjs(v.vacEnd).diff(v.vacStart, "day")}` === '0' ? '1' : `${dayjs(v.vacEnd).diff(v.vacStart, "day") + 1}`}
                                </TableCell>
                                <TableCell align="center">{v.vacReason}</TableCell>
                                <TableCell align="center">{v.signState}</TableCell>
                                <TableCell align="center">
                                  <Button variant="contained" size="small" color="error" onClick={() => cancelVacRequest(v.no)}>
                                    신청취소
                                  </Button>
                                </TableCell>
                                </>
                              : null}
                            </TableRow>
                          ) : null}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TablePagination
                              count={VacRequest.length}
                              page={page}      
                              labelDisplayedRows={({ from, to, count }) => `${from}-${to} 중 ${count} 페이지`}
                              labelRowsPerPage={'페이지 당 행'}              
                              rowsPerPage={rowsPerPage}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </TableContainer>
                </Paper>
              </Grid>
            {userData && userData.data.level === '승인' ? 
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <div className="employee-head" style={{display: "block", paddingBottom: "1%"}}>
                  <h3 style={{display: "inline", float: 'left', marginTop: "1%", marginBottom: "10px"}}>휴가승인</h3>
                  </div>
                  <TableContainer component={Paper}>
                      <Table sx={{ minWidth: "300px", padding: "5px"}} aria-label="simple table">
                        <TableHead>
                          <TableRow style={{backgroundColor: "#E2E2E2", padding: "5px 5px"}}>
                            <TableCell align="center">소속</TableCell>
                            <TableCell align="center">이름</TableCell>
                            <TableCell align="center">유형</TableCell>
                            <TableCell align="center">시작일</TableCell>
                            <TableCell align="center">종료일</TableCell>
                            <TableCell align="center">사용일수</TableCell>
                            <TableCell align="center">사유</TableCell>
                            <TableCell align="center">처리상태</TableCell>
                            <TableCell align="center" />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {VacRequest ? VacRequest.map((v) => {
                            result = v.vlist === "반차" ? '0.5' : `${dayjs(v.vacEnd).diff(v.vacStart, "day")}` === '0' ? '1' : `${dayjs(v.vacEnd).diff(v.vacStart, "day") + 1}`;
                            console.log(result);
                            
                            return <TableRow key={v.no}>
                              {v.signState === '대기' ?
                                <>
                                <TableCell align="center">{v.dname}</TableCell>
                                <TableCell align="center">{v.name}</TableCell>
                                <TableCell align="center">{v.vlist}</TableCell>
                                <TableCell align="center">{v.vlist !== '반차' ? dayjs(v.vacStart).format("YYYY년 MM월 DD일") : dayjs(v.vacStart).format("YYYY년 MM월 DD일 / HH시")}</TableCell>
                                <TableCell align="center">{v.vlist !== '반차' ? dayjs(v.vacEnd).format("YYYY년 MM월 DD일") : dayjs(v.vacEnd).format("YYYY년 MM월 DD일 / HH시")}</TableCell>
                                <TableCell align="center">
                                { '-' + result}
                                </TableCell>
                                <TableCell align="center">{v.vacReason}</TableCell>
                                <TableCell align="center">{v.signState}</TableCell>
                                <TableCell align="center">
                                  <Button variant="contained" size="small" color="success" onClick={() => confirmRequest(v.no, result)}>
                                    승인
                                  </Button>
                                  &nbsp;&nbsp;
                                  <Button variant="contained" size="small" color="error" onClick={() => referRequest(v.no, result)}>
                                    반려
                                  </Button>
                                </TableCell>
                                </>
                              : null}
                            </TableRow>
}
                          ) : null}
                        </TableBody>
                      </Table>
                    </TableContainer>
                </Paper>
              </Grid>
              : null }
            </Grid>
          </Container>
        </Box>
    <Footer />
    </>
  )
}

export default VacationRequest