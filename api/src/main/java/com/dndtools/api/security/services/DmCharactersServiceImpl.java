package com.dndtools.api.security.services;

import com.dndtools.api.models.DMCharacters;
import com.dndtools.api.repository.DMCharactersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DmCharactersServiceImpl {

    private static final long serialVersionUID = 1L;

    @Autowired
    private DMCharactersRepository dmCharactersRepository;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    public List<DMCharacters> getAllDMCharactersFromUser() {
        String currentUserId = userDetailsService.getCurrentUserId();
        return dmCharactersRepository.findAllByUserId(currentUserId);
    }
}
