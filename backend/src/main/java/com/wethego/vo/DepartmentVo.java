package com.wethego.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class DepartmentVo {
	private long no;
	private String dName;
	private long dDepth;
	private long pNo;
}