package org.example.smartcareer.utils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.smartcareer.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        String requestPath = request.getRequestURI();

        // Ne pas filtrer les endpoints publics
        if (requestPath.equals("/api/auth/register") || requestPath.equals("/api/auth/login")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            System.out.println("🔍 JWT Filter: Token received for: " + requestPath);
            
            try {
                if (jwtUtil.validateToken(token)) {
                    String email = jwtUtil.extractEmail(token);
                    System.out.println("✅ JWT Filter: Token valid, email: " + email);
                    
                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                    System.out.println("✅ JWT Filter: UserDetails loaded: " + userDetails.getUsername());

                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails, null, userDetails.getAuthorities()
                            );

                    // S'assurer que le SecurityContext est correctement configuré et partagé
                    SecurityContext context = SecurityContextHolder.createEmptyContext();
                    context.setAuthentication(auth);
                    SecurityContextHolder.setContext(context);
                    
                    // Vérifier que l'authentification est bien définie
                    Authentication setAuth = SecurityContextHolder.getContext().getAuthentication();
                    if (setAuth != null && setAuth.isAuthenticated()) {
                        System.out.println("✅ JWT Filter: Authentication successfully set and authenticated");
                    } else {
                        System.out.println("❌ JWT Filter: Authentication not properly set");
                    }
                } else {
                    System.out.println("❌ JWT Filter: Invalid token");
                    SecurityContextHolder.clearContext();
                }
            } catch (Exception e) {
                System.out.println("❌ JWT Filter: Error processing token: " + e.getMessage());
                e.printStackTrace();
                SecurityContextHolder.clearContext();
            }
        } else {
            System.out.println("⚠️ JWT Filter: No Authorization header found for: " + requestPath);
            System.out.println("⚠️ JWT Filter: Headers: " + java.util.Collections.list(request.getHeaderNames()));
        }

        filterChain.doFilter(request, response);
    }
}