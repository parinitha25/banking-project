import React, { Component } from 'react';
import api from '../../api/index';
import 'antd/dist/antd.css';

import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

class IpEnableDisable extends Component{
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
        ipaddressError:'',
        status:''
    }

    componentDidMount(){
        this.getbranchList();
        this.getipaddressList(); 
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

    // change the country value
    handleChangebranch=(e)=>{
         
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
            //255.255.255.255,192.168.1.1,127.0.0.1,192.168.1.255
        }
        return Object.keys(errors).length=== 0 ? null : errors;
    }

    //create the data
    handleSubmit=()=>{
         
        const params = {
            branchSlno:this.state.branch,
            isActive:this.state.isediting
        }    
        api.post(`master/ipAddress/enableORDisableOnBranch`, params)
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
                <h4>IP Wise Enable/Disable</h4>
                <p className="pstyle">IP Wise Enable/Disable</p>
                <div className="btnblue heading" style={{width:"180px"}}><label className="l1">IP Wise Enable/Disable</label></div>
                <div className="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                    <div className="panel-body">
                        <div className="panel-group" style={{backgroundColor:"#fff"}}>
                            <div className="row">
                                <div className="form-group col-md-12 col-sm-12">
                                  
                                        <div className="panel-group" style={{marginBottom: "8px"}}>
                                            <div className="row" style={{padding:"10px"}}>
                                                <div className="form-group col-md-3 col-sm-3">
                                                    <label className="control-label labelfont" for="branch" >Select Branch</label>
                                                    <select class="form-control" name="branch"  value={this.state.branch}  onChange={this.handleChangebranch}>
                                                        <option>--Select Branch--</option>
                                                        {this.state.branch_data.map((data) => 
                                                            <option value={data.slno}>{data.branchName}</option>             
                                                        )}
                                                    </select>
                                                </div>

                                                <div className="form-group col-md-3 col-sm-3">
                                                    <label className="control-label labelfont" for="status" >Select Status</label>
                                                    <select className="form-control"  name="isediting" value={this.state.isediting} onChange={this.handleChange}>
                                                        <option value="Select Status">--Select Status--</option>
                                                        <option value="true">Enable</option>
                                                        <option value="false">Disable</option>
                                                    </select>
                                                </div>

                                                <div className="form-group col-md-3 col-sm-3">
                                                <button onClick={() => this.handleSubmit()}  class="btn  btnblue" style={{width:"100px",borderRadius:"3px",marginTop:"27px"}}>Update</button>
                                                </div>

                                            </div>
                                        </div>
                                    
                                </div>
                            </div>
                        </div>

                        <div className="panel-group table-responsive" style={{marginBottom:" 8px"}}>
                            <table class="table table-bordered table-hover table-striped" id="tabel1">
                                        <thead>
                                            <tr style={{color:"#3869ae"}}>
                                                <th style={{textAlign:"center"}}>Sl<span style={{visibility:"hidden"}}>_</span>No.</th>
                                                <th style={{textAlign:"center"}}>Branch<span style={{visibility:"hidden"}}>_</span>Type</th>
                                                <th style={{textAlign:"center"}}>IP<span style={{visibility:"hidden"}}>_</span>Address</th>
                                                <th style={{textAlign:"center",paddingRight:"50px",paddingLeft:"50px"}}>Enable / Disable</th>
                                               
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
                                                        </label>
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

export default IpEnableDisable;