import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade,makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

const MenuBarPanel=(props)=>{
    const classes = useStyles();
    const[query,setQuery]=useState();
    let redirectToSearch=(e)=>{
      console.log(props);
      window.location.href=`/search?query=${query}`
    }

    return (
        <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Books Inventory
          </Typography>
          <Link to="/listOfBooks"><Button >Home</Button></Link>
          <Link to="/googleBookList"><Button >View Google Books</Button></Link>
          <Link to="/auditReport"><Button >Audit Report</Button></Link>
          <TextField
            label="Find Your Book"
            onChange={e => setQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon onClick={e => redirectToSearch(query)} />
                  </IconButton>
                </InputAdornment>
              )
            }
            }
          />

        </Toolbar>

      </AppBar>
    </div>
      </React.Fragment>
    )
}
export default MenuBarPanel;