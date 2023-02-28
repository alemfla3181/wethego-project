package com.wethego.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.wethego.vo.EmployeesVo;

@Repository
public class EmployeesRepository {
	@Autowired
	private SqlSession sqlSession;

	public List<EmployeesVo> getAll() {
		return sqlSession.selectList("employees.findAll");
	}

	public EmployeesVo getOne(Long no) {
		return sqlSession.selectOne("employees.findOne", no);
	}

	public boolean signUp(EmployeesVo vo) {
		boolean result = sqlSession.insert("employees.signUp", vo) == 1; 
		return result;
	}
	
	public boolean resetPwd(EmployeesVo vo) {
		return sqlSession.update("employees.resetPwd", vo) == 1;
	}

	public boolean delete(Long no) {
		return sqlSession.delete("employees.delete", no) == 1;
	}

	public boolean modify(EmployeesVo vo) {
		boolean result = sqlSession.update("employees.modify", vo) == 1; 
		return result;
	}
	
	// UserPage	
	public EmployeesVo getOne(EmployeesVo vo) {
		return sqlSession.selectOne("employees.findOneByUserId", vo);
	}

	public EmployeesVo findById(String userId) {
		EmployeesVo vo = new EmployeesVo();
		vo.setUserId(userId);
		return getOne(vo);
	}
	
	public boolean modifyself(EmployeesVo vo) {
		boolean result = sqlSession.update("employees.modifyself", vo) == 1; 
		return result;
	}

	// 조직도 - 직원 정보 + 직책명 + 부서명 및 팀명 조회
	public List<EmployeesVo> getOrganizationList() {
		
		return sqlSession.selectList("employees.getOrganizationList");
	}

	public Long getCheckId(String userId) {
		return sqlSession.selectOne("employees.getCheckId", userId);
	}
	
}
