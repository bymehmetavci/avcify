package com.avcify.ws.file;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.avcify.ws.announce.Announce;

import lombok.Data;

@Data	
@Entity
public class FileAttachment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String name;
	
	private String fileType;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date date;
	
	@OneToOne
	private Announce announce;
}
