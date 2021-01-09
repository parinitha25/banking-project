import React, { Component } from 'react';
import api from '../../api/index';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;


class deposit extends Component{
    state={
        depositType_data:[],
        loanondeposit_data:[],
        depositType:'',
        loanondeposit_amount:'',
        loan_roi:'',
        interest:'',
        button:"ADD",
        isediting:true,
        editing:false,
        deposittypeError:'',
        loandepositError:'',
        loanRoiError:'',
        interesttypeError:''
    }

    componentDidMount(){
        this.getDepositTypeList();
        this.getloanonDepositList();
    }

     //validation purpose
     validate=()=>{
        const errors={};
        if(this.state.depositType === ''){
            errors.deposittypeError='Deposit type is required.';
        }
        if(this.state.loanondeposit_amount === ''){
            errors.loandepositError='Loan deposit  is required.';
        }
        if(this.state.depositType === ''){
            errors.countryError='Deposit type is required.';
        }
        if(this.state.interest === ''){
            errors.interesttypeError='Interest type is required.';
        }
        if(this.state.loan_roi === ''){
            errors.loanRoiError='Loan ROI  is required.';
        }
        // else if(!this.state.country.match(/^[a-zA-Z ]+$/)){
        //     errors.countryError = "The country name is not correct";
        // }
        return Object.keys(errors).length=== 0 ? null : errors;
    }

    
    //get country data
    getDepositTypeList = () => {
        var config = {
            method: 'post',
            url: 'master/depositType/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({depositType_data:res.data.data})
        })
        .catch(err=>{
            console.log(err);
        })
    } 

    getloanonDepositList = () => {
        var config = {
            method: 'post',
            url: 'master/loanOnDepositParameter/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({loanondeposit_data:res.data.data})
        })
        .catch(err=>{
            console.log(err);
        })
    } 

    handleChange=(e)=>{
        debugger
        this.setState({[e.target.name]:e.target.value})
    }

    // handleInterestChange=()=>{
    //     this.setState({intrest:e.target.value})
    // }

    //handle change for enable button
    handleEnableChange=(e) =>{
        this.setState({
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    }

    // change the country value
    handleChangedeposit=(e)=>{
        debugger
        this.setState({depositType:e.target.value})
    }

    handleSubmit=()=>{
        debugger
        const errors=this.validate();
        this.setState({errors})
        if(errors) return;
        // if(this.state.editing===false){  
                const params = {
                    depositTypeSlno:this.state.depositType,
                    loanRoi:this.state.loan_roi,
                    loanRate:this.state.loanondeposit_amount,
                    interestCalculation:this.state.interest
                }   
                api.post(`master/loanOnDepositParameter/create`, params)      
                .then(res =>{     
                    this.setState({editing:false})
                    message.success(res.data.data);
                    console.log(res.data.data)
                    setTimeout(function(){window.location.reload(); }, 1000);
                   
                })
                .catch(err=>{
                    message.error(err.response.data.message);
                    setTimeout(function(){window.location.reload(); }, 1000);
                })
        // }
        // else
        // {
        // const params = {
        //     slno:this.state.id,
        //     state:this.state.state,
        //     countrySlno:this.state.country,
        //     isActive:this.state.isediting
        // }    
        // api.post(`master/state/update`, params)
        // .then(res => {      
        //     console.log(res);
        //     message.success(res.data.data);
        //     setTimeout(function(){window.location.reload(); }, 1000);	
        // })
        // .catch(err=>{
        //     console.log(err);
        //     message.error(err.response.data.message);
        //     setTimeout(function(){window.location.reload(); }, 1000);     
        // })
        // }
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
                    url: 'master/loanOnDepositParameter/delete',
                    headers: {"content-type": "application/json"},
                    data :{ 
                    "slno":slno,
                    }
                };
                api(config).then(res => {  
                    console.log(res.data)
                    message.success(res.data.data);
                    setTimeout(function(){window.location.reload(); }, 1000);     
                })
                .catch(err=>{
                    console.log(err);
                    message.error(err.response.data.message);
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
                <h4>Loan On Deposite Parameters</h4>
                <p className="pstyle">Loan On Deposite Parameters</p>
                <div className="btnblue heading"><label className="l1">Loan On Deposite Parameters</label></div>
                <div className="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                    <div className="panel-body">
                        <div className="panel-group" style={{backgroundColor:"#fff"}}>
                            <div className="row">
                                <div className="form-group col-md-12 col-sm-12">
                                  
                                        <div className="panel-group" style={{marginBottom: "8px"}}>
                                            <div className="row" style={{padding:"10px"}}>
                                                <div className="form-group col-md-3 col-sm-3">
                                                    <label className="control-label labelfont" for="deposit_type" >Deposit Type</label>
                                                    <select class="form-control" name="deposit_type"  value={this.state.country}  onChange={this.handleChangedeposit}>
                                                            <option>--Select Deposit Type--</option>
                                                            {this.state.depositType_data.map((data) => 
                                                                <option value={data.slno}>{data.depositType}</option>             
                                                            )}
                                                    </select>
                                                    {this.state.errors && <div style={{color:"red"}}>{this.state.errors.deposittypeError}</div>}
                                                </div>

                                                <div className="form-group col-md-3 col-sm-3">
                                                    <label className="control-label" for="loanrate" style={{fontSize: "16px"}}>Loan Rate on Deposit Amount %</label>
                                                    <input className="form-control"  name="loanondeposit_amount" value={this.state.loanondeposit_amount} onChange={this.handleChange} placeholder="Enter Loan Rate on Deposit Amount" type="text" />
                                                    {this.state.errors && <div style={{color:"red"}}>{this.state.errors.loandepositError}</div>}
                                                </div>

                                                <div className="form-group col-md-3 col-sm-3">
                                                    <label className="control-label labelfont" for="interest" >Interest Calculation</label>
                                                    <select className="form-control"  name="interest" value={this.state.interest} onChange={this.handleChange}>
                                                        <option value="">--Select Interest Calculation--</option>
                                                        <option value="months">months</option>
                                                    </select>
                                                    {this.state.errors && <div style={{color:"red"}}>{this.state.errors.interesttypeError}</div>}
                                                </div>

                                                <div className="form-group col-md-3 col-sm-3">
                                                    <label className="control-label" for="loanrate" style={{fontSize: "16px"}}>Loan ROI above Deposite Rate(E)</label>
                                                    <input className="form-control" id="loanroi" name="loan_roi" value={this.state.loan_roi} onChange={this.handleChange} placeholder="Enter Loan ROI" type="text" />
                                                        <span style={{float: "right",fontSize:"12px"}}>%(per annum)</span>
                                                        {this.state.errors && <div style={{color:"red"}}>{this.state.errors.loanRoiError}</div>}
                                                </div>

                                                

                                                <div className="form-group col-md-3 col-sm-3">
                                                <button  class="btn btn-primary" onClick= {()=>this.handleSubmit()} class="btn btnblue"  style={{width:"100px",borderRadius:"3px",marginRight:"20px",marginTop:"25px"}}>{this.state.button}</button>
                                                </div>

                                            </div>
                                        </div>
                                  
                                </div>
                            </div>
                        </div>

                        <div className="panel-group table-responsive" style={{marginBottom:" 8px"}}>
                            <table className="table table-bordered table-hover table-striped" id="tabel1">
                                <thead>
                                    <tr style={{color:"#3869ae"}}>
                                        <th style={{textAlign:"center"}}>Sl<span className="thdata">_</span>No.</th>
                                        <th style={{textAlign:"Left"}}>Deposit<span className="thdata">_</span>Type</th>
                                        <th style={{textAlign:"Left"}}>Loan<span className="thdata">_</span>Rate</th>
                                        <th style={{textAlign:"Left"}}>Interest</th>
                                        <th style={{textAlign:"Left"}}>Loan<span className="thdata">_</span>ROI</th>
                                        <th className="thaction">Enable / Disable</th>
                                        <th className="thaction">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                            { this.state.loanondeposit_data.map((data, index) => 
                                                <tr role="row" className="odd">
                                                    <td style={{textAlign:"center"}}>{index +1}</td>  
                                                    <td style={{textAlign:"left"}}>{data.depositType}</td>  
                                                    <td style={{textAlign:"left"}}>{data.loanRate}</td> 
                                                    <td style={{textAlign:"left"}}>{data.interestCalculation}</td> 
                                                    <td style={{textAlign:"left"}}>{data.loanRoi}</td> 
                                                    <td style={{textAlign:"center"}}>  
                                                        <label className="switch">
                                                        <input type="checkbox" name="isediting"  defaultChecked={data.isActive}  onChange={this.handleEnableChange}/>
                                                            <span className="slider round"></span>    
                                                        </label>
                                                    </td>
                                                    <td  style={{textAlign:"center"}}>
                                                        <button class="btn w3-white edit-data" id="1">
                                                            <i class="fa fa-pencil text-primary" style={{color:"blue",fontSize:"20px"}} onClick={(e) => this.getstatebyslno(data.slno)} ></i>
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

export default deposit;