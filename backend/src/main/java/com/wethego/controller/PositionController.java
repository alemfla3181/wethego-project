package com.wethego.controller;

import java.sql.SQLIntegrityConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wethego.dto.JsonResult;
import com.wethego.service.PositionService;
import com.wethego.vo.PositionVo;

@RestController
@RequestMapping("/api/position")
public class PositionController {

	@Autowired
	private PositionService positionService;
	
	
	// 직책명 및 해당 직책별 사원 수 조회  <R>
	@GetMapping("")
	public ResponseEntity<JsonResult> index() {
		//System.out.println(positionService.getpositionList()); 확인용이므로 삭제 필요
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(positionService.getpositionList()));
	}

	// 직책명 생성  <C>
	@ExceptionHandler(SQLIntegrityConstraintViolationException.class)
	@PostMapping("/create")
	public void create(@RequestBody PositionVo positionVo ) {
		System.out.println( positionVo ); //확인용이므로 삭제 필요
	

		positionService.createPosition(positionVo);

	}
	
	// 직책명 변경  <U>
	@PostMapping("/update")
	public void update(@RequestBody PositionVo positionVo ) {
		System.out.println( positionVo ); //확인용이므로 삭제 필요
		
		positionService.updatePosition(positionVo);
	}
	
	
	// 직책명 삭제  <D>
	@PostMapping("/delete")
	public void delete(@RequestBody PositionVo positionVo ) {
		//System.out.println( positionVo ); //확인용이므로 삭제 필요
	
		
		positionService.deletePosition(positionVo);
	}
	
}
