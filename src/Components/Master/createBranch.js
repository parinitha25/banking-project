import React, { Component } from 'react';
import api from '../../api/index';
import '../../css/Master/createstate.css';

class CreateBranch extends Component{
    state={
        name:'',
        state_data:[],
        district_data:[],
        delete_posts:[],
        taluk_data:[],
        branch_data:[],
        state_value:'',
        district_value:'',
        taluk_value:'',
        edit_data:[],
        default_value1:'',
        default_value2:'',
        default_value3:'',
        default_value4:'',
        default_value5:'',
        default_value6:'',
        button:"ADD",
        message:'',
        id:'',
        editing:false,
        nameError:'',
        phonenumber:'',
        mobilenumber:'',
        pincode:'',
        address:'',
        email:'',
        isediting:false,
        checked: false,
        branchobject:[]
    }

    handleChange=(e)=>{
        const {branchobject}=this.state
        branchobject[e.target.name] = e.target.value
        this.setState({branchobject})
    }
    // change the country value
    handleChangestate=(e)=>{
        this.setState({state_value:e.target.value})
    }

    handleChangedistrict=(e)=>{
        this.setState({district_value:e.target.value})
    }

    handleChangetaluk=(e)=>{
        this.setState({taluk_value:e.target.value})

    }

    //change the isedit true or false
    handleToggle=(e)=>{
         
        this.setState({checked:e.target.value});
        this.setState({isediting:e.target.value})
        
    }
    // create data
    handleSubmit=()=>{ 
         
        // window.location.reload(false)
        if(this.state.editing===false){   
            let t=0;
            if(!this.state.branchobject.name) this.setState({nameError:'Branch name is required'});
            else{
                t++;
                this.setState({nameError:''});
            }   
            if(t>0) { 
                const params = {
                    name:this.state.branchobject.name,
                    state:this.state.state_value,
                    district:this.state.district_value,
                    taluk:this.state.taluk_value,
                    phoneNo:this.state.branchobject.phonenumber,
                    mobileNo:this.state.branchobject.mobilenumber,
                    address:this.state.branchobject.address,
                    pincode:this.state.branchobject.pincode,
                    emailId:this.state.branchobject.email
                }   
                api.post(`master/branch/create`, params)       
                .then(res => {
                    console.log(res)
                    this.gettalukList()	             
                })
                .catch(err=>{
                    console.log(err);
                })
            }
        }
        else
        {
         
        const params = { 
            slno:this.state.branchobject.id,
            name:this.state.branchobject.name,
            state:this.state.state_value,
            district:this.state.district_value,
            taluk:this.state.taluk_value,
            phoneNo:this.state.branchobject.phonenumber,
            mobileNo:this.state.branchobject.mobilenumber,
            address:this.state.branchobject.address,
            pincode:this.state.branchobject.pincode,
            emailId:this.state.branchobject.email,
            isActive:this.state.branchobject.isediting,
        }    
        api.post(`master/branch/update`, params)
        .then(res => {      
            console.log(res)
            console.log("f")
            this.getbranchList();				
        })
        .catch(err=>{
            console.log(err);
        })
        }
    }

