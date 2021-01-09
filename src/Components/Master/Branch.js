import React, { Component } from 'react';
import api from '../../api/index';
import 'antd/dist/antd.css';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

class Branch extends Component{
    state={
        state_data:[],
        district_data:[],
        village_data:[],
        taluk_data:[],
        branch_data:[],
        state:'',
        district:'',
        taluk:'',
        village:'',
        button:'ADD',
        branch_name:'',
        phone_no:'',
        mobile_no:'',
        email:'',
        contact_name:'',
        branch_place:'',
        pincode:'',
        isediting:true,
        editing:false,
        stateError:'',
        districtError:'',
        villageError:'',
        talukError:'',
        branchError:'',
        branchPlaceError:'',
        mobileNoError:'',
        phoneNoError:'',
        emailError:'',
        contactNameError:'',
        pincodeError:''
    }

    validate=()=>{
        const errors={};
        if(this.state.state=== ''){
            errors.stateError='State name is required.';
        }
        if(this.state.district=== ''){
            errors.districtError='District name is required.';
        }
        if(this.state.taluk=== ''){
            errors.talukError='Taluk name is required.';
        }
        // if(this.state.village=== ''){
        //     errors.villageError='village name is required.';
        // }
        if(this.state.branch_name.trim()=== ''){
            errors.branchError='Branch name is required.';
        }
        else if(!this.state.branch_name.match(/^[a-zA-Z ]+$/)){
            errors.branchError = "Branch name is not correct";
        }
        if(this.state.branch_place.trim()=== ''){
            errors.branchPlaceError='Branch Place is required.';
        }
        else if(!this.state.branch_place.match(/^[a-zA-Z]+$/)){
            errors.branchError = "Branch Place is not correct";
        }   
        if(this.state.pincode=== ''){
            errors.pincodeError='Pincode is required.';
        }
        // else if(!this.state.pincode.match(/^[0-9]{5}$/)){
        //     errors.pincodeError = "Pincode is not correct";
        // }
        if(this.state.mobile_no=== ''){
            errors.mobileNoError='Mobile Number is required.';
        }
        else if(!this.state.mobile_no.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)){
            errors.mobileNoError = "Mobile Number is not correct";
        }
        if(this.state.phone_no===''){
            errors.phoneNoError='Phone Number is required.';
        }
        else if(!this.state.phone_no.match(/^[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{4}[\(\)\.\- ]{0,}$/)){
            errors.phoneNoError = "Phone Number is not correct";
        }
        if(this.state.email.trim()=== ''){
            errors.emailError='Email  is required.';
        }
        else if(!this.state.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            errors.emailError = "Email is not correct";
        }
        if(this.state.contact_name.trim()=== ''){
            errors.contactNameError='Contact name is required.';
        }
        else if(!this.state.contact_name.match(/^[a-zA-Z ]+$/)){
            errors.contactNameError = "Contact name is not correct";
        }

        
        return Object.keys(errors).length=== 0 ? null : errors;
    }

