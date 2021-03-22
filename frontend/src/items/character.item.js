import React from 'react';
import CharactersService from "../services/characters.service";

class CharacterItem extends React.Component {


    updateCharacter() {
        let isNonPlayer = this.state.isNonPlayer;
        let nameInput = this.nameInput.current.innerHTML;
        let raceInput = this.raceInput.current.innerHTML;
        let armorClass = this.armorClassInput.current.innerHTML;
        if (isNonPlayer) {
            CharactersService.updateCharacter(this.state.id,
                nameInput,
                raceInput,
                armorClass,
                isNonPlayer,
                this.healthInput.current.innerHTML,
                this.commentInput.current.innerHTML);
        } else {
            CharactersService.updateCharacter(this.state.id,
                nameInput,
                raceInput,
                armorClass,
                isNonPlayer, "", "");
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


    render() {
        const isNonPlayer = this.props.isNonPlayer;
        const characterClassNameModel = this.props.characterClassNameModel;
        const id = this.props.id;
        this.state = {
            isNonPlayer: this.props.isNonPlayer,
            id: this.props.id,
            handleDelete: this.props.handleDelete
        }

        const {name, race, initative, health, armorClass, comment} = this.props.character;
        this.idField = React.createRef()
        this.nameInput = React.createRef();
        this.raceInput = React.createRef();
        this.initativeInput = React.createRef();
        this.healthInput = React.createRef();
        this.armorClassInput = React.createRef();
        this.commentInput = React.createRef();
        return (
            <tr id={id} ref={this.idField} className={characterClassNameModel.row}>
                <td className={characterClassNameModel.columnDelete}>
                    <Delete
                        data={this.idField}
                        handleClick={() => this.props.handleDelete(this.idField)} // Pass the id here
                    />
                   {/* <button className="btn btn-danger"
                            onClick={() => this.state.handleDelete(this.idField)}>
                        DEL
                    </button>*/}
                </td>
                <td className={characterClassNameModel.columnName} contentEditable="true" ref={this.nameInput}
                    onInputCapture={() => this.updateCharacter()}>{name}</td>
                <td className={characterClassNameModel.columnRace} contentEditable="true" ref={this.raceInput}
                    onInputCapture={() => this.updateCharacter()}>{race}</td>
                <td className={characterClassNameModel.columnArmorClass} contentEditable="true"
                    ref={this.armorClassInput} onInputCapture={() => this.updateCharacter()}>{armorClass}</td>
                {isNonPlayer && [
                    <td className={characterClassNameModel.columnHealth} contentEditable="true" ref={this.healthInput}
                        onInputCapture={() => this.updateCharacter()}>{health}</td>,
                    <td className={characterClassNameModel.columnComment} contentEditable="true" ref={this.commentInput}
                        onInputCapture={() => this.updateCharacter()}>{comment}</td>]
                }
            </tr>
        )
    }
}

class Delete extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <button onClick={this.props.handleClick}>Delete</button>;
    }
}

export default CharacterItem;