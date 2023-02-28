package com.wethego.controller;

import java.sql.SQLIntegrityConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wethego.dto.JsonResult;
import com.wethego.service.DepartmentService;
import com.wethego.vo.DepartmentVo;

@RestController
@RequestMapping("/api/department")
public class DepartmentController {

	@Autowired
	private DepartmentService departmentService;
	
	@GetMapping("")
	public ResponseEntity<JsonResult> index() {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(departmentService.getdepartmentList()));
	}
	
	@GetMapping("/joinlist")
	public ResponseEntity<JsonResult> joinlist() {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(departmentService.getjoinList()));
	}
	
	@GetMapping("/{no}")
	public ResponseEntity<JsonResult> detail(@PathVariable Long no) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(departmentService.getdetailList(no)));
	}
	
	@PostMapping("/add")
	public ResponseEntity<JsonResult> add(@RequestBody DepartmentVo vo){
		departmentService.adddepartment(vo);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(vo));
	}
	
	@ExceptionHandler(SQLIntegrityConstraintViolationException.class)
	@DeleteMapping("/{no}")
	public ResponseEntity<JsonResult> delete(@PathVariable Long no){
		departmentService.deletedepartment(no);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(no));
	}
	
}
