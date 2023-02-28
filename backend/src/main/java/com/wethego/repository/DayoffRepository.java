package com.wethego.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.wethego.vo.AttendanceVo;
import com.wethego.vo.DayoffVo;
import com.wethego.vo.VacationVo;

@Repository
public class DayoffRepository {
	@Autowired
	private SqlSession sqlSession;

    public List<DayoffVo> getAll(Long no) {
      return sqlSession.selectList("dayoff.findAll", no);
    }
  
    
	public List<VacationVo> getTeamVacation(HashMap<String, Object> param) {
		return sqlSession.selectList("dayoff.getTeamVacation", param);
	}	

	public List<VacationVo> getvacAll() {
		return sqlSession.selectList("dayoff.findvacAll");
	}

	public List<VacationVo> getvacAll(Long no) {
		return sqlSession.selectList("dayoff.findvacAll", no);
	}
	
	public boolean requestVac(VacationVo vo) {
		boolean result = sqlSession.insert("dayoff.requestVac", vo) == 1; 
		return result;
	}

	public boolean delete(Long no) {
		return sqlSession.delete("vacation.delete", no) == 1;
	}

	public List<VacationVo> getRequestAll(Long no) {
		return sqlSession.selectList("vacation.requestlist", no);
	}

	public void vacConfirm(HashMap<String, Object> param) {
		sqlSession.update("vacation.vacconfirm", param);
	}

	public void vacRefer(HashMap<String, Object> param) {
		sqlSession.update("vacation.vacrefer", param);
	}

	/** Admin 휴가 게시판 START **/
	public List<AttendanceVo> getAll(String userId, String name, String date) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		map.put("name", name);
		map.put("date", date);
		return sqlSession.selectList("vacation.adminFindAll", map);
	}
	public int getTotalCount(String userId, String name, String date) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		map.put("name", name);
		map.put("date", date);
		return sqlSession.selectOne("vacation.totalCount", map);
	}

	public void delete2(Long no) {
		sqlSession.delete("vacation.deleteVac", no);
	}


	// 종일 수정
	public void createDayoff(DayoffVo vo) {
		sqlSession.insert("dayoff.createDayoff", vo);
	}
	
	/** Admin 연차 게시판 START **/
	public List<AttendanceVo> getAll2(String userId, String name) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		map.put("name", name);
		return sqlSession.selectList("dayoff.adminFindAll", map);
	}

	public int getTotalCount2(String userId, String name) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		map.put("name", name);
		return sqlSession.selectOne("dayoff.totalCount", map);
	}

	public DayoffVo getOne(Long no) {
		return sqlSession.selectOne("dayoff.findOne", no);
	}

	public Boolean update(DayoffVo dayoffVo) {
		return 1 == sqlSession.update("dayoff.dayoffupdate", dayoffVo);
	}
}
