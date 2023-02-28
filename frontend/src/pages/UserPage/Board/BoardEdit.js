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
import { Divider, Stack } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 'auto',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ userNo, userLevel, boardUpdate, show, callback }) {

  //User

  const [board, setBoard] = useState(boardUpdate); // 새 게시글
  const [fileName, setFileName]=useState();

  


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
  }

  const Download = () => {
    return(
      <a style={{marginLeft: "10px"}} href={`/api/board/download?FileUrl=${ board != null ? board.fileUrl : ''}`} onClick={e=>{
      e.preventDefault()
      fileDownload();
      }}>{board != null ? board.fileName : null}</a>
    )
  }

  return (
    <div>
      <Modal
        open={show}
        onClose={() => callback()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

      <Box sx={style} component="form" noValidate onSubmit={e=>{
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


        <FormControl fullWidth component="fieldset" >
          <div id="modal-modal-title" variant="h6" component="h2" style={{textAlign: "center"}}>
            <h4 style={{margin: "0px"}}>게시글 작성</h4>
          </div>
          <FormControl style={{width: "200px"}} margin='dense'>
            <RadioGroup style={{flexDirection: 'row', justifyContent: 'space-around'}} aria-labelledby="level" name="level" defaultValue={boardUpdate != null ? boardUpdate.form : '일반'} onChange={e=>{
                  let lis= {...board}
                  lis.form=e.target.value
                  setBoard(lis);
            }} row>
              { userLevel != null && userLevel === '전체' || userLevel === '공지' ?    
                <>
                <FormControlLabel value={"공지"} control={<Radio />} label="공지"/>
                <FormControlLabel value={"일반"} control={<Radio />} label="일반"/>
                </>
              : null }
            </RadioGroup>
          </FormControl>

        {/* { userLevel != null && userLevel === '전체' || userLevel === '공지' ? <>

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

        </> : null } */}

        {/* <input type="title" id="title" name="title" style={{width:"97%"}} placeholder={ '새 글제목' } value={ board != null ? board.title : '' } onChange={e=>{
          let lis = {...board}

          lis.title = e.target.value;
          lis.employeesNo = userNo;
          if(lis.form == null){ lis.form = '일반'}
          setBoard(lis);
        }}></input> */}

        {/* <textarea type="contents" style={{width:"97%", height:"300px"}} name="contents" placeholder={ '새 글내용' } value={ board != null ? board.contents : '' } onChange={e=>{
          let lis = {...board}

          lis.contents = e.target.value;
          setBoard(lis);
        }}></textarea> */}

        <TextField 
            required 
            fullWidth
            size='small' 
            name="title"
            label="글 제목"
            margin="normal" 
            variant="outlined" 
            value={ board != null ? board.title : '' }
            placeholder="글 제목"
            onChange={e=>{
              let lis = {...board}
              lis.title = e.target.value;
              lis.employeesNo = userNo;
              if(lis.form == null){ lis.form = '일반'}
              setBoard(lis);
            }}
        />

        <TextField
            required 
            fullWidth
            multiline
            rows={10}
            name="contents"
            label="글 내용"
            margin="normal" 
            variant="outlined" 
            value={ board != null ? board.contents : '' }
            placeholder="글 내용"
            onChange={e=>{
              let lis = {...board}
              lis.contents = e.target.value;
              setBoard(lis);
            }}
        />
        
        { boardUpdate != null ?
        <>
        {boardUpdate.employeesNo === userNo ? 
          <>
          <Divider sx={{borderWidth: 1, borderColor: "white", margin: "10px 0px"}} variant="fullWidth" />
          <Stack spacing={3} direction="row" style={{display: "flex", alignItems: "center"}}>
            <Button style={{ width: "15%" }} 
              onChange={e=>{
                setFileName(e.target.value.substring(12,e.target.value.length))
              }}
              position="flex" color="primary" size="small" variant="contained" component="label">
              파일선택
              <input hidden name="file" type="file" id="file" />
            </Button>
            {fileName == null && boardUpdate != null  ? boardUpdate != null ? boardUpdate.fileName != null ? boardUpdate.fileName != "null" ? <Download/> : null : null : null : <> <Download/><hr/>{"▶"}<hr/>{fileName}</> }
          </Stack>
          <Divider sx={{borderWidth: 1, borderColor: "white", margin: "10px 0px"}} variant="fullWidth" />
          <Stack spacing={2} direction="row">
            <Button style={{maxHeight: '50px', width: '50%'}} type="submit" position="absolute" color="primary" variant="contained">수정하기</Button>
            <Button style={{maxHeight: '50px', width: '50%'}} position="absolute" color="error" variant="outlined" onClick={() => callback()}>취소</Button>
          </Stack>
          </> 
          : 
          <>
          <FormControl fullWidth style={{alignItems: "center", marginTop: "2%"}}>
            <Button style={{maxHeight: '50px', width: '50%'}} position="absolute" color="primary" variant="contained" onClick={() => callback()}>목록으로</Button>
          </FormControl>
          </> 
        }</>
          :
          <>
          <Divider sx={{borderWidth: 1, borderColor: "white", margin: "10px 0px"}} variant="fullWidth" />
          <Stack spacing={3} direction="row" style={{display: "flex", alignItems: "center"}}>
            <Button style={{ width: "15%" }} 
              onChange={e=>{
                setFileName(e.target.value.substring(12,e.target.value.length))
              }}
              position="flex" color="primary" size="small" variant="contained" component="label">
              파일선택
              <input hidden name="file" type="file" id="file"/>
            </Button>
            <TextField fullWidth size="small" variant="standard" value={fileName ? fileName : "선택된 파일 없음"} InputProps={{
              readOnly: true,
              disableUnderline: true
            }} />
          </Stack>
          <Divider sx={{borderWidth: 1, borderColor: "white", margin: "10px 0px"}} variant="fullWidth" />
          <Stack spacing={2} direction="row">
            <Button style={{maxHeight: '50px', width: '50%'}} type="submit" position="absolute" color="primary" variant="contained">글쓰기</Button>
            <Button style={{maxHeight: '50px', width: '50%'}} position="absolute" color="error" variant="outlined" onClick={() => callback()}>취소</Button>
          </Stack>
          </>
        }
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}



