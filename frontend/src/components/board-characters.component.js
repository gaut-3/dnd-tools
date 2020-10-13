import React, { Component } from "react";

import CharactersService from "../services/characters.service";
import CharacterItem from "../items/characterItem";

export default class BoardCharacters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      dmCharacterList: null,
      playerList: null
    };
  }

  componentDidMount() {
    CharactersService.getAllCharacters().then(
      response => {
        this.setState({
          content: response.data,
          dmCharacterList: response.data[0].dmCharacterList.map ((character, i) => {
            return <CharacterItem  key={i}  character = {character} />
          }),
          playerList: response.data[0].playerList.map ((character, i) => {
            return <CharacterItem  key={i}  character = {character} />
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

  render() {
    return (
    <div className="card">
      <h3 className="card-header text-center font-weight-bold text-uppercase py-4">Characters</h3>
      <div className="card-body">
        <div id="table" className="table-editable">
      <span className="table-add float-right mb-3 mr-2"><a href="#!" className="text-success"><i
          className="fas fa-plus fa-2x" aria-hidden="true"></i></a></span>
          <table className="table table-bordered table-responsive-md table-striped text-center">
            <thead>
            <tr className="d-inline-flex">
              <th className="text-center col-4">Name</th>
              <th className="text-center col-4">Race</th>
              <th className="text-center col-1">AC</th>
              <th className="text-center col-2">Deactivate</th>
              <th className="text-center col-1">Delete</th>
            </tr>
            </thead>
            <tbody>
              {/*{this.state.playerList}*/}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
  }
}
