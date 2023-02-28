package com.wethego.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class PositionVo {
	private long no;
 	private String pName;		// 직책명
	private long positionCount;	// 해당 직책 사원 수 
}