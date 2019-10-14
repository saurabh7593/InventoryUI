import React,{Component} from 'react';
import {ViewBooks} from  './ViewBooks';
import axios from 'axios';
class ListOfBooks extends Component {

    constructor(props){
        super();
        this.props=props;
        this.state={
          books:[]
        }
    
      }
    
      componentDidMount(){
        axios.get(`http://localhost:8080/listAllBooks`)
        .then(res => {
          this.setState({ books :res.data });
          console.log(this.state.books);
    
        })
      }

      render(){
          return (
              <ViewBooks cards={this.state.books} history={this.props.history}></ViewBooks>
          )
      }
}
export default ListOfBooks;