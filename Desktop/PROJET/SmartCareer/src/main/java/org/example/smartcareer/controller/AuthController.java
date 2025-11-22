package org.example.smartcareer.controller;

import lombok.RequiredArgsConstructor;
import org.example.smartcareer.dto.AuthResponse;
import org.example.smartcareer.dto.LoginRequest;
import org.example.smartcareer.dto.RegisterRequest;

import org.example.smartcareer.entite.User;
import org.example.smartcareer.repository.UserRepository;
import org.example.smartcareer.utils.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {

        if (userRepo.existsByEmail(req.getEmail())) {
            return ResponseEntity.badRequest().body("Email already used");
        }

        User user = new User();
        user.setEmail(req.getEmail());
        user.setFullName(req.getFullName());
        user.setPassword(passwordEncoder.encode(req.getPassword()));

        userRepo.save(user);

        return ResponseEntity.ok("User registered");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            System.out.println("🔍 Login attempt for email: " + req.getEmail());
            
            User user = userRepo.findByEmail(req.getEmail())
                    .orElse(null);

            if (user == null) {
                System.out.println("❌ User not found: " + req.getEmail());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }

            if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
                System.out.println("❌ Invalid password for: " + req.getEmail());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }

            String token = jwtUtil.generateToken(req.getEmail());
            System.out.println("✅ Token generated successfully for: " + req.getEmail());

            return ResponseEntity.ok(new AuthResponse(token));
        } catch (Exception e) {
            System.err.println("❌ Error during login: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during login: " + e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        System.out.println("🔍 /me endpoint called");
        System.out.println("Authentication: " + (authentication != null ? authentication.getName() : "null"));
        
        if (authentication == null) {
            System.out.println("❌ Authentication is null");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authenticated");
        }
        
        if (!(authentication.getPrincipal() instanceof UserDetails)) {
            System.out.println("❌ Principal is not UserDetails: " + authentication.getPrincipal().getClass().getName());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authenticated");
        }

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        System.out.println("✅ User email: " + email);
        
        User user = userRepo.findByEmail(email)
                .orElse(null);

        if (user == null) {
            System.out.println("❌ User not found in database: " + email);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Retourner les infos utilisateur sans le mot de passe
        User userResponse = new User();
        userResponse.setId(user.getId());
        userResponse.setEmail(user.getEmail());
        userResponse.setFullName(user.getFullName());
        userResponse.setSpecialty(user.getSpecialty());

        System.out.println("✅ Returning user: " + userResponse.getEmail());
        return ResponseEntity.ok(userResponse);
    }
}



