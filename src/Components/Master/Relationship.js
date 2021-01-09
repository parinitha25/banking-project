import React, { Component } from 'react';
import '../../css/Master/relationship.css';
import api from '../../api/index';
import 'antd/dist/antd.css';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

class Relationship extends Component{
    state={
        relationshipCode:'',
        relationship:'',
        relationship_data:[],
        delete_posts:[],
        editing:false,
        button:"ADD",
        relationshipcodeError:'',
        relationshipError:'',
        isediting:false,
        errors:{}
    }

    validate=()=>{
        const errors={};
        if(this.state.relationshipCode=== ''){
            errors.relationshipcodeError='Relationship code is required.';
        }
        else if(!this.state.relationshipCode.match(/^[a-zA-Z]+$/)){
            errors.relationshipcodeError = "Relationship code is not correct";
        }
        if(this.state.relationship=== ''){
            errors.relationshipError='Relationship is required.';
        }
        else if(!this.state.relationship.match(/^[a-zA-Z]+$/)){
            errors.relationshipError = "Relationship  is not correct";
        }
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

    handleSubmit=()=>{ 
        const errors=this.validate();
        this.setState({errors})
        if(errors) return;
        if(this.state.editing===false){   
            const params = {
                relationshipCode:this.state.relationshipCode,
                relationship:this.state.relationship
            }   
            api.post(`master/relationship/create`, params)       
            .then(res => {
                message.success(res.data.data);
                setTimeout(function(){window.location.reload(); }, 1000);           
            })
            .catch(err=>{
                message.error(err.response.data.message);
                setTimeout(function(){window.location.reload(); }, 1000);
            })
        }
        else{
            const params = { 
                slno:this.state.id,
                relationshipCode:this.state.relationshipCode,
                relationship:this.state.relationship,
                isActive:this.state.isediting       
            }    
            api.post(`master/relationship/update`, params)
            .then(res => {      
                message.success(res.data.data);
                setTimeout(function(){window.location.reload(); }, 1000);			
            })
            .catch(err=>{
                message.error(err.response.data.message);
                setTimeout(function(){window.location.reload(); }, 1000);
            })
        }
    }
    
    componentDidMount(){
        this.getrealtionship();
    }

    //get relationship data
    getrealtionship = () => {
        var config = {
            method: 'post',
            url: 'master/relationship/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({relationship_data:res.data.data})
            console.log(this.state.relationship_data);
        }).catch(err=>{
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
                    url: 'master/relationship/delete',
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
    getrelationshipbyslno= (slno) => {
        var config = {
           method: 'post',
           url: 'master/relationship/getBySlno',
           headers: {"content-type": "application/json"},
           data :{ 
                "slno":slno,
           }                 
        };
        api(config).then(res=>{
            this.setState({relationshipCode:res.data.data.relationshipCode,relationship:res.data.data.relationship,id:res.data.data.slno,editing:true,button:"Update"})
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
                        <div className="col-md-10 col-sm-10 ">
                            <h4>Relationship</h4>
                            <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px"}}>Relationship</p>
                            <div className="btnblue heading"><label className="l1">Relationship</label></div>
                            <div class="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                                <div class="panel-body">
                                    <div class="panel-group" style={{backgroundColor:"#fff"}}>
                                        <div class="row">									
                                            <div class="form-group col-md-12 col-sm-12">
                                                <div class="panel-group" style={{marginBottom: "8px"}}>
                                                    <div class="row" style={{padding:"10px"}}>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <label class="control-label" for="city">Relationship Code</label>
                                                            <input  class="form-control"  placeholder="Enter Relationship code" type="text" name="relationshipCode" value={this.state.relationshipCode} onChange={this.handleChange} /> 
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.relationshipcodeError}</div>} 
                                                        </div>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <label class="control-label" for="city">Relationship</label>
                                                            <input  class="form-control"  placeholder="Enter Relationship" type="text" name="relationship" value={this.state.relationship} onChange={this.handleChange} /> 
                                                            <div style={{color:"red"}}>{this.state.relationshipError}</div>
                                                                {this.state.errors && <div style={{color:"red"}}>{this.state.errors.relationshipError}</div>} 
                                                        </div>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <button  class="btn btnblue" onClick= {()=>this.handleSubmit()} style={{width:"100px",borderRadius:"3px",marginRight:"20px",marginTop:"25px"}}>{this.state.button}</button>
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
                                                    <th style={{textAlign:"center"}}>Relationship Code</th>
                                                    <th style={{textAlign:"center"}}>Relationship</th>
                                                    <th style={{textAlign:"center"}}>Enable / Disable</th>
                                                    <th style={{textAlign:"center"}}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { this.state.relationship_data.map((data, index) => 
                                                    <tr role="row" className="odd">
                                                        <td style={{textAlign:"center"}}>{index +1}</td>  
                                                        <td style={{textAlign:"left"}}>{data.relationshipCode}</td>  
                                                        <td style={{textAlign:"left"}}>{data.relationship}</td> 
                                                        <td style={{textAlign:"center"}}>
                                                            <label className="switch">
                                                                <input type="checkbox" name="isediting"  defaultChecked={data.isActive}  onChange={this.handleEnableChange}/>
                                                                <span className="slider round"></span>    
                                                            </label>
                                                        </td>
                                                        <td  style={{textAlign:"center"}}>
                                                            <button class="btn w3-white edit-data" id="1">
                                                                <i class="fa fa-pencil text-primary" style={{color:"blue",fontSize:"20px"}} onClick={(e) => this.getrelationshipbyslno(data.slno)} ></i>
                                                            </button>
                                                            <button class="btn w3-white delete-data" id="1">
                                                                <i  class="fa fa-trash text-primary" style={{color:"red",fontSize:"20px"}} onClick={(e) => this.deletedata(data.slno)}></i>
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

export default Relationship;