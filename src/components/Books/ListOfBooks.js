import React, { Component } from 'react';
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


class ListOfBooks extends Component {

  constructor(props) {
    super();
    this.props = props;
    this.state = {
      books: [],
      inventoryBooks: [],
      searchAvailable: true,
      open:false,
      message:'',
      isGooglePage: RegExp('google*').test(window.location.href)
    }

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
    console.log("Component did mount" +this.state.isGooglePage);
    this.state.isGooglePage ? this.fetchGoogleBooks() : this.fetchInventoryBooks()
  }
  fetchInventoryBooks = () => {
    axios.get(`http://localhost:8080/listAllBooks`)
      .then(res => {
        this.setState({
          books: res.data
        });
      })
  }

  fetchGoogleBooks = () => {

    var googleBooks = [];
    axios.get(`http://localhost:8080/fetchGoogleBooks/abc`)
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

  searchABook = (params) => {
    console.log("Search Params " + params)
    axios.get(`http://localhost:8080/findThisBook/${params}`)
      .then(res => {
        this.setState({
          books: res.data
        })
      })
  }

  addBookToInventory = (card) => {
    console.log("Add pressed", card.title.toUpperCase())
    var newGoogleBooks = [];
    if (false) {

    } else {
      axios.post(`http://localhost:8080/addBook`, {
        ...card
      })
        .then(res => {
          newGoogleBooks = this.state.books.filter(book =>
            book.id !== card.id
          )
          this.setState({
            books: newGoogleBooks,
            open: true,
            message: `Book '${card.title}' added succesfully`
          })
        })
    }

  }

  deleteABook = (card) => {
    console.log("Delete pressed", card)
    axios.get(`http://localhost:8080/deleteThisBook`, {
      params: { bookId: card.id }
    })
      .then(res => {
        const newBooks = this.state.books.filter(book =>
          book.id !== card.id
        )
        this.setState({
          books: newBooks,
          open:true,
          message: `Book '${card.title}' deleted succesfully`

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

  render() {
    return (
      <div>
        {this.state.open && <SimpleSnackbar handleClose={this.handleClose} message={this.state.message}> </SimpleSnackbar>}
        <ViewBooks cards={this.state.books}
          history={this.props.history}
          isGooglePage={this.state.isGooglePage}
          deleteBook={this.deleteABook}
          addBook={this.addBookToInventory}
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
    },
  }));

  const classes = useStyles();

  let editABook = (card) => {
    console.log("Edit pressed", card)
    props.history.push({
      pathname: '/editBook',
      book: { card }
    })
  }

  return (
    <React.Fragment>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {console.log("props", props.cards)}
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
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography gutterBottom >
                      Authors : {card.authors && card.authors.map((author) => {
                        return <p>{author}</p>
                      })}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                    <Typography>
                      Price : {card.price}
                    </Typography>
                    <Typography>
                      Quantity : {card.quantity}
                    </Typography>
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