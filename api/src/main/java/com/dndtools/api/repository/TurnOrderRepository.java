package com.dndtools.api.repository;

import com.dndtools.api.models.TurnOrder;
import com.dndtools.api.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


public interface TurnOrderRepository extends MongoRepository<TurnOrder, String> {
  List<TurnOrder> findAllByUserIdOrderByLastModifiedDate(String userId);

  TurnOrder findTurnOrderById(String id);
}
