package com.wethego.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class StatisticsRepository {

	@Autowired
	private SqlSession sqlSession;

	// 소정 근로 일수 및 해당 월 일수
	public Map<String, Object> getContract(String year, String month) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("year", year);
		map.put("month", month);
		
		return sqlSession.selectOne("statistics.countContract", map);
	}

	
	// 조회 년/월 해당 유저의 근무 일수
	public Object getWorkCount(String year, String month) {
		
		System.out.println(year+month);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("year", year);
		map.put("month", month);
		
		return sqlSession.selectOne("statistics.workCount", map);
	}
	
	
	public List<Map<String, Object>> getWorkHours(String year, String month) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("year", year);
		map.put("month", month);
		
		return sqlSession.selectList("statistics.getWorkHours", map);
	}


	// 유저 번호 기준 한 달 평균 근로 시간
	public Object avg(Long no) {

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("no", no);
		
		return sqlSession.selectList("statistics.getAvg", map);
	}

	
	
	

	
	
	
}
