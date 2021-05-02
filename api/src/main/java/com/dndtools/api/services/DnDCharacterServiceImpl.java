package com.dndtools.api.services;

import com.dndtools.api.models.DnDCharacter;
import com.dndtools.api.repository.DnDCharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DnDCharacterServiceImpl {

    private static final long serialVersionUID = 1L;

    @Autowired
    private DnDCharacterRepository dndCharacterRepository;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private final String NEW_CHARACTER_EXAMPLE_NAME = "Example Name 123";

    public List<DnDCharacter> getAllCharactersFromUser() {
        String currentUserId = userDetailsService.getCurrentUserId();
        return dndCharacterRepository.findAllByUserId(currentUserId);
    }

    public DnDCharacter createCharacter(DnDCharacter dnDCharacter){
        String currentUserId = userDetailsService.getCurrentUserId();
        dnDCharacter.setName(NEW_CHARACTER_EXAMPLE_NAME);
        dnDCharacter.setUserId(currentUserId);
        return dndCharacterRepository.insert(dnDCharacter);
    }

    public DnDCharacter updateCharacter(DnDCharacter dnDCharacter) {
        dnDCharacter.setUserId(userDetailsService.getCurrentUserId());
        return dndCharacterRepository.save(dnDCharacter);
    }

    public void deleteCharacter(String id) {
       dndCharacterRepository.deleteById(id);
    }
}
