package com.wethego.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wethego.dto.JsonResult;
import com.wethego.service.ScheduleService;
import com.wethego.vo.ScheduleVo;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {
	
	@Autowired
	private ScheduleService scheduleService;
	
	/** 스케쥴 목록 **/
	@PostMapping("")
	public ResponseEntity<JsonResult> scheduleIndex(@RequestBody HashMap<String, Object> param) {
		
		List<Object> list = new ArrayList<>();
		
		list.addAll(scheduleService.getscheduleList(param));
		list.addAll(scheduleService.getscheduleHolidayList());
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(list));
	}
	
	/** 스케쥴 등록 **/
	@PostMapping("/add")
	public ResponseEntity<JsonResult> scheduleAdd(@RequestBody ScheduleVo scheduleVo) {
		scheduleService.addschedule(scheduleVo);
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(scheduleVo));
	}
	
	@GetMapping("/{no}")
	public ResponseEntity<JsonResult> scheduleIndex(@PathVariable Long no) {
		ScheduleVo schedulVo = scheduleService.getscheduleInfo(no);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(schedulVo));
	}
	
	@PostMapping("/update")
	public ResponseEntity<JsonResult> scheduleUpdate(@RequestBody ScheduleVo scheduleVo) {
		/** Event Drag시 작동 START **/
		String content = scheduleVo.getContent();
		if(content == null) {
			String endDate = scheduleVo.getEndDate();
			endDate =endDate.substring(0,10).replaceAll("-", "");
			
			int intEndDate = Integer.parseInt(endDate);
			intEndDate = intEndDate-1;
			
			String strEndDate = Integer.toString(intEndDate);
			strEndDate = strEndDate.substring(0,4) + "-" + strEndDate.substring(4,6) + "-" + strEndDate.substring(6,strEndDate.length());
			
			scheduleVo.setStartDate(scheduleVo.getStartDate().substring(0,10));
			scheduleVo.setEndDate(strEndDate);
			
			scheduleService.dragUpdateSchedule(scheduleVo);
		}
		/** Event Drag시 작동 END **/
		else
			scheduleService.updateschedule(scheduleVo);
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(scheduleVo));
	}
	
	@DeleteMapping("/{no}")
	public ResponseEntity<JsonResult> delete(@PathVariable Long no){
		scheduleService.deleteschedule(no);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(no));
	}
	
	@PostMapping("/today")
	public ResponseEntity<JsonResult> scheduleToday(@RequestBody ScheduleVo param) {
		
		ScheduleVo scheduleVo = param;
		List<ScheduleVo> list = new ArrayList<>();
		for(int i=1; i<6;i++) {
			scheduleVo.setLevel(i);
			list.addAll(scheduleService.getscheduleToday(scheduleVo));
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(list));
	}
}
