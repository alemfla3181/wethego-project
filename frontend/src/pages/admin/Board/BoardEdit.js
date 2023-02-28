import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { padding } from "@mui/system";
import axios, { AxiosError } from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ userNo, userLevel, boardUpdate, show, callback }) {

  // admin

  const [board, setBoard] = useState(boardUpdate); // 새 게시글

  // console.log(board);//확인용










  const fetchData = async () => {

    let file = document.getElementById("file")
		let formData = new FormData();
	  formData.append("file", file.files[0]);

    // 전송시 반드시! json 파싱 별도로 해주어야 한다.
    formData.append("board", JSON.stringify(board)); 

    //create/update 를 구분해 url을 분기
      try {

        const res = await axios.post(`/api/board/${ boardUpdate===null ? 'create':'update'}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        callback();
      } catch {
        alert('오류가 발생했습니다.');
      }

  }

  // 파일 다운 로드
  const fileDownload = async () => {
    
    axios({
      method: "GET",
      url: `/api/board/download?FileUrl=${board != null ? board.fileUrl : ''}`,
      responseType: "blob",
      // 구글링 해보니 responseType을 꼭 추가하라고 했다.
    }).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], 
        { type: res.headers["content-type"] })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${board != null ? board.fileName : ''}`
      );
      document.body.appendChild(link);
      link.click();
    });
    console.log("파일 다운로드 끝")
  }

  const Download = () => {

    return(<>
    <a href={`/api/board/download?FileUrl=${ board != null ? board.fileUrl : ''}`} onClick={e=>{
    e.preventDefault()
    fileDownload();
    }}>{board != null ? board.fileName : null}</a>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </>
    )
  }



  return (

    <div>
      <Modal
        open={show}
        // onClose={ reason => console.log('확인을 눌러주세요') }
        onClose={()=>callback()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

      <Box sx={style}>

      <form onSubmit={ e=>{
          e.preventDefault();

          if( board == null || board.title == null ){
            alert('글 제목 채워주세요')
            document.getElementById('title').focus()
            document.getElementById('title').style.background='#ffb6c1'
          } else {
            fetchData()
            callback();
          }

        }}>


        {userLevel != null && userLevel === '전체' || userLevel === '공지' ? <>

          <label><input type="radio" name="form" value="공지" onClick={e=>{
            let lis= {...board}

            lis.form='공지'
            setBoard(lis);
          }}/>공지</label>  

          &nbsp;&nbsp;&nbsp;

          <label><input type="radio" name="form" value="일반" defaultChecked onClick={e=>{
            let lis= {...board}

            lis.form='일반'
            setBoard(lis);
          }}/>일반</label>

        </> : null }


        <p></p>

        
        <input type="title" id="title" name="title" style={{width:"97%"}} placeholder={ '새 글제목' } value={ board != null ? board.title : '' } onChange={e=>{
          let lis = {...board}

          lis.title = e.target.value;
          lis.employeesNo = userNo;
          if(lis.form == null){ lis.form = '일반'}
          setBoard(lis);
        }}></input>

        <p></p>
        <textarea type="contents" style={{width:"97%", height:"300px"}} name="contents" placeholder={ '새 글내용' } value={ board != null ? board.contents : '' } onChange={e=>{
          let lis = {...board}

          lis.contents = e.target.value;
          setBoard(lis);
        }}></textarea>

        <p></p>

        {boardUpdate != null ? boardUpdate.fileName != null ? boardUpdate.fileName != "null" ? <Download/> : null : null : null}

        { boardUpdate != null ?
        
        <>{boardUpdate.employeesNo === userNo ? 
          
          <>
          <input id="file" name="file" type="file" ></input>
          <p></p>
          <input type="submit" multiple="multiple" value="수정하기"></input>

          
          <input type="button" style={{marginLeft:"50px"}} value="취소" onClick={()=>{
            callback();
          }}></input>
          </> 

          : 
          
          <>
            <input type="button" value="확인" onClick={()=>{callback()}}></input>
          </> 
    
        }</> 
        
          :
    
          <>
          <input id="file" name="file" type="file" ></input>
          <p></p>
          <input type="submit" multiple="multiple" value="글쓰기"></input>

          
          <input type="button" style={{marginLeft:"50px"}} value="취소" onClick={()=>{
            callback();
          }}></input>
          </>
        }

      </form>

        </Box>
      </Modal>
    </div>
  );
}



