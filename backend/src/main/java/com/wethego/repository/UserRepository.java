package com.wethego.repository;

import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.wethego.vo.EmployeesVo;

@Repository
public class UserRepository {

	@Autowired
	private SqlSession sqlSession;	

	public EmployeesVo finByIdAndPassword(EmployeesVo vo) {
		return sqlSession.selectOne("user.finByIdAndPassword", vo);
	}

	public void setLog(EmployeesVo vo) {
		System.out.println("log!!!"+vo);
		sqlSession.insert("user.setLog", vo);
		
	}
	
}
