import React, { Component } from 'react';
import api from '../../api/index';
import 'antd/dist/antd.css';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

class village extends Component{
    state={
        taluk_data:[],
        district_data:[],
        village_data:[],
        village:'',
        districtError:'',
        talukError:'',
        villageError:'',
        taluk:'',
        district:'',
        isediting:true,
        editing:false,
        button:'ADD',
        id:''
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

    // change the district value
    handleChangedistrict=(e)=>{
         
        this.setState({district:e.target.value})
    }

    // change the taluk value
    handleChangetaluk=(e)=>{
         
        this.setState({taluk:e.target.value})
    }

    componentDidMount(){
        this.getdistrictList();  
        this.gettalukList();  
        this.getvillageList();
        
    }

    validate=()=>{
        const errors={};
        if(this.state.village.trim() === ''){
            errors.villageError='Village name is required.';
        }
        else if(!this.state.village.match(/^[a-zA-Z]+$/)){
            errors.villageError = "Village name is not correct";
        }
        if(this.state.taluk=== '')
            errors.talukError='Taluk is required.';

        if(this.state.district=== '')
            errors.districtError='District is required.';
        return Object.keys(errors).length=== 0 ? null : errors;
    }
    // create data
     handleSubmit=()=>{ 
          
        const errors=this.validate();
        this.setState({errors})
        if(errors) return;
        if(this.state.editing===false){  
            const params = {
                village:this.state.village,
                districtSlno:this.state.district,
                talukSlno:this.state.taluk,
            }   
            api.post(`master/village/create`, params)       
            .then(res => {
                console.log(res);
                 message.success({content: (res.data.data),style: { textAlign: "center" ,marginTop:"100px"},});

                setTimeout(function(){window.location.reload();}, 1000);         
            })
            .catch(err=>{
                console.log(err);
                 message.error({content: (err.response.data.message),style: { textAlign: "center" ,marginTop:"100px"},});

                setTimeout(function(){window.location.reload();}, 1000);   
            })
        }
        else{
            const params = { 
                slno:this.state.id,
                village:this.state.village,
                districtSlno:this.state.district,
                talukSlno:this.state.taluk,
                isActive:this.state.isediting
            }    
            api.post(`master/village/update`, params)
            .then(res => {      
                console.log(res)
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

    //get taluk list
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
    //get village list
    getvillageList = () => {
        var config = {
            method: 'post',
            url: 'master/village/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({village_data:res.data.data})
            console.log(this.state.village_data)
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
                    url: 'master/village/delete',
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

    // edit data
    getvillagebyslno= (slno) => {
        var config = {
            method: 'post',
            url: 'master/village/getBySlno',
            headers: {"content-type": "application/json"},
            data :{ 
              "slno":slno,
            }                 
        };
        api(config).then(res=>{
            this.setState({district:res.data.data[0].districtSlno,taluk:res.data.data[0].talukSlno,village:res.data.data[0].village,id:res.data.data[0].slno,editing:true,button:"Update"})
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
                            <h4>Village</h4>
                            <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px"}}>Village</p>
                            <div className="btnblue heading"><label className="l1">Village</label></div>
                            <div class="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                                <div class="panel-body">
                                    <div class="panel-group" style={{backgroundColor:"#fff"}}>
                                        <div class="row">
                                            <div class="form-group col-md-12 col-sm-12">
                                                <div class="panel-group" style={{marginBottom: "8px"}}>
                                                    <div class="row" style={{padding:"10px"}}>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <label class="control-label" for="district" style={{fontSize: "16px"}}>District</label> <span style={{color: "red"}}>*</span>
                                                            <select class="form-control" name="district"  value={this.state.district}  onChange={this.handleChangedistrict}>
                                                                <option>--Select District--</option>
                                                                {this.state.district_data.map((data) => 
                                                                    <option value={data.slno}>{data.district}</option>             
                                                                )}
                                                            </select>
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.districtError}</div>}	
                                                        </div>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <label class="control-label" for="taluk" style={{fontSize: "16px"}}>Taluk</label> <span style={{color: "red"}}>*</span>
                                                            <select class="form-control" name="taluk"  value={this.state.taluk}  onChange={this.handleChangetaluk}>
                                                                <option>--Select Taluk--</option>
                                                                {this.state.taluk_data.map((data) => 
                                                                    <option value={data.slno}>{data.taluk}</option>             
                                                                )}
                                                            </select>
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.talukError}</div>}	
                     
                                                        </div>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <label class="control-label" for="village" style={{fontSize: "16px"}}>Village</label> <span style={{color: "red"}}>*</span>	
                                                            <input class="form-control"  name="village" placeholder="Enter Village" type="text"  value={this.state.village} onChange={this.handleChange}/>
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.villageError}</div>}	
                                                        </div>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                        <button  class="btn btn-primary" onClick= {()=>this.handleSubmit()} class="btn btnblue"  style={{width:"100px",borderRadius:"3px",marginRight:"20px",marginTop:"25px"}}>{this.state.button}</button>
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
                                                    <th style={{textAlign:"center"}}>District</th>
                                                    <th style={{textAlign:"center"}}>Taluk</th>
                                                    <th style={{textAlign:"center"}}>Village</th>
                                                    <th style={{textAlign:"center"}}>Enable / Disable</th>
                                                    <th style={{textAlign:"center"}}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { this.state.village_data.map((data, index) => 
                                                    <tr role="row" className="odd">
                                                        <td style={{textAlign:"center"}}>{index +1}</td>  
                                                        <td style={{textAlign:"left"}}>{data.district}</td> 
                                                        <td style={{textAlign:"left"}}>{data.taluk}</td>
                                                        <td style={{textAlign:"left"}}>{data.village}</td> 
                                                        <td style={{textAlign:"center"}}>  
                                                            <label className="switch">
                                                                <input type="checkbox" name="isediting"  defaultChecked={data.isActive}  onChange={this.handleEnableChange}/>
                                                                <span className="slider round"></span>    
                                                            </label>
                                                        </td>
                                                        <td  style={{textAlign:"center"}}>
                                                            <button class="btn w3-white edit-data" id="1">
                                                                <i class="fa fa-pencil text-primary" style={{color:"blue",fontSize:"20px"}} onClick={(e) => this.getvillagebyslno(data.slno)} ></i>
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
export default village;