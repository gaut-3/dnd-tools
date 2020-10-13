package com.dndtools.api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class DnDCharacter {

    private String name;
    private String race;
    private int initative;
    private String health;
    private String armorClass;
    private String comment;
    boolean isDeactivated;
}
