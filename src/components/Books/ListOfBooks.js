import React, { Component, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { SimpleSnackbar } from './../Notification/SnackBar';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


class ListOfBooks extends Component {

  constructor(props) {
    super();
    this.props = props;
    this.state = {
      books: [],
      inventoryBooks: [],
      searchAvailable: true,
      open: false,
      message: '',
      params: '',
      isGooglePage: RegExp('google*').test(window.location.href)
    }
    console.log("ListOfBooks",props);

  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      open: false
    });
  };

  componentDidMount() {
    console.log("Component did mount" + this.state.isGooglePage);
    this.state.isGooglePage ? this.fetchGoogleBooks() : this.fetchInventoryBooks()
  }
  fetchInventoryBooks(){
    axios.get(`http://localhost:8080/listAllBooks`)
      .then(res => {
        this.setState({
          books: res.data
        });
      })
  }

  fetchGoogleBooks = (param) => {
    console.log("Searching google book with ", this.state.params)
    var googleBooks = [];
    axios.get(`http://localhost:8080/fetchGoogleBooks/${param}`)
      .then(res => {
        res.data[0].items.forEach((item) => {
          googleBooks.push(item.volumeInfo);
        })
        console.log("google books" + googleBooks)
        this.setState({
          books: googleBooks
        });
      })

  }

  searchABook = () => {
    console.log("Search Params " + this.state.params)
    axios.get(`http://localhost:8080/findThisBook/`, {
      params: { searchParameter: this.state.params }
    })
      .then(res => {
        this.setState({
          books: res.data
        })
      })
  }

  addBookToInventory = (card) => {
    console.log("Add pressed", card.title.toUpperCase())
    this.props.history.push({
      pathname: '/editBook',
      book: { card }
    })
  }

  deleteABook = (card) => {
    console.log("Delete pressed", card)
    axios.post(`http://localhost:8080/deleteThisBook/${card.id}`)
      .then(res => {
        const newBooks = this.state.books.filter(book =>
          book.id !== card.id
        )
        this.setState({
          books: newBooks,
          open: true,
          message: `Book deleted succesfully`

        })
      })
  }
  bookDupCheck = (inventoryBooks, googleBooks) => {
    let result;
    inventoryBooks.forEach((books) => {
      books.authors.forEach((e1, i) => googleBooks.authors.forEach(e2 => {

        if (e1.length > 1 && e2.length) {
          result = this.bookDupCheck(e1, e2);
        } else if (e1 !== e2) {
          result = false
        } else {
          result = true
        }
      })
      )
    })
    return result
  }
  updateSearchParam = (param) => {
    console.log("updating Search Param", param);
    this.setState({
      params: param
    })
    this.fetchGoogleBooks(param);
  }

  render() {
    return (
      <div>
        {this.state.open && <SimpleSnackbar handleClose={this.handleClose} message={this.state.message}> </SimpleSnackbar>}
        {this.state.isGooglePage}
        <ViewBooks cards={this.state.books}
          history={this.props.history}
          isGooglePage={this.state.isGooglePage}
          deleteBook={this.deleteABook}
          searchABook={this.searchABook}
          addBook={this.addBookToInventory}
          params={this.state.searchParam}
          updateSearchParam={this.updateSearchParam}
        ></ViewBooks>
      </div>
    )
  }
}
export default ListOfBooks;

export const ViewBooks = (props) => {
  const useStyles = makeStyles(theme => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    }, inputRoot: {
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

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let editABook = (card) => {
    console.log("Edit pressed", card)
    props.history.push({
      pathname: '/editBook',
      book: { card }
    })
  }
  const [searchField, setSearchField] = useState();

  return (
    <React.Fragment>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {props.isGooglePage && <Grid container spacing={1}><TextField
            label="Enter Your QUERY here"
            onChange={e => setSearchField(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon onClick={e => props.updateSearchParam(searchField)} />
                  </IconButton>
                </InputAdornment>
              )
            }
            }
          /></Grid>}
          <Grid container spacing={4}>
            {props.cards && props.cards.map(card => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.imageLinks && card.imageLinks.thumbnail}
                    title={card.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <span >
                      <h5>{card.title}</h5>
                    </span>
                    <Typography gutterBottom >
                      {`By ${card.authors && card.authors.toString()}`}
                    </Typography>
                    <ExpansionPanel expanded={expanded === card.id} onChange={handleChange(card.id)}>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
          <b>Descrpition : </b>
          <span >{card.description && card.description.substring(0,50)}</span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Typography>
                        {card.description}
                    </Typography>
        </ExpansionPanelDetails>
        </ExpansionPanel>

                    {!props.isGooglePage && <div><Typography>
                      Price : {card.price}
                    </Typography>
                      <Typography>
                        Quantity : {card.quantity}
                      </Typography> </div>}
                  </CardContent>
                  <CardActions>
                    {!props.isGooglePage ? (<div><Button size="small" color="primary" onClick={() => editABook(card)}>
                      Edit
                </Button>
                      <Button size="small" color="primary" onClick={() => props.deleteBook(card)}>
                        Delete
                </Button> </div>) : <Button size="small" color="primary" onClick={() => props.addBook(card)}>
                        Add to Inventory
                </Button>
                    }
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
      </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}