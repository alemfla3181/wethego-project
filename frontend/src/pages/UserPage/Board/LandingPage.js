import React, { useEffect, useState } from "react";
import Header from '../../../components/Header'
import Navigation from '../../../components/Navigation'
import TestNavigation from "../../../components/TestNavigation";
import Footer from '../../../components/Footer';

import axios, { AxiosError } from "axios";
import { margin } from "@mui/system";
import BasicModal from "./BoardEdit";
import { Box, Button, FormControl, InputLabel, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, ToggleButton } from "@mui/material";

import './Board.css';
import { useSelector } from "react-redux";


//User

const LandingPage = () => {

  const [board, setBoard] = useState(null); // 게시판 전체 조회


  // 이전 내용
  // const [boardUpdate, setboardUpdate] = useState(null) // 수정정보
  // const [ShowModal, setShowModal] = useState(false)  // 모달정보z


  const [boardUpdate, setboardUpdate] = useState(null) // 수정정보
  const [ShowModal, setShowModal] = useState({
    show: false,
    boardUpdate: null
  })  // 모달정보z


  const [searchType, setsearchType] = useState('글제목') // 조회타입
  const [ListType, setListType] = useState('전체') // 조회 범위
  const [search, setSearch] = useState(null) // 검색어

  const [page, setPage] = useState(null) // 페이지 내용 
  const [pageNum, setPageNum] = useState(0) // 현재 보고 있는 페이지.

  const [maxPageNum, setmaxPageNum] = useState(0) // 최대 페이지 수 계산 용도
  const [pageListNum, setpageListNum] = useState(0); // 페이지 옮길 때 사용

  const [ color, setColor]=useState(pageNum) // 페이지 버튼 색



  // 유저 정보
  const userData = useSelector(state => state.user.userData)



  useEffect(() => {
    if (board === null) fetchData();
  }, [userData, board]);

  useEffect(() => {
    if (search != null) SearchData();
  }, [userData, search]);

  useEffect(() => {
    fetchData();
  }, [userData, ListType]);



  // <R> - 기본 게시판 조회    
  const fetchData = async () => {
    try {
      await axios.get(`/api/board?ListType=${ListType}`).then((res) => {
        setBoard(res.data.data);

        setmaxPageNum( res.data.data.length ); // 총 글 개수 넣기


        //첫 번째 및 보고있는 페이지 설정
        let pageCotents = []
        for (let i = pageNum * 5; i < pageNum * 5 + 5; i++) {
          pageCotents[i] = res.data.data[i]
        }
        setPage(pageCotents.filter(n => {
          if (n != undefined) return n
        }));

        setboardUpdate(null);

      })
    } catch {
      console.log('연결 오류가 발생했습니다.');
    }
  };


  // <R> - Search 변수로 검색
  const SearchData = async () => {


    try {
      await axios.get(`/api/board/${searchType === '글제목' ? 'searchTitle' : 'searchName'}?keyword=${search}`).then((res) => {
        setBoard(res.data.data)
        setmaxPageNum(res.data.data.length) // 총 글 개수 넣기

        //첫 번째 페이지 설정
        let pageCotents = []
        for (let i = pageNum * 5; i < pageNum * 5 + 5; i++) {
          pageCotents[i] = res.data.data[i]
        }
        setPage(pageCotents.filter(n => {
          if (n != undefined) return n
        }));

        setpageListNum(0) // 페이지 초기화
        setboardUpdate(null)
      })
    } catch {
      console.log('연결 오류가 발생했습니다.');
    }

    if (search == '') fetchData();
  }


  // <R> - paging         

  const pageDown = () => {

    console.log(pageNum)

    if (pageListNum - 5 >= 0) {
      setpageListNum(pageListNum - 5)
      setPageNum(pageListNum - 5)
      pageMove(pageListNum - 5)
      setColor(pageListNum - 5)
    } else {
      pageMove(pageNum)
      
      console.log('첫 페이지 입니다!');
    }
  }

  const pageUp = () => {

    if (pageListNum + 5 <= maxPageNum / 5) {
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
    for (let i = currentPage * 5; i < currentPage * 5 + 5; i++) {
      pageCotents[i] = board[i]
    }

    setPage(pageCotents.filter(n => {
      if (n != undefined) return n
    }));
  }



  // 게시판 하단 페이지 번호 표시
  const PageList = () => {
    let lis = [];

    //( 5 <= maxPageNum ? 5 : maxPageNum%5 )
    //해당 로직이 최대로 보여주는 페이지를 나타내주주는 부분

    // 1. << 누르면 pageListNum : -5 / >> 누르면 +5
    // Math.min(pageListNum, 5*Math.floor(maxPageNum/5)) 페이지 시작 값을 구분
    // pageListNum <= maxPageNum/5 ? Math.min( pageListNum + 5, Math.ceil(maxPageNum/5)) : 0) 
    // >> pageListNum <= maxPageNum/5 최대 글 개수 넘었는지 판단후 안넘었으면 페이지 표시.
    

    for (let i = Math.min(pageListNum, 5 * Math.floor(maxPageNum / 5)); i < (pageListNum <= maxPageNum / 5 ? Math.min(pageListNum + 5, Math.ceil(maxPageNum / 5)) : 0); i++) {
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

  // --------------------------------------------------------------------------------------

  // <C> - 게시글 생성

  // *****수정 이전
  // const create = () => {

  //   setShowModal(true);
  // }

  const create = () => {

    // 이전 강사님 코드
    // setShowModal(Object.assign(ShowModal, {
    //   show: true
    // }));
    setShowModal({
      boardUpdate: null,
      show: true
    })

  }


  // <U> - 게시글 수정 ( 기능 미완성 - 다른 비즈니스와 연계에 해결해야함 )

  // 수정 이전
  // const showContents = e => {
  //   setboardUpdate(e);
  //   setShowModal(true);
  // }

  const showContents = e => {
    // setboardUpdate(e);
    setShowModal({
      boardUpdate: e,
      show: true
    });
  }


  // <U> - 조회수 증가
  const countUp = async boardNo => {
    try {
      await axios.get(`/api/board/updateCount?boardNo=${boardNo}`).then((res) => {
        console.log('카운트 증가')
      })
    } catch {
      console.log('연결 오류가 발생했습니다.');
    }
  }




  // <D> - 게시글 삭제
  const deleteContents = async e => {
    try {
      await axios.post("/api/board/delete", e)
    } catch {
      console.log('연결 오류가 발생했습니다.');
    }

    fetchData();
  }


  return (
    <>
      <TestNavigation />
      {/* <Navigation /> */}
      <div className="back-img">
        <Header />
        <Box style={{ height: "1500px", minHeight: "100%", paddingTop: "10px", paddingLeft: "15%", paddingRight: "5%", paddingBottom: "auto" }}>
          <div className="container">
            <div className="wethego-h">
              <h2 className="my-4">게시판 관리</h2>
            </div>
            <Paper elevation={5} style={{ padding: "3% 5% 10%" }}>
              <div className="employee-head" style={{ display: "block", paddingBottom: "3%" }}>


                {/* <FormControl margin='normal' style={{float: "right"}}>
              <InputLabel id="select-label" size='small'>게시글 분류</InputLabel>
              <Select
                style={{minWidth: "100px"}}
                size='small' 
                name="test"
                label="게시글 분류"
                variant="outlined" 
                defaultValue={"전체"}
                onChange={e=>{setListType(e.target.value)}}>
                  <MenuItem value="전체">전체</MenuItem>
                  <MenuItem value="영업부">영업부</MenuItem>
                  <MenuItem value="개발부">개발부</MenuItem>
              </Select>
            </FormControl> */}

                <div style={{ width: '100%', height: '100%' }}>

                  <FormControl className="boardUpper" margin='normal' style={{ width: '12%', marginRight: '4%' }}>
                    <InputLabel id="select-label" size='small'>검색 옵션</InputLabel>
                    <Select
                      style={{ Width: "100%", }}
                      size='small'
                      name="test"
                      label="검색 옵션"
                      variant="outlined"
                      defaultValue={"글제목"}
                      onChange={e => { setsearchType(e.target.value) }}>
                      <MenuItem value="글제목">글제목</MenuItem>
                      <MenuItem value="작성자">작성자</MenuItem>
                    </Select>
                  </FormControl>


                  <input
                    className="boardUpper"
                    type="title"
                    style={{ marginTop: "15px", minHeight: "40px", width: '28%' }}
                    placeholder="검색어를 입력해주세요"
                    onChange={e => { setSearch(e.target.value); setPageNum(0) }}>
                  </input>

                  <div className="boardUpper" style={{ textAlign: 'right', width: '56%', paddingRight: '4%' }}>
                    <Button
                      variant="contained"
                      size="medium"
                      color="primary"
                      style={{ marginTop: "15px" }} onClick={() => {
                        create();
                      }}>글 생성</Button>
                  </div>


                </div>

              </div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#E2E2E2" }}>
                      <TableCell align="center">번호</TableCell>
                      <TableCell align="center">팀</TableCell>
                      <TableCell align="center">작성자</TableCell>
                      <TableCell align="center">글제목</TableCell>
                      <TableCell align="center">조회수</TableCell>
                      <TableCell align="center">등록일</TableCell>
                      <TableCell align="center">삭제</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {page != null ? page.map((e, i) =>
                      <TableRow hover style={{ cursor: "pointer", textDecoration: "none" }} onClick={event => { event.preventDefault(); showContents(e); countUp(e.no); }} key={e.no}>
             
                        <TableCell align="center">{maxPageNum - (i + pageNum * 5)}</TableCell>
                        <TableCell align="center">{e.dname}</TableCell>
                        <TableCell align="center">{e.name}</TableCell>
                        {e.form === '일반' ?
                          <TableCell align="center" >{e.title}</TableCell> :
                          <TableCell align="center" style={{ fontSize: 'medium', fontWeight: '600' }} >{e.title}</TableCell>
                        }
                        <TableCell align="center">{e.count}</TableCell>
                        <TableCell align="center">{e.regDate}</TableCell>
                        <TableCell align="center">
                          {userData && userData.data.no === e.employeesNo ?
                            <Button variant="contained" size="small" color="error" onClick={event => { event.stopPropagation(); deleteContents(e) }}>
                              삭제
                            </Button>
                            : null
                          }
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
              </TableContainer>

              <p></p><br></br>




          <nav aria-label="Page navigation example">
            <ul className="pagination" style={{width:'100%', WebkitJustifyContent: "center" }}>

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

      </Paper>
      {ShowModal.show == true ? (
      <BasicModal
        userNo={userData !=null ? userData.data.no : null}
        userLevel={userData !=null ? userData.data.level : null}

                // *****수정 이전
                // boardUpdate={boardUpdate}
                // show={ShowModal}

       
                boardUpdate={ShowModal.boardUpdate}
                show={ShowModal.show}

                callback={() => {
                  setShowModal(false);
                  { search != '' ? fetchData() : SearchData() }
                  console.log('달창이형 끝!!')
                }}
              />
            ) : null}
          </div>
        </Box>
      </div>
      <Footer />
    </>
  );
};


export default LandingPage;