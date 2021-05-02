package com.dndtools.api.controllers;

import com.dndtools.api.models.DnDCharacter;
import com.dndtools.api.services.DnDCharacterServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/dmcharacters")
public class DnDCharactersController {

    @Autowired
    DnDCharacterServiceImpl dndCharactersService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('DM')")
    public List<DnDCharacter> getAllCharacters() {
        return dndCharactersService.getAllCharactersFromUser();
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('DM')")
    public DnDCharacter createCharacter(@RequestBody DnDCharacter dnDCharacter) {
        return dndCharactersService.createCharacter(dnDCharacter);
    }

    @PatchMapping("/update")
    @PreAuthorize("hasRole('DM')")
    public DnDCharacter updateCharacter(@RequestBody DnDCharacter dnDCharacter) {
        return dndCharactersService.updateCharacter(dnDCharacter);
    }

    @DeleteMapping("/delete")
    @PreAuthorize("hasRole('DM')")
    public void deleteCharacter(@RequestParam String id) {
        dndCharactersService.deleteCharacter(id);
    }
}