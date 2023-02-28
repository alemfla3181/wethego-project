package com.wethego.controller;

import java.util.List;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wethego.dto.JsonResult;
import com.wethego.service.BoardService;
import com.wethego.service.FileDownloadService;
import com.wethego.service.FileUploadService;
import com.wethego.vo.BoardVo;
import com.wethego.vo.VacationVo;

@RestController
@RequestMapping("/api/board")
public class BoardController {

	@Autowired
	private BoardService boardService;
	
	@Autowired
	private FileUploadService fileUploadService;
	
	@Autowired
	private FileDownloadService fileDownloadService;
	
	
	// 게시판 글 내용들 조회 <R> 
	@GetMapping()
	public ResponseEntity<JsonResult> index(
			@RequestParam(value="ListType") String listType
			) {

		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(boardService.getBoardList(listType)));
		
	}
	
	// 부서명 조회 <R>
	@GetMapping("/dpt")
	public ResponseEntity<JsonResult> index(
			) {

		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(boardService.getDptList()));
		
	}
	

	// 게시판 글 내용들 조회 <R> - Search - 글 제목 기준
	@GetMapping("/searchTitle")
	public ResponseEntity<JsonResult> searchTitle( @RequestParam(value ="keyword") String keyword) {
		//System.out.println(keyword); //데이터 확인용으로 삭제요망
		
		System.out.println("글제목검색");
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(boardService.searchListByTitle(keyword)));
		
	}
	
	// 게시판 글 내용들 조회 <R> - Search - 작성자 기준
	@GetMapping("/searchName")
	public ResponseEntity<JsonResult> searchName( @RequestParam(value ="keyword") String keyword) {
		//System.out.println(keyword); //데이터 확인용으로 삭제요망
		
		
		System.out.println("글쓴이검색");
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(boardService.searchListByName(keyword)));
		
	}
	
	
	// 게시글 삭제  <D>
	@PostMapping("/delete")
	public ResponseEntity<JsonResult> delete(@RequestBody BoardVo boardVo ) {
		
		//System.out.println( boardVo ); //확인용이므로 삭제 필요
	
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(boardService.deleteBoard(boardVo)));
	
	}
		

	
	
	
	// 글 생성 <C>
	@PostMapping("/create")
	public ResponseEntity<JsonResult> create(
			@RequestParam(value="board") String board ,
			@RequestParam(value="file", required=false) MultipartFile file) throws FileUploadException, JsonMappingException, JsonProcessingException {
		
		
			// JSON String 객체를 VO안에 담는 메소드
			ObjectMapper mapper = new ObjectMapper();	
			
			BoardVo boardVo = mapper.readValue(board, BoardVo.class);
			
			System.out.println(file);
			// 파일이 있다면 업로드
			if( file != null ) {
				
				// 파일 저장 후 파일 URL 주소 반환
				boardVo.setFileUrl(fileUploadService.restoreFile(file)); 
				
				// 파일 이름 반환
				boardVo.setFileName(fileUploadService.getFileName(file));
				
				System.out.println(boardVo); 	// 데이터 확인용 삭제 요망

				// boardVo에 저장
				return ResponseEntity.status(HttpStatus.OK)
						.body(JsonResult.success(boardService.createBoard(boardVo)));
	
			}
			
			System.out.println(boardVo); 	// 데이터 확인용 삭제 요망
			
			

		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(boardService.createBoard(boardVo)));
	}
	
	// 글 수정 <U> - 아직 미완성( 일부러 정리 안함 ) 
	@PostMapping("/update")
	public ResponseEntity<JsonResult> update(
			@RequestParam(value="board") String board ,
			@RequestParam(value="file", required=false) MultipartFile file) throws FileUploadException, JsonMappingException, JsonProcessingException {
		
		
			// JSON String 객체를 VO안에 담는 메소드
			ObjectMapper mapper = new ObjectMapper();	
			
			BoardVo boardVo = mapper.readValue(board, BoardVo.class);
			
			System.out.println(file);
			
			
			// 파일이 있다면 업로드
			if( file != null ) {
				
				// 파일 저장 후 파일 URL 주소 반환
				boardVo.setFileUrl(fileUploadService.restoreFile(file)); 
				
				// 파일 이름 반환
				boardVo.setFileName(fileUploadService.getFileName(file));
				
				System.out.println(boardVo); 	// 데이터 확인용 삭제 요망

				// boardVo에 저장
				return ResponseEntity.status(HttpStatus.OK)
						.body(JsonResult.success(boardService.updateBoard(boardVo)));
	 	
				
			}
			
			System.out.println(boardVo); 	// 데이터 확인용 삭제 요망
			
			
			
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(boardService.updateBoard(boardVo)));
	}
	
	
	// 글 수정 <U> - 조회수 증가
	@GetMapping("/updateCount")
	public ResponseEntity<JsonResult> updateCount(@RequestParam(value="boardNo") Long no ) {
		System.out.println(no); //데이터 확인용으로 삭제요망
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(boardService.updateCount(no)));
	}
	
	
	
	
	
	
	
	// 파일 다운로드 
	@GetMapping("/download") 
	public ResponseEntity<Object> download(@RequestParam(value="FileUrl") String fileUrl) {
		
		
		// 해당 게시글의 fileurl 통해 파일 다운로드 ( 기능 구현 완료 )
		return fileDownloadService.fileDownload(fileUrl);
	
	}
	
	

	
	//==========================================================================
	
	
	// <C> - fileUpload  // 팀원과 상의 필요
	@PostMapping("/upload")
	public void upload(
			@RequestParam(value="board") String board ,
			@RequestParam("file") MultipartFile file) throws FileUploadException{

		
			try {
				
				// JSON String 객체를 VO안에 담는 메소드
				ObjectMapper mapper = new ObjectMapper();	
				
				BoardVo boardvo = mapper.readValue(board, BoardVo.class);
				
				System.out.println(boardvo);
				
			} catch (JsonMappingException e) {
				
				e.printStackTrace();
				
			} catch (JsonProcessingException e) {
				
				e.printStackTrace();
			}
			
	
			System.out.println(file);
			
			// 파일 처리를 위한 메소드
			//	fileUploadService.restoreImage(file);

		
		
	/** axios 통해 파일 보내는 FE(리액트) 코드**/
		
	/*------------------- 리액트 필드 영역 코드  -------------------*/
			// 파일 보내는 링크 ( 좀 더 뜯어살펴봐야함 )  - 필드 영역
			// const submitTest = async (e)=>{
			//   console.log(e);
			//   let file = document.getElementById("file");
		    
			//   let formData = new FormData();
			//   formData.append("file", file.files[0]);
			//   axios.post('/api/board/create', formData, {
			//       headers: {
			//         'Content-Type': 'multipart/form-data'
			//     }
			//   })
			// }

	/*------------------- 리액트 return 영역 코드  -------------------*/
		
			// form 태그에 encType="multipart/form-data" 속성 안해도된다.
		
			//	<form onSubmit={e=>{
			//		e.preventDefault();
			//		submitTest(e);
			//	}}>
			//	<input id="file" name="file" type="file"></input>
			//	<input type="submit" multiple="multiple"></input>
			//	</form> */


	}
	
	/** MainPage 부서별 공지사항 조회 */
	@GetMapping("/{no}")
	public ResponseEntity<JsonResult> getTeamBoard(@PathVariable Long no) {
		List<VacationVo> list = boardService.getTeamBoard(no);
//		System.out.println("vacation :"+list);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(list));
	}		
	
}
