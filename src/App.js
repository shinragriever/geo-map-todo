import React, { Component} from 'react';
import Map from './Map';
import TodosList from "./TodosList";
import axios from "axios";


class App extends Component {
  constructor(props){
    super(props);

    this.state= {
      currentUserLocation: {},
      errorMsg: "",
     
      todos: []
        
      }
      
      
    
    this.showPosition = this.showPosition.bind(this); //binden van een functie binnen een functie
    this.showError = this.showError.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.fetchTodos = this.fetchTodos.bind(this);
  }
 componentDidMount(){
    //  navigator.geolocation.getCurrentPosition( //Get Currentposition, alleen veranden bij refresh
    //    this.showPosition, this.showError)
      
    
    
     
     navigator.geolocation.watchPosition( //watch positie bij verandering
      this.showPosition, this.showError )//on succes use function showPosition, on error use function showError
      this.fetchTodos();
  };
        

  showError = (error) => this.setState({ errorMsg: error.message}) //on navigator.geolocation.watchPosition.error.message show error.message

  showPosition(position) { //zet positie op current positie met lat en lng
    this.setState({
      currentUserLocation:{
        lat: position.coords.latitude,
        lng: position.coords.longitude,
    }
       
    });
  }

  addTodo(){
    const title = document.querySelector("input").value; //take title from input:text
    const newTodo = {
      id: this.state.todos.length+1,
      title: title,
      todoLocation: this.state.currentUserLocation //get user current location for todo
      
    }
    console.log(newTodo);
    axios.post("http://griever.be/json/todos.json", { newTodo
    }).then(()=> {
      this.fetchTodos();
    }).catch(err => console.log(err))
    // this.setState({
    //   todos: [...this.state.todos, newTodo] //add new todo to TODOS array
    // })
  }

  fetchTodos(){
    axios.get("http://griever.be/json/todos.json").then(response => {
      this.setState({todos: response.data})
    });
  }

    
  
  render(){
    const {currentUserLocation, errorMsg,todos} = this.state; //haal uit de state
    
    if(errorMsg){ //als er een errorMsg return dit
      return <div>{errorMsg}</div>
  } 
  return (
    
    <div>
       <h2>{currentUserLocation.lat} / {currentUserLocation.lng}</h2>
     

       <Map
          
          zoom={15}
          currentLocation={currentUserLocation}
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAEVNf4n9W3kX2gS7y4ByY7Zr5mZCGuvXE&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
          <input type="text" name="title"/>
          <button onClick={this.addTodo}>Add Todo</button> <br/>
        <TodosList todos={todos}/>
    
    </div>
  );
}
}


export default App;
