package com.wethego.controller;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wethego.dto.JsonResult;
import com.wethego.service.DayoffService;
import com.wethego.service.EmployeesService;
import com.wethego.service.FileUploadService;
import com.wethego.vo.DayoffVo;
import com.wethego.vo.EmployeesVo;

@Controller
@RequestMapping("/api/employees")
public class EmployeesController {

	
	@Autowired
	private DayoffService dayoffService;
	
	@Autowired
	private EmployeesService employeesService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private FileUploadService fileUploadService;
	
	@GetMapping("")
	public ResponseEntity<JsonResult> index() {
		List<EmployeesVo> list = employeesService.getemployeesList();
//		System.out.println(list);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(list));
	}	
	
	@GetMapping("/{no}")
	public ResponseEntity<JsonResult> index(@PathVariable Long no) {
		EmployeesVo vo = employeesService.getemployeesList(no);
//		System.out.println(vo);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(vo));
	}	
	
	@PostMapping("/signup")
	public ResponseEntity<JsonResult> add(@RequestBody EmployeesVo vo) {
		String rawPw = vo.getUserPw();
		String encPw = bCryptPasswordEncoder.encode(rawPw);
		vo.setUserPw(encPw);
		employeesService.addEmployees(vo); // 얘는 이대로 끝나고
		//----------------------------
		
		DayoffVo dayoffVo = new DayoffVo();
		dayoffService.createDayoff(dayoffVo);
		
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(vo));
	}
	
	@PostMapping("/reset")
	public ResponseEntity<JsonResult> reset(@RequestBody EmployeesVo vo) {
		String rawPw = vo.getUserId();
		String encPw = bCryptPasswordEncoder.encode(rawPw);
		vo.setUserPw(encPw);
		employeesService.resetPwd(vo);
//		System.out.println(vo);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(vo));
	}	
	
	@ExceptionHandler(SQLIntegrityConstraintViolationException.class)
	@GetMapping("/delete/{no}")
	public ResponseEntity<JsonResult> delete(@PathVariable Long no) {
//		System.out.println(no);
		employeesService.delete(no);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(no));
	}
	
	@PostMapping("/modify")
	public ResponseEntity<JsonResult> modify(@RequestBody EmployeesVo vo) {
		System.out.println(vo);
		employeesService.modifyEmployees(vo);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(vo));
	}	
	
	// UserPage
	@PostMapping("")
	public ResponseEntity<JsonResult> index(@RequestBody EmployeesVo vo) {
		vo = employeesService.getemployees(vo);
		vo.setUserPw(null);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(vo));
	}
	
	/** 프로필 정보 수정 */
	@PostMapping(value="/modifyself")
	public ResponseEntity<JsonResult> modifyself(
			@RequestParam(value="vo", required=true) String param,
			@RequestParam(value="img", required=false) MultipartFile img			
			) throws JsonMappingException, JsonProcessingException, FileUploadException {
		ObjectMapper mapper = new ObjectMapper();	
		
		EmployeesVo vo = mapper.readValue(param, EmployeesVo.class);
		if(img != null) {
			vo.setProfileUrl(fileUploadService.restoreFile(img));
			System.out.println(img);
		}
//		System.out.println("vo"+vo);

		if(vo.getUserPw() != "") {
			String rawPw = vo.getUserPw();
			String encPw = bCryptPasswordEncoder.encode(rawPw);
			vo.setUserPw(encPw);
		}
		employeesService.modifyselfEmployees(vo);
		
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(vo));
	}	
	
	// 아이디 중복 체크
	@PostMapping("/getCheckId")
	public ResponseEntity<JsonResult> getCheckId(@RequestBody EmployeesVo vo) {
		String userId = vo.getUserId();
		Long num = employeesService.getCheckId(userId);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(num));
	}
}
