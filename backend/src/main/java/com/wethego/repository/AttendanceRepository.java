package com.wethego.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.wethego.vo.AttendanceVo;
import com.wethego.vo.DayoffVo;

@Repository
public class AttendanceRepository {
	
	@Autowired
	private SqlSession sqlSession;

	public List<AttendanceVo> getAll(String userId,String name,String date) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		map.put("name", name);
		map.put("date", date);
		
		return sqlSession.selectList("attendance.findAll", map);
	}
	public AttendanceVo getOne(Long no) {
		return sqlSession.selectOne("attendance.findOne", no);
	}
	public Boolean update(AttendanceVo attendanceVo) {
		return 1 == sqlSession.update("attendance.update", attendanceVo);
	}

    public void delete(Long no) {
      sqlSession.update("attendance.delete", no);
    }  
  
	public int getTotalCount(String userId, String name,String date) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		map.put("name", name);
		map.put("date", date);

		return sqlSession.selectOne("attendance.totalCount", map);
	}
	
	// UserPage
	public Long ShowOn(HashMap<String, Object> param) {
		return sqlSession.selectOne("attendance.ShowOn", param);
	}
	
	public Long ShowOff(HashMap<String, Object> param) {
		return sqlSession.selectOne("attendance.ShowOff", param);
	}
	
    public Long ShowTardy(HashMap<String, Object> param) {
      return sqlSession.selectOne("attendance.ShowTardy", param);
    }
    
    public List<DayoffVo> ShowDayOff(HashMap<String, Object> param) {
        return sqlSession.selectList("attendance.ShowDayOff", param);
    }
    
	public List<DayoffVo> dateDayOff(HashMap<String, Object> param) {
		return sqlSession.selectList("attendance.dateDayOff", param);
	}
    
	public boolean add(HashMap<String, Object> param) {
		boolean result = sqlSession.insert("attendance.add", param) == 1; 
		return result;
	}
	
	public AttendanceVo checkToday(HashMap<String, Object> param) {
		return sqlSession.selectOne("attendance.checkToday", param);
	}
	
	public void updateOff(HashMap<String, Object> param) {
		sqlSession.update("attendance.updateOff", param); 
	}

    public void updateState(HashMap<String, Object> param) {
      sqlSession.update("attendance.updateState", param);
    }
    
	public List<Map<String, String>> getWeeks(HashMap<String, Object> param) {
		return sqlSession.selectList("attendance.getWeeks", param);
	}
	
	public List<Map<String, String>> getTeamAtt(HashMap<String, Object> param) {
		return sqlSession.selectList("attendance.getTeamAtt", param);
	}
	
      /** 유저페이지 출퇴근 기록 **/
	public List<AttendanceVo> getAll(HashMap<String, Object> param) {
		return sqlSession.selectList("attendance.userfindAll", param);
	}
	
	/** 유저페이지 휴가기록**/
	public List<AttendanceVo> getAll2(HashMap<String, Object> param) {
		return sqlSession.selectList("attendance.uservacationfindAll", param);
	}
	
	/** 유저페이지 공휴일 목록 **/
	public List<AttendanceVo> getAll3(HashMap<String, Object> param) {
		return sqlSession.selectList("attendance.userholidayfindAll", param);
	}



}