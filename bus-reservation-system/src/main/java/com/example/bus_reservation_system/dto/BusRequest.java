package com.example.bus_reservation_system.dto;

import lombok.Data;

@Data
public class BusRequest {
    private String busName;
    private Integer totalSeats;
    private Double pricePerSeat;
}


