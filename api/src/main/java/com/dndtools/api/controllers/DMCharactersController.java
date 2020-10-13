package com.dndtools.api.controllers;

import com.dndtools.api.models.DMCharacters;
import com.dndtools.api.security.services.DmCharactersServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/dmcharacters")
public class DMCharactersController {

    @Autowired
    DmCharactersServiceImpl dmCharactersService;
    
    @GetMapping("/all")
    @PreAuthorize("hasRole('DM')")
    public List<DMCharacters> getAllCharacters() {
        return dmCharactersService.getAllDMCharactersFromUser();
    }

}