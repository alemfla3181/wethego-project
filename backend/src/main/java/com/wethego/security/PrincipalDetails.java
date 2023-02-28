package com.wethego.security;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.wethego.vo.EmployeesVo;

import lombok.Data;

@Data
public class PrincipalDetails implements UserDetails {
	
	private EmployeesVo employeesVo;
	
	public PrincipalDetails(EmployeesVo employeesVo) {
		this.employeesVo = employeesVo;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new GrantedAuthority() {
			@Override
			public String getAuthority() {
				return employeesVo.getLevel();
			}
		});
        return authorities;
	}

	@Override
	public String getPassword() {
		return employeesVo.getUserPw();
	}

	@Override
	public String getUsername() {
		return employeesVo.getUserId();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}