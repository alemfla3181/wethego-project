import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { auth, loginUser } from "../../../_actions/user_actions";
import Swal from 'sweetalert2';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLoginHandler = (e) => {
    // console.log(e.target);
    e.preventDefault();
    const data = {
      "userId": e.target.userId.value,
      "userPw": e.target.userPw.value,
    }
    onLoginCheck(data);
  };

  const onLoginCheck = async (data) => {
    await dispatch(loginUser(data))
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: '로그인 실패!',
          showConfirmButton: false,
          timer: 2000
        })
      });
  };

  return (
    <div className={"LoginPage"}>
      <h1>WETHEGO</h1>
      <br />
      <form onSubmit={onLoginHandler}>
        <TextField name={"userId"} id="filled-basic" label="ID" variant="filled" />
        <br />
        <br />
        <TextField name={"userPw"} id="filled-basic" label="Password" type={"password"} variant="filled" />
        <br />
        <br />

        <Button variant="contained" type={"submit"}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
