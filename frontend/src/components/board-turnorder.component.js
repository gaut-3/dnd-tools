import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete'
import UserService from "../services/user.service";
import { withStyles } from '@material-ui/core/styles';

const useStyles = () => ({
    classTextField: {
        marginTop: 16, marginBottom: 8
    },
});


class BoardTurnOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: "",
            newValue: "",
        };
    }


    setValue = (value) => {
        console.log(value);
    }

    componentDidMount() {
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data,
                    value: items[0],
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


    render() {
        const { classes } = this.props;
        return (
            <div className="container">
                <header className="jumbotron">
                    <div>
                            <Autocomplete
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                style={{width: 300, display: "inline-block"}}
                                onChange={(event, newValue) => {
                                    this.setValue(newValue);
                                }}
                                options={items.map((option) => option.value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search input"
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{...params.InputProps, type: 'search'}}
                                    />
                                )}
                            />

                        <TextField className={classes.classTextField} id="outlined-basic" label="Outlined" variant="outlined"/>
                        <TextField className={classes.classTextField} id="outlined-basic" label="Outlined" variant="outlined"/>
                        <TextField className={classes.classTextField} id="outlined-basic" label="Outlined" variant="outlined"/>
                        <TextField className={classes.classTextField} id="outlined-basic" label="Outlined" variant="outlined"/>
                        <TextField className={classes.classTextField} id="outlined-basic" label="Outlined" variant="outlined"/>
                    </div>
                    <h3>{this.state.content.characterList}</h3>
                </header>
            </div>
        );
    }
}


export default withStyles(useStyles)(BoardTurnOrder);


const items = [
    {value: 'apple'},
    {value: 'pear'},
    {value: 'orange'},
    {value: 'grape'},
    {value: 'banana'},
];
