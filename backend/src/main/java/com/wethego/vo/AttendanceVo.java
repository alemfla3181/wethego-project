package com.wethego.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class AttendanceVo {
	private Long no;
	private String inoutDay;
	private String inTime;
	private String outTime;
	private String state;
	private String signState;
	private String etcReason;
	private long employeesNo;
	private String name;
	private String userId;
  private Long totalTime;
  private String vacStart;
  private String vacEnd;
  private String vList;
  private String id;
  private String dbDate;
  private String event;
}