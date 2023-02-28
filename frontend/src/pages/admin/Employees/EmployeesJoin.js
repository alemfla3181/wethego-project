import React,{useState, useEffect} from 'react';
import axios from "axios";
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';
import { Grid, Paper, Box, Button, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, Stack, TextField, FormLabel } from '@mui/material';

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

export default function JoinModal ({show, employee, position, department, callback}) {
    const [Department, setDepartment] = useState('');
    const [EditPosition, setEditPosition] = useState(employee ? employee.positionNo : '');

    const [inputHphonValue, setInputHphonValue] = useState('');
    const [inputExtNumValue, setInputExtNumValue] = useState('');

    const [nameError, setNameError] = useState(false);
    const [userIdError, setUserIdError] = useState(false);
    const [userPwError, setUserPwError] = useState(false);
    const [birthError, setBirthError] = useState(false);
    const [positionError, setPositionError] = useState(false);
    const [departmentError, setDepartmentError] = useState(false);
    const [hphoneError, setHphoneError] = useState(false);
    const [joinDateError, setJoinDateError] = useState(false);
    const [extNumberError, setExtNumberError] = useState(false);

    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));

    const handleChange = (event) => {
        setDepartment(event.target.value);
        console.log(event.target.value);
      };

    const handlePositionChange = (event) => {
      setEditPosition(event.target.value);
      console.log(event.target.value);
    };

  const onhandlePost = async (data) => {
    const { name, userId, userPw, birth, positionNo, departmentNo, hphone, /*state,*/ joinDate, gender, extNumber } = data;
    const postData = { name, userId, userPw, birth, positionNo, departmentNo, hphone, /*state,*/ joinDate, gender, extNumber };
    console.log(postData);      
    await axios.post('/api/employees/getCheckId', data).then((res) => {
      if (res.data.data > 0) {
        Swal.fire({
          icon: 'error',
          title: '아이디 중복!',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        axios.post("/api/employees/signup", postData)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: '[' + name + '] 님',
              text: '등록되었습니다!'
            })
          });
        callback();
      }
    })
  }

    const handleSubmit = (e) => {
      e.preventDefault();

      const data = new FormData(e.currentTarget);
      const joinData = {
        name: data.get('name'),
        userId: data.get('userId'),
        userPw: data.get('userPw'),
        birth: data.get('birth'),
        positionNo: data.get('positionNo'),
        departmentNo: data.get('departmentNo'),
        hphone: data.get('hphone'),
        joinDate: data.get('joinDate'),
        gender: data.get('gender'),
        extNumber: data.get('extNumber')
      };
      
      const { name, userId, userPw, birth, positionNo, departmentNo, hphone, joinDate, gender, extNumber} = joinData;

      let valiCheck = [];

      const nameRegex = /^[ㄱ-힣]+$/;
      if (name.length < 1) setNameError('이름을 입력해주세요!'), valiCheck[0] = false;
      else if(nameRegex.test(name) && name.length === 1) setNameError('이름은 최소 2자 이상 입력해야합니다!'), valiCheck[0] = false; 
      else if(!nameRegex.test(name) && name.length > 0) setNameError('이름은 한글로만 입력해주세요!'), valiCheck[0] = false;
      else setNameError(false), valiCheck[0] = true;

      const userIdRegex = /^[a-zA-z0-9]{4,12}$/;
      if (userId.length < 1) setUserIdError('ID를 입력해주세요!'), valiCheck[1] = false;
      else if(!userIdRegex.test(userId) && userId.length > 0) setUserIdError('ID는 영문 대소문자와 숫자로 이루어진 4~12자리로 입력해야합니다!'), valiCheck[1] = false;
      else setUserIdError(false), valiCheck[1] = true;
      
      const userPwRegex = /^[a-zA-Z0-9]{4,16}$/;
      if (userPw.length < 1) setUserPwError('PW를 입력해주세요!'), valiCheck[2] = false;
      else if(!userPwRegex.test(userPw) && userPw.length > 0) setUserPwError('PW는 영문 대소문자와 숫자로 이루어진 4~16자리로 입력해야합니다!'), valiCheck[2] = false;
      else setUserPwError(false), valiCheck[2] = true;

      const birthRegex = /[0-9]{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/;
      if (birth.length < 1) setBirthError('생년월일을 선택해주세요!'), valiCheck[3] = false;
      else if(!birthRegex.test(birth) && birth.length > 0) setBirthError('올바른 날짜 형식이 아닙니다!'), valiCheck[3] = false;
      else setBirthError(false), valiCheck[3] = true;

      if(!positionNo) setPositionError('직책을 선택해주세요!'), valiCheck[4] = false;
      else setPositionError(false), valiCheck[4] = true;

      if(!departmentNo) setDepartmentError('부서를 선택해주세요!'), valiCheck[5] = false;
      else setDepartmentError(false), valiCheck[5] = true;

      const hphoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
      if(hphone.length < 1) setHphoneError('전화번호를 입력해주세요!'), valiCheck[6] = false;
      else if (!hphoneRegex.test(hphone) && hphone.length > 0) setHphoneError('올바른 휴대폰 번호 형식이 아닙니다!'), valiCheck[6] = false;
      else if (hphoneRegex.test(hphone) && hphone.length > 0 && hphone.length < 10) setHphoneError('최소 10자리 이상의 휴대폰 번호를 입력하세요!'), valiCheck[6] = false;
      else setHphoneError(false), valiCheck[6] = true;

      const joinDateRegex = /[0-9]{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/;
      if (joinDate.length < 1) setJoinDateError('입사일을 선택해주세요!'), valiCheck[7] = false;
      else if(!joinDateRegex.test(joinDate) && joinDate.length > 0) setJoinDateError('올바른 날짜 형식이 아닙니다!'), valiCheck[7] = false;
      else setJoinDateError(false), valiCheck[7] = true;

      const extNumberRegex = /^051-(?:\d{3})-\d{4}$/
      if (extNumber.length < 1) setExtNumberError('사내번호를 입력해주세요!'), valiCheck[8] = false;
      else if (!extNumberRegex.test(extNumber) && extNumber.length > 0) setExtNumberError('올바른 번호 형식이 아닙니다!'), valiCheck[8] = false;
      else if (extNumberRegex.test(extNumber) && extNumber.length > 0 && extNumber.length < 10) setExtNumberError('10자리로 구성된 사내번호를 입력하세요!'), valiCheck[8] = false;
      else setExtNumberError(false), valiCheck[8] = true;

    if(valiCheck.every((e) =>  e === true)) {
      onhandlePost(joinData);
    }

    };
      
      const handleHphonePress = (e) => {
        const regex = /^[0-9\b -]{0,13}$/;
        if (regex.test(e.target.value)) {
          setInputHphonValue(e.target.value);
        }
      };

      const handleExtNumPress = (e) => {
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
          onClose={() => callback()} 
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form" noValidate onSubmit={handleSubmit}>
            <div id="modal-modal-title" variant="h6" component="h2">
              <h5>신규 사원 정보를 입력하여 주세요</h5>
            </div>
            <div id="modal-modal-description" sx={{ mt: 2 }}>
              <FormControl component="fieldset" variant="standard">
                <Grid container spacing={2} columns={16}>
                  <Grid item xs={8} padding="16px">
                      <TextField 
                        required 
                        autoFocus
                        fullWidth
                        size='small'
                        name="name"
                        label="이름"
                        margin='normal'
                        variant="outlined"
                        error={nameError}
                        helperText={nameError}
                      />
                      <br/>                    
                      <TextField 
                        required
                        fullWidth 
                        size='small' 
                        name="userId"
                        label="아이디" 
                        margin="normal" 
                        variant="outlined"
                        error={userIdError}
                        helperText={userIdError}
                      />
                      <br/>
                      <TextField 
                        required
                        fullWidth 
                        size='small'
                        name="userPw"
                        type="password"
                        label="비밀번호" 
                        margin="normal" 
                        variant="outlined" 
                        error={userPwError}
                        helperText={userPwError}
                      />
                      <br/>
                      <TextField 
                        required
                        fullWidth
                        size='small'
                        name="birth"
                        InputLabelProps={{ shrink: true }}
                        label="생년월일"
                        type="date"
                        maxRows={Date.now()}
                        margin="normal" 
                        variant="outlined" 
                        error={birthError}
                        helperText={birthError}
                      />
                      <br/>
                      <FormControl required fullWidth margin='normal'>
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
                  </Grid>
                  <Grid item xs={8} padding="16px">
                      <FormControl required fullWidth margin='normal'>
                        <InputLabel required id="select-label" size='small'>부서</InputLabel>
                        <Select 
                          required
                          size='small' 
                          name="departmentNo"
                          label="부서"
                          variant="outlined" 
                          value={Department} 
                          error={departmentError}
                          onChange={handleChange}>
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

                      <TextField 
                        required
                        fullWidth 
                        size='small' 
                        name="hphone" 
                        label="전화번호" 
                        type="text"
                        margin="normal" 
                        variant="outlined" 
                        onChange={handleHphonePress}
                        value={inputHphonValue}
                        error={hphoneError}
                        helperText={hphoneError}
                      />

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
                        error={joinDateError}
                        helperText={joinDateError}
                      />
                      <FormLabel id="radio-label">성별</FormLabel>
                      <RadioGroup required style={{flexDirection: 'row', justifyContent: 'space-around'}} aria-labelledby="gender" name="gender" defaultValue={"M"} row>
                        <FormControlLabel value={"M"} control={<Radio />} label="남자" />
                        <FormControlLabel value={"F"} control={<Radio />} label="여자" />
                      </RadioGroup>

                      <TextField
                        required
                        fullWidth 
                        size='small'
                        name="extNumber"
                        label="사내전화번호" 
                        margin="normal" 
                        variant="outlined" 
                        value={inputExtNumValue}
                        onChange={handleExtNumPress}
                        error={extNumberError}
                        helperText={extNumberError}
                      />
                  </Grid>
                </Grid>
                <br/>
                <Stack required spacing={2} direction="row">
                  <Button 
                    style={{maxHeight: '50px', width: '50%'}} 
                    type="submit" 
                    position="absolute" 
                    color="primary" 
                    variant="contained">
                      등록
                  </Button>
                  <Button style={{maxHeight: '50px', width: '50%'}} position="absolute" color="error" variant="outlined" onClick={() => callback()}>취소</Button>
                </Stack>
              </FormControl>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }