import React,{useState, useEffect} from "react";



import { useSelector } from "react-redux";

import './Alarm';
import Alarm from "./Alarm";


const Footer = () => {

  const user = useSelector(state => state.user);

  return (
    <div className="footer">
      <div className="footerInfo">
        Copyright © WETHEOGO. All rights reserved.
      </div>

    {user && user.userData && user.userData.data && user.userData.data.level === '승인' != null ? <Alarm user={user}/> : null} 
    </div>
  );
};

export default Footer;
