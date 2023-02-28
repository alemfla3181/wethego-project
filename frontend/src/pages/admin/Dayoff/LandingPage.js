import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import "../Employees/swal2.css";
import Swal from "sweetalert2";
import "../Employees/swal2.css";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Pagination from "./Pagination";

const LandingPage = () => {
  const [vacation, setVacation] = useState(null); //** 목록 **/
  const [searchValue, setSearchValue] = useState(null);
  const [ShowModal, setShowModal] = useState(false);
  const options = [{ value: "userId", text: "ID" },{ value: "name", text: "이름" }];
  const [selected, setSelected] = useState(options[0].value);
  const [pickDate, setPickDate] = useState(null);
  const [pickDate2, setPickDate2] = useState(null);

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

  /** ID, 이름 검색 START **/
  useEffect(() => {
    const fetchData2 = async () => {
      if (searchValue != null) {
        const res = await axios.get("/api/dayoff?" + selected + "=" + searchValue + "&date=" + pickDate);
        setVacation(res.data.data);
        setTotalCount(res.data.data.totalCount);
      }
    };
    fetchData2();
  }, [searchValue]);
  /** ID, 이름 검색 END **/

  /** 최초 랜더링 리스트 가져오기 START **/
  const fetchData = async () => {
    await axios.get("/api/dayoff").then((res) => {
      setVacation(res.data.data);
      console.log(res.data.data)
      setTotalCount(res.data.data.totalCount);
    });
  }

  useEffect(() => {
    if (vacation == null) fetchData();
  }, [vacation]);
  /** 최초 랜더링 리스트 가져오기 START **/

   /** 날짜 검색 START **/
   useEffect(() => {
    const date = async () => {
      if (pickDate != null && searchValue == null) {
        const res = await axios.get("/api/dayoff?date=" + pickDate);
        setPage(1);
        setVacation(res.data.data);
        setTotalCount(res.data.data.totalCount);
      } else if (pickDate != null && searchValue != null) {
        const res = await axios.get("/api/dayoff?" + selected + "=" + searchValue + "&date=" + pickDate);
        setVacation(res.data.data);
        setTotalCount(res.data.data.totalCount);
      }
    };
    date();
  }, [pickDate]);
  /** 날짜 검색 END **/

  /** 휴가 기록 삭제 START **/
  const vacDelete = async (no,name) => {
    const res = await axios.delete("/api/dayoff/" + no);
    if (searchValue == null) {
      Swal.fire({
        icon: "success",
        title: "[" + name + "] 님의",
        text: "휴가 기록이 삭제되었습니다!",
        showConfirmButton: false,
        timer: 2000,
      });
      fetchData(); //검색조건 없는 경우
    } else if (searchValue != null) {
      Swal.fire({
        icon: "success",
        title: "[" + name + "] 님의",
        text: "휴가 기록이 삭제되었습니다!",
        showConfirmButton: false,
        timer: 2000,
      });
        const res = await axios.get("/api/dayoff?" + selected + "=" + searchValue + "&date=" + pickDate);
        setVacation(res.data.data); //검색조건 있는 경우
        setTotalCount(res.data.data.totalCount);
      };
    }
  const onRemove = (no,name,vacStart) => {
    vacStart = vacStart.substring(0,10);
    Swal.fire({
      title: "[" + name + "] 님의",
      text: vacStart + " 날짜의 휴가 기록을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        vacDelete(no,name);
      }
    })
  };
  /** 휴가 기록 삭제 END **/

  return (
    <>
      <Navigation />
      <Header />
      <Box style={{backgroundColor: "rgb(243, 243, 243)", height: "800px", minHeight: "100%", paddingTop: "10px", paddingLeft: "15%", paddingRight: "5%", paddingBottom: "auto"}}>
      <div className="container">
        <div className="admin_wethego-h">
          <h2 className="my-4">휴가 관리</h2>
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
            <div className="admin_vacCalendar">
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
          <div className="admin_vacContents">
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
                        유형
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bolder",
                          backgroundColor: "#D3D3D3",
                        }}
                      >
                        사유
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bolder",
                          backgroundColor: "#D3D3D3",
                        }}
                      >
                        승인여부
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bolder",
                          backgroundColor: "#D3D3D3",
                        }}
                      >
                        시작날짜
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bolder",
                          backgroundColor: "#D3D3D3",
                        }}
                      >
                        종료날짜
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
                    {vacation
                      ? vacation.list
                          .slice(offset, offset + limit)
                          .map((e, i) => (
                            <TableRow hover key={e.no} align="center">
                              <TableCell align="center">{e.no}</TableCell>
                              <TableCell align="center">
                                {e.userId}
                              </TableCell>
                              <TableCell align="center">{e.name}</TableCell>
                              <TableCell align="center">{e.vlist}</TableCell>
                              <TableCell align="center">{e.vacReason}</TableCell>
                              <TableCell align="center">{e.signState}</TableCell>
                              <TableCell align="center">{e.vacStart.substring(0,10)}</TableCell>
                              <TableCell align="center">{e.vacEnd.substring(0,10)}</TableCell>
                              <TableCell align="center">
                              <Button variant="contained" size="small" color="error" onClick={()=>onRemove(e.no,e.name,e.vacStart)}>
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
      </div>
      </Box>
      <Footer />
    </>
  );
};

export default LandingPage;
