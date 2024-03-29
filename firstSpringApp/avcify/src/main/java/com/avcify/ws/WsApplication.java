package com.avcify.ws;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import com.avcify.ws.announce.AnnounceService;
import com.avcify.ws.announce.vm.AnnounceSubmitVM;
import com.avcify.ws.user.User;
import com.avcify.ws.user.UserService;

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
	/**
	 * Initiliaze announcements
	@Bean
	@Profile("dev")
	CommandLineRunner createInitialUsers(AnnounceService announceService) {
		return (args) -> {
			for (int i = 1; i<=100; i++) {
				Announce announce = new Announce();
				announce.setContent("announce - " + i);
				announceService.save(announce, null);
			}
			
		};
	}
	*/
	/**
	 * Initiliaze users
	 */
	@Bean
	@Profile("dev")
	CommandLineRunner createInitialUsers(UserService userService, AnnounceService announceService) {
		return (args) -> {
			try {
				userService.getByUsername("user1");
			} catch (Exception e) {
				for (int i = 1; i<=30; i++) {
					User user = new User();
					user.setUsername("user"+i);
					user.setDisplayName("display"+i);
					user.setEmail("testadresi"+i+"@avcify.com");
					user.setPassword("P4ssword");
					userService.save(user);
					for (int j = 1; j<=25; j++) {
						AnnounceSubmitVM announce = new AnnounceSubmitVM();
						announce.setContent("announce - (" + j + ") from user (" + i +")");
						announceService.save(announce, user);
					}
				}
			}
		};
	}
}
