import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const IndexNoticeBox = () => {
  const [BoardList, setBoardList] = useState(null);
  const userData = useSelector(state => state.user.userData);

  useEffect(() => {
    if (userData) {
      const no = (userData && userData.data) ? userData.data.no : null;
      /** 부서별 공지사항 조회 */
      axios.get('/api/board/'+ no).then(res => {
        // console.log(res.data.data);
        setBoardList(res.data.data);
      })
    }
  }, [userData])


  return (
    <>
      <div
        className="col-11 box-basic"
        style={{ height: "100%", minWidth: "400px" }}
      >
        <div style={{ width: "50%" }}>
          <h6 className="box-h" style={{ float: "left", minWidth: "45%" }}>
            공지사항
          </h6>
        </div>
        <table className="table table-hover" style={{textAlign : "center"}}>
          <thead>
            <tr>
              <th scope="col" style={{ width: "5%" }}>No</th>
              <th scope="col" style={{ width: "40%" }}>제목</th>
              <th scope="col">작성자</th>
              <th scope="col">등록일</th>
            </tr>
          </thead>
          <tbody>
            {BoardList && BoardList.map((e, i) => {
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td style={{textAlign: "left", paddingLeft: "5%"}}>{e.title}</td>
                  <td>{e.name}</td>
                  <td>{e.reg_date.slice(0,10)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div style={{ float: "right" }}>
          <Link to="/board">더 보기</Link>
        </div>
        <div style={{ clear: "both", float: "none" }}></div>
      </div>
    </>
  );
};

export default IndexNoticeBox;
