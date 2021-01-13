import React, { Component } from 'react';
import api from '../../api/index';
import 'antd/dist/antd.css';
import '../../css/Master/userlogin.css';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;



class Userlogin extends Component{   
    state={
        branch_data:[],
        branch:'',
        user_name:'',
        email:'',
        password:'',
        mobile:'',
        name:'',
        address:'',
        button:"ADD",
        isediting:true,
        editing:false,
        branchError:'',
        usernameError:'',
        nameError:'',
        emailError:'',
        passwordError:'',
        mobileNoError:'',
        addressError:''
    }

    validate=()=>{
        const errors={};
        if(this.state.branch=== ''){
            errors.branchError='Branch name is required.';
        }
        if(this.state.user_name.trim()=== ''){
            errors.usernameError='User name is required.';
        }
        else if(!this.state.user_name.match(/^[a-zA-Z ]+$/)){
            errors.branchError = "User name is not correct";
        }
        if(this.state.name.trim()=== ''){
            errors.nameError='Name is required.';
        }
        else if(!this.state.name.match(/^[a-zA-Z ]+$/)){
            errors.nameError = "Name is not correct";
        }
        if(this.state.address.trim()=== ''){
            errors.addressError='Address  is required.';
        } 
        else if(!this.state.address.match(/^[a-zA-Z ]+$/)){
            errors.addressError = "Address is not correct";
        } 
        if(this.state.mobile=== ''){
            errors.mobileNoError='Mobile Number is required.';
        }
        else if(!this.state.mobile.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)){
            errors.mobileNoError = "Mobile Number is not correct";
        }
        if(this.state.email.trim()=== ''){
            errors.emailError='Email  is required.';
        }
        else if(!this.state.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            errors.emailError = "Email is not correct";
        }
        if(this.state.password.trim()=== ''){
            errors.passwordError='Password  is required.';
        }
        else if(!this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)){
            errors.passwordError = "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters";
        }
        
        return Object.keys(errors).length=== 0 ? null : errors;
    }

    handleChange=(e)=>{
   
        this.setState({[e.target.name]:e.target.value})
    }

    componentDidMount(){
        this.getbranchList();  
    }
     // change the country value
     handleChangebranch=(e)=>{
         
        this.setState({branch:e.target.value})
    }
    //get branch list
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

     //create the data
     handleSubmit=()=>{
         
        const errors=this.validate();
        this.setState({errors})
        if(errors) return;
        if(this.state.editing===false){  
            const params = {
                branchSlno:this.state.branch,
                username:this.state.user_name,
                emailId:this.state.email,
                password:this.state.password,
                address:this.state.address,
                name:this.state.name,

            }   
            api.post(`master/users/create`, params)      
            .then(res =>{     
                this.setState({editing:false})
                //  message.success({content: (res.data.data),style: { textAlign: "center" ,marginTop:"100px"},});

                // setTimeout(function(){window.location.reload();}, 1000);
            })
            .catch(err=>{
                console.log(err)
                //  message.error({content: (err.response.data.message),style: { textAlign: "center" ,marginTop:"100px"},});

                // setTimeout(function(){window.location.reload();}, 1000);
            })
        }
        else
        {
        const params = {
            slno:this.state.id,
            ipAddress:this.state.ipaddress,
            branchSlno:this.state.branch,
            isActive:this.state.isediting
        }    
        api.post(`master/ipAddress/update`, params)
            .then(res => {      
                 message.success({content: (res.data.data),style: { textAlign: "center" ,marginTop:"100px"},});

                setTimeout(function(){window.location.reload(); }, 1000);	
            })
            .catch(err=>{
                console.log(err)
                 message.error({content: (err.response.data.message),style: { textAlign: "center" ,marginTop:"100px"},});

                setTimeout(function(){window.location.reload(); }, 1000);     
            })
        }
    }

    render(){
        return(
            <div style={{backgroundColor:"#eeeeee"}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-1 col-sm-1"></div>
                        <div className="col-md-10 col-sm-10">
                            <h4>Branch User</h4>
                            <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px"}}>Branch User</p>
                            <div className="btnblue heading"><label className="l1">Branch User</label></div>
                            <div className="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                                <div className="panel-body">
                                    <div className="panel-group" style={{backgroundColor:"#fff"}}>
                                        <div className="row">
                                            <div className="form-group col-md-12 col-sm-12">
                                                <div className="panel-group" style={{marginBottom: "8px"}}>
                                                    <div className="row" style={{padding:"10px"}}>
                                                        <div className="form-group col-md-3 col-sm-3">
                                                            <label className="control-label" for="user_name">User Name<span style={{color:"red"}}>*</span></label>
                                                            <input  className="form-control"  name="user_name" value={this.state.user_name} onChange={this.handleChange} placeholder="Enter User Name" />   
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.usernameError}</div>}
                                                        </div>
                                                        <div className="form-group col-md-3 col-sm-3">
                                                            <label className="control-label" for="password">Password
                                                            <span style={{color:"red"}}>*</span></label>
                                                            <input className="form-control"  name="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter Password" type="text"  />
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.passwordError}</div>}
                                                        </div>
                                                        <div className="form-group col-md-3 col-sm-3">
                                                            <label className="control-label" for="emailid">Email
                                                            <span style={{color:"red"}}>*</span></label>
                                                            <input className="form-control"  name="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter Email Id"  type="text"  />
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.emailError}</div>}
                                                        </div>
                                                        <div className="form-group col-md-3 col-sm-3">
                                                            <label className="control-label" for="mobile">Mobile 
                                                            <span style={{color:"red"}}>*</span></label>
                                                            <input className="form-control"  name="mobile" value={this.state.mobile} onChange={this.handleChange} placeholder="Enter Mobile No."  />
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.mobileNoError}</div>}
                                                        </div>
                                                    </div>
                                                    <div class="row" style={{padding:"10px"}}>
                                                        <div className="form-group col-md-3 col-sm-3">
                                                            <label className="control-label" for="branch_name">Branch <span style={{color:"red"}}>*</span></label>
                                                            <select class="form-control" name="branch"  value={this.state.branch}  onChange={this.handleChangebranch}>
                                                                <option>--Select Branch--</option>
                                                                {this.state.branch_data.map((data) => 
                                                                    <option value={data.slno}>{data.branchName}</option>             
                                                                )}
                                                            </select>
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.branchError}</div>}
                                                        </div>
                                                        <div className="form-group col-md-3 col-sm-3">
                                                            <label className="control-label" for="name">Name
                                                            <span style={{color:"red"}}>*</span></label>
                                                            <input className="form-control"  name="name" value={this.state.name} onChange={this.handleChange} placeholder="Enter name"  />
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.nameError}</div>}
                                                        </div>
                                                        <div className="form-group col-md-3 col-sm-3">
                                                            <label className="control-label" for="address">Address
                                                            <span style={{color:"red"}}>*</span></label>
                                                            <textarea className="form-control"  name="address" value={this.state.address} onChange={this.handleChange}placeholder="Enter Address"></textarea>  
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.addressError}</div>}
                                                        </div>
                                                        <div className="form-group col-md-3 col-sm-3" style={{marginTop:"-14px"}}>
                                                            <button onClick={() => this.handleSubmit()}  class="btn  btnblue" style={{width:"100px",borderRadius:"3px",marginTop:"45px"}}>{this.state.button}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default Userlogin;