import React, { Component } from 'react';
import '../../css/Master/planparameter.css';


class Planparameters extends Component{
    render(){
        return(
            <div style={{backgroundColor:"#eeeeee"}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-1 col-sm-1"></div>
                        <div className="col-md-10 col-sm-10">
                            <h4>Plan Parameters</h4>
                            <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px"}}>Plan Parameters</p>
                            <div className="btnblue heading"><label className="l1">Plan Parameters</label></div>
                            <div class="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                                <div class="panel-body">
                                    <div class="panel-group" style={{backgroundColor:"#fff"}}>
                                        <div class="row">
                                            <div class="form-group col-md-12 col-sm-12">
                                                <div class="panel-group" style={{marginBottom: "8px"}}>
                                                    <div class="row" style={{padding:"10px"}}>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <label class="control-label" for="plan" style={{fontSize: "16px"}}>Select Plan</label>
                                                                <select class="form-control" id="plan" name="plan" >
                                                                    <option value="">--Select Deposit Type--</option>
                                                                    <option value="Pigmy">Pigmy</option>
                                                                    <option value="RD">RD</option>
                                                                    <option value="FD">FD</option>
                                                                    <option value="MIS">MIS</option>
                                                                    <option value="PIGMY WITHDRAW">PIGMY WITHDRAW</option>
                                                                </select>
                                                        </div>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <label class="control-label" for="planname" style={{fontSize: "16px"}}>Plan Name</label>
                                                            <input class="form-control" id="planname" name="palnname" placeholder="Enter Plan Name" type="text" />
                                                        </div>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <label class="control-label" for="plancode" style={{fontSize: "16px"}}>Plan Code</label>
                                                            <input class="form-control" id="plancode" name="plancode" placeholder="Enter Plan Code" type="text" />
                                                        </div>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <label class="control-label" for="palnduration" style={{fontSize: "16px"}}>Plan Duration</label>
                                                            <div class="row">
                                                                <div class="form-group col-md-4 col-sm-4">
                                                                    <input class="form-control" id="palnduration" name="palnduration" placeholder="0" type="text" />
                                                                </div>
                                                                <div class="form-group col-md-8 col-sm-8">
                                                                    <select class="form-control" id="duration" name="duration" >
                                                                        <option value="">--Select Duration--</option>
                                                                        <option value="Days">Days</option>
                                                                        <option value="Months">Months</option>
                                                                        <option value="Years">Years</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row" style={{padding:"10px",marginTop:"-15px"}}>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                                <label class="control-label" for="roi" style={{fontSize: "16px"}}>Rate of Interest</label>
                                                                <input class="form-control" id="roi" name="roi" placeholder="Enter ROI" type="text" />
                                                        </div>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <label class="control-label" for="commission" style={{fontSize: "16px"}}>Agent Commission</label>
                                                            <input class="form-control" id="commission" name="commission" placeholder="0.00" type="text" />
                                                        </div>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <label class="control-label" for="compound" style={{fontSize: "16px"}}>Compounding Period</label>
                                                            <select class="form-control" id="compound" name="compound" >
                                                                <option value="">--Select Period--</option>
                                                                <option value="Monthly">Monthly</option>
                                                                <option value="Quaterly">Quaterly</option>
                                                                <option value="HalfYearly">HalfYearly</option>
                                                                <option value="Yearly">Yearly</option>
                                                                <option value="On Maturity">On Maturity</option>
                                                                <option value="Flat">Flat</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <label class="control-label" for="minamount" style={{fontSize: "16px"}}>Minimun Deposit Amount</label>
                                                            <input class="form-control" id="minamount" name="minamount" placeholder="Enter Minimun Deposit Amount" type="text" />
                                                        </div>
                                                    </div>
                                                    <div class="row" style={{padding:"10px"}}>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <label class="control-label" for="seniorinterest" style={{fontSize: "16px"}}>Senior Citizen Rate of Interest</label>
                                                            <input class="form-control" id="seniorinterest" name="seniorinterest" placeholder="Enter Senior Citizen Interest Rate" type="text" />
                                                        </div>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <input name="save" id="save" value="ADD" class="btn btnblue" type="submit" style={{width:"100px",borderRadius:"3px",marginRight:"20px",marginTop:"25px"}}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel-group table-responsive" style={{marginBottom:" 8px"}}>
                                        <table class="table table-bordered table-hover table-striped" id="tabel1">
                                            <thead>
                                                <tr style={{color:"#3869ae"}}>
                                                    <th style={{textAlign:"center"}}>Sl<span style={{visibility:"hidden"}}>_</span>No.</th>
                                                    <th style={{textAlign:"Left"}}>Deposit<span style={{visibility:"hidden"}}>_</span>Type</th>
                                                    <th style={{textAlign:"Left"}}>Plan<span style={{visibility:"hidden"}}>_</span>Name</th>
                                                    <th style={{textAlign:"center"}}>Plan<span style={{visibility:"hidden"}}>_</span>Code</th>
                                                    <th style={{textAlign:"center"}}>Plan<span style={{visibility:"hidden"}}>_</span>Duration</th>
                                                    <th style={{textAlign:"Left"}}>Duration</th>
                                                    <th style={{textAlign:"Left"}}>ROI</th>
                                                    <th style={{textAlign:"Left"}}>Agent<span style={{visibility:"hidden"}}>_</span>Commission</th>
                                                    <th style={{textAlign:"Left"}}>Compounding<span style={{visibility:"hidden"}}>_</span>Period</th>
                                                    <th style={{textAlign:"Left"}}>Min<span style={{visibility:"hidden"}}>_</span>Deposit<span style={{visibility:"hidden"}}>_</span>Amount</th>
                                                    <th style={{textAlign:"Left"}}>SC<span style={{visibility:"hidden"}}>_</span>ROI</th>
                                                    <th style={{textAlign:"center",paddingRight:"50px",paddingLeft:"50px"}}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{textAlign:"center"}}>1</td>
                                                    <td style={{textAlign:"left"}}></td>
                                                    <td style={{textAlign:"left"}}></td>
                                                    <td style={{textAlign:"left"}}></td>
                                                    <td style={{textAlign:"left"}}></td>
                                                    <td style={{textAlign:"center"}}></td>
                                                    <td style={{textAlign:"center"}}></td>
                                                    <td style={{textAlign:"left"}}></td>
                                                    <td style={{textAlign:"left"}}></td>
                                                    <td style={{textAlign:"center"}}></td>
                                                    <td style={{textAlign:"center"}}></td>
                                                    <td>
                                                        <label className="switch">
                                                        <input type="checkbox"/>
                                                        <span className="slider round"></span>
                                                        </label>
                                                        <button class="btn w3-white edit-data" id="1">
                                                        <i class="fa fa-pencil text-primary"></i>
                                                        </button>
                                                        <button class="btn w3-white delete-data" id="1">
                                                        <i class="fa fa-trash text-danger"></i>
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

export default Planparameters;