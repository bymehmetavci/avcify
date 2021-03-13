package com.avcify.ws.announce;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import com.avcify.ws.user.User;
import com.avcify.ws.user.UserService;

@Service
public class AnnounceService {

	AnnounceRepository announceRepository;
	UserService userService;

	public AnnounceService(AnnounceRepository announceRepository, UserService userService) {
		super();
		this.announceRepository = announceRepository;
		this.userService = userService;
	}

	public void save(Announce announce, User user) {
		announce.setAddedDate(new Date());
		announce.setUser(user);
		announceRepository.save(announce);
	}

	public Page<Announce> getAnnouncements(Pageable page) {
		return announceRepository.findAll(page);
	}

	public Page<Announce> getAnnouncementsOfUser(String username, Pageable page) {
		User inDB = userService.getByUsername(username);
		return announceRepository.findByUser(inDB, page);
	}

	public Page<Announce> getOldAnnouncements(long id, Pageable page) {
		return announceRepository.findByIdLessThan(id, page); 
	}

	public Page<Announce> getOldAnnouncementsOfUser(long id, String username, Pageable page) {
		User inDB = userService.getByUsername(username);
		return announceRepository.findByIdLessThanAndUser(id, inDB, page);
	}

	public long getNewAnnounceCount(long id) {
		return announceRepository.countByIdGreaterThan(id) ;
	}

	public long getNewAnnounceCountOfUser(long id, String username) {
		User inDB = userService.getByUsername(username);
		return announceRepository.countByIdGreaterThanAndUser(id, inDB);
	}

	public List<Announce> getNewAnnouncements(long id, Sort sort) {
		return announceRepository.findByIdGreaterThan(id, sort);
	}

	public List<Announce> getNewAnnouncementsOfUser(long id, String username, Sort sort) {
		User inDB = userService.getByUsername(username);
		return announceRepository.findByIdGreaterThanAndUser(id, inDB, sort);
	}
	
}
