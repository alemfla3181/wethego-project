package com.wethego.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wethego.repository.BoardRepository;
import com.wethego.vo.BoardVo;
import com.wethego.vo.VacationVo;

@Service
public class BoardService {

	@Autowired
	private BoardRepository boardRepository;

	
	// 게시글 조회
	public List<BoardVo> getBoardList(String listType) {
		
		return boardRepository.getAll(listType);
	}
	
	// 부서명 조회
	public Object getDptList() {

		return boardRepository.getDptList();
	}
	
	

	// 게시글 검색 - 글제목
	public List<BoardVo> searchListByTitle(String keyword) {
		
		return boardRepository.searchAllByTitle(keyword);
	}
	
	// 게시글 검색 - 작성자
	public List<BoardVo> searchListByName(String keyword) {
		
		return boardRepository.searchAllByName(keyword);
	}
	
	// 게시글 생성
	public Object createBoard(BoardVo boardVo) {
		
		return boardRepository.create(boardVo);
	}

	// 게시글 삭제
	public Object deleteBoard(BoardVo boardVo) {
		
		return boardRepository.delete(boardVo);
	}

	// 게시글 수정
	public Object updateBoard(BoardVo boardVo) {

		return boardRepository.updateBoard(boardVo);
	}
	
	// 부서별 공지사항 조회
	public List<VacationVo> getTeamBoard(Long no) {
		return boardRepository.getTeamBoard(no);
	}

	// 게시글 카운트 증가
	public Object updateCount(Long no) {
		
		return boardRepository.updateCount(no);
	}





	
}
