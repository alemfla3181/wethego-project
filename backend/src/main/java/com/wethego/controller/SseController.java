package com.wethego.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.wethego.dto.JsonResult;
import com.wethego.service.SseServcie;
import com.wethego.vo.SseVo;

@RestController
@RequestMapping("/api/sse")
public class SseController {
	
	@Autowired
	private SseServcie sseServcie;


    @GetMapping(value = "/{no}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    
    public SseEmitter pending(@PathVariable Long no) {
    	SseEmitter sseEmitter = new SseEmitter();
        try { 
        	List<SseVo> list = new ArrayList<SseVo>();
            list.addAll(sseServcie.getPending(no));
            
            System.out.println(list);
			sseEmitter.send(list);
			sseEmitter.complete();
		} catch (IOException e) {
			sseEmitter.completeWithError(e);
		}
        return sseEmitter;
    }
    
	/** 알람 읽음 처리 **/
	@GetMapping("/update/{no}")
	public ResponseEntity<JsonResult> update(@PathVariable Long no){
		sseServcie.updateSse1(no);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(no));
	}
	
	/** 알람 카운트 처리 **/
	@GetMapping("/count/{no}")
	public ResponseEntity<JsonResult> count(@PathVariable Long no){
		SseVo sseVo = sseServcie.countSse1(no); 
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(sseVo));
	}
	
	
	//알람 표시 여부
	@GetMapping(value="/alarm/{no}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter alram(@PathVariable Long no) throws InterruptedException {
    	SseEmitter sseEmitter = new SseEmitter();
        try { 
        	
        	System.out.println(no);
        	
        	List<SseVo> list = new ArrayList<SseVo>();
            list.addAll(sseServcie.alarmCount(no));
            
           
            sseEmitter.send(list.size());
			sseEmitter.complete();
		} catch (IOException e) {
			sseEmitter.completeWithError(e);
		}
        return sseEmitter;
    }
	
	
	// 알람 초기화
	@GetMapping(value="/alarm/reset/{no}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public void reset(@PathVariable Long no) {
		

//		System.out.println(no);
		sseServcie.alarmReset(no);
	}

}