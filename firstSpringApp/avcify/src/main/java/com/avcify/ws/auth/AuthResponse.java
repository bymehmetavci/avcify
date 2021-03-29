package com.avcify.ws.auth;

import com.avcify.ws.user.wm.UserVM;

import lombok.Data;

@Data
public class AuthResponse {
	
	private String token;
	private UserVM user;
}
