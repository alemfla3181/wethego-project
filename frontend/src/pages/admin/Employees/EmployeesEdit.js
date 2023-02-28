import React, { useEffect, useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import './swal2.css';
import { Grid, Paper, Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, Stack, TextField, FormHelperText } from '@mui/material';


const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ show, employee, department, position, callback }) {
  const [nameError, setNameError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);
  // const [userPwError, setUserPwError] = useState(false);
  const [birthError, setBirthError] = useState(false);
  const [positionError, setPositionError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);
  const [hphoneError, setHphoneError] = useState(false);
  const [joinDateError, setJoinDateError] = useState(false);
  const [extNumberError, setExtNumberError] = useState(false); 

  // const [valiCheck, setValiCheck] = useState(false);

  const [inputHphonValue, setInputHphonValue] = useState(employee.hphone);
  const [inputExtNumValue, setInputExtNumValue] = useState(employee.extNumber);

  const [JoinDepartment, setJoinDepartment] = useState(employee ? employee.departmentNo : '');
  const [EditPosition, setEditPosition] = useState(employee ? employee.positionNo : '');

  const handleDeptChange = (event) => {
    setJoinDepartment(event.target.value);
    console.log(event.target.value);
  };

  const handlePositionChange = (event) => {
    setEditPosition(event.target.value);
    console.log(event.target.value);
  };

  const onhandleModify = async (data) => {
    const { no, name, userId, birth, positionNo, departmentNo, level, hphone, state, joinDate, gender, extNumber} = data;
    const modifyData = { no, name, userId, birth, positionNo, departmentNo, level, hphone, state, joinDate, gender, extNumber };
    console.log(modifyData)

    Swal.fire({
      title: '[' + employee.name + '] 님의',
      text: "정보를 수정하시겠습니까?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '수정',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        if (employee.userId !== data.userId) {
          axios.post('/api/employees/getCheckId', data).then((res) => {
            if (res.data.data > 0) {
              Swal.fire({
                icon: 'error',
                title: '아이디 중복!',
                showConfirmButton: false,
                timer: 2000
              })
            } else {
              axios.post('/api/employees/modify', modifyData)
                .then(() => {
                  Swal.fire({
                    icon: 'success',
                    title: '[' + employee.name + '] 님의',
                    text: '정보가 수정되었습니다!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  callback(true);
                });
            }
          })
        } else {
          axios.post('/api/employees/modify', modifyData)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: '[' + employee.name + '] 님의',
              text: '정보가 수정되었습니다!',
              showConfirmButton: false,
              timer: 1500
            })
            callback(true);
          });
        }
      }
    })
  }

  

  const handleModify = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const modifyData = {
      no: employee.no,
      name: data.get('name'),
      userId: data.get('userId'),
      birth: data.get('birth'),
      positionNo: data.get('positionNo'),
      departmentNo: data.get('departmentNo'),
      level: data.get('level'),
      state: data.get('state'),
      hphone: data.get('hphone'),
      joinDate: data.get('joinDate'),
      gender: data.get('gender'),
      extNumber: data.get('extNumber')
    };

    const { name, userId, userPw, birth, positionNo, departmentNo, level, state, hphone, joinDate, gender, extNumber} = modifyData;
    
    let valiCheck = [];

    const nameRegex = /^[ㄱ-힣]+$/;
      if (name.length < 1) setNameError('이름을 입력해주세요!'), valiCheck = false;
      else if(nameRegex.test(name) && name.length === 1) setNameError('이름은 최소 2자 이상 입력해야합니다!'), valiCheck[0] = false; 
      else if(!nameRegex.test(name) && name.length > 0) setNameError('이름은 한글로만 입력해주세요!'), valiCheck[0] = false;
      else setNameError(''), valiCheck[0] = true;

      const userIdRegex = /^[a-zA-z0-9]{4,12}$/;
      if (userId.length < 1) setUserIdError('ID를 입력해주세요!'), valiCheck[1] = false;
      else if(!userIdRegex.test(userId) && userId.length > 0) setUserIdError('ID는 영문 대소문자와 숫자로 이루어진 4~12자리로 입력해야합니다!'), valiCheck[1] = false;
      else setUserIdError(''), valiCheck[1] = true;
      
      // const userPwRegex = /^[a-zA-Z0-9]{4,16}$/;
      // if (userPw.length < 1) setUserPwError('PW를 입력해주세요!'), valiCheck = false;
      // else if(!userPwRegex.test(userPw) && userPw.length > 0) setUserPwError('PW는 영문 대소문자와 숫자로 이루어진 4~16자리로 입력해야합니다!'), valiCheck = false;
      // else setUserPwError(''), setValiCheck(true);

      const birthRegex = /[0-9]{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/;
      if (birth.length < 1) setBirthError('생년월일을 선택해주세요!'), valiCheck[2] = false;
      else if(!birthRegex.test(birth) && birth.length > 0) setBirthError('올바른 날짜 형식이 아닙니다!'), valiCheck[2] = false;
      else setBirthError(''), valiCheck[2] = true;

      if(!positionNo) setPositionError('직책을 선택해주세요!'), valiCheck[3] = false;
      else setPositionError(''), valiCheck[3] = true;

      if(!departmentNo) setDepartmentError('부서를 선택해주세요!'), valiCheck[4] = false;
      else setDepartmentError(''), valiCheck[4] = true;

      const hphoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
      if(hphone.length < 1) setHphoneError('전화번호를 입력해주세요!'), valiCheck = false;
      else if (!hphoneRegex.test(hphone) && hphone.length > 0) setHphoneError('올바른 휴대폰 번호 형식이 아닙니다!'), valiCheck[5] = false;
      else if (hphoneRegex.test(hphone) && hphone.length > 0 && hphone.length < 10) setHphoneError('최소 10자리 이상의 휴대폰 번호를 입력하세요!'), valiCheck[5] = false;
      else setHphoneError(''), valiCheck[5] = true;

      const joinDateRegex = /[0-9]{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/;
      if (joinDate.length < 1) setJoinDateError('입사일을 선택해주세요!'), valiCheck[6] = false;
      else if(!joinDateRegex.test(joinDate) && joinDate.length > 0) setJoinDateError('올바른 날짜 형식이 아닙니다!'), valiCheck[6] = false;
      else setJoinDateError(''), valiCheck[6] = true;

      const extNumberRegex = /^051-(?:\d{3})-\d{4}$/
      if (extNumber.length < 1) setExtNumberError('사내번호를 입력해주세요!'), valiCheck[7] = false;
      else if (!extNumberRegex.test(extNumber) && extNumber.length > 0) setExtNumberError('올바른 번호 형식이 아닙니다!'), valiCheck[7] = false;
      else if (extNumberRegex.test(extNumber) && extNumber.length > 0 && extNumber.length < 10) setExtNumberError('10자리로 구성된 사내번호를 입력하세요!'), valiCheck[7] = false;
      else setExtNumberError(''), valiCheck[7] = true;

    if(valiCheck.every((e) =>  e === true)) {
      onhandleModify(modifyData);
      console.log(e);
      console.log(valiCheck);
    }

  };

  const handleResetpwd = () => {
    axios.post('/api/employees/reset', employee).then((res) => {
      console.log(res)
      Swal.fire({
        icon: 'success',
        title: '비밀번호 초기화 성공!',
        text: '초기 비밀번호는 아이디와 동일합니다.',
        showConfirmButton: false,
        timer: 2000
      })
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: employee.name + '님을',
      text: "삭제하시겠습니까?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get('/api/employees/delete/' + employee.no)
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: '삭제성공!',
                showConfirmButton: false,
                timer: 1500
              })
              callback(true);
            })
            .catch(err => {
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: '삭제할 수 없는 대상입니다.'
              })
              callback(false);
            });
      }
    })
  };
  
  const handleHphonePress = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setInputHphonValue(e.target.value);
    }
  };

  const handleExtNumPress = (e) => {
    console.log(e.target.value)
    const regex = /^[0-9\b -]{0,12}$/;
    if (regex.test(e.target.value)) {
      setInputExtNumValue(e.target.value);
    }
  };

  useEffect(() => {
    if (inputHphonValue.length === 10) {
      setInputHphonValue(inputHphonValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (inputHphonValue.length === 13) {
      setInputHphonValue(inputHphonValue.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
    if (inputExtNumValue.length === 10) {
      setInputExtNumValue(inputExtNumValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
  }, [inputHphonValue, inputExtNumValue]);

  return (
    <div>
      <Modal
        open={show}
        onClose={() => callback(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" noValidate onSubmit={handleModify}>
          <div id="modal-modal-title" variant="h6" component="h2">
            <h5>{`${employee.name}`} 님의 정보</h5>
          </div>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
              <FormControl fullWidth component="fieldset" >
                <Grid container spacing={2} columns={18}>
                  <Grid item xs={9} padding="16px">
                    <TextField 
                      required 
                      autoFocus
                      fullWidth
                      size='small' 
                      name="name"
                      label="이름"
                      margin="normal" 
                      variant="outlined"
                      defaultValue={`${employee.name}`}
                      error={nameError}
                      helperText={nameError}
                    />

                    <TextField 
                      required 
                      fullWidth
                      size='small' 
                      name="userId"
                      label="아이디" 
                      margin="normal" 
                      variant="outlined" 
                      defaultValue={`${employee.userId}`}
                      error={userIdError}
                      helperText={userIdError}
                    />
                    
                    {/* <TextField 
                      required 
                      size='small'
                      name="userPw"
                      type="password"
                      label="비밀번호" 
                      margin="normal" 
                      variant="outlined"
                      defaultValue={`${employee.userPw}`} 
                    />
                    */}
                 
                    <Button 
                      style={{maxHeight: '100%', width: '100%', marginTop: '3%', marginBottom: '3%'}} 
                      type="reset"
                      id="userPw"
                      position="absolute" 
                      color="primary" 
                      variant="contained"
                      size='large'
                      value={`${employee.userPw}`}
                      onClick={handleResetpwd}
                    >
                      비밀번호 초기화
                    </Button>

                    <TextField 
                      required 
                      fullWidth
                      size='small'
                      name="birth"
                      InputLabelProps={{ shrink: true }}
                      label="생년월일"
                      type="date"
                      margin="normal" 
                      variant="outlined"
                      defaultValue={`${employee.birth}`} 
                      error={birthError}
                      helperText={birthError}
                    />

                    <FormControl fullWidth margin='normal'>
                      <InputLabel required id="select-label" size='small'>직책</InputLabel>
                      <Select 
                        required 
                        size='small' 
                        name="positionNo"
                        label="직책"
                        variant="outlined" 
                        value={EditPosition} 
                        error={positionError}
                        onChange={handlePositionChange}>
                          {position ?
                            position.map((p) =>
                              <MenuItem key={p.no} value={p.no}>
                                {p.pname}
                              </MenuItem>
                            )
                            : null}
                      </Select>
                      <FormHelperText error>{positionError}</FormHelperText>
                    </FormControl>
                  
                    <FormControl fullWidth margin='normal'>
                      <InputLabel required id="select-label" size='small'>부서</InputLabel>
                      <Select 
                        required 
                        size='small' 
                        name="departmentNo"
                        label="부서"
                        variant="outlined" 
                        value={JoinDepartment} 
                        error={departmentError}
                        onChange={handleDeptChange}>
                          {department ?
                            department.map((e) =>
                              <MenuItem 
                                disabled={e.ddepth <3 ? true : false } 
                                key={e.no} value={e.no}>{e.ddepth === 3 ? '▶ ' : null}{e.dname}
                              </MenuItem>
                            )
                            : null}
                      </Select>
                      <FormHelperText error>{departmentError}</FormHelperText>
                    </FormControl>
                            
                    <FormControl fullWidth margin='normal'>
                      <FormLabel required id="radio-label" size='small'>권한</FormLabel>
                      <RadioGroup style={{flexDirection: 'row', justifyContent: 'space-around'}} aria-labelledby="level" name="level" defaultValue={`${employee.level}`} row>
                        <FormControlLabel value={`일반`} control={<Radio />} label="일반" />
                        <FormControlLabel value={"공지"} control={<Radio />} label="공지" />
                        <FormControlLabel value={"승인"} control={<Radio />} label="승인" />
                        <FormControlLabel value={"전체"} control={<Radio />} label="전체" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={9} padding="16px">
                    <TextField 
                      required 
                      fullWidth
                      size='small' 
                      name="hphone" 
                      label="전화번호" 
                      type="text"
                      margin="normal" 
                      variant="outlined"
                      value={inputHphonValue}
                      onChange={handleHphonePress}
                      error={hphoneError}
                      helperText={hphoneError ? hphoneError : 'ex. 010-0000-0000'}
                    />

                    {/* <TextField 
                      required size='small' 
                      name="state"
                      label="상태"
                      margin="normal" 
                      variant="outlined" 
                    /> */}

                    <FormControl fullWidth margin='normal'>
                      <FormLabel required id="radio-label" size='small'>상태</FormLabel>
                      <RadioGroup style={{flexDirection: 'row', justifyContent: 'space-around'}} aria-labelledby="state" name="state" defaultValue={`${employee.state}`} row>
                        <FormControlLabel value={"재직"} control={<Radio />} label="재직" />
                        <FormControlLabel value={"퇴사"} control={<Radio />} label="퇴사" />
                        <FormControlLabel value={"기타"} control={<Radio />} label="기타" />
                      </RadioGroup>
                    </FormControl>

                    <TextField 
                      required 
                      fullWidth
                      size='small'
                      name="joinDate" 
                      label="입사일" 
                      InputLabelProps={{ shrink: true }}
                      type="date"
                      margin="normal" 
                      variant="outlined"
                      defaultValue={`${employee.joinDate}`}
                      error={joinDateError}
                        helperText={joinDateError}
                    />
                
                    <FormControl fullWidth margin='normal'>
                      <FormLabel required id="radio-label" size='small'>성별</FormLabel>
                      <RadioGroup style={{flexDirection: 'row', justifyContent: 'space-around'}} aria-labelledby="gender" name="gender" defaultValue={`${employee.gender}`} row>
                        <FormControlLabel value={"M"} control={<Radio />} label="남자" />
                        <FormControlLabel value={"F"} control={<Radio />} label="여자" />
                      </RadioGroup>
                    </FormControl>

                    <TextField
                      required 
                      fullWidth
                      size='small'
                      name="extNumber"
                      label="사내전화번호" 
                      type='text'
                      margin="normal" 
                      variant="outlined"
                      value={inputExtNumValue}
                      onChange={handleExtNumPress}
                      // defaultValue={`${employee.extNumber}`}
                      error={extNumberError}
                      helperText={extNumberError ? extNumberError : 'ex. 051-000-0000'}
                    />
                  </Grid>
                </Grid>
                <br/>
                <Stack spacing={3} direction="row">
                  <Button style={{maxHeight: '50px', width: '50%'}} type="submit" position="absolute" color="primary" variant="contained">수정</Button>
                  <Button style={{maxHeight: '50px', width: '50%'}} type="button" position="absolute" color="error" variant="contained" onClick={handleDelete}>삭제</Button>
                  <Button style={{maxHeight: '50px', width: '50%'}} position="absolute" color="info" variant="outlined" onClick={() => callback(false)}>취소</Button>
                </Stack>
              </FormControl>
            </div>
        </Box>
      </Modal>
    </div>
  );
}
