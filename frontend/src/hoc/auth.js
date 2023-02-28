/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { auth } from "../_actions/user_actions";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck() {
    let user = useSelector((state) => state.user);
    const isAuth = localStorage.getItem('Authorization');
    const navigate = useNavigate();

    useEffect(() => {
      if (isAuth === null) {
        console.log("login하러 가시오");
        navigate("/login");
        
      } else {
        if (adminRoute) {
          if (!(user.userData && user.userData.data.level === '전체')) {
            console.log("접근 불가!!!!!!");
            navigate("/");
          }
        }
        else {
          if (option === false) {
            console.log("접근 불가22");
            navigate("/");
          }
        }
      }
    }, []);

    return <SpecificComponent user={user} />;
  }
  return <AuthenticationCheck />;
}
