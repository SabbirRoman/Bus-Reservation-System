package com.example.bus_reservation_system.controller;

import com.example.bus_reservation_system.dto.AuthRequest;
import com.example.bus_reservation_system.model.User;
import com.example.bus_reservation_system.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody AuthRequest req) {
        Map<String, Object> res = new HashMap<>();

        // Check if email already exists
        if (authService.emailExists(req.getEmail())) {
            res.put("message", "Email is already registered");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(res);
        }

        // Otherwise, register user
        Object registeredUser = authService.register(req);
        res.put("data", registeredUser);
        return ResponseEntity.ok(res);
    }



    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AuthRequest req) {
        Map<String, Object> res = new HashMap<>();
        res.put("data", authService.login(req.getEmail(), req.getPassword()));
        return ResponseEntity.ok(res);
    }

}