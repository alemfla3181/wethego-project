package com.wethego.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class VacationVo {
	private long no;
	private String vList;	// 휴가 항목('연차'/병가/반차)
	private String vacStart; // 휴가 시작일시
	private String vacEnd; // 휴가 종료일시
	private String vacReason; // 휴가 사유
	private String signState; // 휴가 처리 상태('대기'/승인/반려)
	private String vacIsused; // 휴가 사용 상태('F'/T)
	
	private String userId;
	
	private long employeesNo; // 유저 no
	private String pName; // 유저 직책
    private String name; // 유저 이름
    private String dname; // 유저 소속 팀명
    private String departmentNo;

}