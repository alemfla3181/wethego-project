import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import BasicModal from "./AttendanceEdit";
import Navigation from "../Navigation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../../assets/Admin.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Pagination from "./Pagination";
import Swal from "sweetalert2";
import "../Employees/swal2.css";
import { Box } from "@mui/material";
import "../../../assets/Calendar.css";

const LandingPage = () => {
  const [attendance, setAttendance] = useState(null); //** 목록 **/
  const [attendances, setAttendances] = useState(null); /** 모달창 값 **/
  const [searchValue, setSearchValue] = useState(null);
  const [ShowModal, setShowModal] = useState(false);
  const options = [{ value: "userId", text: "ID" },{ value: "name", text: "이름" }];
  const [selected, setSelected] = useState(options[0].value);
  const [pickDate, setPickDate] = useState(null);

  const onChangeDateHandler = (e) => {
    setPickDate(e.target.value);
  };

  /** SELECTBAR START **/
  const onChangeHandler = (e) => {
    setSelected(e.target.value);
  };
  /** SELECTBAR END **/

  /** Paging START **/
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [totalCount, setTotalCount] = useState(null);
  /** Paging END **/

  const fetchData = async () => {
    if (pickDate != null) {
      const res = await axios.get("/api/attendance?date=" + pickDate);
      setAttendance(res.data.data);
      setTotalCount(res.data.data.totalCount);
    } else
      await axios.get("/api/attendance").then((res) => {
        setAttendance(res.data.data);
        setTotalCount(res.data.data.totalCount);
      });
  };

  /** Modal창 START **/
  const clickModalHandler = async (e) => {
    await axios.get("/api/attendance/" + e.no).then((res) => {
      !ShowModal ? setShowModal(true) : setShowModal(false);
      setAttendances(res.data.data);
    });
  };
  /** Modal창 END **/

  /** 출퇴근 기록 삭제 START **/
  const attDelete = async (no,name) => {
    const res = await axios.delete("/api/attendance/" + no);
    if (searchValue == null) {
      Swal.fire({
        icon: "success",
        title: "[" + name + "] 님의",
        text: "출퇴근 정보가 삭제되었습니다!",
        showConfirmButton: false,
        timer: 2000,
      });
      fetchData(); //검색조건 없는 경우
    } else if (searchValue != null) {
      Swal.fire({
        icon: "success",
        title: "[" + name + "] 님의",
        text: "출퇴근 정보가 삭제되었습니다!",
        showConfirmButton: false,
        timer: 2000,
      });
        const res = await axios.get("/api/attendance?" + selected + "=" + searchValue + "&date=" + pickDate);
        setAttendance(res.data.data); //검색조건 있는 경우
        setTotalCount(res.data.data.totalCount);
      };
    }
  const onRemove = (no,name,inoutDay) => {
    Swal.fire({
      title: "[" + name + "] 님의",
      text: inoutDay + " 날짜의 출퇴근 정보를 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        attDelete(no,name);
      }
    })
  };
  /** 출퇴근 기록 삭제 END **/

  /** ID, 이름 검색 START **/
  useEffect(() => {
    const fetchData2 = async () => {
      if (searchValue != null) {
        const res = await axios.get("/api/attendance?" + selected + "=" + searchValue + "&date=" + pickDate);
        setAttendance(res.data.data);
        setTotalCount(res.data.data.totalCount);
      }
    };
    fetchData2();
  }, [searchValue]);
  /** ID, 이름 검색 END **/

  /** 출퇴근 기록 List START **/
  useEffect(() => {
    if (attendance == null) fetchData();
  }, [attendance]);
  /** 출퇴근 기록 List END **/

  /** 날짜 검색 START **/
  useEffect(() => {
    const date = async () => {
      if (pickDate != null && searchValue == null) {
        const res = await axios.get("/api/attendance?date=" + pickDate);
        setPage(1);
        setAttendance(res.data.data);
        setTotalCount(res.data.data.totalCount);
      } else if (pickDate != null && searchValue != null) {
        const res = await axios.get("/api/attendance?" + selected + "=" + searchValue + "&date=" + pickDate);
        setAttendance(res.data.data);
        setTotalCount(res.data.data.totalCount);
      }
    };
    date();
  }, [pickDate]);
  /** 날짜 검색 END **/

  return (
    <>
      <Navigation />
      <Header />
      <Box style={{backgroundColor: "rgb(243, 243, 243)", height: "800px", minHeight: "100%", paddingTop: "10px", paddingLeft: "15%", paddingRight: "5%", paddingBottom: "auto"}}>
      <div className="container">
        <div className="admin_wethego-h">
          <h2 className="my-4">출퇴근 관리</h2>
        </div>
        <Paper elevation={5} style={{ marginBottom: "50px" }}>
          <div>
            <div className="admin_attSearch">
              <select
                value={selected}
                onChange={onChangeHandler}
                style={{ width: "50px", padding: "2px", textAlign: "center" }}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              <input
                placeholder="ID or 이름을 입력해주세요."
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setPage(1); // 검색 후 다시 검색 시 1페이지로 돌아가기 위함
                }}
              />
            </div>
            <div className="admin_attCalendar">
              <TextField
                required
                size="small"
                name="date"
                label="날짜"
                InputLabelProps={{ shrink: true }}
                type="date"
                margin="normal"
                variant="outlined"
                onChange={onChangeDateHandler}
                style={{ width: "30%", margin: "25px 0px 15px 62px" }}
              />
            </div>
          </div>
          <div className="admin_attContents">
            <Paper sx={{ width: "100%", overflow: "hidden", height: "100%" }}>
              <TableContainer>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  className="admin_attTable"
                  style={{ width: "90%" }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bolder",
                          backgroundColor: "#D3D3D3",
                        }}
                      >
                        No.
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bolder",
                          backgroundColor: "#D3D3D3",
                        }}
                      >
                        ID
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bolder",
                          backgroundColor: "#D3D3D3",
                        }}
                      >
                        이름
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bolder",
                          backgroundColor: "#D3D3D3",
                        }}
                      >
                        날짜
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bolder",
                          backgroundColor: "#D3D3D3",
                        }}
                      >
                        출근시간
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bolder",
                          backgroundColor: "#D3D3D3",
                        }}
                      >
                        퇴근시간
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bolder",
                          backgroundColor: "#D3D3D3",
                        }}
                      >
                        삭제여부
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendance
                      ? attendance.list
                          .slice(offset, offset + limit)
                          .map((e, i) => (
                            <TableRow hover key={e.no} align="center">
                              <TableCell align="center">{e.no}</TableCell>
                              <TableCell
                                align="center"
                                onClick={() => clickModalHandler(e)}
                              >
                                {e.userId}
                              </TableCell>
                              <TableCell
                                align="center"
                                onClick={() => clickModalHandler(e)}
                              >
                                {e.name}
                              </TableCell>
                              <TableCell
                                align="center"
                                onClick={() => clickModalHandler(e)}
                              >
                                {e.inoutDay}
                              </TableCell>
                              <TableCell
                                align="center"
                                onClick={() => clickModalHandler(e)}
                              >
                                {e.inTime}
                              </TableCell>
                              <TableCell
                                align="center"
                                onClick={() => clickModalHandler(e)}
                              >
                                {e.outTime}
                              </TableCell>
                              <TableCell align="center">
                              <Button variant="contained" size="small" color="error" onClick={()=>onRemove(e.no,e.name,e.inoutDay)}>
                            삭제
                          </Button>
                              </TableCell>
                            </TableRow>
                          ))
                      : null}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                total={totalCount}
                limit={limit}
                page={page}
                setPage={setPage}
              />
            </Paper>
          </div>
        </Paper>
        {ShowModal ? (
          <BasicModal
            show={ShowModal}
            attendances={attendances}
            fetchData={fetchData}
            selected={selected}
            searchValue={searchValue}
            setAttendance={setAttendance}
            pickDate={pickDate}
            setTotalCount={setTotalCount}
            callback={() => setShowModal(false)}
          />
        ) : null}
      </div>
      </Box>
      <Footer />
    </>
  );
};

export default LandingPage;
