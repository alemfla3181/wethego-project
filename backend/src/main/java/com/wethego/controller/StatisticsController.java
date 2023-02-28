package com.wethego.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wethego.dto.JsonResult;
import com.wethego.service.StatisticsService;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {

	@Autowired
	private StatisticsService statisticsService;
	
	
	@GetMapping("")
	public void test() {
		System.out.println("잘 들어옵니다.");
	}
	
	
	
	
	
	
	
	// 유저 번호 기준 한 달 평균 근로 시간
	@GetMapping("/avg")
	public ResponseEntity<JsonResult> avg(
			@RequestParam(value="userNo") Long no
		) {
		
		// no랑 지금 싱크 안맞아요 xml 파일 수정 필요
//		System.out.println(no); // 확인용으로 삭제 요망
		
		System.out.println(statisticsService.avg(no)); // 확인용으로 삭제 요망
		return ResponseEntity.status(HttpStatus.OK)
		.body(JsonResult.success(statisticsService.avg(no)));

	}
	
	
	
	// 조회 년/월 해당 유저의 근무 일수
	@GetMapping("/workCount")
	public ResponseEntity<JsonResult> workCount(
			
			@RequestParam(value="year") String year,
			@RequestParam(value="month") String month,
			@RequestParam(value="userNo") Long no
		) {
//		System.out.println(year+"년"+month+"월 "+"유저 번호 "+no); // 확인용으로 삭제 요망
		
		return ResponseEntity.status(HttpStatus.OK)
		.body(JsonResult.success(statisticsService.getWorkCount(year,month)));

	}
	
	
	
	// 유저의 해당 월의 날짜별 근로시간 조회 (아직 직원 번호 안받음) - 일단 완료
	@GetMapping("/workHours")
	public ResponseEntity<JsonResult> workHours(
			
			@RequestParam(value="year") String year,
			@RequestParam(value="month") String month,
			@RequestParam(value="userNo") Long no
		) {

		return ResponseEntity.status(HttpStatus.OK)
		.body(JsonResult.success(statisticsService.getWorkHours(year,month)));

	}
	
	
	// 소정 근로 일수 및 해당 월 일수 - 완료
	@GetMapping("/contract")
	public ResponseEntity<JsonResult> contract(
			@RequestParam(value="year") String year,
			@RequestParam(value="month") String month
		) {
		
		
		return ResponseEntity.status(HttpStatus.OK)
		.body(JsonResult.success(statisticsService.getContract(year,month)));
	}
	
	
//	@GetMapping()
//	public ResponseEntity<JsonResult> index(
//			@RequestParam(value="ListType") String listType
//			) {
//
//
//		return ResponseEntity.status(HttpStatus.OK)
//				.body(JsonResult.success(boardService.getBoardList(listType)));
//		
//	}
	
	

	
	
	
	
	
	//===================================완료된 항목============================
	
	
	

	
	
	
	
	
	
}
