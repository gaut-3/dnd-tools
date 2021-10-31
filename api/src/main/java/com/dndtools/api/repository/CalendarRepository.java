package com.dndtools.api.repository;

import com.dndtools.api.models.CalendarDnd;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;


public interface CalendarRepository extends CrudRepository<CalendarDnd, String> {
    CalendarDnd findCalendarDndByUuid(UUID uuid);
}
