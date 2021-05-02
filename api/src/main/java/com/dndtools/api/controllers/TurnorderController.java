package com.dndtools.api.controllers;

import com.dndtools.api.models.DnDCharacter;
import com.dndtools.api.models.TurnOrders;
import com.dndtools.api.services.DnDCharacterServiceImpl;
import com.dndtools.api.services.TurnOrdersServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/turnorder")
public class TurnorderController {

    @Autowired
    TurnOrdersServiceImpl turnOrdersService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('DM')")
    public TurnOrders getAllCharacters() {
        return turnOrdersService.getAllTurnOrders();
    }
}