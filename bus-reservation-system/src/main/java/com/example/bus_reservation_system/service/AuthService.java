package com.example.bus_reservation_system.service;


import com.example.bus_reservation_system.dto.AuthRequest;
import com.example.bus_reservation_system.model.User;
import com.example.bus_reservation_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;

    public User register(AuthRequest req) {
        User user = new User();
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword());
//        user.setUserName(req.getUserName());
//        user.setFullName(req.getFullName());
        user.setRole("CUSTOMER");
        return userRepository.save(user);
    }


    public User login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(u -> u.getPassword().equals(password))
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

}