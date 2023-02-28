import React from 'react'
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <div className="admin_sidebar">
      <Link to="/"><h3>ADMIN</h3></Link>
      <div>
        <i className="fas fa-calendar me-2"></i>
        <Link to='/admin'><span>부서관리</span></Link>
      </div>
      <div>
        <i className="fas fa-list-ol me-2"></i>
        <Link to='/admin/position'><span>직책 관리</span></Link>
      </div>
      <div>
        <i className="fas fa-user-gear me-2"></i>
        <Link to='/admin/employees'><span>사원관리</span></Link>
      </div>
      <div>
        <i className="fas fa-business-time me-2"></i>
        <Link to='/admin/attendance'><span>출퇴근관리</span></Link>
      </div>
      <div>
        <i className="fas fa-plane me-2"></i>
        <Link to='/admin/dayoff'><span>휴가 관리</span></Link>
      </div>
      <div>
        <i className="fas fa-calendar-days me-2"></i>
        <Link to='/admin/dayoffset'><span>연차 관리</span></Link>
      </div>
      <div>
        <i className="fas fa-message me-2"></i>
        <Link to='/admin/board'><span>게시판 관리</span></Link>
      </div>
    </div>
  )
}

export default Navigation