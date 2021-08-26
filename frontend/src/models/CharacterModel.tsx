class CharacterComponentClassNameModel {
    acValue: value.ac ? value.ac : "",
    raceValue: value.race ? value.race : "",
    hpValue: value.hp ? value.hp : "",


    constructor() {
        this.columnDelete = "col-1"
        this.columnName = "col-4"
        this.columnRace = "col-4"
        this.columnArmorClass = "col-3"
        this.row = "d-lg-flex d-md-flex"
        this.table = "table text-center table-responsive-sm"
    }

}

export default CharacterComponentClassNameModel;