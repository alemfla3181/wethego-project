import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Box, Grid, Paper, List, ListItemButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EmployeesEdit from "./EmployeesEdit";
import EmployeesJoin from "./EmployeesJoin";
import Navigation from "../Navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Pagination from "../Attendance/Pagination";


// 페이징 css
import './Board.css';

const LandingPage = () => {
  const [Employees, setEmployees] = useState(null);
  const [ShowModal, setShowModal] = useState(false);
  const [ShowJoinModal, setShowJoinModal] = useState(false);
  const [Employee, setEmployee] = useState(null);
  const [Department, setDepartment] = useState(null);
  const [Position, setPosition] = useState(null);

  //이식 페이징 기능
  const [ page, setPage ] = useState(null) // 페이지 내용 
  const [ pageNum, setPageNum] = useState(0) // 현재 보고 있는 페이지.

  const [ maxPageNum, setmaxPageNum ] = useState(0) // 최대 페이지 수 계산 용도
  const [ pageListNum, setpageListNum ] = useState(0); // 페이지 옮길 때 사용

  const [ color, setColor]=useState(pageNum) // 페이지 버튼 색


  console.log(page); // 번호 누를때마다 확인



// <R> - paging         
  
const pageDown = () => {


  if ( pageListNum - 5 >= 0 ) {
    
    // 페이지 옮길 때 사용
    setpageListNum(pageListNum - 5)

    // 현재 보고 있는 페이지
    setPageNum(pageListNum - 5)

    // 페이지 이동
    pageMove(pageListNum - 5)

    // 선택된 페이지 버튼
    setColor(pageListNum - 5)
  } else {

    pageMove(pageNum)
    console.log('첫 페이지 입니다!');
  }
}

const pageUp = () => {

  if( pageListNum + 5 <= maxPageNum/5 ){
    setpageListNum(pageListNum + 5)
    setPageNum(pageListNum + 5)
    pageMove(pageListNum + 5)
    setColor(pageListNum + 5)
  } else {

    // pageMove(pageNum)
    console.log('마지막 페이지 입니다!!')
  }
}


const pageMove = currentPage => {

  let pageCotents = []

  // 여기 숫자 5를 전부 10으로 바꾸면 리스트 개수 정할 수 있다.
  // 대신 조정시 여기뿐 아니라 페이지 전반에 걸쳐 숫자 5인 곳은 전부 고려해 수정해주어야 한다.
  for (let i = currentPage*5 ; i < currentPage*5 + 5 ; i++ ) {
    pageCotents[i] = Employees[i]
  }

  setPage(pageCotents.filter( n => { 
    if ( n != undefined ) return n
  }));
}  

// 게시판 하단 페이지 번호 표시
const PageList = ()=>{
  let lis = [];

  //( 5 <= maxPageNum ? 5 : maxPageNum%5 )
  //해당 로직이 최대로 보여주는 페이지를 나타내주주는 부분

  // 1. << 누르면 pageListNum : -5 / >> 누르면 +5
  // Math.min(pageListNum, 5*Math.floor(maxPageNum/5)) 페이지 시작 값을 구분
  // pageListNum <= maxPageNum/5 ? Math.min( pageListNum + 5, Math.ceil(maxPageNum/5)) : 0) 
  // >> pageListNum <= maxPageNum/5 최대 글 개수 넘었는지 판단후 안넘었으면 페이지 표시.
  

  for (let i= Math.min(pageListNum, 5*Math.floor(maxPageNum/5))  ; i< ( pageListNum <= maxPageNum/5 ? Math.min( pageListNum + 5, Math.ceil(maxPageNum/5)) : 0) ; i++ ){
    lis.push(
      <li 
        style={{
          paddingLeft: '9px'
        }}
        key={i} className="page-item">
        <a 
        id={`${color == i ? 'selectedChecked' : 'selected'}`}
        className="page-link" onClick={e=>{
        e.preventDefault();
        pageMove(i);
        setPageNum(i);
        setColor(i);
      }}>{i+1}</a></li>
    )
  }

  return <>
    {lis}
  </>
}





  const fetchData = async () => {
    await axios.get("/api/employees").then((res) => {
      setEmployees(res.data.data);

      setmaxPageNum( res.data.data.length ) // 총 글 개수 넣기

      //첫 번째 페이지 설정
      let pageCotents = []
      for (let i = pageNum*5 ; i < pageNum*5 + 5  ; i++ ) {
        pageCotents[i] = res.data.data[i]
      }
      setPage(pageCotents.filter( n => { 
        if ( n != undefined ) return n
      }));

      setpageListNum(0) // 페이지 초기화



    });
    await axios.get("/api/department/joinlist").then((res) => {
      setDepartment(res.data.data);
    });
    await axios.get("/api/position").then((res) => {
      setPosition(res.data.data);
    });
  };


  const clickModalHandler = async (e) => {
    await axios.get("/api/employees/" + e.no).then((res) => {
      !ShowModal ? setShowModal(true) : setShowModal(false);
      
      setEmployee(res.data.data);
    })
  };

  const clickJoinModalHandler = () => {
    !ShowJoinModal ? setShowJoinModal(true) : setShowJoinModal(false);
  };

  useEffect(() => {
    if (Employees === null) fetchData();
  }, [Employees]);


  // 구 페이지
  // /** Paging START **/
  // const [limit, setLimit] = useState(10);
  // const [page, setPage] = useState(1);
  // const offset = (page - 1) * limit;
  // const [totalCount, setTotalCount] = useState(null);
  // /** Paging END **/

  return (
    <>
      <Navigation />
      <Header />
      <Box style={{backgroundColor: "rgb(243, 243, 243)", height: "800px", minHeight: "100%", paddingTop: "10px", paddingLeft: "15%", paddingRight: "5%", paddingBottom: "auto"}}>
        <div className="container">
          <div className="admin_wethego-h">
            <h2 className="my-4">사원 관리</h2>
          </div>
          <Paper elevation={6} style={{padding: "3% 5% 5%"}}>
            <div className="employee-head" style={{display: "block", paddingBottom: "3%"}}>
              <h3 style={{display: "inline"}}>총 사원수: <strong>{Employees ? Employees.length : null}</strong>명</h3>
              <Button style={{float: "right"}} variant="contained" size="large" onClick={clickJoinModalHandler}>
                    사원 등록
              </Button>
            </div>
              {ShowModal ? <EmployeesEdit show={ShowModal} employee={Employee} department={Department} position={Position} callback={(e) =>  e ? (setShowModal(false), fetchData()) : setShowModal(false) } /> : null}
              {ShowJoinModal ? <EmployeesJoin show={ShowJoinModal} employee={Employee} department={Department} position={Position} callback={() => (setShowJoinModal(false), fetchData())} /> : null}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow style={{backgroundColor: "#E2E2E2"}}>
                      <TableCell align="center">No.</TableCell>
                      <TableCell align="center">이름</TableCell>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">부서</TableCell>
                      <TableCell align="center">직책</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {page != null ? page.map((e, i) => 
                    <TableRow hover style={{cursor: "pointer"}} onClick={() => clickModalHandler(e)} key={e.no}>
                      <TableCell align="center">{ maxPageNum - (i+pageNum*5)}</TableCell>
                      {/* 오름차순 1+i+pageNum*5 */}

                      <TableCell align="center">{e.name}</TableCell>
                      <TableCell align="center">{e.userId}</TableCell>
                      <TableCell align="center">{e.dname}</TableCell>
                      <TableCell align="center">{e.pname}</TableCell>
                    </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
              </TableContainer>




              <p></p><br></br>

          <nav aria-label="Page navigation example">
            <ul className="pagination" style={{width:'100%', WebkitJustifyContent: "center"}}>

              <li style={{width: ''}} className="page-item">
                <a 
                style={{
                  color:'black',
                  fontSize: '1rem',
                  background:'white',
                  padding:'9px',
                  border: '1px solid #d3d3d3', 
                  width: '2.55rem',
                  height: '2.55rem',
                  textAlign:'center',
                }}
                className="page-link" href="#" aria-label="Previous" onClick={e=>{
                  e.preventDefault();
                  pageDown();
                  // setPageNum( pageListNum-5 > 0 ? pageListNum-5 : 0 )
                }}>
                  <span aria-hidden="true">&#60;</span>
                </a>
              </li>

              <PageList />

              <li style={{
                paddingLeft: '9px'}} 
                
                className="page-item">
                <a 
                style={{
                  color:'black',
                  fontSize: '1rem',
                  background:'white',
                  border: '1px solid #d3d3d3', 
                  width: '2.55rem',
                  height: '2.55rem',
                  textAlign:'center',
                }}
                className="page-link" href="#" aria-label="Next" onClick={e=>{
                  e.preventDefault();
                  pageUp();
                }}> 
                  <span aria-hidden="true">&#62;</span>
                </a>
              </li>

            </ul>
          </nav>



              {/* <Pagination
                total={totalCount}
                limit={limit}
                page={page}
                setPage={setPage}
              /> */}



            </Paper>
        </div>
      </Box>
      <Footer />
    </>
  );
};

export default LandingPage;