package com.wethego.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class SseVo {
	private long no;
	private String name;
	private String userId;
	private String vlist;
	private long count;

}
