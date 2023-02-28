package com.wethego.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class BoardVo {
	
	private Long no;
	private String name;
	private String title;
	private String contents;
	private String regDate;
	private String fileUrl;
	private String fileName;
	private String form;
	private Long EmployeesNo;
	private Long count;
	private String dName;
	
}
