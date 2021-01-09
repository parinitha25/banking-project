import React, { Component } from 'react';
import '../../css/Master/state.css';
import api from '../../api/index';
import 'antd/dist/antd.css';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;


class State extends Component{
    state={
        state:'',
        country:'' ,
        state_data:[],
        country_data:[],
        delete_posts:[],   
        button:"ADD",
        id:'',
        editing:false,
        stateError:'',
        countryError:'',
        errors:{},
        isediting:true
    }

    validate=()=>{
        debugger
        const errors={};
        if(this.state.state.trim() === ''){
            errors.stateError='State name is required.';
        }
        else if(!this.state.state.match(/^[a-zA-Z ]+$/)){
            errors.stateError = "State name is not correct";
        }
        if(this.state.country=== '')
            errors.countryError='Country is required.';
        return Object.keys(errors).length=== 0 ? null : errors;
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
    handleChangecountry=(e)=>{
        debugger
        this.setState({country:e.target.value})
    }
 
    handleSubmit=()=>{
        const errors=this.validate();
        this.setState({errors})
        if(errors) return;
        if(this.state.editing===false){  
                const params = {
                    state:this.state.state,
                    countrySlno:this.state.country
                }   
                api.post(`master/state/create`, params)      
                .then(res =>{     
                    this.setState({editing:false})
                    message.success(res.data.data);
                    setTimeout(function(){window.location.reload(); }, 1000);
                    this.getstateList();   
                })
                .catch(err=>{
                    message.error(err.response.data.message);
                    setTimeout(function(){window.location.reload(); }, 1000);
                })
        }
        else
        {
        const params = {
            slno:this.state.id,
            state:this.state.state,
            countrySlno:this.state.country,
            isActive:this.state.isediting
        }    
        api.post(`master/state/update`, params)
        .then(res => {      
            console.log(res);
            message.success(res.data.data);
            setTimeout(function(){window.location.reload(); }, 1000);	
        })
        .catch(err=>{
            console.log(err);
            message.error(err.response.data.message);
            setTimeout(function(){window.location.reload(); }, 1000);     
        })
        }
    }
    componentDidMount(){
        this.getstateList();
        this.getcountrylist();
    }
    
    //get state data
    getstateList = () => {
        debugger
        var config = {
            method: 'post',
            url: 'master/state/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({state_data:res.data.data})
            console.log(this.state.state_data);
        }).catch(err=>{
            console.log(err);
        })
    } 

    //get country list
    getcountrylist = () => {
        var config = {
            method: 'post',
            url: 'master/country/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
          this.setState({country_data:res.data.data})
            console.log(this.state.country_data);
        }).catch(err=>{
            console.log(err);
        })
    } 

     //edit data
     getstatebyslno= (slno) => {
         debugger
        var config = {
            method: 'post',
            url: 'master/state/getBySlno',
            headers: {"content-type": "application/json"},
            data :{ 
              "slno":slno,
            }                 
        };
        console.log(config)
        api(config).then(res=>{
        this.setState({country:res.data.data[0].countrySlno,state:res.data.data[0].state,id:res.data.data[0].slno,editing:true,button:"Update"})
        console.log(this.state.country)
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
                    url: 'master/state/delete',
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
                <div  className="container-fluid">
                    <div className="row">
                        <div className="col-md-1 col-sm-1"></div>
                        <div className="col-md-10 col-sm-10 res">
                            <h4>State</h4>
                            <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px"}}>State</p>
                            <div className="btnblue heading"><label className="l1">State</label></div>
                            <div class="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                                <div class="panel-body">
                                    <div class="panel-group" style={{backgroundColor:"#fff"}}>
                                        <div class="row">		
                                      		<div class="form-group col-md-12 col-sm-12">
                                            <div class="panel-group" style={{marginBottom: "8px"}}>
                                                <div class="row" style={{padding:"10px"}}>
                                                    <div class="form-group col-md-3 col-sm-3">
                                                        <label class="control-label" for="city">Country<span style={{color:"red"}}>*</span></label>
                                                        <select class="form-control" name="country"  value={this.state.country}  onChange={this.handleChangecountry}>
                                                            <option>--Select Country--</option>
                                                            {this.state.country_data.map((data) => 
                                                                <option value={data.slno}>{data.country}</option>             
                                                            )}
                                                        </select>
                     
                                                        {this.state.errors && <div style={{color:"red"}}>{this.state.errors.countryError}</div>}
                                                      
                                                    </div>
                                                    <div class="form-group col-md-3 col-sm-3">
                                                        <label class="control-label" for="city">State<span style={{color:"red"}}>*</span></label>
                                                        <input   class="form-control" id="myInput"  placeholder="Enter State" type="text" name="state" value={this.state.state} onChange={this.handleChange}/> 
                                                        {this.state.errors && <div style={{color:"red"}}>{this.state.errors.stateError}</div>}    
                                                    </div>
                                                    <div class="form-group col-md-3 col-sm-3">
                                                        <button  class="btn btn-primary" onClick={()=>this.handleSubmit()} class="btn btnblue" style={{width:"100px",borderRadius:"3px",marginRight:"20px",marginTop:"25px"}}>{this.state.button}</button>
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
                                                <th style={{textAlign:"center"}}>Sl No.</th>
                                                <th style={{textAlign:"center"}}>Country</th>
                                                <th style={{textAlign:"center"}}>State</th>
                                                <th style={{textAlign:"center"}}>Enable / Disable</th>
                                                <th style={{textAlign:"center"}}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { this.state.state_data.map((data, index) => 
                                                <tr role="row" className="odd">
                                                    <td style={{textAlign:"center"}}>{index +1}</td>  
                                                    <td style={{textAlign:"left"}}>{data.country}</td>  
                                                    <td style={{textAlign:"left"}}>{data.state}</td> 
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
                        <div className="col-md-1 col-sm-1"></div>
                    </div>
                </div>
            </div>              
        )
    }
}

export default State;