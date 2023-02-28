package com.wethego.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.wethego.dto.JsonResult;
import com.wethego.repository.EmployeesRepository;
import com.wethego.service.EmployeesService;
import com.wethego.service.UserService;
import com.wethego.vo.EmployeesVo;

@Controller
@RequestMapping("/api/organization")
public class OrganizationController {

	@Autowired
	private EmployeesService employeesService;
	
	// 	직원 번호
	// 	@RequestParam(value="user") Long no	
	
//	@GetMapping("")
//	public ResponseEntity<JsonResult> index() {
//		List<EmployeesVo> list = employeesService.getemployeesList();
//		System.out.println(list);
//		return ResponseEntity
//				.status(HttpStatus.OK)
//				.body(JsonResult.success(list));
//	}	
	
	
	// 직원 정보 + 직책명 + 부서명 및 팀명 조회
	@GetMapping("/getList")
	public ResponseEntity<JsonResult> index(
		) {
	
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(employeesService.getOrganizationList()));
	}
	


}
