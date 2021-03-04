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
    const {loading, users} = this.state;
    return <div className="App">
      <form onSubmit={this.handleSubmit}>
        <input type="submit" value="Load more users"/>
      </form>
      <hr />
        {!loading ? ( 
          users.map(users => (
            <div key ={users.id.value}>
              <h3 style={{color:'red'}}>{users.name.first}</h3>
              <p>{users.email}</p>
              <hr/>
            </div>
          ))
        ) : (<Loading message="Loading message"/>)}
    </div>;
  }
}

export default App;
