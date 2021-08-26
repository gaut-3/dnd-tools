package com.dndtools.api.controllers;

import com.dndtools.api.models.Character;
import com.dndtools.api.services.CharacterServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/dmcharacters")
public class DnDCharactersController {

    @Autowired
    CharacterServiceImpl dndCharactersService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('DM')")
    public List<Character> getAllCharacters() {
        return dndCharactersService.getAllCharactersFromUser();
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('DM')")
    public Character createCharacter(@RequestBody Character character) {
        return dndCharactersService.createCharacter(character);
    }

    @PatchMapping("/update")
    @PreAuthorize("hasRole('DM')")
    public Character updateCharacter(@RequestBody Character character) {
        return dndCharactersService.updateCharacter(character);
    }

    @DeleteMapping("/delete")
    @PreAuthorize("hasRole('DM')")
    public void deleteCharacter(@RequestParam String id) {
        dndCharactersService.deleteCharacter(id);
    }
}