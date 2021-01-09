import React, { Component } from 'react';
// import '../css/ipaddress.css';
import api from '../../api/index';
import 'antd/dist/antd.css';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;


class ipaddress extends Component{
    state={
        branch_data:[],
        ipaddress_data:[],
        isediting:true,
        editing:false,
        ipaddress:'',
        branch:'',
        button:'ADD',
        id:'',
        branchError:'',
        ipaddressError:''
    }

    componentDidMount(){
        this.getbranchList();
        this.getipaddressList();
       
    }

    handleChange=(e)=>{
        debugger
        this.setState({[e.target.name]:e.target.value})
    }

    //handle change for enable button
    handleEnableChange=(e) =>{
        this.setState({
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    }

    // change the country value
    handleChangebranch=(e)=>{
        debugger
        this.setState({branch:e.target.value})
    }
 
      //validation purpose
      validate=()=>{
        const errors={};
        if(this.state.branch === ''){
            errors.branchError='Branch  is required.';
        }
        if(this.state.ipaddress === ''){
            errors.ipaddressError='IP Address  is required.';
        }
        else if(!this.state.ipaddress.match(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)){
            errors.ipaddressError = "The IP Address  is not correct";
            //255.255.255.255
            //127.0.0.1
//192.168.1.1
//192.168.1.255
        }
        return Object.keys(errors).length=== 0 ? null : errors;
    }

    //create the data
    handleSubmit=()=>{
        debugger
        const errors=this.validate();
        this.setState({errors})
        if(errors) return;
        if(this.state.editing===false){  
            const params = {
                ipAddress:this.state.ipaddress,
                branchSlno:this.state.branch
            }   
            api.post(`master/ipAddress/create`, params)      
            .then(res =>{     
                this.setState({editing:false})
                message.success(res.data.data);
                setTimeout(function(){window.location.reload();}, 1000);
            })
            .catch(err=>{
                console.log(err)
                message.error(err.response.data.message);
                setTimeout(function(){window.location.reload();}, 1000);
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
                message.success(res.data.data);
                setTimeout(function(){window.location.reload(); }, 1000);
                this.getCountryList();		
            })
            .catch(err=>{
                message.error(err.response.data.message);
                setTimeout(function(){window.location.reload(); }, 1000);     
            })
        }
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
       //get branch list
       getipaddressList = () => {
        var config = {
            method: 'post',
            url: 'master/ipAddress/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({ipaddress_data:res.data.data})
        })
        .catch(err=>{
            console.log(err);
        })
    } 
    render(){
        return(
        <div style={{backgroundColor:"#eeeeee"}}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-1 col-sm-1"></div>
                        <div className="col-md-10 col-sm-10">
                        <h4>Add IP Address</h4>
                        <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px"}}>Add IP Address</p>
                        <div className="btnblue heading"><label className="l1">Add IP Address</label></div>
                        <div class="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                            <div class="panel-body">
                                <div class="panel-group" style={{backgroundColor:"#fff"}}>
                                    <div class="row">
                                        <div class="form-group col-md-12 col-sm-12">
                                            <div class="panel-group" style={{marginBottom: "8px"}}>
                                                <div class="row" style={{padding:"10px"}}>
                                                    <div class="form-group col-md-3 col-sm-3">
                                                        <label class="control-label" for="plan" style={{fontSize: "16px"}}>Select Branch</label> <span style={{color: "red"}}>*</span>
                                                        <select class="form-control" name="branch"  value={this.state.branch}  onChange={this.handleChangebranch}>
                                                            <option>--Select Branch--</option>
                                                            {this.state.branch_data.map((data) => 
                                                                <option value={data.slno}>{data.branchName}</option>             
                                                            )}
                                                        </select>
                                                        {this.state.errors && <div style={{color:"red"}}>{this.state.errors.branchError}</div>}  
                                                    </div>
                                                    <div class="form-group col-md-3 col-sm-3">
                                                        <label class="control-label" for="ipaddress" style={{fontSize: "16px"}}>IP Address</label> <span style={{color: "red"}}>*</span>	
                                                        <input class="form-control" id="ipaddress" name="ipaddress" placeholder="Enter IP Address" type="text" value={this.state.ipaddress} onChange={this.handleChange}/>
                                                        {this.state.errors && <div style={{color:"red"}}>{this.state.errors.ipaddressError}</div>}  
                                                    </div>
                                                    <div class="form-group col-md-3 col-sm-3">
                                                        <button  class="btn btn-primary" onClick={()=>this.handleSubmit()} class="btn btnblue" style={{width:"100px",borderRadius:"3px",marginRight:"20px",marginLeft:"20px"}}>{this.state.button}</button>
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
                                                <th style={{textAlign:"center"}}>Branch<span style={{visibility:"hidden"}}>_</span>Type</th>
                                                <th style={{textAlign:"center"}}>IP<span style={{visibility:"hidden"}}>_</span>Address</th>
                                                <th style={{textAlign:"center",paddingRight:"50px",paddingLeft:"50px"}}>Enable / Disable</th>
                                                <th style={{textAlign:"center",paddingRight:"50px",paddingLeft:"50px"}}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { this.state.ipaddress_data.map((data, index) => 
                                                <tr role="row" className="odd">
                                                    <td style={{textAlign:"center"}}>{index +1}</td>  
                                                    <td style={{textAlign:"center"}}>{data.branchName}</td>  
                                                    <td style={{textAlign:"left"}}>{data.ipAddress}</td>  
                                                    <td style={{textAlign:"center"}}>
                                                        <label className="switch">
                                                            <input type="checkbox" name="isediting"  defaultChecked={data.isActive}  onChange={this.handleEnableChange}/>
                                                            <span className="slider round"></span>    
                                                        </label></td>
                                                    <td  style={{textAlign:"center"}}>
                                                        <button class="btn w3-white edit-data" id="1">
                                                            <i class="fa fa-pencil text-primary" style={{color:"blue",fontSize:"20px"}} onClick={(e) => this.getcountrybyslno(data.slno)} ></i>
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

export default ipaddress;