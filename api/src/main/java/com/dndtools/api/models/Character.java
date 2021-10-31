package com.dndtools.api.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "characters")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Character {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;
    private String race;
    private int initative;
    private String health;
    private String armorClass;
    private String comment;
    private boolean isPlayer;

    private String userId;

    public Character(String name, String userId, boolean isPlayer) {
        this.name = name;
        this.userId = userId;
        this.isPlayer = isPlayer;
    }


}
