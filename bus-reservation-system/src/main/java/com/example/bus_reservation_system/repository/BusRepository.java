package com.example.bus_reservation_system.repository;


import com.example.bus_reservation_system.model.Bus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusRepository extends JpaRepository<Bus, Long> {}

