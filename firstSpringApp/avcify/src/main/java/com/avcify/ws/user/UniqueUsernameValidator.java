package com.avcify.ws.user;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {
	
	@Autowired
	UserRepository userRespository;
	
	@Override
	public boolean isValid(String username, ConstraintValidatorContext context) {
		User user = userRespository.findByUsername(username);
		if(user != null) {
			return false;
		}
		return true;
	}

}
