import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';



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



export const ViewBooks=(props)=>{


    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];    
 
    const classes = useStyles();

    let editABook=(card)=>{
      console.log("Edit pressed",card)
      props.history.push({
          pathname:'/editBook',
          book:{card}
      })
    }
    let deleteABook=(card)=>{
      console.log("Delete pressed",card)
      axios.post(`http://localhost:8080/deleteThisBook/${card.id}`,{
      })
      .then(res => {
        console.log(res.data);
      })
    }

  return (
    <React.Fragment>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {props.cards.map(card => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.image}
                    title={card.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title} 
                    </Typography>
                    <Typography gutterBottom >
                      Authors : {card.authors.map((author)=>{
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
                    <Button size="small" color="primary" onClick={()=>editABook(card)}>
                      Edit
                    </Button>
                    <Button size="small" color="primary" onClick={()=>deleteABook(card)}>
                      Delete
                    </Button>
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