package com.wethego.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wethego.repository.EmployeesRepository;
import com.wethego.vo.EmployeesVo;

@Service
public class EmployeesService {
	
	@Autowired
	private EmployeesRepository employeesRepository;
	
	public List<EmployeesVo> getemployeesList() {
		return employeesRepository.getAll();
	}

	public EmployeesVo getemployeesList(Long no) {
		return employeesRepository.getOne(no);
	}

	public Boolean addEmployees(EmployeesVo vo) {
		return employeesRepository.signUp(vo);
	}

	public boolean resetPwd(EmployeesVo vo) {
		return employeesRepository.resetPwd(vo);
	}

	public boolean delete(Long no) {
		return employeesRepository.delete(no);
	}

	public boolean modifyEmployees(EmployeesVo vo) {
		return employeesRepository.modify(vo);
	}
	
	// UserPage
	public EmployeesVo getemployees(EmployeesVo vo) {
		return employeesRepository.getOne(vo);
	}	
	
	public boolean modifyselfEmployees(EmployeesVo vo) {
		return employeesRepository.modifyself(vo);
	}

	// 조직도 - 직원 정보 + 직책명 + 부서명 및 팀명 조회
	public List<EmployeesVo> getOrganizationList() {
		
		return employeesRepository.getOrganizationList();
	}

	public Long getCheckId(String userId) {
		return employeesRepository.getCheckId(userId);
	}
	
}
