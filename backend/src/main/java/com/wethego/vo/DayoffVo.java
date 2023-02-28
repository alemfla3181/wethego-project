package com.wethego.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class DayoffVo {
	private long no;
	private String dfYear;	// 연도
	private Double dfTotal; // 총 연차일수
	private Double dfUsed; // 연차 사용일수
	
	private long employeesNo; // 유저 no
	
	private String name;
	private String userId;
}