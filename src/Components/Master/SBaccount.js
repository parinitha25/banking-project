import React, { Component } from 'react';
import api from '../../api/index';
import 'antd/dist/antd.css';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

class SBAccount extends Component{
    state={
        branch_data:[],
        branch:'',
        sbType_data:[],
        sbaccount_parameter_data:[],
        sbType:'',
        min_balance:'',
        max_balance:'',
        rate_of_interest:'',
        sbmin_period:'',
        service_charge:'',
        penalty:'',
        with_cheque_book:'',
        without_cheque_book:'',
        rate_of_interest_staff:'',
        button:"ADD",
        isediting:true,
        editing:false
    }

    componentDidMount(){
        this.getbranchList();
        this.getsbTypeList();
        this.getaccountparameterList();
        
    }

    // change the branch value
    handleChangebranch=(e)=>{
         
        this.setState({branch:e.target.value})
    }

    // change the sbtype value
    handleChangesbtype=(e)=>{
         
        this.setState({sbType:e.target.value})
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    
    //handle change for enable button
    handleEnableChange=(e) =>{
         
        this.setState({
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    }

    //get branch data
    getbranchList = () => {
        var config = {
            method: 'post',
            url: 'master/branch/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({branch_data:res.data.data})
        })
        .catch(err=>{
            console.log(err);
        })
    }
    //get sbtype data
    getsbTypeList = () => {
        var config = {
            method: 'post',
            url: 'master/sbType/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({sbType_data:res.data.data})
        })
        .catch(err=>{
            console.log(err);
        })
    }
    handleSubmit=()=>{
         
        // const errors=this.validate();
        // this.setState({errors})
        // if(errors) return;
        if(this.state.editing===false){  
                const params = {
                    branchSlno:this.state.branch,
                    sbTypeSlno:this.state.sbType,
                    sbMinBalance:this.state.min_balance,
                    sbMaxBalance:this.state.max_balance,
                    sbRoi:this.state.rate_of_interest,
                    sbMinPeriod:this.state.sbmin_period,
                    serviceCharge:this.state.service_charge,
                    penalty:this.state.penalty,
                    sbMinBalWithCheqBookForStaff:this.state.with_cheque_book,
                    sbMinBalWithoutCheqBookForStaff:this.state.without_cheque_book,
                    sbRoiForStaff:this.state.rate_of_interest_staff      
                }   
                api.post(`master/sbAccountsParameters/create`, params)      
                .then(res =>{     
                    this.setState({editing:false})
                    message.success({content: (res.data.data),style: { textAlign: "center" ,marginTop:"100px"},});
                    setTimeout(function(){window.location.reload(); }, 1000);
                    
                })
                .catch(err=>{
                    message.error({content: (err.response.data.message),style: { textAlign: "center" ,marginTop:"100px"},});
                    setTimeout(function(){window.location.reload(); }, 1000);
                })
        }
        else
        {
             
        const params = {
            slno:this.state.id,
            branchSlno:this.state.branch,
            sbTypeSlno:this.state.sbType,
            sbMinBalance:this.state.min_balance,
            sbMaxBalance:this.state.max_balance,
            sbRoi:this.state.rate_of_interest,
            sbMinPeriod:this.state.sbmin_period,
            serviceCharge:this.state.service_charge,
            penalty:this.state.penalty,
            sbMinBalWithCheqBookForStaff:this.state.with_cheque_book,
            sbMinBalWithoutCheqBookForStaff:this.state.without_cheque_book,
            sbRoiForStaff:this.state.rate_of_interest_staff,
            isActive:this.state.isediting
        }    
        api.post(`master/sbAccountsParameters/update`, params)
        .then(res => {      
             message.success({content: (res.data.data),style: { textAlign: "center" ,marginTop:"100px"},});

             message.success({content: (res.data.data),style: { textAlign: "center" ,marginTop:"100px"},});

            setTimeout(function(){window.location.reload(); }, 1000);	
        })
        .catch(err=>{
             message.error({content: (err.response.data.message),style: { textAlign: "center" ,marginTop:"100px"}});
             setTimeout(function(){window.location.reload(); }, 1000);     
        })
        }
    }
    
    //get sbaccountparameter data
    getaccountparameterList = () => {
        var config = {
            method: 'post',
            url: 'master/sbAccountsParameters/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({sbaccount_parameter_data:res.data.data})
        })
        .catch(err=>{
            console.log(err);
        })
    }

