package com.wethego.config;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootConfiguration
//@PropertySource("classpath:fileupload.properties") 별도 관리 필요하다면 설정
public class FileUploadConfig implements WebMvcConfigurer {

//	@Autowired
//	private Environment env;
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry
			.addResourceHandler("/api/pic/**")
			.addResourceLocations("classpath:/files/" );
	}	
}