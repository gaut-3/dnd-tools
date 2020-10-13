package com.dndtools.api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Document(collection = "turnorders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TurnOrder {
  @Id
  private String id;

  @NotBlank
  private String name;

  @NotBlank
  @Size(max = 20)
  private Date lastModifiedDate;

  @Size(max = 50)
  @Email
  private List<DnDCharacter> dnDCharacters;

  @DBRef
  private String userId;

}