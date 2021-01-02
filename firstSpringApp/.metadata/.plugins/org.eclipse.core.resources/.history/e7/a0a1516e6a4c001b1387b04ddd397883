package com.avcify.ws.user;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.avcify.ws.shared.Views;
import com.fasterxml.jackson.annotation.JsonView;

import lombok.Data;

@Data
@Entity
public class User implements UserDetails{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -8045588303055079859L;

	@Id
	@GeneratedValue
	private long id;
	
	@NotNull(message = "{avcify.constraints.username.NotNull.message}")
	@Size(min = 4, max=16)
	@UniqueUsername
	@JsonView(Views.Base.class)
	private String username;
	
	@NotNull
	@Size(min = 4, max=16)
	@JsonView(Views.Base.class)
	private String displayName;
	
	@NotNull
	@Size(min=8, max=255)
	@Pattern (regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,}$", message = "{avcify.constraints.password.Pattern.message}")
	private String password;
	
	@JsonView(Views.Base.class)
	private String image;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return AuthorityUtils.createAuthorityList("Role_user");
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
