import React, { Component } from 'react';
import '../css/navbar.css';

class App extends Component {
  render(){
  return (
    <div>
    <div class="sidenav">
      <button class="dropdown-btn btn dropdown-toggle"  data-toggle="dropdown">MANAGE MASTER 
        <i class="fa fa-caret-down" style={{marginLeft:"20px"}}></i>
      </button>
     <hr/>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
          {/* <li><a class="dropdown-item" href="./state">Create State</a></li>
          <li><a class="dropdown-item" href="./district">Create District</a></li>
          <li><a class="dropdown-item" href="./news">Create News</a></li>
          <li><a class="dropdown-item" href="./ipaddress">Create IPaddress</a></li>
          <li><a class="dropdown-item" href="./taluk">Create Taluk</a></li>
          <li><a class="dropdown-item" href="./relationship">Create Relationship</a></li>
          <li><a class="dropdown-item" href="./branch">Create Branch</a></li> */}
           <li><a class="dropdown-item" href="./country"> Country</a></li>
          <li><a class="dropdown-item" href="./state"> State</a></li>
          {/* <li><a class="dropdown-item" href="./share"> share</a></li> */}
           
          <li><a class="dropdown-item" href="./districts">District</a></li>
          <li><a class="dropdown-item" href="./share">Share Parameter</a></li>
          <li><a class="dropdown-item" href="./relationship">Relationship</a></li>
        </ul>
      </div>
    </div>
  );
  }
}

export default App;
