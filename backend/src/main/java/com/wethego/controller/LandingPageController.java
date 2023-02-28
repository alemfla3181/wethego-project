package com.wethego.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LandingPageController {
	
	@RequestMapping("/")
	public String index() {
		return "index";
	}
	
	@RequestMapping("/login")
	public String login() {
		return "index";
	}
	
	@RequestMapping("/admin")
	public String admin() {
		return "index";
	}

	@RequestMapping("favicon.ico")
	@ResponseBody
	public void returnNoFavivon() {
	}
}