import React, { Component } from 'react';
import '../../css/Master/taluk.css';
import api from '../../api/index';
import 'antd/dist/antd.css';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

class Taluk extends Component{
    state={
        taluk:'',
        state_data:[],
        district_data:[],
        delete_posts:[],
        taluk_data:[],
        state:'',
        district:'',
        button:"ADD",
        id:'',
        editing:false,
        isediting:true,
        talukError:'',
        stateError:'',
        districtError:''
    }

    validate=()=>{
        const errors={};
        if(this.state.taluk.trim() === ''){
            errors.talukError='Taluk name is required.';
        }
        else if(!this.state.taluk.match(/^[a-zA-Z ]+$/)){
            errors.talukError = "Taluk name is not correct";
        }
        if(this.state.state=== '')
            errors.stateError='State is required.';
        if(this.state.district=== '')
            errors.districtError='District is required.';
        return Object.keys(errors).length=== 0 ? null : errors;
    }

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    // change the country value
    handleChangestate=(e)=>{
        this.setState({state:e.target.value})
    }
    // change the district value
    handleChangedistrict=(e)=>{
        this.setState({district:e.target.value})
    }

    //handle change for enable button
    handleEnableChange=(e) =>{
        this.setState({
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    }

    // create data
    handleSubmit=()=>{ 
        const errors=this.validate();
        this.setState({errors})
        if(errors) return;
        if(this.state.editing===false){  
            const params = {
                taluk:this.state.taluk,
                stateSlno:this.state.state,
                districtSlno:this.state.district,
            }   
            api.post(`master/taluk/create`, params)       
            .then(res => {
                console.log(res);
                message.success(res.data.data);
                setTimeout(function(){window.location.reload();}, 1000);         
            })
            .catch(err=>{
                console.log(err);
                message.error(err.response.data.message);
                setTimeout(function(){window.location.reload();}, 1000);   
            })
        }
        else{
            const params = { 
                slno:this.state.id,
                taluk:this.state.taluk,
                stateSlno:this.state.state,
                districtSlno:this.state.district,
                isActive:this.state.isediting
            }    
            api.post(`master/taluk/update`, params)
            .then(res => {      
                console.log(res)
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
        this.getdistrictList();
        this.gettalukList();
    }

    //get taluk data
    gettalukList = () => {
        var config = {
            method: 'post',
            url: 'master/taluk/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({taluk_data:res.data.data})
        })
        .catch(err=>{
            console.log(err);
        })
    } 

    //get state list
    getstateList = () => {
        var config = {
            method: 'post',
            url: 'master/state/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({state_data:res.data.data})
        })
        .catch(err=>{
            console.log(err);
        })
    } 

    //get district list
    getdistrictList = () => {
        var config = {
            method: 'post',
            url: 'master/district/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({district_data:res.data.data})
        })
        .catch(err=>{
            console.log(err);
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
                    url: 'master/taluk/delete',
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

    // edit data
     gettalukbyslno= (slno) => {
        var config = {
            method: 'post',
            url: 'master/taluk/getBySlno',
            headers: {"content-type": "application/json"},
            data :{ 
              "slno":slno,
            }                 
        };
        api(config).then(res=>{
            this.setState({state:res.data.data[0].stateSlno,district:res.data.data[0].districtSlno,taluk:res.data.data[0].taluk,id:res.data.data[0].slno,editing:true,button:"Update"})
        })
        .catch(err => {
            console.log(err)
        })
    }
   
    render(){
        return(
            <div style={{backgroundColor:"#eeeeee"}}>
                <div  className="container-fluid">
                    <div className="row">
                        <div className="col-md-1 col-sm-1"></div>
                        <div className="col-md-10 col-sm-10">
                            <h4>Taluk</h4>
                            <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px"}}>Taluk</p>
                            <div className="btnblue heading"><label className="l1">Taluk</label></div>
                            <div className="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                                <div className="panel-body">
                                    <div className="panel-group" style={{backgroundColor:"#fff"}}>
                                        <div className="row">									
                                            <div className="form-group col-md-12 col-sm-12">
                                                <div className="panel-group" style={{marginBottom: "8px"}}>
                                                    <div className="row" style={{padding:"10px"}}>
                                                        <div className="form-group col-md-3 col-sm-3">
                                                            <label className="control-label" for="city">State</label>
                                                                <select value={this.state.state} onChange={this.handleChangestate} className="form-control">
                                                                    <option>Select State</option>
                                                                    {this.state.state_data.map((data) => 
                                                                        <option value={data.slno}>{data.state}</option>
                                                                    )}
                                                                </select>
                                                                {this.state.errors && <div style={{color:"red"}}>{this.state.errors.stateError}</div>}
                                                        </div>
                                                        <div className="form-group col-md-3 col-sm-3">
                                                            <label className="control-label" for="city">District</label>
                                                                <select value={this.state.district} onChange={this.handleChangedistrict} className="form-control">
                                                                    <option>Select District</option>
                                                                    {this.state.district_data.map((data) => 
                                                                    <option value={data.slno}>{data.district}</option>
                                                                    )}
                                                                </select>	
                                                                {this.state.errors && <div style={{color:"red"}}>{this.state.errors.districtError}</div>}						
                                                        </div>
                                                        <div className="form-group col-md-3 col-sm-3">
                                                            <label className="control-label" for="city">Taluk</label>
                                                            <input   class="form-control"   placeholder="Enter State" type="text" name="taluk" value={this.state.taluk} onChange={this.handleChange}/> 
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.talukError}</div>}
                                                        </div>
                                                        <div className="form-group col-md-3 col-sm-3">
                                                            <button  class="btn btn-primary" onClick= {()=>this.handleSubmit()} class="btn btnblue"  style={{width:"100px",borderRadius:"3px",marginRight:"20px",marginTop:"25px"}}>{this.state.button}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>       
                                    <div class="panel-group table-responsive" style={{marginBottom:" 8px"}}>
                                        <table class="table table-bordered table-hover table-striped" id="example1">
                                            <thead>
                                                <tr style={{color:"#3869ae"}}>
                                                    <th style={{textAlign:"center"}}>Sl No.</th>
                                                    <th style={{textAlign:"center"}}>State</th>
                                                    <th style={{textAlign:"center"}}>District</th>
                                                    <th style={{textAlign:"center"}}>Taluk</th>
                                                    <th style={{textAlign:"center"}}>Enable / Disable</th>
                                                    <th style={{textAlign:"center"}}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { this.state.taluk_data.map((data, index) => 
                                                    <tr role="row" className="odd">
                                                        <td style={{textAlign:"center"}}>{index +1}</td>  
                                                        <td style={{textAlign:"left"}}>{data.state}</td> 
                                                        <td style={{textAlign:"left"}}>{data.district}</td>
                                                        <td style={{textAlign:"left"}}>{data.taluk}</td> 
                                                        <td style={{textAlign:"center"}}>  
                                                            <label className="switch">
                                                                <input type="checkbox" name="isediting"  defaultChecked={data.isActive}  onChange={this.handleEnableChange}/>
                                                                <span className="slider round"></span>    
                                                            </label>
                                                        </td>
                                                        <td  style={{textAlign:"center"}}>
                                                            <button class="btn w3-white edit-data" id="1">
                                                                <i class="fa fa-pencil text-primary" style={{color:"blue",fontSize:"20px"}} onClick={(e) => this.gettalukbyslno(data.slno)} ></i>
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

export default Taluk;