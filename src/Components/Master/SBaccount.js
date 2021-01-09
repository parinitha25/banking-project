import React, { Component } from 'react';

class SBAccount extends Component{

render(){
return(
<div style={{backgroundColor:"#eeeeee"}}>
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-1 col-sm-1"></div>
                <div className="col-md-10 col-sm-10">
                    <h4>SB Account Parameters</h4>
                    <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px"}}>SB Account Parameters</p>
                        <div className="btnblue heading"><label className="l1">SB Account Parameters</label></div>
                            <div className="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                                <div className="panel-body">
                                    <div className="panel-group" style={{backgroundColor:"#fff"}}>
                                        <div className="row">
                                            <div className="form-group col-md-12 col-sm-12">
                                                <form>
                                                    <div className="panel-group" style={{marginBottom: "8px"}}>
                                                        <div className="row" style={{padding:"10px"}}>
                                                            <div className="form-group col-md-3 col-sm-3">
                                                                <label className="control-label" for="branch">Branch
                                                                <span style={{color:"red"}}>*</span></label>
                                                                    <select className="form-control" id="active" name="branch">
                                                                        <option value="" disabled selected>Select Branch</option>
                                                                        <option></option>
                                                                        <option></option>
                                                                    </select>
                                                            </div>
                                                            <div className="form-group col-md-3 col-sm-3">
                                                                <label className="control-label" for="sb_type">SB Type
                                                                <span style={{color:"red"}}>*</span></label>
                                                                    <select className="form-control" id="active" name="sb_type">
                                                                        <option value="" disabled selected>SB Type</option>
                                                                        <option></option>
                                                                        <option></option>
                                                                    </select>
                                                            </div>
                                                            <div className="form-group col-md-3 col-sm-3">
                                                                <label className="control-label" for="min_balance">SB Minimum Balance
                                                                <span style={{color:"red"}}>*</span></label>
                                                                <input className="form-control" id="min_balance" name="min_balance" placeholder="Enter SB Minimum Balance" type="text" />
                                                            </div>
                                                            <div className="form-group col-md-3 col-sm-3">
                                                                <label className="control-label" for="max_balance">SB Maximum Balance
                                                                <span style={{color:"red"}}>*</span></label>
                                                                <input className="form-control" id="max_balance" name="max_balance" placeholder="Enter SB Maximum Balance" type="text" />
                                                            </div>
                                                        </div>
                                                        <div className="row" style={{padding:"10px"}}>
                                                            <div className="form-group col-md-3 col-sm-3">
                                                                <label className="control-label" for="rate_of_interest">SB Rate of Interest
                                                                <span style={{color:"red"}}>*</span></label>
                                                                <input className="form-control" id="rate_of_interest" name="rate_of_interest" placeholder="Enter SB Rate of Interest" type="text" />
                                                            </div>
                                                            <div className="form-group col-md-3 col-sm-3">
                                                                <label className="control-label" for="contact_name">Contact Name
                                                                <span style={{color:"red"}}>*</span></label>
                                                                <input className="form-control" id="contact_name" name="contact_name" placeholder="Enter Contact Name" type="text" />
                                                            </div>
                                                            <div className="form-group col-md-3 col-sm-3">
                                                                <label className="control-label" for="min_period">SB Minimum Period
                                                                <span style={{color:"red"}}>*</span></label>
                                                                <input className="form-control" id="min_period" name="min_period" placeholder="Enter SB Minimum Period" type="text" />
                                                            </div>
                                                            <div className="form-group col-md-3 col-sm-3">
                                                                <label className="control-label" for="service_charge">Service Charge for PreClosure SB
                                                                <span style={{color:"red"}}>*</span></label>
                                                                <input className="form-control" id="service_charge" name="service_charge" placeholder="Enter SB Charge for Preclosure for SB" type="text" />
                                                            </div>

                                                        </div>
                                                        <div className="row" style={{padding:"10px"}}>
                                                            <div className="form-group col-md-3 col-sm-3">
                                                                <label className="control-label" for="penalty">Penalty if Minimum Balance is not Maintained
                                                                <span style={{color:"red"}}>*</span></label>
                                                                <input className="form-control" id="penalty" name="penalty" placeholder="Enter Penalty if Minimum Balance is not Maintained" type="text" />

                                                            </div>
                                                            <div className="form-group col-md-3 col-sm-3">
                                                                <label className="control-label" for="cheque_book">SB Minimum Balance With Cheque Book for Staff
                                                                <span style={{color:"red"}}>*</span></label>
                                                                <input className="form-control text-box single-line " id="cheque_book" name="cheque_book" type="text" placeholder="Enter SB Minimum Balance With Cheque Book for Staff" />
                                                            </div>
                                                            <div className="form-group col-md-3 col-sm-3">
                                                                <label className="control-label" for="cheque_book_out">SB Minimum Balance Without Cheque Book for Staff
                                                                <span style={{color:"red"}}>*</span></label>
                                                                <input className="form-control text-box single-line " id="cheque_book_out" name="cheque_book_out" type="text" placeholder="Enter SB Minimum Balance Without Cheque Book for Staff" />
                                                            </div>
                                                            <div className="form-group col-md-3 col-sm-3" style={{marginTop: "21px"}}>
                                                                <label className="control-label" for="rate_of_interest_staff">SB Rate of Interest for Staff
                                                                <span style={{color:"red"}}>*</span></label>
                                                                <input className="form-control" id="rate_of_interest_staff" name="rate_of_interest_staff" placeholder="SB Rate of Interest for Staff" type="text" />

                                                            </div>
                                                            
                                                        </div>
                                                        <div className="row" style={{padding:"10px"}}>
                                                        <div className="form-group col-md-3 col-sm-3"></div>
                                                        <div className="form-group col-md-3 col-sm-3"></div>
                                                        <div className="form-group col-md-3 col-sm-3"></div>
                                                            <div className="form-group col-md-3 col-sm-3">
                                                                <input name="save" id="save" value="ADD" class="btn btnblue" type="submit" style={{width:"100px",borderRadius:"3px",float:"right"}}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel-group table-responsive tb" style={{marginBottom:" 8px",backgroundColor:"#fff"}}>
                                        <table className="table table-bordered table-hover table-striped" id="tabel1">
                                            <thead>
                                            <tr style={{color:"#3869ae"}}>

                                            <th style={{textAlign:"center"}}>Sl<span style={{visibility:"hidden"}}>_</span>No.</th>
                                            <th style={{textAlign:"center"}}>Branch</th>
                                            <th style={{textAlign:"center"}}>SB<span style={{visibility:"hidden"}}>_</span>Type</th>
                                            <th style={{textAlign:"center"}}>SBMinimum<span style={{visibility:"hidden"}}>_</span>Balance</th>
                                            <th style={{textAlign:"center"}}>SBMaximum<span style={{visibility:"hidden"}}>_</span>Balance</th>
                                            <th style={{textAlign:"center"}}>SBRate<span style={{visibility:"hidden"}}>_</span>of<span style={{visibility:"hidden"}}>_</span>Interest</th>
                                            <th style={{textAlign:"center"}}>Contact<span style={{visibility:"hidden"}}>_</span>Name</th>
                                            <th style={{textAlign:"center"}}>SBMinimum<span style={{visibility:"hidden"}}>_</span>Period</th>
                                            {/* <th style={{textAlign:"center"}}>Pin<span style={{visibility:"hidden"}}>_</span>Code</th> */}
                                            <th style={{textAlign:"center",width:"200%"}}><span style={{visibility:"hidden"}}>_</span>Action<span style={{visibility:"hidden"}}>_</span></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td style={{textAlign:"center"}}>1</td>
                                                <td style={{textAlign:"left"}}>abcd</td>
                                                <td style={{textAlign:"left"}}>Mysore</td>
                                                <td style={{textAlign:"left"}}>Mysore</td>
                                                <td style={{textAlign:"left"}}>Mysore</td>
                                                <td style={{textAlign:"left"}}>Mysore</td>
                                                <td style={{textAlign:"left"}}>Mysore</td>
                                                <td style={{textAlign:"left"}}>Mysore</td>
                                                {/* <td style={{textAlign:"left"}}>Mysore</td> */}
                                                <td style={{textAlign:"center"}}>
                                                <label className="switch">
                                                    <input type="checkbox"/>
                                                    <span className="slider round"></span>    
                                                </label>
                                                <button className="btn w3-white edit-data" id="1">
                                                <i className="fa fa-pencil text-primary">
                                                </i>
                                                </button>
                                                <button className="btn w3-white delete-data" id="1">
                                                <i className="fa fa-trash text-danger">
                                                </i>
                                                </button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                 </div>
                            </div>
                </div>
        </div>
    </div>
</div>
)
}
}

export default SBAccount;