package com.example.bus_reservation_system.dto;


import lombok.Data;


@Data
public class SearchRequest {
    private String source;
    private String destination;
}

