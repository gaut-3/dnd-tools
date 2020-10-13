import React from 'react';

class CharacterItem extends React.Component {
    render() {
        const {name, race, initative, health, armorClass, comment, isPlayer, isDeactivated} = this.props.character;
        return (
            <tr>
                <td className="pt-3-half" contentEditable="true"> {name}</td>
                <td className="pt-3-half" contentEditable="true"> {race}</td>
                <td className="pt-3-half" contentEditable="true">{armorClass}</td>
                <td className="pt-3-half">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                </td>
                <td>
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                </td>
            </tr>
        )
    }
}

export default CharacterItem;