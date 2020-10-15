import CharacterComponentClassNameModel from "./CharacterComponentClassNameModel";

class NPCharacterComponentClassNameModel extends CharacterComponentClassNameModel{
    columnHealth: string;
    columnComment: string;

    constructor() {
        super();
        this.columnDelete = "col-1"
        this.columnName = "col-3"
        this.columnRace = "col-3"
        this.columnArmorClass = "col-1"
        this.columnHealth = "col-1"
        this.columnComment = "col-3"
    }

}

export default NPCharacterComponentClassNameModel;