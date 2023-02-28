package com.wethego.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.wethego.vo.PositionVo;

@Repository
public class PositionRepository {
	
	@Autowired
	private SqlSession sqlSession;

	//직책명 및 사원수 조회
	public List<PositionVo> getAll() {

//		List<PositionVo> list = sqlSession.selectList("position.findAll");
//		for(int i = 0 ; i < list.size() ; i++ ) {
//			list.get(i).setNo(i+1);
//		}
		
		return sqlSession.selectList("position.findAll");
	}

	// 직책명 변경
	public Boolean update(PositionVo positionVo) {
		
		//문자열로 처리해줘야 sql이 인식해서 부수작업을 추가해주었다.
		positionVo.setPName("'"+positionVo.getPName()+"'");
	
		return 1 == sqlSession.update("position.update", positionVo);
	}

	// 직책명 생성
	public boolean create(PositionVo positionVo) {

		//문자열로 처리해줘야 sql이 인식해서 부수작업을 추가해주었다.
		positionVo.setPName("'"+positionVo.getPName()+"'");
		
		return sqlSession.insert("position.insert", positionVo) == 1;	
	}

	public boolean delete(PositionVo positionVo) {
		
		//문자열로 처리해줘야 sql이 인식해서 부수작업을 추가해주었다.
		positionVo.setPName("'"+positionVo.getPName()+"'");

		return sqlSession.delete("position.delete", positionVo) == 1;
	}
	
	


}
