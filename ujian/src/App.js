import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Headers from './component/Header';
import HomePage from './component/Homepage';
import LoginPage from './component/Login';
import RegisPage from './component/Register';
import Book from './component/Book';
import Transaction from './component/transaction';
import Movielist from './component/Movielist';
class App extends Component {
  
  render() {
 
 
    return (
      <div className="App">
            <Headers />
            <br/><br/><br/><br/>
          <div>
          <Route exact path="/" component={HomePage}/>
          <Route path="/Login" component={LoginPage}/>
          <Route path="/Regis" component={RegisPage}/>
          <Route path="/Movielsit"  component={Movielist}/>
          <Route path="/Book" component={Book}/>
          <Route path="/Transaction" component={Transaction}/>
          </div>
      </div>
        
          
    );
  }
}

export default App;
