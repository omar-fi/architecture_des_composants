package org.example.smartcareer.service;

import org.example.smartcareer.entite.User;

public interface UserService {
    User register(User user);
    String login(String email, String password);
    User getById(Long id);
}
