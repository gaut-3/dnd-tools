package com.dndtools.api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TurnOrder {

    private String name;

    @Size(max = 20)
    private Date lastModifiedDate;

    @Size(max = 50)
    private List<Character> characters;

}