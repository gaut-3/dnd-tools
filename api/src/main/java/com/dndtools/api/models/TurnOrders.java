package com.dndtools.api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "turnorders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TurnOrders {
    @Id
    private String id;

    List<TurnOrder> turnOrders;

    @DBRef
    private String userId;

}