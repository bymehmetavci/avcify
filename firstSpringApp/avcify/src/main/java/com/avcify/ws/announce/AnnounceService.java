package com.avcify.ws.announce;

import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.jpa.domain.Specification;
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

	public Page<Announce> getOldAnnouncements(long id, String username, Pageable page) {
		/*
		if(username != null) {
			User inDB = userService.getByUsername(username);
			return announceRepository.findByIdLessThanAndUser(id, inDB, page);
		}
		return announceRepository.findByIdLessThan(id, page); 
		*/
		Specification<Announce> specification = idLessThan(id);
		if(username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}
		return announceRepository.findAll(specification, page);
	}

	public long getNewAnnouncementsCount(long id, String username) {
		Specification<Announce> specification = idGreaterThan(id);
		if(username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}
		return announceRepository.count(specification);
	}

	public List<Announce> getNewAnnouncements(long id, String username, Sort sort) {
		/*if(username != null) {
			User inDB = userService.getByUsername(username);
			return announceRepository.findByIdGreaterThanAndUser(id, inDB, sort);
		}
		return announceRepository.findByIdGreaterThan(id, sort);
		*/
		Specification<Announce> specification = idGreaterThan(id);
		if(username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}
		return announceRepository.findAll(specification, sort);
	}
	
	Specification<Announce> idLessThan(long id) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.lessThan(root.get("id"), id);
		};
	}
	
	Specification<Announce> userIs(User user) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.equal(root.get("user"), user);
		};
	}
	
	Specification<Announce> idGreaterThan(long id) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.greaterThan(root.get("id"), id);
		};
	}
}
