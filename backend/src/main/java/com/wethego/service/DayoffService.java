package com.wethego.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wethego.repository.DayoffRepository;
import com.wethego.vo.AttendanceVo;
import com.wethego.vo.DayoffVo;
import com.wethego.vo.VacationVo;

@Service
public class DayoffService {
	
	@Autowired
	private DayoffRepository dayoffRepository;

    public List<DayoffVo> getdayoffList(Long no) {
      return dayoffRepository.getAll(no);
    }  
    
	public List<VacationVo> getTeamVacation(HashMap<String, Object> param) {
		return dayoffRepository.getTeamVacation(param);
	}
	
	public List<VacationVo> getvacationList() {
		return dayoffRepository.getvacAll();
	}
	
	public List<VacationVo> getvacationList(Long no) {
		return dayoffRepository.getvacAll(no);
	}

	public Boolean addVacation(VacationVo vo) {
		return dayoffRepository.requestVac(vo);
	}

	public boolean delete(Long no) {
		return dayoffRepository.delete(no);
	}

	public List<VacationVo> requestList(Long no) {
		return dayoffRepository.getRequestAll(no);
	}

	public void vacConfirm(HashMap<String, Object> param) {
		dayoffRepository.vacConfirm(param);
	}

	public void vacRefer(HashMap<String, Object> param) {
		dayoffRepository.vacRefer(param);
	}

	/**Admin 휴가 게시판 START **/
	public Map<String, Object> getvactionList(String userId, String name, String date) {
		
		int totalCount = dayoffRepository.getTotalCount(userId, name, date);
		List<AttendanceVo> list = dayoffRepository.getAll(userId, name, date);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("totalCount", totalCount);
		return map;
	}

	public void deleteVacation(Long no) {
		dayoffRepository.delete2(no);
	}

	// 종일 수정
	public void createDayoff(DayoffVo vo) {
		
		dayoffRepository.createDayoff(vo);
	}
	
	/**Admin 연차 게시판 START **/
	public Map<String, Object> getdayoffList(String userId, String name) {
		int totalCount = dayoffRepository.getTotalCount2(userId, name);
		List<AttendanceVo> list = dayoffRepository.getAll2(userId, name);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("totalCount", totalCount);
		return map;
	}

	public DayoffVo getdayoffAdminList(Long no) {
		return dayoffRepository.getOne(no);
	}

	public void updateDayoff(DayoffVo dayoffVo) {
		dayoffRepository.update(dayoffVo);
	}
	
	
}
