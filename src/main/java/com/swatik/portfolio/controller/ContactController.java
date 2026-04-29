package com.swatik.portfolio.controller;
import com.swatik.portfolio.dto.*;
import com.swatik.portfolio.entity.ContactMessage;
import com.swatik.portfolio.repository.ContactMessageRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger; import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/contact")
public class ContactController {
    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);
    @Autowired private ContactMessageRepository repo;
    @PostMapping public ResponseEntity<?> send(@Valid @RequestBody ContactRequest req) {
        ContactMessage msg = ContactMessage.builder().senderName(req.getSenderName()).senderEmail(req.getSenderEmail()).subject(req.getSubject()).message(req.getMessage()).build();
        repo.save(msg);
        logger.info("New contact message from: {}", req.getSenderEmail());
        return ResponseEntity.ok(new MessageResponse("Message sent successfully!"));
    }
    @GetMapping @PreAuthorize("hasRole('ADMIN')") public ResponseEntity<List<ContactMessage>> getAll() { return ResponseEntity.ok(repo.findAll()); }
    @PutMapping("/{id}/read") @PreAuthorize("hasRole('ADMIN')") public ResponseEntity<?> markRead(@PathVariable Long id) {
        return repo.findById(id).map(m -> { m.setRead(true); repo.save(m); return ResponseEntity.ok((Object) new MessageResponse("Marked as read")); }).orElse(ResponseEntity.notFound().build());
    }
}
