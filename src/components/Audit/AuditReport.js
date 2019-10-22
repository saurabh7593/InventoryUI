import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


export const AuditReport=()=>{
    const [cards,setCards]=useState();

    useEffect(() => {
        axios.get(`http://localhost:8080/auditList`)
        .then(res => {
          setCards(res.data);
        })
      }, []);


    const useStyles = makeStyles(theme => ({
        icon: {
          marginRight: theme.spacing(2),
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
      }));
    
      const classes = useStyles();

    return (
        <div>
            <Container className={classes.cardGrid} maxWidth="md">
            {cards && cards.map(card => (
              <Grid item key={card} xs={12} sm={12} md={12}>
                      <p>{card}</p>
              </Grid>
            ))}
        </Container>
        </div>
    )
}