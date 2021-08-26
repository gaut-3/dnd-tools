package com.dndtools.api.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "characters")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Character {

    @Id
    private String id;

    private String name;
    private String race;
    private int initative;
    private String health;
    private String armorClass;
    private String comment;

    @JsonProperty("isPlayer")
    private boolean isPlayer;

    private String userId;

    public Character(String name, String userId, boolean isPlayer) {
        this.name = name;
        this.userId = userId;
        this.isPlayer = isPlayer;
    }

    public Character(String id) {
        this.id = id;
    }
}
