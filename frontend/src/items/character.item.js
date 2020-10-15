import React from 'react';

class CharacterItem extends React.Component {

    render() {
        const isNonPlayer = this.props.isNonPlayer;
        const characterClassNameModel = this.props.characterClassNameModel;
        const id = this.props.id;
        const {name, race, initative, health, armorClass, comment} = this.props.character;
        return (
            <tr id={id} className={characterClassNameModel.row}>
                <td className={characterClassNameModel.columnDelete}>
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                </td>
                <td className={characterClassNameModel.columnName} contentEditable="true"> {name}</td>
                <td className={characterClassNameModel.columnRace} contentEditable="true"> {race}</td>
                <td className={characterClassNameModel.columnArmorClass} contentEditable="true">{armorClass}</td>
                {isNonPlayer && [
                    <td className={characterClassNameModel.columnHealth} contentEditable="true">{health}</td>,
                    <td className={characterClassNameModel.columnComment} contentEditable="true">{comment}</td>]
                }
            </tr>
        )
    }
}

export default CharacterItem;