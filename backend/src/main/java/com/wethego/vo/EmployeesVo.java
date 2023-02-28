package com.wethego.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class EmployeesVo {
	private long no;
	private String userId;	// 유저아이디
	private String userPw; // 유저비밀번호 (저장x)
	private String name; // 사원 이름
	private	String state; // 상태 (퇴사,재직,기타)
	private String joinDate; // 입사일
	private String resignationDate; // 퇴사일
	private String Hphone; // 휴대폰 번호
	private String level;
	private String gender;
	private String disabled;
	private String birth; // 생년
	private String extNumber; // 부서 전화 번호
	private String profileUrl; // 프로필 사진
	private long departmentNo; // 부서 no
	private long positionNo; // 직책 no 	
	
	private	String pName; // 직책명
	private String dName; // 팀명
	private	String department; // 부서명(XX부)
}