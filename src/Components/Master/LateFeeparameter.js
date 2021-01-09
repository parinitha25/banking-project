import React, { Component } from 'react';
// import '../css/Latefeeparameter.css';
// import '../css/toastr.css';
import api from '../../api/index';
import 'antd/dist/antd.css';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;


class Latefeeparameter extends Component{
    
        state={
            name:'',
            premium_data:[],
            premiumtype:'',
            latefee:'',
            latefee_data:[],
            graceperiod_data:[],
            graceperiod:'',
            delete_posts:[],
            edit_data:[],
            default_value:'',
            button:"ADD",
            message:'',
            id:'',
            editing:false,
            stateError:'',
            errors:{},
            stateError:'',
            districtError:'',
            talukError:'',
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

        handleChangecompoundingperiod=(e)=>{
            this.setState({premiumtype:e.target.value})
        }
        
        //for latefee and grace period
        handleChange=(e)=>{
              debugger     
            this.setState({[e.target.name]:e.target.value})
            }

            //handle change for enable button
handleEnableChange=(e) =>{
    this.setState({
    [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
    }

  //get premiumtype data
getpremiumList = () => {
    var config = {
    method: 'post',
    url: 'master/compoundingPeriod/get',
    headers: {"content-type": "application/json"},
    data :{}
    };
    api(config).then(res=>{
    this.setState({premium_data:res.data.data})
    console.log(this.state.premium_data);
    }).catch(err=>{
    console.log(err);
    })
    }
  
 //get grace period data
 getgraceperiodList = () => {
    debugger
    var config = {
    method: 'post',
    url: 'master/lateFeeParameter/get',
    headers: {"content-type": "application/json"},
    data :{}
    };
    api(config).then(res=>{
    this.setState({graceperiod_data:res.data.data})
    console.log(this.state.graceperiod_data);
    }).catch(err=>{
    console.log(err);
    })
    }



handleSubmit=()=>{
if(this.state.editing===false){
const params = {
compoundingPeriodSlno:this.state.premiumtype,
lateFees:this.state.latefee,
gracePeriod:this.state.graceperiod
}

api.post(`master/lateFeeParameter/create`, params)
.then(res => {
this.setState({editing:false})
console.log(res)

this.setState({message:res.data})
// toast.success(this.state.message.data,{position:"top-right"});
console.log(this.state.message)
this.getgraceperiodList();
})

.catch(err=>{
   
    console.log(err);
    // toast.error(err.message);
})
}
else
{
    debugger
const params = {
slno:this.state.id,
compoundingPeriodSlno:this.state.premiumtype,
lateFees:this.state.latefee,
gracePeriod:this.state.graceperiod,
isActive:this.state.isediting
}
api.post(`master/lateFeeParameter/update`, params)
.then(res => {
console.log(res)
// this.getstateList();
this.getgraceperiodList();
})
.catch(err=>{
console.log(err);
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
    url: 'master/lateFeeParameter/delete',
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
    
    

     //edit data
getlatefeeByslno= (slno) => {
    debugger
    var config = {
    method: 'post',
    url: 'master/lateFeeParameter/getBySlno',
    headers: {"content-type": "application/json"},
    data :{
    "slno":slno,
    }
    };
    console.log(config)
    api(config).then(res=>{
        this.setState({edit_data:res.data.message,premiumtype:res.data.data[0].compoundingPeriodSlno,latefee:res.data.data[0].LateFees,graceperiod:res.data.data[0].GracePeriod,id:res.data.data[0].slno,editing:true,button:"Update"})
    console.log(this.state.premiumtype)
    console.log(this.state.lateFees)
    console.log(this.state.gracePeriod)
})
    .catch(err => {
    console.log(err)
    })
    }
   

    componentDidMount() {
        //         $(document).ready(function () {
        //             $('#example1').DataTable({
        //                 lengthMenu:[[3,5,10,15,-1],[3,5,10,15,'ALL']]
        //             })
        // });
        
        this.getpremiumList ();
        this.getgraceperiodList();
             }
        
render(){
return(
<div style={{backgroundColor:"#eeeeee"}}>
{/* <ToastContainer /> */}
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-1 col-sm-1"></div>
                <div className="col-md-10 col-sm-10">
                    <h4>Late Fee Parameter</h4>
                    <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px"}}>Late Fee Parameter</p>
                        <div className="btnblue heading"><label className="l1">Late Fee Parameter</label></div>
                            <div className="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                                <div className="panel-body">
                                    <div className="panel-group" style={{backgroundColor:"#fff"}}>
                                        <div className="row">
                                            <div className="form-group col-md-12 col-sm-12">
                                                <form>
                                                    <div className="panel-group" style={{marginBottom: "8px"}}>
                                                        <div className="row" style={{padding:"10px"}}>
                                                            <div className="form-group col-md-3 col-sm-3">
                                                                <label className="control-label" for="premium_type">Premium Type
                                                                <span style={{color:"red"}}>*</span></label>
                                                                    <select onChange={this.handleChangecompoundingperiod} className="form-control" value={this.state.premiumtype} onChange={this.handleChange} id="active" name="premiumtype">
                                                                        <option value="" disabled selected>Premium Type</option>
                                                                        {this.state.premium_data.map((data) =>
                                                                        <option value={data.slno}>{data.compoundingPeriod}</option>
                                                            )}
                                                                    </select>
                                                            </div>
                                                            <div className="form-group col-md-3 col-sm-3">
                                                                <label className="control-label" for="late_fee">Late Fee(%)
                                                                <span style={{color:"red"}}>*</span></label>
                                                                <input className="form-control" id="late_fee" name="latefee" placeholder="Enter Late Fee" type="text" value={this.state.latefee} onChange={this.handleChange} />
                                                            </div>
                                                            <div className="form-group col-md-3 col-sm-3">
                                                                <label className="control-label" for="grace_period">Grace Period(Days)
                                                                <span style={{color:"red"}}>*</span></label>
                                                                <input className="form-control" id="grace_period" name="graceperiod" placeholder="Enter Grace Period" value={this.state.graceperiod} type="text" onChange={this.handleChange} />
                                                            </div>
                                                            <div className="form-group col-md-3 col-sm-3" style={{marginTop:"-14px"}}>
                                                                    <button onClick= {()=>this.handleSubmit()}  class="btn btnblue"  style={{width:"100px",borderRadius:"3px",marginRight:"20px",marginTop:"38px"}}>{this.state.button}</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel-group table-responsive tb" style={{marginBottom:" 8px",backgroundColor:"#fff"}}>
                                        <table className="table table-bordered table-hover table-striped" id="tabel1">
                                            <thead>
                                            <tr style={{color:"#3869ae"}}>

                                            <th style={{textAlign:"center"}}>Sl<span style={{visibility:"hidden"}}>_</span>No.</th>
                                            <th style={{textAlign:"center"}}>Premium<span style={{visibility:"hidden"}}>_</span>Type</th>
                                            <th style={{textAlign:"center"}}>Late<span style={{visibility:"hidden"}}>_</span>Fee</th>
                                            <th style={{textAlign:"center"}}>Grace<span style={{visibility:"hidden"}}>_</span>Period</th>

                                            <th style={{textAlign:"center"}}><span style={{visibility:"hidden"}}>_</span>Action<span style={{visibility:"hidden"}}>_</span></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                  { this.state.graceperiod_data.map((data, index) =>
                                            <tr>
                                                <td style={{textAlign:"center"}}>{index +1}</td>
                                                <td style={{textAlign:"left"}}>{data.memberTypeName}</td>
                                                <td style={{textAlign:"left"}}>{data.LateFees}</td>
                                                <td style={{textAlign:"left"}}>{data.GracePeriod}</td>
                                              
                                                <td style={{textAlign:"center"}}>
                                                <label className="switch">
                                                    <input type="checkbox" defaultChecked={data.isActive} onChange={this.handleEnableChange}/>
                                                    <span className="slider round"></span>    
                                                </label>
                                                <button className="btn w3-white edit-data" id="1">
                                                <i className="fa fa-pencil text-primary" onClick={(e) => this.getlatefeeByslno(data.slno)}>
                                                </i>
                                                </button>
                                                <button className="btn w3-white delete-data" id="1">
                                                <i className="fa fa-trash text-danger" onClick={(e) => this.deletedata(data.slno)}>
                                                </i>
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

export default Latefeeparameter;