package com.wethego.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wethego.repository.StatisticsRepository;

@Service
public class StatisticsService {
	
	@Autowired
	private StatisticsRepository statisticsRepository;

	// 소정 근로 일수 및 해당 월 일수
	public Map<String, Object> getContract(String year, String month) {
		
		return statisticsRepository.getContract(year,month);
	}
	
	//유저의 해당 월의 날짜별 근로시간 조회
	public List<Map<String, Object>> getWorkHours(String year, String month) {
		
		return statisticsRepository.getWorkHours(year, month);
	}

	// 조회 년/월 해당 유저의 근무 일수
	public Object getWorkCount(String year, String month) {
		
		return statisticsRepository.getWorkCount(year,month);
	}

	// 유저 번호 기준 한 달 평균 근로 시간 
	public Object avg(Long no) {
		
		return statisticsRepository.avg(no);
	}
	

}
