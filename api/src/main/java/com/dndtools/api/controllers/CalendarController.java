package com.dndtools.api.controllers;

import com.dndtools.api.models.CalendarDnd;
import com.dndtools.api.models.Character;
import com.dndtools.api.services.CalendarServiceImpl;
import com.dndtools.api.services.CharacterServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/calendar")
public class CalendarController {

    @Autowired
    CalendarServiceImpl calendarService;


    @GetMapping("/{uuid}")
    public CalendarDnd getCalendar(@PathVariable UUID uuid) {
        return calendarService.getCalendarByUuid(uuid);
    }

}