import React, { Component } from 'react';
import '../../css/Master/district.css';
import api from '../../api/index';
import 'antd/dist/antd.css';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

class District extends Component{
    state={
        district:'',
        state_data:[],
        district_data:[],
        delete_posts:[],
        button:'ADD',
        editing:false,
        state:'',
        id:'' ,
        nameError:'',
        countryError:'',
        stateError:'',
        errors:{},  
        isediting:true
    }

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})  
    }

    validate=()=>{
        debugger
        const errors={};
        if(this.state.district.trim() === ''){
            errors.nameError='District name is required.';
        }
        else if(!this.state.district.match(/^[a-zA-Z]+$/)){
            errors.nameError = "District name is not correct";
        }
        if(this.state.state === '')
        errors.stateError='State is required.';
        return Object.keys(errors).length=== 0 ? null : errors;
    }

    //change state value
    handleChangestate=(e)=>{
        this.setState({state:e.target.value})
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
        console.log(errors);
        this.setState({errors})
        if(errors) return;
        if(this.state.editing===false){ 
            const params = {
                district:this.state.district,
                stateSlno:this.state.state
            }      
            api.post(`master/district/create`, params)
            .then(res => {
                this.setState({editing:false})
                message.success(res.data.data);
                setTimeout(function(){window.location.reload(); },1000);
                this.getdistrictList();	
               
            })
            .catch(res=>{
                console.log(res);
                message.error('District name already exists');
                setTimeout(function(){window.location.reload(); }, 1000);
            })
        }
        else{
            debugger
            const params = {
                slno:this.state.id,
                district:this.state.district,
                stateSlno:this.state.state,
                isActive:this.state.isediting
            }     
            api.post(`master/district/update`, params)
            .then(res => {
                console.log(res);
                message.success(res.data.data);
                setTimeout(function(){window.location.reload(); },1000);
                this.getdistrictList();					
            })
            .catch(err=>{
                console.log(err);
                message.error('District name already exists');
                setTimeout(function(){window.location.reload(); }, 1000);
            })
        }
           
    }
  
    componentDidMount(){
        this.getdistrictList();
        this.getstatelist();
    }

    //get district data
    getdistrictList = () => {
        debugger
        var config = {
            method: 'post',
            url: 'master/district/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({district_data:res.data.data})
        }).catch(err=>{
            console.log(err);
        })
    } 

    deletedata=(slno)=> {
        debugger
        confirm({
            title: 'Are you sure delete this list?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk(){
                var config = {
                    method: 'post',
                    url: 'master/district/delete',
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
                    message.error('District  not present');
                })
            },
            onCancel() {
                console.log("Cancel");
            }    
        });
    }

    //edit data
    getdistrictbyslno= (slno) => {
        debugger
        var config = {
            method: 'post',
            url: 'master/district/getBySlno',
            headers: {"content-type": "application/json"},
            data :{ 
              "slno":slno,
            }                 
        };
        api(config).then(res=>{
        this.setState({state:res.data.data[0].stateSlno,district:res.data.data[0].district,id:res.data.data[0].slno,editing:true,button:"Update"}) 
        console.log(this.state.state) 
        console.log(this.state.id)
        })
        .catch(err => {
            console.log(err)
        })
    }
    //get state data   
    getstatelist = () => {
        var config = {
            method: 'post',
            url: 'master/state/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({state_data:res.data.data})
            console.log(this.state.state_data)
        }).catch(err=>{
            console.log(err);
        })
    }

    render(){
        return(
            <div style={{backgroundColor:"#eeeeee"}}>
                <div  className="container-fluid">
                    <div className="row">
                        <div className="col-md-1 col-sm-1"></div>
                        <div className="col-md-10 col-sm-10 res">
                            <h4>District</h4>
                            <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px"}}>District</p>
                            <div className="btnblue heading"><label className="l1">District</label></div>
                            <div class="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                                <div class="panel-body">
                                    <div class="panel-group" style={{backgroundColor:"#fff"}}>
                                        <div class="row">									
                                            <div class="form-group col-md-12 col-sm-12">
                                            <div class="panel-group" style={{marginBottom: "8px"}}>
                                                    <div class="row">		
                                                        <div class="form-group col-md-12 col-sm-12">
                                                        <div class="panel-group" style={{marginBottom: "8px"}}>
                                                            <div class="row" style={{padding:"10px"}}>
                                                                <div class="form-group col-md-3 col-sm-3">
                                                                        <label class="control-label" for="city">State<span style={{color:"red"}}>*</span></label>
                                                                    <select class="form-control" name="state" value={this.state.state} onChange={this.handleChangestate}>
                                                                        <option>Select State</option>
                                                                            {this.state.state_data.map((data) => 
                                                                                <option value={data.slno}>{data.state}</option>
                                                                            )}
                                                                    </select>
                                                                        {this.state.errors && <div style={{color:"red"}}>{this.state.errors.stateError}</div>}
                                                                </div>
                                                                <div class="form-group col-md-3 col-sm-3">
                                                                    <label class="control-label" for="city">District<span style={{color:"red"}}>*</span></label>
                                                                    <input  id="myInput" class="form-control"  placeholder="Enter District" type="text" name="district" value={this.state.district} onChange={this.handleChange}/> 
                                                                    {this.state.errors && <div style={{color:"red"}}>{this.state.errors.nameError}</div>}         
                                                                </div>
                                                                <div class="form-group col-md-3 col-sm-3">
                                                                    <button  class="btn btn-primary" onClick= {()=>this.handleSubmit()} class="btn btnblue"  style={{width:"100px",borderRadius:"3px",marginRight:"20px",marginTop:"25px"}}>{this.state.button}</button>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                    <th style={{textAlign:"center"}}>State</th>
                                                    <th style={{textAlign:"center"}}>District</th>
                                                    <th style={{textAlign:"center"}}>Enable / Disable</th>
                                                    <th style={{textAlign:"center"}}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { this.state.district_data.map((data, index) => 
                                                    <tr role="row" className="odd">
                                                        <td style={{textAlign:"center"}}>{index +1}</td>  
                                                        <td style={{textAlign:"left"}}>{data.state}</td>  
                                                        <td style={{textAlign:"left"}}>{data.district}</td> 
                                                        <td style={{textAlign:"center"}}>  
                                                            <label className="switch">
                                                                <input type="checkbox" name="isediting"  defaultChecked={data.isActicve}  onChange={this.handleEnableChange}/>
                                                                <span className="slider round"></span>    
                                                            </label>
                                                        </td>
                                                        <td  style={{textAlign:"center"}}>
                                                            <button class="btn w3-white edit-data" id="1">
                                                                <i class="fa fa-pencil text-primary" style={{color:"blue",fontSize:"20px"}} onClick={(e) => this.getdistrictbyslno(data.slno)} ></i>
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

export default District;