    componentDidMount(){
        this.getstateList();
        this.getdistrictList();
        this.gettalukList();
        this.getvillageList();
        this.getbranchList();
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
    // change the state value
    handleChangestate=(e)=>{
        debugger
        this.setState({state:e.target.value})
    }
    // change the district value
    handleChangedistrict=(e)=>{
        debugger
        this.setState({district:e.target.value})
    }
      // change the taluk value
      handleChangetaluk=(e)=>{
        debugger
        this.setState({taluk:e.target.value})
    }
      // change the village value
      handleChangevillage=(e)=>{
        debugger
        this.setState({village:e.target.value})
    }

      // create data
      handleSubmit=()=>{ 
          debugger
        const errors=this.validate();
        this.setState({errors})
        if(errors) return;
        if(this.state.editing===false){  
            const params = {
                talukSlno:this.state.taluk,
                stateSlno:this.state.state,
                districtSlno:this.state.district,
                villageSlno:this.state.village,
                branchName:this.state.branch_name,
                branchPlace:this.state.branch_place,
                pincode:this.state.pincode,
                mobileNo:this.state.mobile_no,
                email:this.state.email,
                phoneNo:this.state.phone_no, 
                contactName:this.state.contact_name
            }   
            api.post(`master/branch/create`, params)       
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
            debugger
            const params = { 
                slno:this.state.id,
                talukSlno:this.state.taluk,
                stateSlno:this.state.state,
                districtSlno:this.state.district,
                villageSlno:this.state.village,
                branchName:this.state.branch_name,
                branchPlace:this.state.branch_place,
                pincode:this.state.pincode,
                mobileNo:this.state.mobile_no,
                email:this.state.email,
                phoneNo:this.state.phone_no, 
                contactName:this.state.contact_name,
                isActive:this.state.isediting
            }    
            api.post(`master/branch/update`, params)
            .then(res => {      
                console.log(res)
                // message.success(res.data.data);
                // setTimeout(function(){window.location.reload(); }, 1000);				
            })
            .catch(err=>{
                console.log(err);
                // message.error(err.response.data.message);
                // setTimeout(function(){window.location.reload(); }, 1000);   
            })
        }
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
    
    //get village data
     getvillageList = () => {
        var config = {
            method: 'post',
            url: 'master/village/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({village_data:res.data.data})
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
    //get taluk data
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
    //edit data
    getbranchbyslno= (slno) => {
        debugger
       var config = {
           method: 'post',
           url: 'master/branch/getBySlno',
           headers: {"content-type": "application/json"},
           data :{ 
             "slno":slno,
           }                 
       };
       console.log(config)
       api(config).then(res=>{
       this.setState({
                    state:res.data.data[0].stateSlno,
                    district:res.data.data[0].districtSlno,
                    taluk:res.data.data[0].talukSlno,
                    village:res.data.data[0].villageSlno,
                    branch_name:res.data.data[0].branchName,
                    branch_place:res.data.data[0].branchPlace, 
                    pincode:res.data.data[0].pincode,
                    mobile_no:res.data.data[0].mobileNo,
                    phone_no:res.data.data[0].phoneNo,
                    email:res.data.data[0].email,
                    contact_name:res.data.data[0].contactName,
                    id:res.data.data[0].slno,editing:true,button:"Update"})
       console.log(this.state.country)
       })
       .catch(err => {
           console.log(err)
       })
   }

    //delete row
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
                    url: 'master/branch/delete',
                    headers: {"content-type": "application/json"},
                    data :{ 
                    "slno":slno,
                    }
                };
                api(config).then(res => {  
                    console.log(res.data);
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
                    <div className="col-md-10 col-sm-10">
                        <h4>Branch</h4>
                        <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px"}}>Branch</p>
                        <div className="btnblue heading"><label className="l1">Branch</label></div>
                        <div className="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                            <div className="panel-body">
                                <div className="panel-group" style={{backgroundColor:"#fff"}}>
                                    <div className="row">									
                                        <div className="form-group col-md-12 col-sm-12">
                                            <div className="panel-group" style={{marginBottom: "8px"}}>
                                                <div className="row" style={{padding:"10px"}}>
                                                    <div className="form-group col-md-3 col-sm-3">
                                                        <label className="control-label" for="city">State<span style={{color:"red"}}>*</span></label>
                                                            <select value={this.state.state} onChange={this.handleChangestate} className="form-control">
                                                                <option>Select State</option>
                                                                {this.state.state_data.map((data) => 
                                                                    <option value={data.slno}>{data.state}</option>
                                                                )}
                                                            </select>
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.stateError}</div>}
                                                    </div>
                                                    <div className="form-group col-md-3 col-sm-3">
                                                        <label className="control-label" for="city">District<span style={{color:"red"}}>*</span></label>
                                                            <select value={this.state.district} onChange={this.handleChangedistrict} className="form-control">
                                                                <option>Select District</option>
                                                                {this.state.district_data.map((data) => 
                                                                <option value={data.slno}>{data.district}</option>
                                                                )}
                                                            </select>	
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.districtError}</div>}						
                                                    </div>
                                                    <div className="form-group col-md-3 col-sm-3">
                                                        <label className="control-label" for="city">Taluk<span style={{color:"red"}}>*</span></label>
                                                            <select value={this.state.taluk} onChange={this.handleChangetaluk} className="form-control">
                                                                <option>Select Taluk</option>
                                                                {this.state.taluk_data.map((data) => 
                                                                <option value={data.slno}>{data.taluk}</option>
                                                                )}
                                                            </select>	
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.talukError}</div>}						
                                                    </div>
                                                    <div className="form-group col-md-3 col-sm-3">
                                                        <label className="control-label" for="city">Village</label>
                                                            <select value={this.state.village} onChange={this.handleChangevillage} className="form-control">
                                                                <option>Select Village</option>
                                                                {this.state.village_data.map((data) => 
                                                                <option value={data.slno}>{data.village}</option>
                                                                )}
                                                            </select>	
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.villageError}</div>}						
                                                    </div>
                                                    <div className="form-group col-md-3 col-sm-3">
                                                        <label className="control-label" for="city">Branch<span style={{color:"red"}}>*</span></label>
                                                        <input   class="form-control"   placeholder="Enter Branch" type="text" name="branch_name" value={this.state.branch_name} onChange={this.handleChange}/> 
                                                        {this.state.errors && <div style={{color:"red"}}>{this.state.errors.branchError}</div>}
                                                    </div>
                                                    <div className="form-group col-md-3 col-sm-3">
                                                        <label className="control-label" for="city">Branch Place<span style={{color:"red"}}>*</span></label>
                                                        <input   class="form-control"   placeholder="Branch Place" type="text" name="branch_place" value={this.state.branch_place} onChange={this.handleChange} /> 
                                                        {this.state.errors && <div style={{color:"red"}}>{this.state.errors.branchPlaceError}</div>}
                                                    </div>
                                                    <div className="form-group col-md-3 col-sm-3">
                                                        <label className="control-label" for="city">Pincode<span style={{color:"red"}}>*</span></label>
                                                        <input   class="form-control"   placeholder="Pincode" type="text" name="pincode" maxlength="4" value={this.state.pincode} onChange={this.handleChange}/> 
                                                        {this.state.errors && <div style={{color:"red"}}>{this.state.errors.pincodeError}</div>}
                                                    </div>
                                                    <div className="form-group col-md-3 col-sm-3">
                                                        <label className="control-label" for="city">Mobile Number<span style={{color:"red"}}>*</span></label>
                                                        <input   class="form-control"   placeholder="Mobile Number" type="text" name="mobile_no" maxlength="10" value={this.state.mobile_no} onChange={this.handleChange}/> 
                                                        {this.state.errors && <div style={{color:"red"}}>{this.state.errors.mobileNoError}</div>}
                                                    </div>
                                                    <div className="form-group col-md-3 col-sm-3">
                                                        <label className="control-label" for="city">Phone Number<span style={{color:"red"}}>*</span></label>
                                                        <input   class="form-control"   placeholder="Phone Number" type="text" name="phone_no" maxlength="10" value={this.state.phone_no} onChange={this.handleChange}/> 
                                                        {this.state.errors && <div style={{color:"red"}}>{this.state.errors.phoneNoError}</div>}
                                                    </div>
                                                    <div className="form-group col-md-3 col-sm-3">
                                                        <label className="control-label" for="city">Email<span style={{color:"red"}}>*</span></label>
                                                        <input   class="form-control"   placeholder="Email" type="text" name="email" value={this.state.email} onChange={this.handleChange}/> 
                                                        {this.state.errors && <div style={{color:"red"}}>{this.state.errors.emailError}</div>}
                                                    </div>
                                                    <div className="form-group col-md-3 col-sm-3">
                                                        <label className="control-label" for="city">Contact Name<span style={{color:"red"}}>*</span></label>
                                                        <input   class="form-control"   placeholder="Contact name" type="text" name="contact_name" value={this.state.contact_name} onChange={this.handleChange}/> 
                                                        {this.state.errors && <div style={{color:"red"}}>{this.state.errors.contactNameError}</div>}
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
                                                <th style={{textAlign:"Left"}}>State</th>
                                                <th style={{textAlign:"Left"}}>District</th>
                                                <th style={{textAlign:"Left"}}>Taluk</th>
                                                <th style={{textAlign:"Left"}}>Village</th>
                                                <th style={{textAlign:"Left"}}>Branch Name</th>
                                                <th style={{textAlign:"Left"}}>Branch Place</th>
                                                <th style={{textAlign:"Left"}}>Pincode</th>
                                                <th style={{textAlign:"Left"}}>Phone Number</th>
                                                <th style={{textAlign:"Left"}}>Mobile Number</th>
                                                <th style={{textAlign:"Left"}}>Contact Name</th>
                                                <th style={{textAlign:"center"}}>Email</th>
                                                <th style={{textAlign:"center"}}>Enable / Disable</th>
                                                <th style={{textAlign:"center"}}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { this.state.branch_data.map((data, index) => 
                                                <tr role="row" className="odd">
                                                    <td style={{textAlign:"center"}}>{index +1}</td>  
                                                    <td style={{textAlign:"center"}}>{data.state}</td> 
                                                    <td style={{textAlign:"center"}}>{data.district}</td>
                                                    <td style={{textAlign:"center"}}>{data.taluk}</td> 
                                                    <td style={{textAlign:"center"}}>{data.village}</td> 
                                                    <td style={{textAlign:"center"}}>{data.branchName}</td> 
                                                    <td style={{textAlign:"center"}}>{data.branchPlace}</td> 
                                                    <td style={{textAlign:"center"}}>{data.pincode}</td> 
                                                    <td style={{textAlign:"center"}}>{data.phoneNo}</td> 
                                                    <td style={{textAlign:"center"}}>{data.mobileNo}</td>
                                                    <td style={{textAlign:"center"}}>{data.contactName}</td>  
                                                    <td style={{textAlign:"center"}}>{data.email}</td> 
                                                   
                                                    <td style={{textAlign:"center"}}>  
                                                        <label className="switch">
                                                            <input type="checkbox" name="isediting"  defaultChecked={data.isActive}  onChange={this.handleEnableChange}/>
                                                            <span className="slider round"></span>    
                                                        </label>
                                                    </td>
                                                    <td  style={{textAlign:"center"}}>
                                                        <button class="btn w3-white edit-data" id="1">
                                                            <i class="fa fa-pencil text-primary" style={{color:"blue",fontSize:"20px"}} onClick={(e) => this.getbranchbyslno(data.slno)} ></i>
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
export default Branch;