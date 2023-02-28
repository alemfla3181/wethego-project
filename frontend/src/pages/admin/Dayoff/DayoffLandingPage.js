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
import BasicModal from "./DayoffEdit";

const LandingPage = () => {
  const [dayoff, setDayoff] = useState(null); //** 목록 **/
  const [dayoffes, setDayoffes] = useState(null); /** 모달창 값 **/
  const [searchValue, setSearchValue] = useState(null);
  const [ShowModal, setShowModal] = useState(false);
  const options = [{ value: "userId", text: "ID" },{ value: "name", text: "이름" }];
  const [selected, setSelected] = useState(options[0].value);

  /** SELECTBAR START **/
  const onChangeHandler = (e) => {
    setSelected(e.target.value);
  };
  /** SELECTBAR END **/

  /** Modal창 START **/
  const clickModalHandler = async (e) => {
    await axios.get("/api/dayoff/set/" + e.no).then((res) => {
      !ShowModal ? setShowModal(true) : setShowModal(false);
      setDayoffes(res.data.data);
    });
  };
  /** Modal창 END **/

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
        const res = await axios.get("/api/dayoff/set?" + selected + "=" + searchValue);
        setDayoff(res.data.data);
        setTotalCount(res.data.data.totalCount);
      }
    };
    fetchData2();
  }, [searchValue]);
  /** ID, 이름 검색 END **/

  /** 최초 랜더링 리스트 가져오기 START **/
  const fetchData = async () => {
    await axios.get("/api/dayoff/set").then((res) => {
      setDayoff(res.data.data);
      console.log(res.data.data)
      setTotalCount(res.data.data.totalCount);
    });
  }

  useEffect(() => {
    if (dayoff == null) fetchData();
  }, [dayoff]);
  /** 최초 랜더링 리스트 가져오기 START **/

  return (
    <>
      <Navigation />
      <Header />
      <Box style={{backgroundColor: "rgb(243, 243, 243)", height: "800px", minHeight: "100%", paddingTop: "10px", paddingLeft: "15%", paddingRight: "5%", paddingBottom: "auto"}}>
      <div className="container">
        <div className="admin_wethego-h">
          <h2 className="my-4">연차 관리</h2>
        </div>
        <Paper elevation={5} style={{ marginBottom: "50px" }}>
          <div>
          <div className="admin_attSearch" style={{marginBottom:'20px'}}>
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
                        연차 년도
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bolder",
                          backgroundColor: "#D3D3D3",
                        }}
                      >
                        연차 총일수
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bolder",
                          backgroundColor: "#D3D3D3",
                        }}
                      >
                        연차 사용일 수
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bolder",
                          backgroundColor: "#D3D3D3",
                        }}
                      >
                        연차 수정
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dayoff
                      ? dayoff.list
                          .slice(offset, offset + limit)
                          .map((e, i) => (
                            <TableRow hover key={e.no} align="center">
                              <TableCell align="center">{e.no}</TableCell>
                              <TableCell align="center">
                                {e.userId}
                              </TableCell>
                              <TableCell align="center">{e.name}</TableCell>
                              <TableCell align="center">{e.dfYear}</TableCell>
                              <TableCell align="center">{e.dfTotal}</TableCell>
                              <TableCell align="center">{e.dfUsed}</TableCell>
                              <TableCell align="center">
                              <Button variant="contained" size="small" onClick={()=>clickModalHandler(e)}>
                            수정
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
            dayoff={dayoff}
            dayoffes={dayoffes}
            fetchData={fetchData}
            selected={selected}
            searchValue={searchValue}
            setTotalCount={setTotalCount}
            setDayoff={setDayoff}
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
