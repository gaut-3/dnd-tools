package com.dndtools.api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TurnOrders {
    @Id
    private String id;

    List<TurnOrder> turnOrders;

    private String userId;

}