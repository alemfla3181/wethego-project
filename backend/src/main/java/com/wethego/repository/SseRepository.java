package com.wethego.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.wethego.vo.SseVo;

@Repository
public class SseRepository {
	@Autowired
	private SqlSession sqlSession;

	public List<SseVo> getAll(Long no) {
		return sqlSession.selectList("sse.findAll", no);
	}
	
	public boolean update(Long no) {
		return 1 == sqlSession.update("sse.alarmSse", no);
	}

	public SseVo getAll2(Long no) {
		return sqlSession.selectOne("sse.alarmCountSse", no);
	}

	// 알람 표시 여부
	public List<SseVo> alarmCount(Long no) {	

		return sqlSession.selectList("sse.alarmCount", no);
	}

	// 알람 초기화
	public boolean alarmReset(Long no) {
		
		return sqlSession.update("sse.alarmReset",no) == 1;
	}
	
	
	
	
	
	
	
	
	
}
