import React, {Component} from "react";
import CharactersService from "../services/characters.service";
import CharacterItem from "../items/character.item";
import CharacterComponentClassNameModel from "../models/CharacterComponentClassNameModel"
import NPCharacterComponentClassNameModel from "../models/NPCharacterComponentClassNameModel"
import "../styles/board-character.component.css";

export default class BoardCharacters extends Component {
    constructor(props) {
        super(props);
        this.tablePlayerCharacter = React.createRef();
        this.tableNPCharacter = React.createRef();
        this.state = {
            content: "",
            dmCharacterList: null,
            playerList: null,
            characterClassNames: new CharacterComponentClassNameModel(),
            npCharacterClassNames: new NPCharacterComponentClassNameModel(),
        };
    }

    componentDidMount() {
        this.getAllCharacters();
    }

    getAllCharacters = () => {
        CharactersService.getAllCharacters().then(
            response => {
                this.setState({
                    content: response.data,
                    dmCharacterList: response.data.map((character) => {
                        if (!character.isPlayer) {
                            return <CharacterItem key={character.id} id={character.id} isNonPlayer={true}
                                                  handleDelete={this.deleteThisCharacter}
                                                  characterClassNameModel={this.state.npCharacterClassNames}
                                                  character={character}/>
                        }
                    }),
                    playerList: response.data.map((character) => {
                        if (character.isPlayer) {
                            return <CharacterItem key={character.id} id={character.id}
                                                  characterClassNameModel={this.state.characterClassNames}
                                                  handleDelete={this.deleteThisCharacter}
                                                  isNonPlayer={false} character={character}/>
                        }
                    })
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    createCharacter(tableNode, isPlayer) {
        CharactersService.addNewCharacter(isPlayer).then(
            response => {
                let data = response.data;
                if (isPlayer) {
                    this.state.playerList.push(<CharacterItem key={data.id} id={data.id}
                                                              handleDelete={this.deleteThisCharacter}
                                                              characterClassNameModel={this.state.characterClassNames}
                                                              isPlayer={true} character={data}/>)
                } else {
                    this.state.dmCharacterList.push(<CharacterItem key={data.id} id={data.id}
                                                                   handleDelete={this.deleteThisCharacter}
                                                                   characterClassNameModel={this.state.npCharacterClassNames}
                                                                   isPlayer={false} character={data}/>)
                }

                this.setState({playerList: this.state.playerList, dmCharacterList: this.state.dmCharacterList});
            },
        )
    }

    deleteThisCharacter = (id, isPlayer) => {
        console.log("after " + id);
        CharactersService.deleteCharacter(id);
        this.getAllCharacters();
        this.setState({playerList: this.state.playerList, dmCharacterList: this.state.dmCharacterList});
    }


    render() {
        return (
            <div className="card">
                <h3 className="card-header text-center font-weight-bold text-uppercase py-4">Characters</h3>
                <div className="card-body">
                    <div id="tablePlayerCharacter" className="table-editable table-hover container-fluid">
                        <span className="table-add float-right mb-3 mr-2">
                            <button className="btn"
                                    onClick={() => this.createCharacter(this.tablePlayerCharacter, true)}>
                                Add new Player Character
                            </button>
                            <a href="#!" className="text-success">
                                <i className="fas fa-plus fa-2x" aria-hidden="true"/>
                            </a>
                        </span>
                        <span className="table-add float-right mb-3 mr-2">
                            <a href="#!" className="text-success">
                                <i className="fas fa-plus fa-2x" aria-hidden="true"/>
                            </a>
                        </span>
                        <table ref={this.tablePlayerCharacter} className={this.state.characterClassNames.table}>
                            <thead>
                            <tr className={this.state.characterClassNames.row}>
                                <th className={this.state.characterClassNames.columnDelete + " text-center"}>?</th>
                                <th className={this.state.characterClassNames.columnName + " text-center"}>Name</th>
                                <th className={this.state.characterClassNames.columnRace + " text-center"}>Race</th>
                                <th className={this.state.characterClassNames.columnArmorClass + " text-center"}>AC</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.playerList}
                            </tbody>
                        </table>
                    </div>
                    <div id="tableNPCharacter" className="table-editable table-hover container-fluid">
                      <span className="table-add float-right mb-3 mr-2">
                          <button className="btn" onClick={() => this.createCharacter(this.tableNPCharacter, false)}>
                            Add new Non Player Character
                         </button>
                          <a href="#!" className="text-success">
                              <i className="fas fa-plus fa-2x" aria-hidden="true"/>
                          </a>
                      </span>
                        <table ref={this.tableNPCharacter} className={this.state.npCharacterClassNames.table}>
                            <thead>
                            <tr className={this.state.npCharacterClassNames.row}>
                                <th className={this.state.npCharacterClassNames.columnDelete + " text-center"}>?</th>
                                <th className={this.state.npCharacterClassNames.columnName + " text-center"}>Name</th>
                                <th className={this.state.npCharacterClassNames.columnRace + " text-center"}>Race</th>
                                <th className={this.state.npCharacterClassNames.columnArmorClass + " text-center"}>AC</th>
                                <th className={this.state.npCharacterClassNames.columnHealth + " text-center"}>HP</th>
                                <th className={this.state.npCharacterClassNames.columnComment + " text-center"}>Comment</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.dmCharacterList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
