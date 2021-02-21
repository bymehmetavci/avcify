package com.avcify.ws.user.wm;

import com.avcify.ws.user.User;

import lombok.Data;

@Data
public class UserVM {
	private String username;
	private String displayName;
	private String email;
	private String image;
	
	public UserVM(User user) {
		this.setUsername(user.getUsername());
		this.setDisplayName(user.getDisplayName());
		this.setEmail(user.getEmail());
		this.setImage(user.getImage());
	}
}
