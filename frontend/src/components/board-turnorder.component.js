import React from "react";
import {Component, Fragment} from "react";
import UserService from "../services/user.service";
import CharacterField from "../items/character.field";
import { withStyles } from '@material-ui/core/styles';

const useStyles = () => ({
    marginTextField: {
        marginTop: 16,
        marginBottom: 8,
        marginLeft: 2
    },
    hp: {
        width: 70
    },
    initative: {
        width: 70
    }
});

class BoardTurnOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: "",
            newValue: "",
            characterFields: [],
            counter: 0
        };
    }




    componentDidMount() {
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data,
                    setValue: this.setValue
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

    addNewCharacterField = (isPlayer) => {
        this.state.counter++;
        this.state.characterFields.push(<CharacterField isPlayer={isPlayer} counter={this.state.counter} initative={this.initative}/>);
        this.setState({characterFields: this.state.characterFields});
    }

    initative = (number) => {
        console.log(number);
    }

    sortCharacters = () => {
        console.log(this.state.characterFields[0].props.initative)
        //this.state.characterFields[0].showAlert()
    }

    render() {
        const {classes} = this.props;
        console.log(this.state.characterFields);
        return (
            <div className="container">
                <header className="jumbotron">
                    <div>
                        <button onClick={() => this.addNewCharacterField(true)}>
                            Add new Player Character
                        </button>
                    </div>
                    <div>
                        <button onClick={() => this.addNewCharacterField(false)}>
                            Add new Non Player Character
                        </button>
                    </div>
                    <div>
                        <button onClick={() => this.sortCharacters()}>
                            Sort
                        </button>
                    </div>
                    <div>
                        {this.state.characterFields}
                    </div>

                </header>
            </div>
        );
    }
}


export default withStyles(useStyles)(BoardTurnOrder);


