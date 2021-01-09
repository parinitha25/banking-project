import React, { Component } from 'react';
import '../../css/Master/navbar.css';


class Navbar extends Component {

render(){
return (
  <div>
  <nav className="navbar navbar-inverse navbar-fixed-top bg" style={{backgroundColor:"#254d88!important"}}>
  <div className="container-fluid bg" style={{backgroundColor:"#254d88!important"}}>
    <div className="navbar-header bg" style={{backgroundColor:"#254d88!important"}}>
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
        </button>
        {/* {/ <a className="navbar-brand" href="#">Brand</a> /} */}
    </div>
    <div className="collapse navbar-collapse" id="bs-navbar-collapse-1" style={{overflowY:"scroll"}}>
        <ul className="nav navbar-nav">
          
            <li className="dropdown">
                <a href="#" class="dropdown-toggle color " data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{paddingRight:"0px"}}>Manage Settings <span className="caret"></span></a>
                <ul className="dropdown-menu">
                     {/* <li><a href="#">Shortcut Settings</a></li>
                     <li><a href="#">Change Password</a></li> */}
                     <li><a href="./financialyear">Financial Year</a></li>
                     {/* <li><a href="#">View/Update Financial Year</a></li> */}
                     {/* <li><a href="#">Lock Settings</a></li> */}
                     <li><a href="./bod">BOD</a></li>
                     <li><a href="./eod">EOD</a></li>
                     {/* <li><a href="#">View Login Details</a></li>
                     <li><a href="#">Admin Settings</a></li>
                     <li><a href="#">SMS Template</a></li>
                     <li><a href="#">Software Config</a></li>
                     <li><a href="#">Update Content</a></li>
                     <li><a href="#">Header Visibility Setting</a></li> */}
                 </ul>
             </li>
             <li className="dropdown">
                <a href="#" class="dropdown-toggle color" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{paddingRight:"0px"}}>Manage Master <span class="caret"></span></a>
                <ul className="dropdown-menu">
                    <li><a href="./country">Country</a></li>
                     <li><a href="./state">State</a></li>
                     {/* <li><a href="#">View/Update State</a></li> */}
                     <li><a href="./district">District</a></li>
                     <li><a href="./taluk">Taluk</a></li>
                     <li><a href="./village">Village</a></li>
                     {/* <li><a href="#">View/Update District</a></li> */}
                     <li><a href="./news">News</a></li>
                     {/* <li><a href="#">View/Update News</a></li> */}
                     <li><a href="./ipaddress">IP Address</a></li>
                     {/* <li><a href="#">View/Update IP Address</a></li> */}
                 </ul>
             </li>
             <li className="dropdown">
                <a href="#" class="dropdown-toggle color" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{paddingRight:"0px"}}>Banking Master <span class="caret"></span></a>
                <ul className="dropdown-menu">
                     <li><a href="./relationship">Relationship</a></li>
                     <li><a href="./share">Share Parameter</a></li>
                     {/* <li><a href="#">Fee Parameter</a></li> */}
                     <li><a href="./sbaccount">SB Accounts Parameters</a></li>
                     {/* <li><a href="#">Plan Parameters</a></li> */}
                     {/* <li><a href="#">Add Prematurity Slabs</a></li> */}
                     <li><a href="./loanondeposit">Loan On Deposite Parameters</a></li>
                     {/* <li><a href="#">Approvals Limit Parameters</a></li>
                     <li><a href="#">Service Deduction</a></li>
                     <li><a href="#">Deposite TDS Parameter</a></li>
                     <li><a href="#">OD Account Parameters</a></li> */}
                     <li><a href="./latefee">Late Fee Parameter</a></li>
                     <li><a href="./holidaylist">Holiday List</a></li>
                 </ul>
             </li>
             {/* <li><a href="index.php" className="color" style={{paddingRight:"0px"}}>Loan</a></li> */}
             <li className="dropdown">
                <a href="#" class="dropdown-toggle color" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{paddingRight:"0px"}}>Manage Branch <span class="caret"></span></a>
                <ul className="dropdown-menu">
                     <li><a href="./branch">Branch</a></li>
                     {/* <li><a href="#">View/Update Branch</a></li> */}
                     {/* <li><a href="#">IP Wise Enable/Disable</a></li>
                     <li><a href="#">Contact Management</a></li>
                     <li><a href="#">Create Service Center</a></li>
                     <li><a href="#">View Service Center</a></li>
                     <li><a href="#">Add Service Center User</a></li>
                     <li><a href="#">View Service Center User</a></li> */}
                 </ul>
             </li>
             {/* <li><a href="index.php" className="color" style={{paddingRight:"0px"}}>Accounting</a></li>
             <li><a href="index.php" className="color" style={{paddingRight:"0px"}}>Gold Loan</a></li>
             <li><a href="index.php" className="color" style={{paddingRight:"0px"}}>Manage Agent</a></li> */}
             {/* <li className="dropdown">
                <a href="#" class="dropdown-toggle color" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{paddingRight:"0px"}}>HR Module <span class="caret"></span></a>
                <ul className="dropdown-menu">
                     <li><a href="#">Designation Master</a></li>
                     <li><a href="#">Designation Menu Rights</a></li>
                     <li><a href="#">Designation Tree View</a></li>
                     <li><a href="#">Branch User Rights</a></li>
                     <li><a href="#">Service Center User Rights</a></li>
                     <li><a href="#">Create Employee</a></li>
                     <li><a href="#">View/Manage Employee</a></li>
                     <li><a href="#">Salary Master</a></li>
                     <li><a href="#">Employee Attendance Daily</a></li>
                     <li><a href="#">Create Monthly Attendance</a></li>
                     <li><a href="#">Create Salary</a></li>
                     <li><a href="#">Make Payment Salary</a></li>
                     <li><a href="#">View Monthly Attendance</a></li>
                     <li><a href="#">View Paid Salary</a></li>
                     <li><a href="#">Salary Summary Report</a></li>
                     <li><a href="#">View Staff User</a></li>
                 </ul>
             </li> */}
             {/* <li><a href="index.php" className="color" style={{paddingRight:"0px"}}>Reports</a></li>
             <li className="dropdown">
                <a href="#" className="dropdown-toggle color" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{paddingRight:"0px"}}>Transfer Request<span class="caret"></span></a>
                <ul className="dropdown-menu">
                     <li><a href="#">Request</a></li>
                 </ul>
             </li> */}
              {/* <li className="dropdown">
                <a href="#" class="dropdown-toggle color" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{paddingRight:"0px"}}>Modification<span class="caret"></span></a>
                <ul className="dropdown-menu">
                     <li><a href="#">Policy Modification</a></li>
                     <li><a href="#">Change Nominee</a></li>
                     <li><a href="#">Change SB Account Type</a></li>
                     <li><a href="#">Senior Citizen ROI Change</a></li>
                     <li><a href="#">Update Member Date</a></li>
                     <li><a href="#">Deposite Member Change</a></li>
                     <li><a href="#">Delete Account Transfer</a></li>
                     <li><a href="#">Delete Accounts</a></li>


                 </ul>
             </li> */}
         </ul>
     </div>
  </div>
</nav>
</div>
);
}
}

export default Navbar;