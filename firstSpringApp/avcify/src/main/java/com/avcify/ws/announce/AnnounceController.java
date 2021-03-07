package com.avcify.ws.announce;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.avcify.ws.shared.GenericResponse;

@RestController
public class AnnounceController {
	
	@Autowired
	AnnounceService announceService;
	
	@PostMapping("/api/1.0/announcements")
	GenericResponse saveAnnounce(@Valid @RequestBody Announce announce) {
		announceService.save(announce);
		return new GenericResponse("Announce is saved.");
	}
}
