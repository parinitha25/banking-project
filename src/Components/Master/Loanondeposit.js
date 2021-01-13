import React, { Component } from 'react';
import api from '../../api/index';
import {Form ,Input,Select} from 'antd';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Option } = Select;
const { confirm } = Modal;


class deposit extends Component{
    formRef = React.createRef();
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
        this.setState({[e.target.name]:e.target.value})
    }

    handleChangeinterest=(e)=>{
        debugger
        this.setState({interest:e})
    }

    //handle change for enable button
    handleEnableChange=(e) =>{
        this.setState({
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    }

    // change the deposittype value
    handleChangedeposit=(e)=>{
         
        this.setState({depositType:e})
    }

    handleSubmit=async()=>{
        debugger
        if(this.state.editing===false){  
            try{ 
                const value = await this.formRef.current.validateFields();
                const params = {
                    depositTypeSlno:this.state.depositType,
                    loanRoi:this.state.loan_roi,
                    loanRate:this.state.loanondeposit_amount,
                    interestCalculation:this.state.interest
                }   
                api.post(`master/loanOnDepositParameter/create`, params)      
                .then(res =>{     
                    this.setState({editing:false})
                     message.success({content: (res.data.data),style: { textAlign: "center" ,marginTop:"100px"},});
                    //  setTimeout(function(){window.location.reload(); }, 1000);
                })
                .catch(err=>{
                    message.error({content: (err.response.data.message),style: { textAlign: "center" ,marginTop:"100px"},});
                    setTimeout(function(){window.location.reload(); }, 1000);
                })
            }catch (errorInfo) {
                console.log("failure", errorInfo);
            }
        }
        else
        {
        const params = {
            slno:this.state.id,
            depositTypeSlno:this.state.depositType,
            loanRoi:this.state.loan_roi,
            loanRate:this.state.loanondeposit_amount,
            interestCalculation:this.state.interest,
            isActive:this.state.isediting
        }    
        api.post(`master/loanOnDepositParameter/update`, params)
        .then(res => {      
            console.log(res);
             message.success({content: (res.data.data),style: { textAlign: "center" ,marginTop:"100px"},});

            setTimeout(function(){window.location.reload(); }, 1000);	
        })
        .catch(err=>{
            console.log(err);
             message.error({content: (err.response.data.message),style: { textAlign: "center" ,marginTop:"100px"},});

            setTimeout(function(){window.location.reload(); }, 1000);     
        })
        }
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
                     message.success({content: (res.data.data),style: { textAlign: "center" ,marginTop:"100px"},});

                    setTimeout(function(){window.location.reload(); }, 1000);     
                })
                .catch(err=>{
                    console.log(err);
                     message.error({content: (err.response.data.message),style: { textAlign: "center" ,marginTop:"100px"},});

                    setTimeout(function(){window.location.reload(); }, 1000);   
                })
            },
            onCancel() {
                console.log("Cancel");
            }    
        });
    }

    //edit data
    getstatebyslno= (slno) => {
        var config = {
           method: 'post',
           url: 'master/loanOnDepositParameter/getBySlno',
           headers: {"content-type": "application/json"},
           data :{ 
             "slno":slno,
           }                 
       };
       console.log(config)
       api(config).then(res=>{
       this.setState({depositType:res.data.data[0].depositTypeSlno,loan_roi:res.data.data[0].loanRoi,loanondeposit_amount:res.data.data[0].loanRate,interest:res.data.data[0].interestCalculation,id:res.data.data[0].slno,editing:true,button:"Update"})
       this.formRef.current.setFieldsValue({depositType:res.data.data[0].depositTypeSlno,loan_roi:res.data.data[0].loanRoi,loanondeposit_amount:res.data.data[0].loanRate,interest:res.data.data[0].interestCalculation,id:res.data.data[0].slno})
        console.log(this.state.loan_roi)
    })
       .catch(err => {
           console.log(err)
       })
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
                <div className="btnblue heading" style={{width:"203px"}}><label className="l1" >Loan Deposite Parameters</label></div>
                <div className="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                    <div className="panel-body">
                        <div className="panel-group" style={{backgroundColor:"#fff"}}>
                            <div className="row">
                                <div className="form-group col-md-12 col-sm-12">
                                  
                                        <div className="panel-group" style={{marginBottom: "8px"}}>
                                            <div className="row" style={{padding:"10px"}}>
                                                {/* <div className="form-group col-md-3 col-sm-3">
                                                    <label className="control-label labelfont" for="deposit_type" >Deposit Type</label>
                                                    <select class="form-control" name="depositType"  value={this.state.depositType}  onChange={this.handleChangedeposit}>
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
                                                        <option value="months">Months</option>
                                                    </select>
                                                    {this.state.errors && <div style={{color:"red"}}>{this.state.errors.interesttypeError}</div>}
                                                </div>
                                                <div className="form-group col-md-3 col-sm-3">
                                                    <label className="control-label" for="loanrate" style={{fontSize: "16px"}}>Loan ROI above Deposite Rate(E)</label>
                                                    <input className="form-control" id="loanroi" name="loan_roi" value={this.state.loan_roi} onChange={this.handleChange} placeholder="Enter Loan ROI" type="number" />
                                                        <span style={{float: "right",fontSize:"12px"}}>%(per annum)</span>
                                                        {this.state.errors && <div style={{color:"red"}}>{this.state.errors.loanRoiError}</div>}
                                                </div> */}
                                                <Form ref={this.formRef}>
                                                                <div className="form-group col-md-3 col-sm-3">
                                                                    <label className="control-label" for="premium_type">Deposit Type <span style={{color:"red"}}>*</span></label>
                                                                    <Form.Item name="depositType"  rules={[{ required: true, message: "Please enter Deposit type" }]}>
                                                                        <Select name="depositType" placeholder="--Deposit Type--"  value={this.state.depositType}  onChange={this.handleChangedeposit} >
                                                                           {this.state.depositType_data.map((data) =>
                                                                                <Option value={data.slno}>{data.depositType}</Option>
                                                                            )}
                                                                        </Select>
                                                                    </Form.Item>
                                                                </div>
                                                                <div class="form-group col-md-3 col-sm-3">
                                                                    <label class="control-label" style={{fontSize:"16px"}}>Loan Rate on Deposit Amount % <span style={{color:"red"}}>*</span></label>
                                                                    <Form.Item name="loanondeposit_amount" 
                                                                        rules={[{ required: true, message: "Please enter Loan rate on deposit" },{pattern:/^[0-9]$/, message:"Numbers should be positive integer only"}]}>
                                                                        <Input type='text' style={{width:"70%"}}  class="form-control" autocomplete="off" name="loanondeposit_amount" value={this.state.loanondeposit_amount} onChange={this.handleChange} placeholder="Enter Loan Rate on Deposit Amount" type="text" />
                                                                    </Form.Item>
                                                                </div>
                                                                <div className="form-group col-md-3 col-sm-3">
                                                                    <label className="control-label" for="premium_type">Interest Calculation <span style={{color:"red"}}>*</span></label>
                                                                    <Form.Item name="interest"  rules={[{ required: true, message: "Please enter Interest calculation" }]}>
                                                                        <Select name="interest"  placeholder="--Interest Calculation--" value={this.state.interest}  onChange={this.handleChangeinterest} >
                                                                            <Option value="months">Months</Option>
                                                                        </Select>
                                                                    </Form.Item>
                                                                </div>
                                                                <div class="form-group col-md-3 col-sm-3">
                                                                    <label class="control-label" style={{fontSize:"16px"}}>Loan ROI above Deposite Rate(E) <span style={{color:"red"}}>*</span></label>
                                                                    <Form.Item name="loan_roi"  
                                                                        rules={[{ required: true, message: "Please enter Loan ROI" },{pattern:/^[0-9]$/, message:"Numbers should be positive integer only"}]}>
                                                                        <Input type='text' style={{width:"70%"}} class="form-control" autocomplete="off"  name="loan_roi" value={this.state.loan_roi} onChange={this.handleChange} placeholder="Enter Loan ROI" type="text"/>
                                                                    </Form.Item>
                                                                </div>
                                                            </Form>
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
                                        <th style={{textAlign:"center"}}>Deposit<span className="thdata">_</span>Type</th>
                                        <th style={{textAlign:"center"}}>Loan<span className="thdata">_</span>Rate</th>
                                        <th style={{textAlign:"center"}}>Interest</th>
                                        <th style={{textAlign:"center"}}>Loan<span className="thdata">_</span>ROI</th>
                                        <th className="thaction">Enable / Disable</th>
                                        <th className="thaction">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.loanondeposit_data.map((data, index) => 
                                        <tr role="row" className="odd">
                                            <td style={{textAlign:"center"}}>{index +1}</td>  
                                            <td style={{textAlign:"left"}}>{data.depositType}</td>  
                                            <td style={{textAlign:"right"}}>{data.loanRate}</td> 
                                            <td style={{textAlign:"left"}}>{data.interestCalculation}</td> 
                                            <td style={{textAlign:"right"}}>{data.loanRoi}</td> 
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