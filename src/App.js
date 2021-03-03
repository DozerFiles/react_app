import React, { Component } from "react";
import axios from 'axios'
import Loading from './Loading'

class App extends Component {
  constructor(props) {
    super(props)
    //create state
    this.state = {
      users:[],
      loading: false
    }
    //binding handleSubmit
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getUsers(){ 
    this.setState({
      loading: true
    })

    axios('https://randomuser.me/api/?results=5').then(response => 
      this.setState({
        users: [...this.state.users, ...response.data.results],
        loading: false
      })
    );
  }

  handleSubmit(e){
    e.preventDefault();
    this.getUsers();
    console.log('more users loaded')
  }

  UNSAFE_componentWillMount(){
    this.getUsers();
  }

  render() {
    return <div className="App">
      {!this.state.loading ? ( 
        this.state.users.map(users => (
          <div>
            <h3>{users.name.first}</h3>
            <p>{users.email}</p>
            <hr/>
            <form onSubmit={this.handleSubmit}>
              <input type="submit" value="load users"/>
            </form>
          </div>
        ))
      ) : (<Loading message="This is my loading message"/>) }
    </div>;
  }
}

export default App;
