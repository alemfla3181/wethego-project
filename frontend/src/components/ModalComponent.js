import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import { Grid, Box, Button, FormControl, FormControlLabel, FormLabel, Modal, Radio, RadioGroup, Stack, TextField } from '@mui/material';

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
  width: '35%',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ show, user, callback }) {
  const [nameError, setNameError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);
  const [userPwError, setUserPwError] = useState(false);
  const [birthError, setBirthError] = useState(false);
  const [hphoneError, setHphoneError] = useState(false);
  const [extNumberError, setExtNumberError] = useState(false);

  const [inputHphonValue, setInputHphonValue] = useState(user ? user.hphone : null);
  const [inputExtNumValue, setInputExtNumValue] = useState(user ? user.extNumber : null);

  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (!show) {
      setInputHphonValue(null);
      setInputExtNumValue(null);
    }
    else if (inputHphonValue && inputHphonValue.length === 10) {
      setInputHphonValue(inputHphonValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    else if (inputHphonValue && inputHphonValue.length === 13) {
      setInputHphonValue(inputHphonValue.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
    else if (inputExtNumValue && inputExtNumValue.length === 10) {
      setInputExtNumValue(inputExtNumValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
  }, [user, inputHphonValue, inputExtNumValue])
  
  const onhandleModify = (data) => {
    const formData = new FormData();
    formData.append("img", document.getElementById("img").files[0]);
    formData.append("vo", JSON.stringify(data));

    Swal.fire({
      title: '[' + user.name + '] ??????',
      text: "????????? ?????????????????????????",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '??????',
      cancelButtonText: '??????'
    }).then((result) => {
      if (result.isConfirmed) {
        if (data.userId !== user.userId) {
          axios.post('/api/employees/getCheckId', data).then((res) => {
            if (res.data.data > 0) {
              Swal.fire({
                icon: 'error',
                title: '????????? ??????!',
                showConfirmButton: false,
                timer: 2000
              })
            }
            else {
              axios.post('/api/employees/modifyself', formData, {
                headers: {
                  "Content-Type": `multipart/form-data`,
                },
              }).then((res) => {
                console.log(data, res.data);
                // ????????? ?????? ??????
                if (data.userId !== res.data.data.userId) {
                  Swal.fire({
                    icon: 'success',
                    title: '?????? ?????? ??????!',
                    text: '??????????????? ???????????????.',
                    showConfirmButton: false,
                    timer: 2000
                  })
                  callback(true);
                }
                // ???????????? ?????? ??????
                else if (res.data.data.userPw === "" || res.data.data.userPw === null) {
                  Swal.fire({
                    icon: 'success',
                    title: '?????? ?????? ??????!',
                    showConfirmButton: false,
                    timer: 2000
                  })
                  callback(false);
                } else {
                  Swal.fire({
                    icon: 'success',
                    title: '?????? ?????? ??????!',
                    text: '??????????????? ???????????????.',
                    showConfirmButton: false,
                    timer: 2000
                  })
                  callback(true);
                }
              }).catch((err) =>
                Swal.fire({
                  icon: 'error',
                  title: '?????? ?????? ??????!',
                  showConfirmButton: false,
                  timer: 2000
                })
              );
            }
          })
        } else {
          axios.post('/api/employees/modifyself', formData, {
            headers: {
              "Content-Type": `multipart/form-data`,
            },
          }).then((res) => {
            // ????????? ?????? ??????
            if (data.userId !== res.data.data.userId) {
              Swal.fire({
                icon: 'success',
                title: '?????? ?????? ??????!',
                text: '??????????????? ???????????????.',
                showConfirmButton: false,
                timer: 2000
              })
              callback(true);
            }
            // ???????????? ?????? ??????
            else if (res.data.data.userPw === "" || res.data.data.userPw === null) {
              Swal.fire({
                icon: 'success',
                title: '?????? ?????? ??????!',
                showConfirmButton: false,
                timer: 2000
              })
              callback(false);
            } else {
              Swal.fire({
                icon: 'success',
                title: '?????? ?????? ??????!',
                text: '??????????????? ???????????????.',
                showConfirmButton: false,
                timer: 2000
              })
              callback(true);
            }
          }).catch((err) =>
            Swal.fire({
              icon: 'error',
              title: '?????? ?????? ??????!',
              showConfirmButton: false,
              timer: 2000
            })
          );
        }
      }
    })
  }

  const handleModify = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const modifyData = {
      no: user.no,
      name: data.get('name'),
      userId: data.get('userId'),
      userPw: data.get('userPw'),
      birth: data.get('birth'),
      hphone: data.get('hphone'),
      gender: data.get('gender'),
      extNumber: data.get('extNumber')
    };

    console.log(modifyData);
    const { name, userId, userPw, birth, hphone, gender, extNumber } = modifyData;

    let valiCheck = [];

    const nameRegex = /^[???-???]+$/;
    if (name.length < 1) setNameError('????????? ??????????????????!'), valiCheck[0] = false;
    else if (nameRegex.test(name) && name.length === 1) setNameError('????????? ?????? 2??? ?????? ?????????????????????!'), valiCheck[0] = false;
    else if (!nameRegex.test(name) && name.length > 0) setNameError('????????? ???????????? ??????????????????!'), valiCheck[0] = false;
    else setNameError(''), valiCheck[0] = true;

    const userIdRegex = /^[a-zA-z0-9]{4,12}$/;
    if (userId.length < 1) setUserIdError('ID??? ??????????????????!'), valiCheck[1] = false;
    else if (!userIdRegex.test(userId) && userId.length > 0) setUserIdError('ID??? ?????????????????????????????????? ??????????????4~12????????? ?????????????????????!'), valiCheck[1] = false;
    else setUserIdError(''), valiCheck[1] = true;

    const userPwRegex = /^[a-zA-z0-9]{4,16}$/;
    if (!userPwRegex.test(userPw) && userPw.length > 0) setUserPwError('Password??? ?????????????????????????????????? ??????????????4~16????????? ?????????????????????!'), valiCheck[2] = false;
    else setUserPwError(''), valiCheck[2] = true;

    const birthRegex = /[0-9]{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/;
    if (birth.length < 1) setBirthError('??????????????? ??????????????????!'), valiCheck[3] = false;
    else if (!birthRegex.test(birth) && birth.length > 0) setBirthError('????????? ?????? ????????? ????????????!'), valiCheck[3] = false;
    else setBirthError(''), valiCheck[3] = true;
    
    const hphoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
    if (hphone.length < 1) setHphoneError('??????????????? ??????????????????!'), valiCheck[4] = false;
    else if (!hphoneRegex.test(hphone) && hphone.length > 0) setHphoneError('????????? ????????? ?????? ????????? ????????????!'), valiCheck[4] = false;
    else if (hphoneRegex.test(hphone) && hphone.length > 0 && hphone.length < 10) setHphoneError('?????? 10?????? ????????? ????????? ????????? ???????????????!'), valiCheck[4] = false;
    else setHphoneError(''), valiCheck[4] = true;


    const extNumberRegex = /^051-(?:\d{3})-\d{4}$/
    if (extNumber.length < 1) setExtNumberError('??????????????? ??????????????????!'), valiCheck[5] = false;
    else if (!extNumberRegex.test(extNumber) && extNumber.length > 0) setExtNumberError('????????? ?????? ????????? ????????????!'), valiCheck[5] = false;
    else if (extNumberRegex.test(extNumber) && extNumber.length > 0 && extNumber.length < 10) setExtNumberError('10????????? ????????? ??????????????? ???????????????!'), valiCheck[5] = false;
    else setExtNumberError(''), valiCheck[5] = true;

    if (valiCheck.every((e) => e === true)) {
      onhandleModify(modifyData);
    }
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

  /**   ?????? ????????????   */
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

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
            <h5>{user ? user.name : ''}?????? ?????? ??????</h5>
          </div>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <FormControl fullWidth component="fieldset" >
              <Grid container spacing={2} columns={18}>
                <Grid item xs={9} padding="10px">

                  {/*           ????????? ??????             */}
                  
                  {imageSrc ?
                    <img src={imageSrc}
                      style={{ marginTop: "7%", width: "100%", height: "40%", overflow: "hidden" }}
                      alt="preview-img" />
                    :
                    user && <img src={'/api/pic/' + user.profileUrl}
                      style={{ marginTop: "7%", width: "100%", height: "40%", overflow: "hidden" }}
                      onError={(e) => e.target.src = require("../assets/images/profile.jpg")}
                    />
                  }
                  <Button style={{ marginTop: "5%", marginBottom: "7%", width: '100%' }}
                    position="absolute" color="secondary" variant="contained" component="label">
                    ????????? ?????? ??????
                    <input hidden name="file" type="file" id="img"
                      onChange={(e) => { encodeFileToBase64(e.target.files[0]) }} />
                  </Button>

                  {/*               ??????               */}
                  <TextField
                    autoFocus
                    fullWidth
                    size='small'
                    name="name"
                    label="??????"
                    margin="normal"
                    variant="outlined"
                    defaultValue={user ? user.name : ''}
                    error={nameError}
                    helperText={nameError}
                  />

                  {/*              ?????????              */}
                  <TextField
                    fullWidth
                    size='small'
                    name="userId"
                    label="?????????"
                    margin="normal"
                    variant="outlined"
                    defaultValue={user ? user.userId : ''}
                    error={userIdError}
                    helperText={userIdError}
                  />
                    
                  {/*             ????????????              */}
                  <TextField
                    fullWidth
                    size='small'
                    name="userPw"
                    type="password"
                    label="????????????"
                    margin="normal"
                    variant="outlined"
                    error={userPwError}
                    helperText={userPwError}
                  />
                </Grid>

                {/*               ????????????              */}
                <Grid item xs={9} padding="10px">
                  <TextField
                    fullWidth
                    size='small'
                    name="birth"
                    InputLabelProps={{ shrink: true }}
                    label="????????????"
                    type="date"
                    margin="normal"
                    variant="outlined"
                    defaultValue={user ? user.birth : ''}
                    error={birthError}
                    helperText={birthError}
                  />

                  {/*               ????????????              */}
                  <TextField
                    fullWidth
                    size='small'
                    name="hphone"
                    label="????????????"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    value={inputHphonValue}
                    onChange={handleHphonePress}
                    defaultValue={user ? user.hphone : ''}
                    error={hphoneError}
                    helperText={hphoneError ? hphoneError : 'ex. 010-0000-0000'}
                  />

                  {/*                  ??????                */}
                  <TextField
                    fullWidth
                    disabled
                    size='small'
                    name="positionNo"
                    label="??????"
                    margin="normal"
                    defaultValue={user ? user.pname : ''}
                    variant="outlined">
                  </TextField>

                  {/*                 ??????                */}
                  <TextField
                    fullWidth
                    disabled
                    size='small'
                    name="departmentNo"
                    label="??????"
                    margin="normal"
                    value={user ? user.department : ''}
                    variant="outlined">
                  </TextField>

                  {/*                 ?????????                */}
                  <TextField
                    disabled
                    fullWidth
                    size='small'
                    name="joinDate"
                    label="?????????"
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    margin="normal"
                    variant="outlined"
                    defaultValue={user ? user.joinDate : ''}
                  />

                  {/*                 ??????                */}
                  <FormControl fullWidth margin='normal'>
                    <FormLabel id="radio-label" size='small'>??????</FormLabel>
                    <RadioGroup style={{ flexDirection: 'row', justifyContent: 'space-around' }} aria-labelledby="gender" name="gender" defaultValue={user ? user.gender : ''} row>
                      <FormControlLabel value={"M"} control={<Radio />} label="??????" />
                      <FormControlLabel value={"F"} control={<Radio />} label="??????" />
                    </RadioGroup>
                  </FormControl>

                  {/*             ?????? ????????????              */}
                  <TextField
                    fullWidth
                    size='small'
                    name="extNumber"
                    label="??????????????????"
                    type='text'
                    margin="normal"
                    variant="outlined"
                    value={inputExtNumValue}
                    onChange={handleExtNumPress}
                    defaultValue={user ? user.extNumber : ''}
                    error={extNumberError}
                    helperText={extNumberError ? extNumberError : 'ex. 051-000-0000'}
                  />
                </Grid>
              </Grid>
              <Stack spacing={3} direction="row">
                <Button style={{ maxHeight: '50px', width: '50%' }} type="submit" position="absolute" color="primary" variant="contained">??????</Button>
                <Button style={{ maxHeight: '50px', width: '50%' }} position="absolute" color="info" variant="outlined" onClick={() => callback(false)}>??????</Button>
              </Stack>
            </FormControl>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
