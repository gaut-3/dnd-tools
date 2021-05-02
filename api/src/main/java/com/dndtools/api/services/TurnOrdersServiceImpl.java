package com.dndtools.api.services;

import com.dndtools.api.models.TurnOrders;
import com.dndtools.api.repository.TurnOrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TurnOrdersServiceImpl {

    private static final long serialVersionUID = 1L;

    @Autowired
    private TurnOrdersRepository turnOrdersRepository;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private final String NEW_CHARACTER_EXAMPLE_NAME = "Example Name 123";

    public TurnOrders getAllTurnOrders() {
        String currentUserId = userDetailsService.getCurrentUserId();
        return turnOrdersRepository.findTurnOrdersByUserId(currentUserId);
    }

    public TurnOrders createTurnorder(TurnOrders turnOrders) {
        return turnOrdersRepository.save(turnOrders);
    }
}
