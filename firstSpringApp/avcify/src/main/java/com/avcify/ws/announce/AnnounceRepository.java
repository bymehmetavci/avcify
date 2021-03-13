package com.avcify.ws.announce;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.avcify.ws.user.User;

public interface AnnounceRepository extends JpaRepository<Announce, Long> {

	Page<Announce> findByUser(User user, Pageable page);
	
	Page<Announce> findByIdLessThan(long id, Pageable page);
	
	Page<Announce> findByIdLessThanAndUser(long id, User user, Pageable page);
	
	long countByIdGreaterThan(long id);
	
	long countByIdGreaterThanAndUser(long id, User user);
	
	List<Announce> findByIdGreaterThan(long id, Sort sort);
	
	List<Announce> findByIdGreaterThanAndUser(long id, User user, Sort sort);
}
