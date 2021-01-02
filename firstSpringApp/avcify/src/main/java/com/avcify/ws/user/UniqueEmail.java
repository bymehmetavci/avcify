package com.avcify.ws.user;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ FIELD })
@Retention(RUNTIME)
@Constraint(validatedBy = {UniqueEmailValidator.class})
public @interface UniqueEmail {
	String message() default "{avcify.constraints.email.UniqueEmail.message}";

	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };
}
