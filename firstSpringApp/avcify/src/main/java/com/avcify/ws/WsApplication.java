package com.avcify.ws;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);
	}
	
	/**
	 * Initiliaze users
	@Bean
	@Profile("dev")
	CommandLineRunner createInitialUsers(UserService userService) {
		return (args) -> {
			for (int i = 1; i<=30; i++) {
				User user = new User();
				user.setUsername("user"+i);
				user.setDisplayName("display"+i);
				user.setEmail("testadresi"+i+"@avcify.com");
				user.setPassword("P4ssword");
				userService.save(user);
			}
			
		};
	}
	*/
	
}
