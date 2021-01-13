import React, { Component } from 'react';
import api from '../../api/index';
import 'antd/dist/antd.css';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;


class Feeparameter extends Component{
    state={
        membertype_data:[],
        feeparameter_data:[],
        feeParameter:'',
        member_type:'',
        shareFee:'',
        adminFee:'',
        buldingFee:'',
        deathFee:'',
        isediting:true,
        editing:false,
        id:'',
        button:"ADD",
        membertypeError:'',
        sharefeeError:'',
        adminfeeError:'',
        buildingfeeError:'',
        deathfeeError:''
    }

    componentDidMount() {
        this.getmembertypeList();
        this.getfeeparameterList();
    }

    validate=()=>{
         
        const errors={};
            if(this.state.member_type === ''){
            errors.membertypeError='Member Type is required.';
            }
            if(this.state.shareFee=== ''){
                errors.sharefeeError='Share Fee is required.';
            }
            if(this.state.adminFee=== ''){
                errors.adminfeeError='Admin Fee is required.';
            }
            if(this.state.deathFee=== ''){
                errors.deathfeeError='Death Fee is required.';
            }
            if(this.state.buldingFee=== ''){
                errors.buildingfeeError='Building Fee is required.';
            }
            return Object.keys(errors).length=== 0 ? null : errors;
    }
        

