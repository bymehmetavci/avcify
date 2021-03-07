package com.avcify.ws.announce;

import java.util.Date;

import org.springframework.stereotype.Service;

@Service
public class AnnounceService {

	AnnounceRepository announceRepository;

	public AnnounceService(AnnounceRepository announceRepository) {
		super();
		this.announceRepository = announceRepository;
	}

	public void save(Announce announce) {
		announce.setAddedDate(new Date());
		announceRepository.save(announce);
	}
	
}
