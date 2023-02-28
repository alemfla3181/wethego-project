import { Box, Button, FormControl, Modal, Stack } from '@mui/material'
import axios from 'axios';
import React,{ useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const StateChange = ({ show, callback }) => {
  const now = new Date();
  
  const userData = useSelector(state => state.user.userData);

  const day = {
    year: now.getFullYear().toString(),
    month: (now.getMonth() + 1).toString(),
    date: now.getDate().toString(),
  }

  /** 근태 사항 변경  */
  const onClickStateChange = (e) => {
    if (userData) {
      const Data = {
        "day": day.year + "-" + day.month + "-" + day.date,
        "no": (userData && userData.data) ? userData.data.no : null,
        "state": e.target.value,
      }
      axios.post('/api/attendance/state', Data).then(res => {
        // console.log(res.data);
        if (res.data.result === 'success') {
          Swal.fire({
            icon: 'success',
            title: '상태 변경 완료!',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }
    callback();
  }

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
  
  return (
    <div className="wethego-h">
      <Modal
        open={show}
        onClose={() => callback()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" noValidate >
          <div id="modal-modal-title" variant="h6" component="h2">
            <h5>근태사항 변경</h5>
            <br/>
          </div>
          <div id="modal-modal-description" >
            <FormControl fullWidth component="fieldset" variant="standard">
              <Stack spacing={3} direction="row">
                <Button variant="contained" color={'primary'} onClick={onClickStateChange} value={'출근'}> 출근 </Button>
                <Button variant="contained" color={'secondary'} onClick={onClickStateChange} value={'외근'}> 외근 </Button>
                <Button variant="outlined" color={'error'} onClick={onClickStateChange} value={'기타'}> 기타 </Button>
              </Stack>
            </FormControl>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default StateChange