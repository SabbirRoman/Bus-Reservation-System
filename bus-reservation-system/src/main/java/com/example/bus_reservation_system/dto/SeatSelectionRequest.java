package com.example.bus_reservation_system.dto;

import lombok.Data;

import java.util.List;

@Data
public class SeatSelectionRequest {
    private Long busId;
    private List<Integer> selectedSeats;
}

