import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default function CheckboxesGroup({ onCheckBoxChecked }) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        below18: false,
        between18and44: false,
        above45: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });

    };

    onCheckBoxChecked(state)

    // useEffect(() => {
    //     onCheckBoxChecked(state)
    //     // console.log(state);
    //     return () => {

    //     }
    // }, [handleChange])

    const { below18, between18and44, above45 } = state;
    const error = [below18, between18and44, above45].filter((v) => v).length !== 2;

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">select category</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={below18} onChange={handleChange} name="below18" />}
                        label="below 18"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={between18and44} onChange={handleChange} name="between18and44" />}
                        label="18 - 44"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={above45} onChange={handleChange} name="above45" />}
                        label="above 45"
                    />
                </FormGroup>

            </FormControl>
        </div>
    );
}
