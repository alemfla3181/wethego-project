package com.wethego.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.wethego.vo.DepartmentVo;

@Repository
public class DepartmentRepository {
	@Autowired
	private SqlSession sqlSession;	
	
	public List<DepartmentVo> getAll() {
		return sqlSession.selectList("department.findAll");
	}
	
	public List<DepartmentVo> getjoinAll() {
		return sqlSession.selectList("department.findjoinAll");
	}
	
	public List<DepartmentVo> getDetail(Long no) {
		return sqlSession.selectList("department.findDetail", no);
	}
	
	public Boolean add(DepartmentVo vo) {
		return 1 == sqlSession.insert("department.insert", vo);
	}

	public Boolean delete(Long no) {
		return 1 == sqlSession.delete("department.delete", no);
	}

}
