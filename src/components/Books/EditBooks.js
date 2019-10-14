import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './books.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
  }
}));

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export const EditABook=(props) =>{
  const classes = useStyles();
  const [values, setValues] = React.useState(
       {...props.location.book.card}
  );

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  let saveChanges=()=>{
    console.log("values are : ",values)
    axios.post(`http://localhost:8080/editThisBook`,{
      ...values
    })
    .then(res => {
      console.log(res.data);
    })

  }

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        disabled
        id="standard-disabled"
        label="Title"
        className={classes.textField}
        value={props.location.book.card.title}
        margin="normal"
      />
      <TextField
        disabled
        id="standard-desc"
        label="desc"
        value={props.location.book.card.description}
        className={classes.textField}
        margin="normal"
      />
      <TextField
        disabled
        required
        id="standard-author"
        label="Authors"
        value="author"
        className={classes.textField}
        margin="normal"
      />
      <TextField
        id="standard-price"
        label="Price"
        value={values.price}
        className={classes.textField}
        margin="normal"
        type="number"
        onChange={handleChange('price')}
      />
      <TextField
        id="standard-quantity"
        label="Quantity"
        value={values.quantity}
        className={classes.textField}
        margin="normal"
        type="number"
        onChange={handleChange('quantity')}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        onClick={saveChanges}
        startIcon={<SaveIcon />
        }
      >Save</Button>
      {console.log("props Edit Boks",props.location.book.card.title)}
    </form>
  );
    }
