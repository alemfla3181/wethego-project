import React, { useState, useEffect } from "react";

import { Button, FormControl, InputLabel, Paper, Stack, TextField, Typography } from '@mui/material';

const RegisterForm = ({ detail, departments, callback }) => {
  const [Selected, setSelected] = useState('더존영업지사');

  useEffect(() => {
    detail ? setSelected(detail) : null;
  }, [detail])
  
  const SelectHandler = (e) => {
    setSelected(e.target.value);
  }
  
  return (
    <Paper elevation={6} className={'RegisterForm'} style={{padding: "3% 3% 3%", maxHeight: "340px", maxWidth: "400px"}}>
      <Typography type="body" style={{ textAlign: 'center' , fontFamily: 'fantasy', fontSize: '30px', fontWeight: '1000', color: '#292929' }}>부서 등록</Typography>
      <br/>
      <form
        onSubmit={e => {
          e.preventDefault();
          //console.log(e.target.select);
          callback({
            dname: e.target.name.value,
            pno: e.target.select[e.target.select.selectedIndex].id
          })
          e.target.name.value = null;
          e.target.select.value = '더존영업지사';
        }}>
        <TextField size="small" label={'부서명'} type={"text"} name={"name"} placeholder={"부서명을 입력해주세요"} />
        <br /><br />
        <FormControl>
          <select name={'select'} onChange={SelectHandler} value={Selected}>
            {departments ?
              departments.map((e) =>
                //<MenuItem key={e.no} value={e.dname}>{e.dname}</MenuItem>
                <option id={e.no} key={e.no} value={e.dname}>{e.dname}</option>
              )
              : null}
          </select>
        </FormControl>
        <br /><br />
        <Stack spacing={2} direction="row" style={{display: "block" ,padding: "5%"}}>
          <Button variant="contained" color="primary" type={"submit"}>등록</Button>
          <Button variant="outlined" onClick={() => { console.log("취소") }}>취소</Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default RegisterForm;
