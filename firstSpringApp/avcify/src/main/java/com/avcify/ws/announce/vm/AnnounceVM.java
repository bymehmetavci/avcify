package com.avcify.ws.announce.vm;

import com.avcify.ws.announce.Announce;
import com.avcify.ws.user.wm.UserVM;

import lombok.Data;

@Data
public class AnnounceVM {
	private long id;
	
	private String content;
	
	private long addedDate;
	
	private UserVM user;
	
	public AnnounceVM(Announce announce) {
		this.setId(announce.getId());
		this.setContent(announce.getContent());
		this.setAddedDate(announce.getAddedDate().getTime());
		this.setUser(new UserVM(announce.getUser()));
	}
}
