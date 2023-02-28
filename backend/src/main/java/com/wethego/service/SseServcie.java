package com.wethego.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wethego.repository.SseRepository;
import com.wethego.vo.SseVo;

@Service
public class SseServcie {
	@Autowired
	private SseRepository sseRepository;

	public List<SseVo> getPending(Long no) {
		return sseRepository.getAll(no);
	}
	
	public void updateSse1(Long no) {
		sseRepository.update(no);
	}

	public SseVo countSse1(Long no) {
		return sseRepository.getAll2(no);
	}

	// 알람 표시여부
	public List<SseVo> alarmCount(Long no) {
		
		return sseRepository.alarmCount(no);
	}

	// 알람 초기화 
	public void alarmReset(Long no) {

		sseRepository.alarmReset(no);
	}
	
	
	
	
	
}