    //edit data
    getsbaccountbyslno= (slno) => {
         
        var config = {
            method: 'post',
            url: 'master/sbAccountsParameters/getBySlno',
            headers: {"content-type": "application/json"},
            data :{ 
                "slno":slno,
            }                 
        };
        api(config).then(res=>{     
        this.setState({ branch:res.data.data[0].branchSlno,
                        sbType:res.data.data[0].sbTypeSlno,
                        min_balance:res.data.data[0].sbMinBalance,
                        max_balance:res.data.data[0].sbMaxBalance,
                        rate_of_interest:res.data.data[0].sbRoi,
                        sbmin_period:res.data.data[0].sbMinPeriod,
                        service_charge:res.data.data[0].serviceCharge,
                        penalty:res.data.data[0].penalty,
                        with_cheque_book:res.data.data[0].sbMinBalWithCheqBookForStaff,
                        without_cheque_book:res.data.data[0].sbMinBalWithoutCheqBookForStaff,
                        rate_of_interest_staff:res.data.data[0].sbRoiForStaff,
                        id:res.data.data[0].slno,
                        editing:true,
                        button:"Update"
                    })
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    //delete row
    deletedata=(slno)=> {
        confirm({
            title: 'Are you sure delete this list?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk(){
                var config = {
                    method: 'post',
                    url: 'master/sbAccountsParameters/delete',
                    headers: {"content-type": "application/json"},
                    data :{ 
                    "slno":slno,
                    }
                }; 
                api(config).then(res => {  
                    message.success({content: (res.data.data),style: { textAlign: "center" ,marginTop:"100px"},});
                    setTimeout(function(){window.location.reload(); }, 1000);     
                })
                .catch(err=>{
                    message.error({content: (err.response.data.message),style: { textAlign: "center" ,marginTop:"100px"},});
                    setTimeout(function(){window.location.reload(); }, 1000);   
                })
            },
            onCancel() {
                console.log("Cancel");
            }    
        });
    }

    render(){
        return(
            <div style={{backgroundColor:"#eeeeee"}}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-1 col-sm-1"></div>
                    <div className="col-md-10 col-sm-10">
                        <h4>SB Account Parameters</h4>
                        <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px"}}>SB Account Parameters</p>
                            <div className="btnblue heading" style={{width:"185px"}}><label className="l1">SB Account Parameters</label></div>
                                <div className="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                                    <div className="panel-body">
                                        <div className="panel-group" style={{backgroundColor:"#fff"}}>
                                            <div className="row">
                                                <div className="form-group col-md-12 col-sm-12">
                                                        <div className="panel-group" style={{marginBottom: "8px"}}>
                                                            <div className="row" style={{padding:"10px"}}>
                                                                <div className="form-group col-md-3 col-sm-3">
                                                                    <label className="control-label" for="branch">Branch<span style={{color:"red"}}>*</span></label>
                                                                    <select class="form-control" name="branch"  value={this.state.branch}  onChange={this.handleChangebranch}>
                                                                        <option>--Select Branch--</option>
                                                                        {this.state.branch_data.map((data) => 
                                                                            <option value={data.slno}>{data.branchName}</option>             
                                                                        )}
                                                                    </select>
                                                                </div>
                                                                <div className="form-group col-md-3 col-sm-3">
                                                                    <label className="control-label" for="sb_type">SB Type<span style={{color:"red"}}>*</span></label>
                                                                    <select className="form-control" name="sbType"  value={this.state.sbType}  onChange={this.handleChangesbtype}>
                                                                        <option>--Select SB Type--</option>
                                                                        {this.state.sbType_data.map((data) => 
                                                                            <option value={data.slno}>{data.sbType}</option>             
                                                                        )}
                                                                    </select>
                                                                </div>
                                                                <div className="form-group col-md-3 col-sm-3">
                                                                    <label className="control-label" for="min_balance">SB Minimum Balance<span style={{color:"red"}}>*</span></label>
                                                                    <input className="form-control"  name="min_balance" placeholder="Enter SB Minimum Balance" value={this.state.min_balance} type="text" onChange={this.handleChange} />
                                                                </div>
                                                                <div className="form-group col-md-3 col-sm-3">
                                                                    <label className="control-label" for="max_balance">SB Maximum Balance<span style={{color:"red"}}>*</span></label>
                                                                    <input className="form-control"  name="max_balance" value={this.state.max_balance} placeholder="Enter SB Maximum Balance" type="text" onChange={this.handleChange}/>
                                                                </div>
                                                            </div>
                                                            <div className="row" style={{padding:"10px"}}>
                                                                <div className="form-group col-md-3 col-sm-3">
                                                                    <label className="control-label" for="rate_of_interest">SB Rate of Interest<span style={{color:"red"}}>*</span></label>
                                                                    <input className="form-control"  name="rate_of_interest" value={this.state.rate_of_interest} placeholder="Enter SB Rate of Interest" type="text" onChange={this.handleChange}/>
                                                                </div>
                                                                <div className="form-group col-md-3 col-sm-3">
                                                                    <label className="control-label" for="min_period">SB Minimum Period<span style={{color:"red"}}>*</span></label>
                                                                    <input className="form-control" name="sbmin_period" value={this.state.sbmin_period}  placeholder="Enter SB Minimum Period" type="text" onChange={this.handleChange}/>
                                                                </div>
                                                                <div className="form-group col-md-3 col-sm-3">
                                                                    <label className="control-label" for="service_charge">Service Charge for PreClosure SB<span style={{color:"red"}}>*</span></label>
                                                                    <input className="form-control" name="service_charge" value={this.state.service_charge}  placeholder="Enter SB Charge for Preclosure for SB" type="text" onChange={this.handleChange}/>
                                                                </div>
                                                                <div className="form-group col-md-3 col-sm-3">
                                                                    <label className="control-label" for="penalty">Penalty if Minimum Balance is not Maintained<span style={{color:"red"}}>*</span></label>
                                                                    <input className="form-control"  name="penalty" value={this.state.penalty}  placeholder="Enter Penalty if Minimum Balance is not Maintained" type="text" onChange={this.handleChange}/>
                                                                </div>
                                                            </div>
                                                            <div className="row" style={{padding:"10px"}}>
                                                                <div className="form-group col-md-3 col-sm-3">
                                                                    <label className="control-label" for="cheque_book">SB Min Balance With Cheque Book for Staff<span style={{color:"red"}}>*</span></label>
                                                                    <input className="form-control text-box single-line "name="with_cheque_book" value={this.state.with_cheque_book}  type="text" placeholder="Enter SB Minimum Balance With Cheque Book for Staff" onChange={this.handleChange}/>
                                                                </div>
                                                                <div className="form-group col-md-3 col-sm-3">
                                                                    <label className="control-label" for="cheque_book_out">SB Min Balance Without Cheque Book for Staff<span style={{color:"red"}}>*</span></label>
                                                                    <input className="form-control text-box single-line "  name="without_cheque_book" value={this.state.without_cheque_book}   type="text" placeholder="Enter SB Minimum Balance Without Cheque Book for Staff" onChange={this.handleChange}/>
                                                                </div>
                                                                <div className="form-group col-md-3 col-sm-3">
                                                                    <label className="control-label" for="rate_of_interest_staff">SB Rate of Interest for Staff<span style={{color:"red"}}>*</span></label>
                                                                    <input className="form-control"  name="rate_of_interest_staff"  value={this.state.rate_of_interest_staff} placeholder="SB Rate of Interest for Staff" type="text" onChange={this.handleChange}/>
                                                                </div>
                                                            </div>
                                                            <div className="row" style={{padding:"10px"}}>
                                                                <div className="form-group col-md-3 col-sm-3"></div>
                                                                <div className="form-group col-md-3 col-sm-3"></div>
                                                                <div className="form-group col-md-3 col-sm-3"></div>
                                                                <div className="form-group col-md-3 col-sm-3">
                                                                <button  class="btn btn-primary" onClick={()=>this.handleSubmit()} class="btn btnblue" style={{width:"100px",borderRadius:"3px",marginRight:"20px",marginTop:"-95px"}}>{this.state.button}</button>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                        <th style={{textAlign:"center"}}>Min<span style={{visibility:"hidden"}}>_</span>Balance</th>
                                                        <th style={{textAlign:"center"}}>Max<span style={{visibility:"hidden"}}>_</span>Balance</th>
                                                        <th style={{textAlign:"center"}}>Rate<span style={{visibility:"hidden"}}>_</span>of<span style={{visibility:"hidden"}}>_</span>Interest</th>
                                                        <th style={{textAlign:"center"}}>Min<span style={{visibility:"hidden"}}>_</span>Period</th>
                                                        <th style={{textAlign:"center"}}>Service<span style={{visibility:"hidden"}}>_</span>Charge</th>
                                                        <th style={{textAlign:"center"}}>Penalty</th>
                                                        <th style={{textAlign:"center"}}>SBMinimum<span style={{visibility:"hidden"}}>_</span>Balance<span>  WithCheqBook</span></th>
                                                        <th style={{textAlign:"center"}}>SBMinimum<span style={{visibility:"hidden"}}>_</span>Balance<span> WithoutCheqBook</span></th>
                                                        <th style={{textAlign:"center"}}>SBRate<span style={{visibility:"hidden"}}>_</span>Of Interest</th>
                                                        <th style={{textAlign:"center"}}>Enable / Disable</th>
                                                        <th style={{textAlign:"center",width:"200%"}}><span style={{visibility:"hidden"}}>_</span>Action<span style={{visibility:"hidden"}}>_</span></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { this.state.sbaccount_parameter_data.map((data, index) => 
                                                        <tr>
                                                            <td style={{textAlign:"center"}}>{index +1}</td>
                                                            <td style={{textAlign:"left"}}>{data.branchName}</td>
                                                            <td style={{textAlign:"center"}}>{data.sbTypeName}</td>
                                                            <td style={{textAlign:"center"}}>{data.sbMinBalance}</td>
                                                            <td style={{textAlign:"center"}}>{data.sbMaxBalance}</td>
                                                            <td style={{textAlign:"center"}}>{data.sbRoi}</td>
                                                            <td style={{textAlign:"center"}}>{data.sbMinPeriod}</td>
                                                            <td style={{textAlign:"center"}}>{data.serviceCharge}</td>
                                                            <td style={{textAlign:"center"}}>{data.penalty}</td>
                                                            <td style={{textAlign:"center"}}>{data.sbMinBalWithCheqBookForStaff}</td>
                                                            <td style={{textAlign:"center"}}>{data.sbMinBalWithoutCheqBookForStaff}</td>
                                                            <td style={{textAlign:"center"}}>{data.sbRoiForStaff}</td>
                                                            <td style={{textAlign:"center"}}>  
                                                                <label className="switch">
                                                                <input type="checkbox" name="isediting"  defaultChecked={data.isActive}  onChange={this.handleEnableChange}/>
                                                                    <span className="slider round"></span>    
                                                                </label>
                                                            </td>
                                                            <td style={{textAlign:"center"}}>
                                                                <button class="btn w3-white edit-data" id="1">
                                                                    <i class="fa fa-pencil text-primary" style={{color:"blue",fontSize:"20px"}} onClick={(e) => this.getsbaccountbyslno(data.slno)} ></i>
                                                                </button>
                                                                <button class="btn w3-white delete-data" id="1">
                                                                    <i  class="fa fa-trash text-primary" style={{color:"red",fontSize:"20px"}} onClick={() => this.deletedata(data.slno)}></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )} 
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