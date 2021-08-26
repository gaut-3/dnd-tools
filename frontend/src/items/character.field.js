import React, {Component, Fragment} from 'react';
import CharactersService from "../services/characters.service";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
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

class CharacterField extends Component {

    constructor(props) {
        super(props);
        const {classes} = this.props;
        this.refId= React.createRef();
        this.refNameField = React.createRef();
        this.refRaceField = React.createRef();
        this.refIntField = React.createRef();
        this.refHPField = React.createRef();
        this.refACInput = React.createRef();
        this.refCommentField = React.createRef();
        this.state = {
            counter: this.props.counter,
            setValue: this.setValue,
            acValue: "",
            raceValue: "",
            hpValue: "",

        }
    }

    setValue = (value) => {
        console.log(value.ac);
        this.setState({
            acValue: value.ac ? value.ac : "",
            raceValue: value.race ? value.race : "",
            hpValue: value.hp ? value.hp : "",
        });
        this.props.initative(value);
    }

    showAlert() {
        console.log('Hello World');
    }

    renderAdditionalField = (isPlayer) => {
        const {classes} = this.props;
        console.log(isPlayer);
        if (isPlayer) {
            return "";
        } else {
            return (
                <Fragment>
                    <TextField ref={this.refACInput} className={[classes.hp, classes.marginTextField]} id="outlined-basic" label="AC"
                               inputProps={{maxLength: 3}}
                               value={this.state.acValue}
                               variant="outlined"/>
                    <TextField ref={this.refRaceField} className={[classes.marginTextField]} id="outlined-basic" label="Race"
                               value={this.state.raceValue}
                               variant="outlined"/>
                    <TextField ref={this.refCommentField}  className={[classes.marginTextField]} multiline
                               rowsMax={4} id="outlined-basic" label="Comment"
                               variant="outlined"/>
                </Fragment>
            )
        }
    }


    render() {
        const {classes} = this.props;
        return (
            <div ref={this.refId}>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    style={{width: 300, display: "inline-block"}}
                    onChange={(event, newValue) => {
                        let item = items.find(item => item.value === newValue);
                        console.log("id ", this.refId.current);
                        this.setValue(item);
                    }}
                    options={items.map((option) => option.value)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Character"
                            margin="normal"
                            variant="outlined"
                            InputProps={{...params.InputProps, type: 'search'}}
                        />
                    )}
                />

                <TextField ref={this.refIntField} className={[classes.initative, classes.marginTextField]} id="outlined-basic"
                           label="Int"
                           inputProps={{maxLength: 3}}
                           variant="outlined"/>
                <TextField ref={this.refHPField} className={[classes.hp, classes.marginTextField]} id="outlined-basic" label="HP"
                           value={this.state.hpValue}
                           inputProps={{maxLength: 4}}
                           variant="outlined"/>
                {this.renderAdditionalField(this.props.isPlayer)}
            </div>
        )
    }
}

export default withStyles(useStyles)(CharacterField);

const items = [
    {value: 'apple', hp: 12, ac: 12, race: 12, comment: ''},
    {value: 'pear'},
    {value: 'orange'},
    {value: 'grape'},
    {value: 'banana'},
];
