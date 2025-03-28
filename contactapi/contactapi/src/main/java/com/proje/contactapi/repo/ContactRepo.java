package com.proje.contactapi.repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.proje.contactapi.model.Contact;



public interface ContactRepo extends JpaRepository<Contact,String> {

    
    
}
    