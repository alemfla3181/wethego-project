package com.wethego.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.wethego.vo.BoardVo;
import com.wethego.vo.VacationVo;

@Repository
public class BoardRepository {

	@Autowired
	private SqlSession sqlSession;

	// 게시글 조회
	public List<BoardVo> getAll(String listType) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("listType", listType );
		
		System.out.println(map);
		return sqlSession.selectList("board.findAll", map);
		
	}

	
	// 부서명 조회
	public Object getDptList() {

		return sqlSession.selectList("board.findDptList");
	}

	// 게시글 검색 - 글제목
	public List<BoardVo> searchAllByTitle(String keyword) {
		
		//문자열로 처리해주어야 해서 부수적 작접을 추가했다.
		String word = "\"" + keyword + "\"";
		
		return sqlSession.selectList("board.searchByTitle", word);
	}
	
	// 게시글 검색 - 작성자
	public List<BoardVo> searchAllByName(String keyword) {
		
		//문자열로 처리해주어야 해서 부수적 작접을 추가했다.
		String word = "\"" + keyword + "\"";
		
		return sqlSession.selectList("board.searchByName", word);
	}	
	
	// 게시글 생성
	public boolean create(BoardVo boardVo) {
		
//		//문자열로 처리해줘야 sql이 인식해서 부수작업을 추가해주었다.
//		boardVo.setTitle("'"+boardVo.getTitle()+"'");
//		boardVo.setContents("'"+boardVo.getContents()+"'");
//		boardVo.setFileUrl("'"+boardVo.getFileUrl()+"'");
//		boardVo.setFileName("'"+boardVo.getFileName()+"'");
//		boardVo.setForm("'"+boardVo.getForm()+"'");


		
		
		return sqlSession.insert("board.insert", boardVo) == 1;
		
	}

	public boolean delete(BoardVo boardVo) {

		return sqlSession.delete("board.delete", boardVo ) == 1;
	}

	// 
    public List<VacationVo> getTeamBoard(Long no) {
      return sqlSession.selectList("board.getTeamBoard", no);
    }

  	// 카운트 증가
	public boolean updateCount(Long no) {
		
		return sqlSession.update("board.updateCount", no ) == 1;
	}

	public boolean updateBoard(BoardVo boardVo) {

		System.out.println("레파지 넘어옴");
		System.out.println(boardVo);
		
		
//		return true;
		
		return sqlSession.update("board.updateBoard", boardVo ) == 1;
	}

	

	

}
