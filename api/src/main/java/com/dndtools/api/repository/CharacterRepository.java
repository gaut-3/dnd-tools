package com.dndtools.api.repository;

import com.dndtools.api.models.Character;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CharacterRepository extends MongoRepository<Character, String> {
    List<Character> findAllByUserId(String userId);

    List<Character> findAllByUserIdAndPlayerIs(String userId, boolean isPlayer);

}
