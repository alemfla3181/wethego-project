package com.wethego.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wethego.repository.AttendanceRepository;
import com.wethego.vo.AttendanceVo;
import com.wethego.vo.DayoffVo;

@Service
public class AttendanceService {

	@Autowired
	private AttendanceRepository attendanceRepository;

	public Map<String, Object> getattendanceList(String userId, String name, String date) {

		// 1. 페이징을 위한 기본 데이터 전체 개수 계산
		int totalCount = attendanceRepository.getTotalCount(userId, name, date);

		// 2. 리스트 가져오기
		List<AttendanceVo> list = attendanceRepository.getAll(userId, name, date);

		// 3. 리스트 정보를 맵에 저장
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("totalCount", totalCount);

		return map;
	}

	public AttendanceVo getattendanceList(Long no) {
		return attendanceRepository.getOne(no);
	}

	public void updateAttendance(AttendanceVo attendanceVo) {
		attendanceRepository.update(attendanceVo);
	}

	public void deleteAttendance(Long no) {
		attendanceRepository.delete(no);
	}

	// UserPage
	public Long ShowOn(HashMap<String, Object> param) {
		return attendanceRepository.ShowOn(param);
	}

	public Long ShowOff(HashMap<String, Object> param) {
		return attendanceRepository.ShowOff(param);
	}

	public Long ShowTardy(HashMap<String, Object> param) {
		return attendanceRepository.ShowTardy(param);
	}

	public List<DayoffVo> ShowDayOff(HashMap<String, Object> param) {
		return attendanceRepository.ShowDayOff(param);
	}
	
	public List<DayoffVo> dateDayOff(HashMap<String, Object> param) {
		return attendanceRepository.dateDayOff(param);
	}

	public boolean addAttendance(HashMap<String, Object> param) {
		return attendanceRepository.add(param);
	}

	public AttendanceVo checkToday(HashMap<String, Object> param) {
		return attendanceRepository.checkToday(param);
	}

	public void offAttendance(HashMap<String, Object> param) {
		attendanceRepository.updateOff(param);
	}

	public void updateState(HashMap<String, Object> param) {
		attendanceRepository.updateState(param);
	}

	public List<Map<String, String>> getWeeks(HashMap<String, Object> param) {
		return attendanceRepository.getWeeks(param);
	}
	
	public List<Map<String, String>> getTeamAtt(HashMap<String, Object> param) {
		return  attendanceRepository.getTeamAtt(param);
	}
	
	/** 유저페이지 출퇴근기록 **/
	public List<AttendanceVo> getattendanceList(HashMap<String, Object> param) {
		return attendanceRepository.getAll(param);
	}

	public List<AttendanceVo> getvacationList(HashMap<String, Object> param) {
		System.out.println(param);
		return attendanceRepository.getAll2(param);
	}

	public List<AttendanceVo> getholidayList(HashMap<String, Object> param) {
		return attendanceRepository.getAll3(param);
	}




}
