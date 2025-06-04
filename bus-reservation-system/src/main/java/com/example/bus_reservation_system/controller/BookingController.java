package com.example.bus_reservation_system.controller;

import com.example.bus_reservation_system.dto.BookingRequest;
import com.example.bus_reservation_system.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    @GetMapping("/available-seats")
    public ResponseEntity<List<Integer>> getAvailableSeats(@RequestParam Long busId) {
        return ResponseEntity.ok(bookingService.getAvailableSeats(busId));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> bookSeats(@RequestParam Long userId, @RequestBody BookingRequest req) {
        return ResponseEntity.ok(bookingService.bookSeats(userId, req));
    }
}
