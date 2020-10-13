package com.dndtools.api.repository;

import com.dndtools.api.models.DMCharacters;
import com.dndtools.api.models.DnDCharacter;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DMCharactersRepository extends MongoRepository<DMCharacters, String> {
    List<DMCharacters> findAllByUserId(String userId);

}
