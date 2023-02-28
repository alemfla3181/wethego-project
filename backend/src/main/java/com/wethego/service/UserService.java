package com.wethego.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wethego.repository.UserRepository;
import com.wethego.vo.EmployeesVo;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;	
	
	public EmployeesVo getUser(String id, String password) {
		EmployeesVo vo = new EmployeesVo();
		vo.setUserId(id);
		vo.setUserPw(password);
		return getUser(vo);
	}	
	
	public EmployeesVo getUser(EmployeesVo vo) {
		return userRepository.finByIdAndPassword(vo);
	}

	public void setLog(EmployeesVo vo) {
		userRepository.setLog(vo);
	}
	
//	public void updateUser(UserVo vo) {
//		userRepository.update(vo);
//	}	


}
