package com.wethego.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wethego.dto.JsonResult;
import com.wethego.repository.EmployeesRepository;

import com.wethego.service.UserService;
import com.wethego.vo.EmployeesVo;

@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	EmployeesRepository employeesRepository;

	@Autowired
	UserService userService;

	@GetMapping("/error")
	public ResponseEntity<JsonResult> error() {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.fail("loginError!"));
	}

	// 로그인시에 세션 정보를 가져와서 프론트로 보냄
	@GetMapping("/")
	public ResponseEntity<JsonResult> index(HttpSession session) {
		EmployeesVo authUser = (EmployeesVo) session.getAttribute("authUser");
//		System.out.println("authUser:" + authUser);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(authUser));
	}

}
