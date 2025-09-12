package com.aldebaran.AldebaranHealth.repository;

import com.aldebaran.AldebaranHealth.model.Conversation;
import com.aldebaran.AldebaranHealth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConversationRepo extends JpaRepository<Conversation, Long> {
    boolean existsByName(String name);
    List<Conversation> findByUser(User user);

    List<Conversation> findByNameContainingIgnoreCase(String name);

}
