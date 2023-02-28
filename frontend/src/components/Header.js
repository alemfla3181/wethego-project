import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth, logoutUser } from "../_actions/user_actions";
import Timer from "./Timer";
import decode from "jwt-decode";
import ModalComponent from "./ModalComponent";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorization = window.localStorage.getItem("Authorization");
  const token = authorization ? decode(authorization) : null;
  const [User, setUser] = useState(null);
  const [ShowModal, setShowModal] = useState(false);

  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user.userData && token) {
      setUser(user.userData.data);
    } else if (!!user && !!token) {
      dispatch(auth(token.userId))
        .then(res => console.log(res.payload.data));
    }
  }, [user]);

  const logoutHandler = () => {
    dispatch(logoutUser())
    window.localStorage.removeItem("Authorization");
    navigate("/login"); 
    console.log(user.userData);
  };

  const ShowModalHandler = (e) => {
    e.preventDefault();
    setShowModal(true);
  }

  const reAuth = () => {
    if(!!user && !!token) {
      dispatch(auth(token.userId))
        .then(res => console.log(res.payload.data));
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            
            <li className="nav-item">
              <a className="nav-link" style={{ fontWeight: "bold" }}>
                <Timer/>
              </a>
            </li>
            <li className="nav-item">
              { User && User.level === '전체' ?
                <Link to="/admin" className="nav-link" style={{ fontWeight: "bold" }}>
                  {User && User.name}
                </Link>
                :
                <a className="nav-link" style={{ fontWeight: "bold" }}>
                  {User && User.name}
                </a>
              }
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#">
                <span className="badge bg-danger">5</span>
                <i className="fas fa-bell"></i>
              </a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" href="" onClick={ShowModalHandler}>
                <i className="fas fa-cog"></i>
              </a>
              <ModalComponent show={ShowModal} user={ user.userData ? user.userData.data : null} callback={(e) => e ? (setShowModal(false), logoutHandler()) : (setShowModal(false), reAuth())} />
            </li>
            <li className="nav-item">
              <a className="nav-link" href="" style={{ fontWeight: "bold" }} onClick={logoutHandler}>
                로그아웃
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="nav_toggle">
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin">
              <span>부서관리</span>
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/employees">
              <span>사원관리</span>
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/attendance">
              <span>출퇴근관리</span>
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/position">
              <span>직책 관리</span>
            </Link>
          </li>
          <li className="list-group-item">추가링크</li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
