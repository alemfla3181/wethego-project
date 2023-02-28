import React,{useEffect, useState} from "react";
import moment from 'moment';

const Timer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
      if (window.localStorage.getItem("timer") < moment().format("YYYY-MM-DD HH:mm:ss")) {
        window.localStorage.removeItem("timer");
      }
    }, 1000);
    return () => clearInterval(id)
  }, [])
  

  return <div>{time.toLocaleString('en-US').slice(10,22)}</div>;
};

export default Timer;
