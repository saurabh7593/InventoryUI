import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppContainer from './components/AppContainer/Appcontainer'
import './App.css';
import ListOfBooks from './components/Books/ListOfBooks';
import {EditDialog} from './components/Books/EditBookDialogue';
import {AuditReport} from './components/Audit/AuditReport';
import {SearchABook} from './components/Books/SearchBook'


class App extends Component{
  constructor(props){
    super();
    this.props=props;
  }

  render ()
  {return (
    <Router>
         <Switch>
           <AppContainer> 
             <Route exact path='/' component={ListOfBooks} />
             <Route exact path='/listOfBooks' component={ListOfBooks} />
             <Route exact path='/googleBookList' component={ListOfBooks} />
             <Route path='/editBook' component={EditDialog} />
             <Route path='/addABook' component={EditDialog} />
             <Route path='/auditReport' component={AuditReport} />
             <Route path='/search' component={SearchABook} />
          </AppContainer>
         </Switch>
    </Router>
  )}
}

export default App;
