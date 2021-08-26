package com.dndtools.api.controllers;

import com.dndtools.api.models.Character;
import com.dndtools.api.models.TurnOrder;
import com.dndtools.api.models.TurnOrders;
import com.dndtools.api.services.TurnOrdersServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
/*
    @PostMapping("/create")
    @PreAuthorize("hasRole('DM')")
    public Character createCharacter(@RequestBody TurnOrder turnOrder) {
        return turnOrdersService.createCharacter(dnDCharacter);
    }*/
}