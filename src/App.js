import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './Components/Master/Navbar';
import CreateIPaddress from '../src/Components/Master/createIPaddress';
// import CreateNews from '../src/Components/Master/createNews';
import Relationship from '../src/Components/Master/Relationship';
import CreateBranch from '../src/Components/Master/createBranch';
import state from '../src/Components/Master/state';
import District from './Components/Master/District';
import News from './Components/Master/News';
import Taluk from './Components/Master/taluk';
import Country from './Components/Master/Country';
import Village from './Components/Master/Village';
import Share from './Components/Master/share';
import Financialyear from './Components/Master/Financialyear';
import Branch from './Components/Master/Branch';
import Bod from './Components/Master/Bod';
import Eod from './Components/Master/Eod';
import Holidaylist from './Components/Master/HolidayList';
import Planparameter from './Components/Master/Planparameter';
import IPaddress from './Components/Master/IPaddress';
import Deposit from './Components/Master/deposit';
import Latefeeparameter from './Components/Master/LateFeeparameter';
import SBaccount from './Components/Master/SBaccount';
import './App.css';

class App extends Component {
  render(){
  return (
    <div> 
       <Navbar />
        <Router >
          <Switch>
            <Route exact path='/ipaddress' component={IPaddress}></Route>
            <Route exact path='/relationship' component={Relationship}></Route> 
            {/* <Route exact path='/branch' component={CreateBranch}></Route>    */}
            <Route exact path='/state' component={state}></Route>      
            <Route exact path='/district' component={District}></Route>   
            <Route exact path='/news' component={News}></Route>   
            <Route exact path='/taluk' component={Taluk}></Route>  
            <Route exact path='/village' component={Village}></Route>  
            <Route exact path='/country' component={Country}></Route>  
            <Route exact path='/share' component={Share}></Route>  
            <Route exact path='/financialyear' component={Financialyear}></Route>  
            <Route exact path='/branch' component={Branch}></Route>  
            <Route exact path='/bod' component={Bod}></Route>  
            <Route exact path='/eod' component={Eod}></Route>  
            <Route exact path='/holidaylist' component={Holidaylist}></Route>  
            <Route exact path='/planparameter' component={Planparameter}></Route>
            <Route exact path='/loanondeposit' component={Deposit}></Route>
            <Route exact path='/latefee' component={Latefeeparameter}></Route>
            <Route exact path='/sbaccount' component={SBaccount}></Route>
          </Switch>
          </Router>

    </div>
     );
  }
}

export default App;
