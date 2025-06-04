package com.example.bus_reservation_system.dto;


import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;

}

