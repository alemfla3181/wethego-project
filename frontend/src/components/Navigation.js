import React from 'react'
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="sidebar" style={{float: 'left'}}>
      <div>
        <i className="fas fa-home me-2"></i>
        <Link to="/"><span>Home</span></Link>
      </div>
      <div>
        <i className="fas fa-calendar me-2"></i>
        <Link to="/schedule"><span>근무일정</span></Link>
      </div>
      <div>
        <i className="fas fa-clipboard-list me-2"></i>
        <Link to="/attendance"><span>출퇴근기록</span></Link>
      </div>
      <div>
        <i className="fas fa-plane me-2"></i>
        <Link to="/dayoff"><span>휴가</span></Link>
      </div>
      <div>
        <i className="fas fa-comment me-2"></i>
        <Link to="/board"><span>게시판</span></Link>
      </div>
      <div>
        <i className="fas fa-id-card me-2"></i>
        <Link to="/department"><span>조직도</span></Link>
      </div>
      <div>
        <i className="fas fa-chart-pie me-2"></i>
        <Link to="/statistics"><span>통계</span></Link>
      </div>
    </div>
  )
}

export default Navigation