import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import {AppContainer} from './components/AppContainer/Appcontainer';
import ListOfBooks from './components/Books/ListOfBooks';
import {EditABook} from './components/Books/EditBooks';


class App extends Component{

  render ()
  {return (
    <Router>
         <Switch>
           <AppContainer>
             <Route exact path='/listOfBooks' component={ListOfBooks} />
             <Route path='/editBook' component={EditABook} />
          </AppContainer>
         </Switch>
    </Router>
 
  );
  }
}

export default App;
