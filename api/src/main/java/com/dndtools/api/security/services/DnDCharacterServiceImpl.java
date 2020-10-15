package com.dndtools.api.security.services;

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

    public DnDCharacter createCharacter(boolean isNonPlayer){
        String currentUserId = userDetailsService.getCurrentUserId();
        return dndCharacterRepository.insert(new DnDCharacter(NEW_CHARACTER_EXAMPLE_NAME, currentUserId, isNonPlayer));
    }
}
