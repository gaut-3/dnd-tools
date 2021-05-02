import React, {Component, Fragment} from 'react';
import CharactersService from "../services/characters.service";

class CharacterItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlayer: this.props.isPlayer,
            id: this.props.id,
        }
    }

    updateCharacter() {
        let nameInput = this.nameInput.current.innerHTML;
        let raceInput = this.raceInput.current.innerHTML;
        let armorClass = this.armorClassInput.current.innerHTML;
        if (!this.state.isPlayer) {
            CharactersService.updateCharacter(this.state.id,
                nameInput,
                raceInput,
                armorClass,
                this.state.isPlayer,
                this.healthInput.current.innerHTML,
                this.commentInput.current.innerHTML);
        } else {
            CharactersService.updateCharacter(this.state.id,
                nameInput,
                raceInput,
                armorClass,
                this.state.isPlayer, "", "");
        }
        /*.then(
            response => {
                let data = response.data;
                this.state.playerList.push()
                this.state.playerList.push(<CharacterItem key={data.id} id={data.id}
                                                          characterClassNameModel={this.state.characterClassNames}
                                                          isNonPlayer={isNonPlayer} character={data}/>)
            },
            )*/
    }

    renderStandardField = (name, race, armorClass) => {
        return (
            <Fragment>
                <td className={this.props.characterClassNameModel.columnDelete}>
                    {/*<button onClick={() => this.deleteThisCharacter(this.state.id)}>Delete</button>*/}
                    <button onClick={() => this.props.handleDelete(this.state.id, this.state.isPlayer)}>Delete</button>
                    {/* <button className="btn btn-danger"
                            onClick={() => this.state.handleDelete(this.idField)}>
                        DEL
                    </button>*/}
                </td>
                <td className={this.props.characterClassNameModel.columnName} contentEditable="true"
                    ref={this.nameInput}
                    onInputCapture={() => this.updateCharacter()}>{name}</td>
                <td className={this.props.characterClassNameModel.columnRace} contentEditable="true"
                    ref={this.raceInput}
                    onInputCapture={() => this.updateCharacter()}>{race}</td>
                <td className={this.props.characterClassNameModel.columnArmorClass} contentEditable="true"
                    ref={this.armorClassInput} onInputCapture={() => this.updateCharacter()}>{armorClass}</td>
            </Fragment>
        );
    }

    renderNPCFields = (health, comment) => {
        if (this.state.isPlayer === false) {
            return (<Fragment>
                <td className={this.props.characterClassNameModel.columnHealth} contentEditable="true"
                    ref={this.healthInput}
                    onInputCapture={() => this.updateCharacter()}>{health}</td>
                <td className={this.props.characterClassNameModel.columnComment} contentEditable="true"
                    ref={this.commentInput}
                    onInputCapture={() => this.updateCharacter()}>{comment}</td>
            </Fragment>);
        }
    }


    render() {

        const {name, race, initative, health, armorClass, comment} = this.props.character;
        this.idField = React.createRef()
        this.nameInput = React.createRef();
        this.raceInput = React.createRef();
        this.initativeInput = React.createRef();
        this.healthInput = React.createRef();
        this.armorClassInput = React.createRef();
        this.commentInput = React.createRef();
        return (
            <tr id={this.state.id} ref={this.idField} className={this.props.characterClassNameModel.row}>
                {this.renderStandardField(name, race, armorClass)}
                {this.renderNPCFields(health, comment)}
            </tr>
        )
    }
}

export default CharacterItem;