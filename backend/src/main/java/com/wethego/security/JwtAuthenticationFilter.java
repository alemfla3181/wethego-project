package com.wethego.security;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wethego.repository.UserRepository;
import com.wethego.service.UserService;
import com.wethego.vo.EmployeesVo;

import lombok.RequiredArgsConstructor;

/*
 *  스프링 시큐리티에서 UsernamePasswordAuthenticationFilter 가 있음
 *  /login 요청해서 username, password 전송하면 (post)
 *  UsernamePasswordAuthenticationFilter 동작을 한다.
 * */
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private final AuthenticationManager authenticationManager;

	public JwtAuthenticationFilter(AuthenticationManager authenticationManager, String  url) {
		this.authenticationManager = authenticationManager;
		setFilterProcessesUrl(url);
	}
	
	// /login 요청을 하면 로그인 시도를 위해서 실행되는 함수.
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		System.out.println("JwtAuthenticationFilter : 로그인 시도중");

		try {
			// 1. username, password를 받아서, json데이터를 파싱해준다.
			ObjectMapper om = new ObjectMapper();
			EmployeesVo vo = om.readValue(request.getInputStream(), EmployeesVo.class);
//			System.out.println(vo);

			// 유저네임패스워드 토큰 생성
			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
					vo.getUserId(), vo.getUserPw());
//			System.out.println("authenticationToken:"+ authenticationToken);
			// 2. 정상인지 로그인 시도를 해야함. authenticationManager로 로그인 시도를 하면
			// PrincipalDetailsService가 호출됨.(loadUserByUsername()함수 실행됨.)

			// PrincipalDetailsService의 loadUserByUsername()함수가 실행된 후 정상이면 authentication이
			// 리턴
			// authentication에 내 로그인한 정보가 담김
			// 데이터베이스에 있는 username과 password가 일치한다.
			Authentication authentication = authenticationManager.authenticate(authenticationToken);
			// 3. PrincipalDetails를 세션에 담고 (권한 관리를 위해서)
			// = 로그인이 되었다는 뜻.
			PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
			System.out.println("로그인 완료됨 ? : " + principalDetails.getUsername()); // 로그인이 정상적으로 되었다는 뜻

			// authentication 객체가 session영역에 저장해야 하고 그 방법이 return 해주면 됨.
			// 리턴 이유는 권한 관리를 security가 대신 해주기 때문에 편하려고 하는것
			// 굳이 JWT토큰을 사용하면서 세션을 만들 이유가 없음. 근데 단지 권한 처리때문에 session에 넣어줌.
			return authentication;
		} catch (Exception e) {
			e.printStackTrace();
		}

		response.setStatus(400);
		return null;
	}

	// attemptAuthentication 실행 후 인증이 정상적으로 되었으면 successfulAuthentication함수가 실행됨.
	// JWT토큰을 만들어서 request 요청한 사용자에게 JWT토큰을 response해주면 됨.
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		// 4. JWT토큰을 만들어서 응답해주면 됨.
		System.out.println("successfulAuthentication 실행됨 : 인증 완료");

		PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
		
		// Hash암호 방식, 라이브러리 사용
		String jwtToken = JWT.create().withSubject("wethego")
				.withExpiresAt(new Date(System.currentTimeMillis() + (60000 * 60) * 8)) // 만료 시간
				.withClaim("userId", principalDetails.getEmployeesVo().getUserId()) // 내가 넣고 싶은 key:value
				.withClaim("no", principalDetails.getEmployeesVo().getNo()).sign(Algorithm.HMAC512("cos"));

		response.addHeader("Authorization", "Bearer " + jwtToken);
		response.setStatus(200);
		
		PrintWriter writer = response.getWriter();
		writer.print("LoginSuccess");
	}

	@Override
	public void setFilterProcessesUrl(String filterProcessesUrl) {
		super.setFilterProcessesUrl(filterProcessesUrl);
	}

}