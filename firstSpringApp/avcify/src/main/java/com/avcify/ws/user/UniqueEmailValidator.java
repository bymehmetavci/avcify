package com.avcify.ws.user;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {
	
	@Autowired
	UserRepository userRespository;
	
	@Override
	public boolean isValid(String email, ConstraintValidatorContext context) {
		User userForEmail = userRespository.findByEmail(email);
		if(userForEmail != null) {
			return false;
		}
		return true;
	}

}
