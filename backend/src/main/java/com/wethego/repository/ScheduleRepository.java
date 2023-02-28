package com.wethego.repository;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.wethego.vo.ScheduleVo;

@Repository
public class ScheduleRepository {
	
	@Autowired
	private SqlSession sqlSession;

	public List<ScheduleVo> getAll(HashMap<String, Object> param) {
		return sqlSession.selectList("schedule.findAll", param);
	}

	public boolean add(ScheduleVo scheduleVo) {
		return sqlSession.insert("schedule.addSchedule", scheduleVo) == 1;
	}

	public ScheduleVo getOne(Long no) {
		return sqlSession.selectOne("schedule.findOne", no);
	}

	public boolean update(ScheduleVo scheduleVo) {
		return sqlSession.update("schedule.updateSchedule", scheduleVo) == 1;
	}
	
	public boolean dragUpdate(ScheduleVo scheduleVo) {
		return sqlSession.update("schedule.dragUpdateSchedule", scheduleVo) == 1;
	}

	public Object delete(Long no) {
		return sqlSession.delete("schedule.deleteSchedule", no);
	}

	public List<ScheduleVo> getAll() {
		return sqlSession.selectList("schedule.findAllHoliday");
	}

	public List<ScheduleVo> getAll(ScheduleVo scheduleVo) {
		return  sqlSession.selectList("schedule.findToday",scheduleVo);
	}

}
