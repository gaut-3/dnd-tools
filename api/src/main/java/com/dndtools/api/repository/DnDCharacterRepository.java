package com.dndtools.api.repository;

import com.dndtools.api.models.DnDCharacter;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DnDCharacterRepository extends MongoRepository<DnDCharacter, String> {
    List<DnDCharacter> findAllByUserId(String userId);

    List<DnDCharacter> findAllByUserIdAndNonPlayerIs(String userId, boolean isNonPlayer);

}
