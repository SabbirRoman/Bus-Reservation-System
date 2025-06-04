package com.example.bus_reservation_system.repository;

import com.example.bus_reservation_system.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByBusId(Long busId);
}
