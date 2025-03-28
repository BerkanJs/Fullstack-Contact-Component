package com.proje.contactapi.controller.impl;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.proje.contactapi.model.Contact;
import com.proje.contactapi.service.ContactService;

import jakarta.persistence.EntityNotFoundException;

import static com.proje.contactapi.constant.Constant.PHOTO_DIRECTORY;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@RestController
@RequestMapping("/contacts")
public class RestContactControllerImpl {
    @Autowired
    private ContactService contactService;
    
    @PostMapping
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact) {
        // return ResponseEntity.ok().body(contactService.createContact(contact));
        return ResponseEntity.created(URI.create("/contacts/userID")).body(contactService.createContact(contact));
    }

    @PostMapping("/save-list")
    public ResponseEntity<List<Contact>> createContacts(@RequestBody List<Contact> contacts) {
        List<Contact> savedContacts = contactService.saveContacts(contacts);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedContacts);
    }

    @GetMapping
    public ResponseEntity<Page<Contact>> getContacts(@RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok().body(contactService.getAllContacts(page, size));
    }


    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContact(@PathVariable(value = "id") String id) {
        return ResponseEntity.ok().body(contactService.getContact(id));
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteContact(@PathVariable String id) {
        try {
            contactService.deleteContact(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Contact with id " + id + " deleted successfully.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the contact.");
        }
    }

    @PutMapping("/photo/{id}")
    public ResponseEntity<String> uploadPhoto(@PathVariable("id") String id, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok().body(contactService.uploadPhoto(id, file));
    }
    
    @GetMapping(path = "/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public byte[] getPhoto(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(PHOTO_DIRECTORY + filename));
    }

}
