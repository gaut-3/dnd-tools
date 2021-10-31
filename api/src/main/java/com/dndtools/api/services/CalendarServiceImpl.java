package com.dndtools.api.services;

import com.dndtools.api.models.CalendarDnd;
import com.dndtools.api.repository.CalendarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CalendarServiceImpl {

    @Autowired
    private CalendarRepository calendarRepository;

    public CalendarDnd getCalendarByUuid(UUID uuid) {
        return calendarRepository.findCalendarDndByUuid(uuid);
    }
}
