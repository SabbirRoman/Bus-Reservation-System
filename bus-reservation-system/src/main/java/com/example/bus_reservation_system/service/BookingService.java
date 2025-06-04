package com.example.bus_reservation_system.service;

import com.example.bus_reservation_system.dto.BookingRequest;
import com.example.bus_reservation_system.model.Booking;
import com.example.bus_reservation_system.model.Bus;
import com.example.bus_reservation_system.repository.BookingRepository;
import com.example.bus_reservation_system.repository.BusRepository;
import com.example.bus_reservation_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepo;
    private final BusRepository busRepo;
    private final UserRepository userRepo;

    public List<Integer> getAvailableSeats(Long busId) {
        Bus bus = busRepo.findById(busId).orElseThrow();
        List<Integer> booked = bookingRepo.findByBusId(busId)
                .stream().map(Booking::getSeatNumber).toList();
        return IntStream.rangeClosed(1, bus.getTotalSeats())
                .filter(seat -> !booked.contains(seat))
                .boxed()
                .toList();
    }

    public Map<String, Object> bookSeats(Long userId, BookingRequest request) {
        Bus bus = busRepo.findById(request.getBusId()).orElseThrow();
        List<Integer> bookedSeats = getAvailableSeats(bus.getId());

        for (Integer seat : request.getSelectedSeats()) {
            if (!bookedSeats.contains(seat)) {
                throw new RuntimeException("Seat number " + seat + " is already booked");
            }
        }

        List<Booking> bookings = request.getSelectedSeats().stream()
                .map(seat -> Booking.builder()
                        .seatNumber(seat)
                        .bookingDate(LocalDate.now())
                        .user(userRepo.findById(userId).orElseThrow())
                        .bus(bus)
                        .build())
                .toList();

        bookingRepo.saveAll(bookings);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Seats booked successfully");
        response.put("seats", request.getSelectedSeats());
        response.put("totalPrice", request.getSelectedSeats().size() * bus.getPricePerSeat());
        return response;
    }
}
