package com.dndtools.api.repository;

import com.dndtools.api.models.TurnOrder;
import com.dndtools.api.models.TurnOrders;
import com.dndtools.api.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


public interface TurnOrdersRepository extends MongoRepository<TurnOrders, String> {
  TurnOrders findTurnOrdersByUserId(String id);
}
