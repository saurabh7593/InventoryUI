import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { SimpleSnackbar } from './../Notification/SnackBar';
import { makeStyles } from '@material-ui/core/styles';

export  const EditDialog=(props)=>{
  const [open, setOpen] = React.useState(true);
  const [openNotification,setNotification]=React.useState(false);

  const handleNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification(false);
  };

  const handleClose = () => {
    setOpen(false);
    props.history.push({pathname: '/'})
  };

  const [values, setValues] = React.useState(
    {...props.location.book.card}
);

const handleChange = name => event => {
 setValues({ ...values, [name]: event.target.value });
};

let saveChanges=()=>{
      console.log("values are : ",values)
      setNotification(true);

     axios.post(`http://localhost:8080/addBook`, {
        ...values
      })
        .then(res => {
          axios.post(`http://localhost:8080/editThisBook`,{
            ...values
          })
          .then(res => {
            console.log("Edit" ,res && res.data);
            setTimeout(() => {
              handleClose();
             props.history.push({pathname: '/'})
           }, 1000);
          })
        })
}
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
  const classes = useStyles();


  return (
    <div>
    {openNotification && <SimpleSnackbar handleClose={handleNotificationClose} message= {`Edited '${props.location.book.card.title}' Succesfully`}> </SimpleSnackbar>}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Book"}</DialogTitle>
        <DialogContent>
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
        value={props.location.book.card.authors.toString()}
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
    </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveChanges} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
