package com.wethego.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wethego.repository.ScheduleRepository;
import com.wethego.vo.AttendanceVo;
import com.wethego.vo.ScheduleVo;

@Service
public class ScheduleService {
	@Autowired
	private ScheduleRepository scheduleRepository;

	public List<ScheduleVo> getscheduleList(HashMap<String, Object> param) {
		return scheduleRepository.getAll(param);
	}

	public boolean addschedule(ScheduleVo scheduleVo) {
		return scheduleRepository.add(scheduleVo);
	}

	public ScheduleVo getscheduleInfo(Long no) {
		return scheduleRepository.getOne(no);
	}

	public boolean updateschedule(ScheduleVo scheduleVo) {
		return scheduleRepository.update(scheduleVo);
	}
	
	public boolean dragUpdateSchedule(ScheduleVo scheduleVo) {
		return scheduleRepository.dragUpdate(scheduleVo);
	}

	public void deleteschedule(Long no) {
		scheduleRepository.delete(no);
	}

	public List<ScheduleVo> getscheduleHolidayList() {
		return scheduleRepository.getAll();
	}

	public List<ScheduleVo> getscheduleToday(ScheduleVo scheduleVo) {
		return scheduleRepository.getAll(scheduleVo);
	}



}
