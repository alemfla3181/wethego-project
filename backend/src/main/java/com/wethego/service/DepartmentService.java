package com.wethego.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wethego.repository.DepartmentRepository;
import com.wethego.vo.DepartmentVo;

@Service
public class DepartmentService {
	
	@Autowired
	private DepartmentRepository departmentRepository;

	public List<DepartmentVo> getdepartmentList() {
		return departmentRepository.getAll();
	}
	
	public List<DepartmentVo> getjoinList() {
		return departmentRepository.getjoinAll();
	}
		
	public List<DepartmentVo> getdetailList(Long no) {
		return departmentRepository.getDetail(no);
	}
	
	public void adddepartment(DepartmentVo vo) {
		departmentRepository.add(vo);
	}

	public Boolean deletedepartment(Long no) {
		return departmentRepository.delete(no);
	}
	
}
