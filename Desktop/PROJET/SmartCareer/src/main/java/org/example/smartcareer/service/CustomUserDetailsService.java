package org.example.smartcareer.service;
import org.example.smartcareer.entite.User;
import org.example.smartcareer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;


import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        User user =
                userRepo.findByEmail(email)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return (UserDetails) user.builder()
                .fullName(user.getEmail())
                .password(user.getPassword())
                .email("omar@gmail.com") // You can customize roles as needed
                .build();
    }
}

