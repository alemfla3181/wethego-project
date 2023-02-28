package com.wethego.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wethego.dto.JsonResult;
import com.wethego.service.AttendanceService;
import com.wethego.vo.AttendanceVo;
import com.wethego.vo.DayoffVo;

//@Controller와 @ResponseBody을 합쳐둔 @RestController
@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

	@Autowired
	private AttendanceService attendanceService;

	/** Attendance List **/
	@GetMapping("")
	// body와 헤더 정보, 상태 코드 등을 담을 수 있는 ResponseEntity -> 일반 객체 뿐만 아니라 List,Map 등 다양한
	// 객체 전달 가능
	public ResponseEntity<JsonResult> index(
			@RequestParam(value = "userId", required = true, defaultValue = "") String userId,
			@RequestParam(value = "date", required = true, defaultValue = "") String date,
			@RequestParam(value = "name", required = true, defaultValue = "") String name) {
//		System.out.println(date +"/"+ userId + "/"+ name);
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(attendanceService.getattendanceList(userId, name, date)));
	}

	/** Attendance Modal **/
	@GetMapping("/{no}")
	public ResponseEntity<JsonResult> index(@PathVariable Long no) {
		AttendanceVo vo = attendanceService.getattendanceList(no);
//		System.out.println(vo);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(vo));
	}
	
	/** Attendance Modal을 통한 출퇴근 기록 수정 **/
	@PostMapping("/update")
	public ResponseEntity<JsonResult> update(@RequestBody AttendanceVo attendanceVo){
		if(attendanceVo.getOutTime() == "") {
			attendanceVo.setOutTime(null);
			attendanceService.updateAttendance(attendanceVo);
		} else
			attendanceService.updateAttendance(attendanceVo);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(attendanceVo));
	}
	
	/** Attendance 출퇴근 기록 삭제 **/
	@DeleteMapping("/{no}")
	public ResponseEntity<JsonResult> delete(@PathVariable Long no){
//		System.out.println(no);
		attendanceService.deleteAttendance(no);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(no));
	}
		
	// UserPage
	/** 출근 퇴근 지각 휴가 기록 조회 */
	@PostMapping("/show")
	public ResponseEntity<JsonResult> attendance(@RequestBody HashMap<String, Object> param){
//		System.out.println("param: "+ param);
		
		Long onCheck = attendanceService.ShowOn(param);
		Long offCheck = attendanceService.ShowOff(param);
		Long onTardy = attendanceService.ShowTardy(param);
		offCheck -= onCheck + onTardy;
		
		List<Object> list = new ArrayList<Object>();
		list.add(onCheck); // 출근
		list.add(offCheck); // 결근
		list.add(onTardy); // 지각
//		System.out.println(list);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(list));
	}	
	
	@PostMapping("/showDayOff")
	public ResponseEntity<JsonResult> dayoff(@RequestBody HashMap<String, Object> param){
		List<DayoffVo> list= attendanceService.ShowDayOff(param);
		
//		System.out.println(list);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(list));
	}	
	
	@PostMapping("/dateDayOff")
	public ResponseEntity<JsonResult> dateDayOff(@RequestBody HashMap<String, Object> param){
		List<DayoffVo> list= attendanceService.dateDayOff(param);
		
//		System.out.println(list);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(list));
	}	
	
	
	
	/** MainPage 출퇴근 기록 생성 **/
	@PostMapping("")
	public ResponseEntity<JsonResult> add(@RequestBody HashMap<String, Object> param){
//		System.out.println(param);
		attendanceService.addAttendance(param);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(true));
	}
	
	/** MainPage 해당일 출근 기록 조회 **/
	@PostMapping("/check")
	public ResponseEntity<JsonResult> checkToday(@RequestBody HashMap<String, Object> param){
		AttendanceVo vo = attendanceService.checkToday(param);
//		System.out.println("vo:" + vo);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(vo));
		
	}
	
	/** 출근시 퇴근기록 */
	@PostMapping("/off")
	public ResponseEntity<JsonResult> offwork(@RequestBody HashMap<String, Object> param){
//		System.out.println(param);
		attendanceService.offAttendance(param);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(true));
	}
	
	/** 출근시 특이근태 등록 */
	@PostMapping("/state")
    public ResponseEntity<JsonResult> updateState(@RequestBody HashMap<String, Object> param) {
//      System.out.println(param);
      attendanceService.updateState(param);
      return ResponseEntity
          .status(HttpStatus.OK)
          .body(JsonResult.success(true));
    }
	
	/** 한 주 조회 */
	@PostMapping("/weeks")
    public ResponseEntity<JsonResult> Weeks(@RequestBody HashMap<String, Object> param) {
      List<Map<String, String>> list = attendanceService.getWeeks(param);
//      System.out.println("list: "+list);
      return ResponseEntity
          .status(HttpStatus.OK)
          .body(JsonResult.success(list));
    }
	
	/** 팀별 주간 일정 조회 */
	@PostMapping("/team")
    public ResponseEntity<JsonResult> getTeamAtt(@RequestBody HashMap<String, Object> param) {
//      System.out.println("team"+param);
      List<Map<String, String>> list = attendanceService.getTeamAtt(param);
//      System.out.println("list"+list);
      return ResponseEntity
          .status(HttpStatus.OK)
          .body(JsonResult.success(list));
    }
	

	// User 출퇴근기록 Page
	/** 출퇴근,휴가,공휴일 기록 조회 **/
	@PostMapping("/userAttendance")
	public ResponseEntity<JsonResult> userAttendance(@RequestBody HashMap<String, Object> param) {
		List<Object> list = new ArrayList<>();
		list.addAll(attendanceService.getattendanceList(param));
		list.addAll(attendanceService.getvacationList(param));
		list.addAll(attendanceService.getholidayList(param));
//		System.out.println(attendanceService.getholidayList(param));
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(list));
	}
  
    /** 휴가 기록 조회 **/
	@PostMapping("/userVacation")
	public ResponseEntity<JsonResult> userVacation(@RequestBody HashMap<String, Object> param) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(attendanceService.getvacationList(param)));
	}
	
	/** 공휴일 기록 조회 **/
	@PostMapping("/userHoliday")
	public ResponseEntity<JsonResult> userHoliday(@RequestBody HashMap<String, Object> param) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(attendanceService.getholidayList(param)));
	}
	
}