    //for latefee and grace period
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    //handle change for enable button
    handleEnableChange=(e) =>{
        this.setState({[e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value});
    }

    // change the member type value
    handleChangemembertype=(e)=>{
         
        this.setState({member_type:e.target.value})
    }

    //get membertype data
    getmembertypeList = () => {
        var config = {
            method: 'post',
            url: 'master/memberType/get',
            headers: {"content-type": "application/json"},
            data :{}
        };
        api(config).then(res=>{
            this.setState({membertype_data:res.data.data})
        }).
        catch(err=>{
            console.log(err);
        })
    }

    //get feeparameter data
    getfeeparameterList = () => {
        var config = {
            method: 'post',
            url: 'master/feeParameter/get',
            headers: {"content-type": "application/json"},
            data :{}
        };
        api(config).then(res=>{
            this.setState({feeparameter_data:res.data.data})
        }).
        catch(err=>{
            console.log(err);
        })
    }


    handleSubmit=()=>{
         
        const errors=this.validate();
        this.setState({errors})
        if(errors) return;
        if(this.state.editing===false){
            const params = {
                memberTypeSlno:this.state.member_type,
                shareFee:this.state.shareFee,
                adminFee:this.state.adminFee,
                deathFund:this.state.deathFee,
                buldingFund:this.state.buldingFee
            }
            api.post(`master/feeParameter/create`, params)
            .then(res => {
                this.setState({editing:false})
                console.log(res)
                 message.success({content: (res.data.data),style: { textAlign: "center" ,marginTop:"100px"},});

                setTimeout(function(){window.location.reload(); }, 1000);
            })
            .catch(err=>{
                 message.error({content: (err.response.data.message),style: { textAlign: "center" ,marginTop:"100px"},});

                setTimeout(function(){window.location.reload(); }, 1000);
            })
        }
        else
        {
            const params = {
                slno:this.state.id,
                memberTypeSlno:this.state.member_type,
                shareFee:this.state.shareFee,
                adminFee:this.state.adminFee,
                deathFund:this.state.deathFee,
                buldingFund:this.state.buldingFee,
                isActive:this.state.isediting
            }
            api.post(`master/feeParameter/update`, params)
            .then(res => {
                console.log(res)
                 message.success({content: (res.data.data),style: { textAlign: "center" ,marginTop:"100px"},});

                setTimeout(function(){window.location.reload(); }, 1000);
            })
            .catch(err=>{
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
                    url: 'master/feeParameter/delete',
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
    getlatefeeByslno= (slno) => {
         
        var config = {
            method: 'post',
            url: 'master/feeParameter/getBySlno',
            headers: {"content-type": "application/json"},
            data :{
                "slno":slno,
            }
        }
        api(config).then(res=>{
            this.setState({member_type:res.data.data[0].memberTypeSlno,shareFee:res.data.data[0].shareValue,adminFee:res.data.data[0].adminFee,deathFee:res.data.data[0].deathFund,buldingFee:res.data.data[0].buldingFund,id:res.data.data[0].slno,editing:true,button:"Update"})
            console.log(this.state.id)
            console.log(this.state.member_type)
            console.log(this.state.shareFee)
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
                            <h4>Fee Parameter</h4>
                            <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px"}}>Fee Parameter</p>
                            <div className="btnblue heading" style={{width:"140px"}}><label className="l1">Fee Parameter</label></div>
                            <div className="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                                <div className="panel-body">
                                    <div className="panel-group" style={{backgroundColor:"#fff"}}>
                                        <div className="row">
                                            <div className="form-group col-md-12 col-sm-12">
                                                <div className="panel-group" style={{marginBottom: "8px"}}>
                                                    <div className="row" style={{padding:"10px"}}>
                                                        <div className="form-group col-md-3 col-sm-3">
                                                            <label className="control-label" for="premium_type">Member Type
                                                            <span style={{color:"red"}}>*</span></label>
                                                            <select class="form-control" name="member_type"  value={this.state.member_type}  onChange={this.handleChangemembertype}>
                                                                <option>--Select Member Type--</option>
                                                                {this.state.membertype_data.map((data) => 
                                                                    <option value={data.slno}>{data.memberType}</option>             
                                                                )}
                                                            </select>
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.membertypeError}</div>}
                                                        </div>
                                                        <div className="form-group col-md-3 col-sm-3">
                                                            <label className="control-label" for="late_fee">Share Fee<span style={{color:"red"}}>*</span></label>
                                                            <input className="form-control" name="shareFee" value={this.state.shareFee} onChange={this.handleChange} placeholder="Enter Share Fund" type="text"  />
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.sharefeeError}</div>}
                                                        </div>
                                                        <div className="form-group col-md-3 col-sm-3">
                                                            <label className="control-label" for="grace_period">Admin Fee
                                                            <span style={{color:"red"}}>*</span></label>
                                                            <input className="form-control" name="adminFee" value={this.state.adminFee} onChange={this.handleChange} placeholder="Enter Admin Fund"  type="text"  />
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.adminfeeError}</div>}
                                                        </div>
                                                        <div className="form-group col-md-3 col-sm-3">
                                                            <label className="control-label" for="grace_period">Death Fund Fee
                                                            <span style={{color:"red"}}>*</span></label>
                                                            <input className="form-control" name="deathFee" value={this.state.deathFee} onChange={this.handleChange} placeholder="Enter Death Fund"  />
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.deathfeeError}</div>}
                                                        </div>
                                                    </div>
                                                    <div class="row" style={{padding:"10px"}}>
                                                        <div className="form-group col-md-3 col-sm-3">
                                                            <label className="control-label" for="premium_type">Building Fund Fee<span style={{color:"red"}}>*</span></label>
                                                            <input className="form-control" name="buldingFee" value={this.state.buldingFee} onChange={this.handleChange} placeholder="Enter Building Fund"  />  
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.buildingfeeError}</div>}
                                                        </div>
                                                        <div className="form-group col-md-3 col-sm-3" style={{marginTop:"-14px"}}>
                                                            <button onClick= {()=>this.handleSubmit()}  class="btn btnblue"  style={{width:"100px",borderRadius:"3px",marginRight:"20px",marginTop:"38px"}}>{this.state.button}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel-group table-responsive tb" style={{marginBottom:" 8px",backgroundColor:"#fff"}}>
                                        <table className="table table-bordered table-hover table-striped" id="tabel1">
                                            <thead>
                                                <tr style={{color:"#3869ae"}}>
                                                    <th style={{textAlign:"center"}}>Sl<span style={{visibility:"hidden"}}>_</span>No.</th>
                                                    <th style={{textAlign:"center"}}>Member Type<span style={{visibility:"hidden"}}>_</span>Name</th>
                                                    <th style={{textAlign:"center"}}>Share<span style={{visibility:"hidden"}}>_</span>Fee</th>
                                                    <th style={{textAlign:"center"}}>Admin<span style={{visibility:"hidden"}}>_</span>Fee</th>
                                                    <th style={{textAlign:"center"}}>Death<span style={{visibility:"hidden"}}>_</span>Fund</th>
                                                    <th style={{textAlign:"center"}}>Building<span style={{visibility:"hidden"}}>_</span>Fund</th>
                                                    <th style={{textAlign:"center"}}>Enable / Disable</th>
                                                    <th style={{textAlign:"center"}}><span style={{visibility:"hidden"}}>_</span>Action<span style={{visibility:"hidden"}}>_</span></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { this.state.feeparameter_data.map((data, index) => 
                                                    <tr role="row" className="odd">
                                                        <td style={{textAlign:"center"}}>{index +1}</td>  
                                                        <td style={{textAlign:"left"}}>{data.memberType}</td>  
                                                        <td style={{textAlign:"left"}}>{data.shareFee}</td> 
                                                        <td style={{textAlign:"left"}}>{data.adminFee}</td> 
                                                        <td style={{textAlign:"left"}}>{data.deathFund}</td> 
                                                        <td style={{textAlign:"left"}}>{data.buldingFund}</td> 
                                                        <td style={{textAlign:"center"}}>  
                                                            <label className="switch">
                                                            <input type="checkbox" name="isediting"  defaultChecked={data.isActive}  onChange={this.handleEnableChange}/>
                                                                <span className="slider round"></span>    
                                                            </label>
                                                        </td>
                                                        <td  style={{textAlign:"center"}}>
                                                            <button class="btn w3-white edit-data" id="1">
                                                                <i class="fa fa-pencil text-primary" style={{color:"blue",fontSize:"20px"}} onClick={(e) => this.getlatefeeByslno(data.slno)} ></i>
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

export default Feeparameter;