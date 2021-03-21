package com.avcify.ws.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileController {
	
	@Autowired
	FileService fileService;
	
	@PostMapping("/api/1.0/announce-attachments")
	FileAttachment saveAnnounceAttachment(MultipartFile file) {
		return fileService.saveAnnounceAttachment(file);
	}
}
