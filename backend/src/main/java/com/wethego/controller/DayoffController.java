 package com.wethego.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.wethego.dto.JsonResult;
import com.wethego.service.DayoffService;
import com.wethego.vo.AttendanceVo;
import com.wethego.vo.DayoffVo;
import com.wethego.vo.VacationVo;

@Controller
@RequestMapping("/api/dayoff")
public class DayoffController {

	@Autowired
	private DayoffService dayoffService;
	
	@GetMapping("/{no}")
    public ResponseEntity<JsonResult> index(@PathVariable Long no) {
      List<DayoffVo> list = dayoffService.getdayoffList(no);
//      System.out.println(list);
      return ResponseEntity
          .status(HttpStatus.OK)
          .body(JsonResult.success(list));
    }
  
	/** MainPage 팀별 휴가내역 조회 */
    @PostMapping("/team")
	public ResponseEntity<JsonResult> getTeamVac(@RequestBody HashMap<String, Object> param) {
//    	System.out.println(param);
		List<VacationVo> list = dayoffService.getTeamVacation(param);
//		System.out.println("vacation :"+list);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(list));
	}	
    
	@GetMapping("/vacation")
	public ResponseEntity<JsonResult> index() {
		List<VacationVo> list = dayoffService.getvacationList();
		
//		System.out.println(list);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(list));
	}
    
    
	
	@GetMapping("/vacation/{no}")
	public ResponseEntity<JsonResult> vcindex(@PathVariable Long no) {
		List<VacationVo> list = dayoffService.getvacationList(no);
		
//		System.out.println(list);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(list));
	}
	
	@PostMapping("/vacation")
	public ResponseEntity<JsonResult> add(@RequestBody VacationVo vo) {
		
		// // departmentNo추가 
		
		dayoffService.addVacation(vo);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(vo));
	}
	
	@GetMapping("/vacation/delete/{no}")
    public ResponseEntity<JsonResult> delete(@PathVariable Long no) {

      dayoffService.delete(no);
      return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(no));
    }
	
    @GetMapping("/vacation/request/{no}")
    public ResponseEntity<JsonResult> requestList(@PathVariable Long no) {      
      List<VacationVo> list = dayoffService.requestList(no);      
//      System.out.println(list);
      return ResponseEntity
          .status(HttpStatus.OK)
          .body(JsonResult.success(list));
    }
    
    /** 휴가 승인 */
    @PostMapping("/vacation/request/confirm")
      public ResponseEntity<JsonResult> vacConfirm(@RequestBody HashMap<String, Object> param) {
        dayoffService.vacConfirm(param);
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(JsonResult.success(true));
      }
    
    /** 휴가 반려 */
    @PostMapping("/vacation/request/refer")
    public ResponseEntity<JsonResult> vacRefer(@RequestBody HashMap<String, Object> param) {
      dayoffService.vacRefer(param);
      return ResponseEntity
          .status(HttpStatus.OK)
          .body(JsonResult.success(param));
  }
    
    /** Admin 휴가 게시판 List **/
    @GetMapping("")
	public ResponseEntity<JsonResult> adminIndex(@RequestParam(value = "userId", required = true, defaultValue = "") String userId,
			@RequestParam(value = "date", required = true, defaultValue = "") String date,
			@RequestParam(value = "name", required = true, defaultValue = "") String name) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(dayoffService.getvactionList(userId, name, date)));
	}
    
	/** Adin 휴가 게시판 기록 삭제 **/
	@DeleteMapping("/{no}")
	public ResponseEntity<JsonResult> deleteVacation(@PathVariable Long no){
		dayoffService.deleteVacation(no);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(no));
	}
	
	/** Admin 연차 게시판 List **/
    @GetMapping("/set")
	public ResponseEntity<JsonResult> adminDayoffIndex(@RequestParam(value = "userId", required = true, defaultValue = "") String userId,
			@RequestParam(value = "name", required = true, defaultValue = "") String name) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(dayoffService.getdayoffList(userId, name)));
	}
    
	/** dayoff update Modal **/
	@GetMapping("/set/{no}")
	public ResponseEntity<JsonResult> adminDayoffIndex(@PathVariable Long no) {
		DayoffVo dayoffVo = dayoffService.getdayoffAdminList(no);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(dayoffVo));
	}
    
	/** dayoff Modal을 통한 연차 기록 수정 **/
	@PostMapping("/set/update")
	public ResponseEntity<JsonResult> update(@RequestBody DayoffVo dayoffVo){
		System.out.println(dayoffVo);
		dayoffService.updateDayoff(dayoffVo);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(dayoffVo));
	}
      
}
