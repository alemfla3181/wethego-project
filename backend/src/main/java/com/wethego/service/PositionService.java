package com.wethego.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wethego.repository.PositionRepository;
import com.wethego.vo.PositionVo;

@Service
public class PositionService {

	
	@Autowired
	private PositionRepository positionRepository;
	
	// 직책명 및 사원수 조회
	public List<PositionVo> getpositionList() {
		return positionRepository.getAll();
	}

	// 직책명 변경
	public void updatePosition(PositionVo positionVo) {
		positionRepository.update(positionVo);
	}

	// 직책명 생성
	public void createPosition(PositionVo positionVo) {
		positionRepository.create(positionVo);
		
	}

	public void deletePosition(PositionVo positionVo) {
		positionRepository.delete(positionVo);
		
	}



}
