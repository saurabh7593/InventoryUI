import React, { Component } from 'react';
import MenuBarPanel from '../MenuBar/MenuBarPanel';



class AppContainer extends Component{

  constructor(props){
    super();
    this.props=props;
    this.state ={
      query:''
    }
    console.log("AppContainer",props)
  
  }

    render () {
      return (
        <React.Fragment>
          <MenuBarPanel history={this.props.history}></MenuBarPanel>
          
      {this.props.children}
      </React.Fragment>
    ) }
}
export default AppContainer;
 