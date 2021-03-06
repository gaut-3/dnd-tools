package com.dndtools.api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DMCharacters {

    List<DnDCharacter> dmCharacterList;
    List<DnDCharacter> playerList;
}
