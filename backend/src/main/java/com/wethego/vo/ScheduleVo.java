package com.wethego.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class ScheduleVo {
	
	private Long no;
	private String content;
	private String startDate;
	private String endDate;
	private long employeesNo;
	private String id;
	private String dbDate;
	private String event;
	private long level;
	private long levelData;

}

