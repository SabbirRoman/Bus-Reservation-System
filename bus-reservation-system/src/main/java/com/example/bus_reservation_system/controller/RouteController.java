package com.example.bus_reservation_system.controller;


import com.example.bus_reservation_system.dto.RouteRequest;
import com.example.bus_reservation_system.model.Bus;
import com.example.bus_reservation_system.model.Route;
import com.example.bus_reservation_system.repository.BusRepository;
import com.example.bus_reservation_system.repository.RouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/routes")
@RequiredArgsConstructor
public class RouteController {
    private final RouteRepository routeRepo;
    private final BusRepository busRepository;

    @PostMapping
    public ResponseEntity<Route> addRoute(@RequestBody RouteRequest request) {
        Bus bus = busRepository.findById(request.getBusId())
                .orElseThrow(() -> new RuntimeException("Bus not found"));
        Route route = new Route(null, request.getSource(), request.getDestination(), bus);
        return ResponseEntity.ok(routeRepo.save(route));
    }

    @GetMapping
    public ResponseEntity<List<Route>> searchRoutes(@RequestParam String source, @RequestParam String destination) {
        return ResponseEntity.ok(routeRepo.findBySourceAndDestination(source, destination));
    }
}
