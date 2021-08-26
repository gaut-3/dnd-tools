package com.dndtools.api.services;

import com.dndtools.api.models.Character;
import com.dndtools.api.repository.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CharacterServiceImpl {

    private static final long serialVersionUID = 1L;

    @Autowired
    private CharacterRepository dndCharacterRepository;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private final String NEW_CHARACTER_EXAMPLE_NAME = "Example Name 123";

    public List<Character> getAllCharactersFromUser() {
        String currentUserId = userDetailsService.getCurrentUserId();
        return dndCharacterRepository.findAllByUserId(currentUserId);
    }

    public Character createCharacter(Character character){
        String currentUserId = userDetailsService.getCurrentUserId();
        character.setName(NEW_CHARACTER_EXAMPLE_NAME);
        character.setUserId(currentUserId);
        return dndCharacterRepository.insert(character);
    }

    public Character updateCharacter(Character character) {
        character.setUserId(userDetailsService.getCurrentUserId());
        return dndCharacterRepository.save(character);
    }

    public void deleteCharacter(String id) {
       dndCharacterRepository.deleteById(id);
    }
}
