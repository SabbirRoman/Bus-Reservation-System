package com.example.bus_reservation_system.controller;

import com.example.bus_reservation_system.dto.BusRequest;
import com.example.bus_reservation_system.model.Bus;
import com.example.bus_reservation_system.repository.BusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buses")
@RequiredArgsConstructor
public class BusController {

    private final BusRepository busRepository;

    @PostMapping
    public ResponseEntity<Bus> addBus(@RequestBody BusRequest request) {
        Bus bus = new Bus();
        bus.setBusName(request.getBusName());
        bus.setTotalSeats(request.getTotalSeats());
        return ResponseEntity.ok(busRepository.save(bus));
    }

    @GetMapping
    public ResponseEntity<List<Bus>> getAllBuses() {
        return ResponseEntity.ok(busRepository.findAll());
    }
}

