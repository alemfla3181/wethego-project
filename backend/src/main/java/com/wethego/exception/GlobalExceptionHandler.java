package com.wethego.exception;

import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.nio.charset.Charset;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wethego.dto.JsonResult;
import com.wethego.dto.Message;
import com.wethego.dto.StatusEnum;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
   
   @ExceptionHandler(Exception.class)
   public String handlerException(HttpServletResponse response, Exception e) throws Exception {
      
       HttpHeaders headers = new HttpHeaders();
       headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
       
      // 1. 로깅(logging)
      StringWriter errors = new StringWriter();
      e.printStackTrace(new PrintWriter(errors));
      log.error(errors.toString());
       
       Message message = new Message();
       message.setStatus(StatusEnum.OK);
       message.setMessage("global exception");
       message.setData(errors.toString());
       
       if(e instanceof NoHandlerFoundException) {
          return "index";
       }
      
      // 2. JSON 응답
      JsonResult result = JsonResult.fail(errors.toString());
      String jsonString = new ObjectMapper().writeValueAsString(result);
      
      response.setStatus(HttpServletResponse.SC_OK);
      OutputStream os = response.getOutputStream();
      os.write(jsonString.getBytes("utf-8"));
      os.close();
       
       return "";
   }
}