    //reset the values
    // clear = () => {
    //      
    //     // document.getElementById("myForm").reset(); 
    //     this.setState({
    //         name: ""
    //     })
    // }
    componentDidMount(){
        this.getstateList();
        this.getdistrictList();
        this.gettalukList();
        this.getbranchList();
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
            console.log(res);
        }).catch(err=>{
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
            console.log(res)
        }).catch(err=>{
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
          this.setState({state_data:res.data.details})
            console.log(res);
        }).catch(err=>{
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
          this.setState({district_data:res.data.details})
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
    } 
     //delete data
     deleteRow=(slno)=>{
        var config = {
            method: 'post',
            url: 'master/branch/delete',
            headers: {"content-type": "application/json"},
            data :{ 
              "slno":slno,
            }
        };
        api(config).then(res => {  
            console.log(res)
            const delete_data = this.state.delete_posts.filter(item => item.slno !== slno);
            this.setState({ delete_data });
            this.getbranchList()
        }).catch(err=>{
            console.log(err);
        })
    }
    // edit data
     getbranchbyslno= (slno) => {
          
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
        this.setState({branchobject:res.data.data,edit_data:res.data.message,default_value1:res.data.data[0].name,default_value2:res.data.data[0].address,default_value3:res.data.data[0].mobileNo,default_value4:res.data.data[0].emailId,default_value5:res.data.data[0].phoneNo,default_value6:res.data.data[0].pincode,id:res.data.data[0].slno,editing:true,button:"Update"})
        })
        .catch(err => {
            console.log(err)
        })
    }
    render(){
        return(
            <div>
                <div className="row" style={{marginRight:"0px"}}>
                    <div className="col-md-2"></div>
                    <div className="col-md-9">
                    <div style={{padding:"0px"}}>
                        <h1>Branch</h1>
                        <p className="para-state">Branch</p>                   
                        <div class="row">
                        <div class="col-sm-6 col-md-6">
                            <p className="btn btnblue btn-state">Branch</p>
                        </div>
                        <div class="col-sm-6 col-md-6"></div>
                    </div>
                    <div class="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                        <div class="panel-body">
                            <div class="panel-group" style={{backgroundColor:"#fff"}}>
                                <div class="form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div style={{padding:"20px"}}>
                                                <label class="control-label">State</label>
                                                <span><i class="fa fa-star" style={{color:"red",fontSize:"10px"}}></i></span>
                                                    <div class="input-group">
                                                        <select onChange={this.handleChangestate} style={{width:"140%",height:"40px",fontSize:'15px',marginTop:"8px"}}>
                                                            <option>Select State</option>
                                                            {this.state.state_data.map((data) => 
                                                            <option value={data.slno}>{data.name}</option>
                                                        )}
                                                        <p className="colorform">{this.state.stateError}</p>
                                                        </select>
                                                    </div>
                                                <label class="control-label"  style={{marginTop:"25px"}}>District</label>
                                                <span><i class="fa fa-star" style={{color:"red",fontSize:"10px"}}></i></span>
                                                    <div class="input-group">
                                                        <select onChange={this.handleChangedistrict} style={{width:"140%",height:"40px",fontSize:'15px',marginTop:"8px"}}>
                                                            <option>Select District</option>
                                                            {this.state.district_data.map((data) => 
                                                            <option value={data.slno}>{data.name}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                <label class="control-label"  style={{marginTop:"25px"}}>Taluk</label>
                                                <span><i class="fa fa-star" style={{color:"red",fontSize:"10px"}}></i></span>
                                                    <div class="input-group">
                                                        <select onChange={this.handleChangetaluk} style={{width:"140%",height:"40px",fontSize:'15px',marginTop:"8px"}}>
                                                            <option>Select Taluk</option>
                                                            {this.state.taluk_data.map((data) => 
                                                            <option value={data.slno}>{data.name}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                    <label class="control-label" style={{marginTop:"25px"}}>Branch</label>
                                                    <span><i class="fa fa-star" aria-hidden="true" style={{color:"red"}}></i></span>
                                                    <div class="input-group">
                                                        <input  style={{width:"90%",height:"40px",fontSize:'15px',marginTop:"8px"}}  placeholder="Enter Branch Name" type="text" name="name" defaultValue={this.state.default_value1} onChange={this.handleChange} />                   
                                                    </div>
                                                    <div class="input-group">
                                                        <input  style={{width:"90%",height:"40px",fontSize:'15px',marginTop:"8px"}}  placeholder="Enter Address" type="text" name="address" defaultValue={this.state.default_value2} onChange={this.handleChange} />                   
                                                       
                                                    </div>
                                                    <div class="input-group">
                                                        <input  style={{width:"90%",height:"40px",fontSize:'15px',marginTop:"8px"}}  placeholder="Enter Phone number" type="number" name="phonenumber" defaultValue={this.state.default_value3} onChange={this.handleChange} />                   
                                                      
                                                    </div>
                                                    <div class="input-group">
                                                        <input  style={{width:"90%",height:"40px",fontSize:'15px',marginTop:"8px"}}  placeholder="Enter email" type="text" name="email" defaultValue={this.state.default_value4} onChange={this.handleChange} />                   
                                                        
                                                    </div>
                                                    <div class="input-group">
                                                        <input  style={{width:"90%",height:"40px",fontSize:'15px',marginTop:"8px"}}  placeholder="Enter Mobile number" type="text" name="mobilenumber" defaultValue={this.state.default_value5} onChange={this.handleChange} />                   
                                                        
                                                    </div>
                                                    <div class="input-group">
                                                        <input  style={{width:"90%",height:"40px",fontSize:'15px',marginTop:"8px"}}  placeholder="Enter Pincode" type="text" name="pincode" defaultValue={this.state.default_value6} onChange={this.handleChange} />                                       
                                                    </div>
                                                    <div class="input-group">
                                                    <span class="input-group-btn-add">
                                                        <button  class="btn btn-primary" onClick= {()=>this.handleSubmit()} style={{color:"white",fontWeight:"bold",height: "39px",width:"75px"}}>{this.state.button}</button>
                                                    </span>
                                                    </div> 
                                                </div>
                                                <div class="panel-group table-responsive" style={{padding:"20px"}}> 
                                                    <table class="table table-bordered table-hover table-striped">
                                                        <thead style={{fontSize: "18px",color:"#337ab7"}}>
                                                            <tr>
                                                                <th scope="col" style={{textAlign:"center"}}>SL.No</th>
                                                                <th scope="col" style={{textAlign:"center"}}>Branch Name </th>
                                                                <th scope="col" style={{textAlign:"center"}}>Email </th>
                                                                <th scope="col" style={{textAlign:"center"}}>Phone Number </th>
                                                                <th scope="col" style={{textAlign:"center"}}>Mobile Number </th>
                                                                <th scope="col" style={{textAlign:"center"}}>Pincode </th>
                                                                <th scope="col" style={{textAlign:"center"}}>Address </th>
                                                                <th scope="col" colspan="2" style={{textAlign:"center"}}>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody style={{textAlign:"center",borderBottom:'1px solid #dee2e6'}}>
                                                            { this.state.branch_data.map((data, index) => 
                                                                <tr role="row" className="odd">
                                                                    <td style={{textAlign:"center",fontSize:"20px"}}>{index +1}</td>  
                                                                    <td style={{fontSize:"20px"}}>{data.name}</td> 
                                                                    <td style={{fontSize:"20px"}}>{data.emailId}</td> 
                                                                    <td style={{fontSize:"20px"}}>{data.mobileNo}</td> 
                                                                    <td style={{fontSize:"20px"}}>{data.phoneNo}</td> 
                                                                    <td style={{fontSize:"20px"}}>{data.pincode}</td> 
                                                                    <td style={{fontSize:"20px"}}>{data.address}</td> 
                                                                    <td  style={{textAlign:"center"}}>   
                                                                    <label class="switch"> 
                                                                        <input type="checkbox"  onChange={this.handleToggle} value='true'  />
                                                                        <span class="slider round"></span></label>                                            
                                                                        <button class="btn">
                                                                            <i class="fa fa-pencil" style={{color:"blue",fontSize:"20px"}} onClick={(e) => this.getbranchbyslno(data.slno)} ></i>
                                                                        </button>  
                                                                        <button class="btn">
                                                                            <i  class="fa fa-trash" style={{color:"red",fontSize:"20px"}} onClick={(e) => this.deleteRow(data.slno)}></i>
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
                    </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        )
    }
}

export default CreateBranch;