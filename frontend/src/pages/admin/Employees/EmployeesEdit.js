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
      title: '[' + employee.name + '] ??????',
      text: "????????? ?????????????????????????",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '??????',
      cancelButtonText: '??????'
    }).then((result) => {
      if (result.isConfirmed) {
        if (employee.userId !== data.userId) {
          axios.post('/api/employees/getCheckId', data).then((res) => {
            if (res.data.data > 0) {
              Swal.fire({
                icon: 'error',
                title: '????????? ??????!',
                showConfirmButton: false,
                timer: 2000
              })
            } else {
              axios.post('/api/employees/modify', modifyData)
                .then(() => {
                  Swal.fire({
                    icon: 'success',
                    title: '[' + employee.name + '] ??????',
                    text: '????????? ?????????????????????!',
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
              title: '[' + employee.name + '] ??????',
              text: '????????? ?????????????????????!',
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

    const nameRegex = /^[???-???]+$/;
      if (name.length < 1) setNameError('????????? ??????????????????!'), valiCheck = false;
      else if(nameRegex.test(name) && name.length === 1) setNameError('????????? ?????? 2??? ?????? ?????????????????????!'), valiCheck[0] = false; 
      else if(!nameRegex.test(name) && name.length > 0) setNameError('????????? ???????????? ??????????????????!'), valiCheck[0] = false;
      else setNameError(''), valiCheck[0] = true;

      const userIdRegex = /^[a-zA-z0-9]{4,12}$/;
      if (userId.length < 1) setUserIdError('ID??? ??????????????????!'), valiCheck[1] = false;
      else if(!userIdRegex.test(userId) && userId.length > 0) setUserIdError('ID??????????????????????????????????????? ??????????????4~12????????? ?????????????????????!'), valiCheck[1] = false;
      else setUserIdError(''), valiCheck[1] = true;
      
      // const userPwRegex = /^[a-zA-Z0-9]{4,16}$/;
      // if (userPw.length < 1) setUserPwError('PW??? ??????????????????!'), valiCheck = false;
      // else if(!userPwRegex.test(userPw) && userPw.length > 0) setUserPwError('PW??????????????????????????????????????? ??????????????4~16????????? ?????????????????????!'), valiCheck = false;
      // else setUserPwError(''), setValiCheck(true);

      const birthRegex = /[0-9]{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/;
      if (birth.length < 1) setBirthError('??????????????? ??????????????????!'), valiCheck[2] = false;
      else if(!birthRegex.test(birth) && birth.length > 0) setBirthError('????????? ?????? ????????? ????????????!'), valiCheck[2] = false;
      else setBirthError(''), valiCheck[2] = true;

      if(!positionNo) setPositionError('????????? ??????????????????!'), valiCheck[3] = false;
      else setPositionError(''), valiCheck[3] = true;

      if(!departmentNo) setDepartmentError('????????? ??????????????????!'), valiCheck[4] = false;
      else setDepartmentError(''), valiCheck[4] = true;

      const hphoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
      if(hphone.length < 1) setHphoneError('??????????????? ??????????????????!'), valiCheck = false;
      else if (!hphoneRegex.test(hphone) && hphone.length > 0) setHphoneError('????????? ????????? ?????? ????????? ????????????!'), valiCheck[5] = false;
      else if (hphoneRegex.test(hphone) && hphone.length > 0 && hphone.length < 10) setHphoneError('?????? 10?????? ????????? ????????? ????????? ???????????????!'), valiCheck[5] = false;
      else setHphoneError(''), valiCheck[5] = true;

      const joinDateRegex = /[0-9]{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/;
      if (joinDate.length < 1) setJoinDateError('???????????? ??????????????????!'), valiCheck[6] = false;
      else if(!joinDateRegex.test(joinDate) && joinDate.length > 0) setJoinDateError('????????? ?????? ????????? ????????????!'), valiCheck[6] = false;
      else setJoinDateError(''), valiCheck[6] = true;

      const extNumberRegex = /^051-(?:\d{3})-\d{4}$/
      if (extNumber.length < 1) setExtNumberError('??????????????? ??????????????????!'), valiCheck[7] = false;
      else if (!extNumberRegex.test(extNumber) && extNumber.length > 0) setExtNumberError('????????? ?????? ????????? ????????????!'), valiCheck[7] = false;
      else if (extNumberRegex.test(extNumber) && extNumber.length > 0 && extNumber.length < 10) setExtNumberError('10????????? ????????? ??????????????? ???????????????!'), valiCheck[7] = false;
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
        title: '???????????? ????????? ??????!',
        text: '?????? ??????????????? ???????????? ???????????????.',
        showConfirmButton: false,
        timer: 2000
      })
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: employee.name + '??????',
      text: "?????????????????????????",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '??????',
      cancelButtonText: '??????'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get('/api/employees/delete/' + employee.no)
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: '????????????!',
                showConfirmButton: false,
                timer: 1500
              })
              callback(true);
            })
            .catch(err => {
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: '????????? ??? ?????? ???????????????.'
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
            <h5>{`${employee.name}`} ?????? ??????</h5>
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
                      label="??????"
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
                      label="?????????" 
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
                      label="????????????" 
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
                      ???????????? ?????????
                    </Button>

                    <TextField 
                      required 
                      fullWidth
                      size='small'
                      name="birth"
                      InputLabelProps={{ shrink: true }}
                      label="????????????"
                      type="date"
                      margin="normal" 
                      variant="outlined"
                      defaultValue={`${employee.birth}`} 
                      error={birthError}
                      helperText={birthError}
                    />

                    <FormControl fullWidth margin='normal'>
                      <InputLabel required id="select-label" size='small'>??????</InputLabel>
                      <Select 
                        required 
                        size='small' 
                        name="positionNo"
                        label="??????"
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
                      <InputLabel required id="select-label" size='small'>??????</InputLabel>
                      <Select 
                        required 
                        size='small' 
                        name="departmentNo"
                        label="??????"
                        variant="outlined" 
                        value={JoinDepartment} 
                        error={departmentError}
                        onChange={handleDeptChange}>
                          {department ?
                            department.map((e) =>
                              <MenuItem 
                                disabled={e.ddepth <3 ? true : false } 
                                key={e.no} value={e.no}>{e.ddepth === 3 ? '??? ' : null}{e.dname}
                              </MenuItem>
                            )
                            : null}
                      </Select>
                      <FormHelperText error>{departmentError}</FormHelperText>
                    </FormControl>
                            
                    <FormControl fullWidth margin='normal'>
                      <FormLabel required id="radio-label" size='small'>??????</FormLabel>
                      <RadioGroup style={{flexDirection: 'row', justifyContent: 'space-around'}} aria-labelledby="level" name="level" defaultValue={`${employee.level}`} row>
                        <FormControlLabel value={`??????`} control={<Radio />} label="??????" />
                        <FormControlLabel value={"??????"} control={<Radio />} label="??????" />
                        <FormControlLabel value={"??????"} control={<Radio />} label="??????" />
                        <FormControlLabel value={"??????"} control={<Radio />} label="??????" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={9} padding="16px">
                    <TextField 
                      required 
                      fullWidth
                      size='small' 
                      name="hphone" 
                      label="????????????" 
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
                      label="??????"
                      margin="normal" 
                      variant="outlined" 
                    /> */}

                    <FormControl fullWidth margin='normal'>
                      <FormLabel required id="radio-label" size='small'>??????</FormLabel>
                      <RadioGroup style={{flexDirection: 'row', justifyContent: 'space-around'}} aria-labelledby="state" name="state" defaultValue={`${employee.state}`} row>
                        <FormControlLabel value={"??????"} control={<Radio />} label="??????" />
                        <FormControlLabel value={"??????"} control={<Radio />} label="??????" />
                        <FormControlLabel value={"??????"} control={<Radio />} label="??????" />
                      </RadioGroup>
                    </FormControl>

                    <TextField 
                      required 
                      fullWidth
                      size='small'
                      name="joinDate" 
                      label="?????????" 
                      InputLabelProps={{ shrink: true }}
                      type="date"
                      margin="normal" 
                      variant="outlined"
                      defaultValue={`${employee.joinDate}`}
                      error={joinDateError}
                        helperText={joinDateError}
                    />
                
                    <FormControl fullWidth margin='normal'>
                      <FormLabel required id="radio-label" size='small'>??????</FormLabel>
                      <RadioGroup style={{flexDirection: 'row', justifyContent: 'space-around'}} aria-labelledby="gender" name="gender" defaultValue={`${employee.gender}`} row>
                        <FormControlLabel value={"M"} control={<Radio />} label="??????" />
                        <FormControlLabel value={"F"} control={<Radio />} label="??????" />
                      </RadioGroup>
                    </FormControl>

                    <TextField
                      required 
                      fullWidth
                      size='small'
                      name="extNumber"
                      label="??????????????????" 
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
                  <Button style={{maxHeight: '50px', width: '50%'}} type="submit" position="absolute" color="primary" variant="contained">??????</Button>
                  <Button style={{maxHeight: '50px', width: '50%'}} type="button" position="absolute" color="error" variant="contained" onClick={handleDelete}>??????</Button>
                  <Button style={{maxHeight: '50px', width: '50%'}} position="absolute" color="info" variant="outlined" onClick={() => callback(false)}>??????</Button>
                </Stack>
              </FormControl>
            </div>
        </Box>
      </Modal>
    </div>
  );
}
