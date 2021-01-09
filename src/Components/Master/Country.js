import React, { Component } from 'react';
import api from '../../api/index';
import 'antd/dist/antd.css';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

class Country extends Component{
    state = {
        country: "",
        country_data:[],
        countryError:'',
        button:"ADD",
        errors:{},
        id:'',
        editing:false,
        isediting:true,
        isActive:''
    };

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    //handle change for enable button
    handleEnableChange=(e) =>{
        this.setState({
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    }

    //validation purpose
    validate=()=>{
        const errors={};
        if(this.state.country.trim() === ''){
            errors.countryError='country name is required.';
        }
        else if(!this.state.country.match(/^[a-zA-Z ]+$/)){
            errors.countryError = "The country name is not correct";
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
                country:this.state.country
            }   
            api.post(`master/country/create`, params)      
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
            country:this.state.country,
            isActive:this.state.isediting
        }    
        api.post(`master/country/update`, params)
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

    componentDidMount(){
        this.getCountryList();
    }
    
    //get country data
    getCountryList = () => {
        var config = {
            method: 'post',
            url: 'master/country/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({country_data:res.data.data})
            console.log(this.state.country_data)
        })
        .catch(err=>{
            console.log(err);
        })
    } 

    //edit data
    getcountrybyslno= (slno) => {
        var config = {
            method: 'post',
            url: 'master/country/getBySlno',
            headers: {"content-type": "application/json"},
            data :{ 
                "slno":slno,
            }                 
        };
        api(config).then(res=>{
            this.setState({country:res.data.data.country,id:res.data.data.slno,editing:true,button:"Update"})
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
                    url: 'master/country/delete',
                    headers: {"content-type": "application/json"},
                    data :{ 
                    "slno":slno,
                    }
                };
                api(config).then(res => {  
                    message.success(res.data.data);
                    setTimeout(function(){window.location.reload(); }, 1000);     
                })
                .catch(err=>{
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
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 col-sm-2"></div>
                        <div className="col-md-10 col-sm-10 res">
                            <h4>Country</h4>
                            <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px"}}>Country</p>
                            <div className="btnblue heading">
                                <label className="l1">Country</label>
                            </div>
                            <div class="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                                <div class="panel-body">
                                    <div class="panel-group" style={{backgroundColor:"#fff"}}>
                                        <div class="row">
                                            <div class="form-group col-md-12 col-sm-12">
                                                <div class="panel-group" style={{marginBottom: "8px"}}>
                                                    <div class="row" style={{padding:"10px"}}>
                                                        <div class="form-group col-md-5 col-sm-12">
                                                            <label class="control-label" for="city">Country</label>
                                                            <div class="input-group">
                                                                <input class="form-control"  placeholder="Enter Country" type="text" name="country" value={this.state.country} onChange={this.handleChange}/> 
                                                                    {this.state.errors && <div style={{color:"red"}}>{this.state.errors.countryError}</div>}  
                                                                <span class="input-group-btn">
                                                                    <button  class="btn btn-primary" onClick={()=>this.handleSubmit()} class="btn btnblue" style={{width:"100px",borderRadius:"3px",marginRight:"20px",marginLeft:"20px"}}>{this.state.button}</button>
                                                                </span>
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
                                                    <th style={{textAlign:"center"}}>Country</th>
                                                    <th style={{textAlign:"center"}}>Enable / Disable</th>
                                                    <th style={{textAlign:"center"}}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { this.state.country_data.map((data, index) => 
                                                    <tr role="row" className="odd">
                                                        <td style={{textAlign:"center"}}>{index +1}</td>  
                                                        <td style={{textAlign:"left"}}>{data.country}</td>  
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
export default Country;