package com.dndtools.api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "characters")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DnDCharacter {

    @Id
    private String id;

    private String name;
    private String race;
    private int initative;
    private String health;
    private String armorClass;
    private String comment;
    private boolean isNonPlayer;

    private String userId;

    public DnDCharacter (String name, String userId, boolean isNonPlayer) {
        this.name = name;
        this.userId = userId;
        this.isNonPlayer = isNonPlayer();
    }
}
