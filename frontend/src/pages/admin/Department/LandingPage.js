import React, { useEffect, useState } from "react";
import axios from "axios";
import RegisterForm from "./RegisterForm";
import "./LandingPage.css";
import Navigation from "../Navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

import { Typography, Stack, Paper, Button, Icon, ListItemIcon, ListItemText, ListItemButton, Box } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LabelIcon from '@mui/icons-material/Label';
import Swal from "sweetalert2";

const LandingPage = () => {
  const [Departments, setDepartments] = useState(null);
  const [Detail, setDetail] = useState(null);
  const [SelectDname, setSelectDname] = useState("");
  // const [ShowModal, setShowModal] = useState(false);

  useEffect(() => {
    if (Departments === null) fetchData();
  }, [Departments]);

  /** 부서 조회 */
  const fetchData = async () => {
    await axios.get("/api/department").then((res) => {
      setDepartments(res.data.data);
    });
  };

  /** 부서 등록  */
  const AddDepartment = async (department) => {
    // console.log(department);
    await axios
      .post("/api/department/add", JSON.stringify(department), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {});

    fetchData();
    Detail ? ShowDetail(department.pno) : null;
  };

  /** 부서삭제 */
  const DeleteDepartment = async (no) => {
    if (no > 1) {
      await axios.get("/api/department/" + no).then(async (res) => {
        if (res.data.data.length > 0) {
          Swal.fire({
            icon: 'warning',
            title: '주의!',
            text: '하위 항목이 존재합니다!',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          await axios
            .delete("/api/department/" + no)
            .then((res) => {
              // console.log(res.data);
              Swal.fire({
                icon: 'success',
                title: '부서 삭제 완료!',
                showConfirmButton: false,
                timer: 1500
              });
              fetchData();
            })
            .catch((err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: '삭제가 불가능합니다.',
                showConfirmButton: false,
                timer: 1500
              })
            });
        }
      });
    }
  };

  /** 하위 부서 조회 */ 
  const ShowDetail = async (no, name) => {
    setSelectDname(name);
    if (no > 1) {
      await axios.get("/api/department/" + no).then((res) => {
        setDetail(res.data.data);
      });
    }
  };

  /** 하위 부서 삭제 */
  const DeleteDetail = async (no, pno) => {
    await axios
      .delete("/api/department/" + no)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: '부서 삭제 완료!',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: '삭제가 불가능합니다.',
          showConfirmButton: false,
          timer: 1500
        })
      });
    ShowDetail(pno);
  };

  return (
    <div>
      <Navigation />
      <Header />
      <Box style={{backgroundColor: "rgb(243, 243, 243)", height: "800px", minHeight: "100%", paddingTop: "10px", paddingLeft: "15%", paddingRight: "5%", paddingBottom: "auto"}}>
        <div className="container">
          <div className="admin_wethego-h">
              <h2 className="my-4">부서 관리</h2>
          </div>
          <Stack spacing={2} direction="row">
            <Paper elevation={6} className={"MenuItem"} style={{padding: "3% 3% 3%", alignContent: "center", alignItems: "center"}}>
              {Departments
                ? Departments.map((e) => (
                    <div key={e.no}>
                      <ListItemButton style={{ marginLeft: e.ddepth * 20 + "px", padding: "3% 3% 3%" }} key={e.no} onClick={() => ShowDetail(e.no, e.dname)}>
                        <ListItemIcon>
                          <AddCircleIcon fontSize="medium"/>
                        </ListItemIcon>
                        <ListItemText
                          disableTypography
                          primary={
                            <Typography
                              type="body"
                              style={{
                                fontFamily: "fantasy",
                                fontSize: "20px",
                                fontWeight: "1000",
                                color: "#292929",
                              }}>
                              {e.dname}
                            </Typography>
                          }
                        />
                        {e.no > 1 ? (
                          <Button size="small" variant="contained" color="error" className={"button"} onClick={() => DeleteDepartment(e.no)}>
                            삭제
                          </Button>
                        ) : null}
                      </ListItemButton>
                      {Detail
                        ? Detail.filter((e2) => e.no === e2.pno).map((e2) => (
                          <ListItemButton style={{ marginLeft: e2.ddepth * 20 + "px",padding: "3% 3% 3%", cursor: "default" }} key={e2.no}>
                            <ListItemIcon>
                              <LabelIcon />
                            </ListItemIcon>
                              <ListItemText
                                disableTypography
                                primary={
                                  <Typography
                                    type="body"
                                    style={{
                                      fontFamily: "fantasy",
                                      fontSize: "20px",
                                      fontWeight: "1000",
                                      color: "#292929",
                                    }}
                                  >
                                    {e2.dname}
                                  </Typography>
                                }
                              />
                              <Button size="small" variant="contained" color="error" className={"button"} onClick={() => DeleteDetail(e2.no, e2.pno)}>
                                삭제
                              </Button>
                            </ListItemButton>
                          ))
                        : null}
                    </div>
                  ))
                : null}
              
          </Paper>
          <RegisterForm detail={SelectDname} departments={Departments} callback={AddDepartment} />
        </Stack>
      </div>

        {/* <button onClick={() => setShowModal(true)}>모달</button>
      {ShowModal ? <ModalComponent show={ShowModal} callback={()=> setShowModal(false) } /> : null} */}
      </Box>
      <Footer />
    </div>
  );
};

export default LandingPage;
