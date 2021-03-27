package com.avcify.ws.file;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avcify.ws.user.User;

public interface FileAttachmentRepository extends JpaRepository<FileAttachment, Long> {
	
	List<FileAttachment> findByDateBeforeAndAnnounceIsNull(Date date);
	List<FileAttachment> findByAnnounceUser(User user);
}
