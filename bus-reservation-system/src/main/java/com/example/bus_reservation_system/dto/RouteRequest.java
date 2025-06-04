package com.example.bus_reservation_system.dto;


import lombok.Data;

@Data
public class RouteRequest {
    private String source;
    private String destination;
    private Long busId;
}



