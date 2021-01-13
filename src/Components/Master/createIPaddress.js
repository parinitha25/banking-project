import React, { Component } from 'react';
import api from '../../api/index';
import '../../css/Master/createstate.css';

class CreateIPaddress extends Component{
    state={
        name:'',
        ipAddress:'',
        branch_data:[],
        ipaddress_data:[],
        delete_posts:[],
        branch_value:'' ,
        edit_data:[],
        default_value:'',
        button:"ADD",
        message:'',
        id:'',
        editing:false,
        isediting:false,
        checked: true,
        nameError:''
    }

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    // change the branch value
    handleChangeBranch=(e)=>{
        this.setState({branch_value:e.target.value})
    }
    //change the isedit true or false
    handleChangeedit=(e)=>{
         
        this.setState({isediting:e.target.value})
        this.setState({checked: !this.state.checked});
    }
    // create data
    handleSubmit=()=>{
       if(this.state.editing===false){   
        let t=0;
        if(!this.state.name) this.setState({nameError:'IP Address is required'});
        else{
            t++;
            this.setState({nameError:''});
        }   
        if(t>0) {    
        const params = {
            ipAddress:this.state.name,
            branch:this.state.branch_value
        }     
        api.post(`master/ipAddress/create`, params)
        .then(res => {
            console.log(res)	
            console.log(this.state.name)			
        })
        .catch(err=>{
            console.log(err);
        })
        }
    }
        else{
        const params = {
            slno:this.state.id,
            ipAddress:this.state.name,
            isActive:this.state.isediting,
            branch:this.state.branch_value        
        }     
        api.post(`master/ipAddress/update`, params)
        .then(res => {
            console.log(res)				
        })
        .catch(err=>{
            console.log(err);
        })
        }
    }
    //reset the values
    clearForm = () => {
        document.getElementById("myForm").reset(); 
        this.setState({
            name: ""
        })
    }
    componentDidMount(){
        this.getipaddressList();
        this.getbranchlist();
    }
    //get ipaddress data
    getipaddressList = () => {
        var config = {
            method: 'post',
            url: 'master/ipAddress/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({ipaddress_data:res.data.details})
            console.log(this.state.ipaddress_data);
        }).catch(err=>{
            console.log(err);
        })
    } 

    //get branch list
    getbranchlist = () => {
        var config = {
            method: 'post',
            url: 'master/branch/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
          this.setState({branch_data:res.data.details})
            console.log(this.state.branch_data);
        }).catch(err=>{
            console.log(err);
        })
    } 

    //delete data
    deleteRow=(slno)=>{
         
        var config = {
            method: 'post',
            url: 'master/ipAddress/delete',
            headers: {"content-type": "application/json"},
            data :{ 
              "slno":slno,
            }
        };
        api(config).then(res => {  
            console.log(res.data)
            const delete_data = this.state.delete_posts.filter(item => item.slno !== slno);
            this.setState({ delete_data });
            this.getipaddressList()
        }).catch(err=>{
            console.log(err);
        })
    }

     //edit data
     getIPaddressbyslno= (slno) => {
         
        var config = {
            method: 'post',
            url: 'master/ipAddress/getBySlno',
            headers: {"content-type": "application/json"},
            data :{ 
              "slno":slno,
            }                 
        };
        console.log(config)
        api(config).then(res=>{
        this.setState({edit_data:res.data.message,default_value:res.data.details[0].ipAddress,id:res.data.details[0].slno,button:"Update",editing:true})  
        })
        .catch(err => {
            console.log(err)
        })
    }
    render(){
        return(
            <div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-9">
                <div style={{padding:"0px"}}>
                    <h1>IP Address</h1>
                    <p className="para-state">IP Address</p>                   
                    <div class="row">
                    <div class="col-sm-6 col-md-6">
                        <p className="btn btnblue btn-state">IP Address</p>
                    </div>
                    <div class="col-sm-6 col-md-6"></div>
                </div>
                <div class="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                    <div class="panel-body">
                        <div class="panel-group" style={{backgroundColor:"#fff"}}>
                            <div class="form-group">
                                <div className="row">
                                    <div className="col-md-12">
                                        {/* <form className="form-p"> */}
                                            <label class="control-label">Branch</label>
                                            <span><i class="fa fa-star" aria-hidden="true" style={{color:"red"}}></i></span>
                                                <div class="input-group">
                                                <select onChange={this.handleChangeBranch} style={{width:"140%",height:"40px",fontSize:'15px',marginTop:"8px"}}>
                                                    <option>Select Branch</option>
                                                    {/* {this.state.branch_data.map((data) =>  */}
                                                    {/* <option value={data.slno}>{data.name}</option> */}
                                                    {/* )} */}
                                                </select>
                                                </div>
                                                <label class="control-label" style={{marginTop:"25px"}}>IP Address</label>
                                                <span><i class="fa fa-star" aria-hidden="true" style={{color:"red"}}></i></span>
                                                <div class="input-group">
                                                    <input style={{width:"62%",borderColor: "snow",height:"40px",fontSize:'15px',marginTop:"8px"}}  placeholder="Enter IP Address" type="number" name="name" required defaultValue={this.state.default_value} onChange={this.handleChange}/>
                                                    <span class="input-group-btn-add">
                                                        <button onClick={() => this.handleSubmit()}  class="btn btn-primary" style={{color:"white",fontWeight:"bold",marginTop:"8px",height: "39px",width:"75px"}}>{this.state.button}</button>
                                                    </span>
                                                    <p className="colorform">{this.state.nameError}</p>
                                                </div>
                                            {/* </form> */}
                                            <div class="panel-group table-responsive" style={{padding:"20px"}}> 
                                                {/* <table class="table table-bordered table-hover table-striped">
                                                    <thead style={{fontSize: "18px",color:"#337ab7"}}>
                                                        <tr>
                                                            <th scope="col" style={{textAlign:"center"}}>SL.No</th>
                                                            <th scope="col" style={{textAlign:"center"}}>IP Address</th>
                                                            <th scope="col" colspan="2" style={{textAlign:"center"}}>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{textAlign:"center",borderBottom:'1px solid #dee2e6'}}>
                                                        { this.state.ipaddress_data.map((data, index) => 
                                                            <tr role="row" className="odd">
                                                                <td style={{textAlign:"center",fontSize:"20px"}}>{index +1}</td>  
                                                                <td style={{fontSize:"20px"}}>{data.ipAddress}</td> 
                                                                <td  style={{textAlign:"center"}}> 
                                                            
                                                                    <button class="btn">
                                                                        <i class="fa fa-pencil" style={{color:"blue",fontSize:"20px"}} onClick={(e) => this.getIPaddressbyslno(data.slno)} ></i>
                                                                    </button>  
                                                                        
                                                                    <button class="btn">
                                                                        <i  class="fa fa-trash" style={{color:"red",fontSize:"20px"}} onClick={(e) => this.deleteRow(data.slno)}></i>
                                                                    </button>
                                                                
                                                                </td>
                                                            </tr>
                                                        )}  
                                                    </tbody>
                                                </table> */}
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
export default CreateIPaddress;