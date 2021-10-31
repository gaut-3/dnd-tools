package com.dndtools.api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "calendar")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalendarDnd {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    UUID uuid;

    @ElementCollection
    List<String> dates;

    @ElementCollection
    List<String> userDates;


    private int userId;




}
