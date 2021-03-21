package com.avcify.ws.announce.vm;

import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class AnnounceSubmitVM {

	@Size(min=1, max=1000)
	private String content;
	
	private long attachmentId;
	
}
