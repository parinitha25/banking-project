import React, { Component } from 'react';
// import '../css/Latefeeparameter.css';
import {Form ,Input,Select} from 'antd';
import api from '../../api/index';
import 'antd/dist/antd.css';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Option } = Select;
const { confirm } = Modal;


class Latefeeparameter extends Component{
    formRef = React.createRef();
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
        errors:{},
        latefeeError:'',
        GraceperiodError:'',
        premiumtypeError:'',
        talukError:'',
        isediting:true
        }
                
        handleChangecompoundingperiod=(e)=>{
            this.setState({premiumtype:e})
        }
            
        //for latefee and grace period
        handleChange=(e)=>{
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
        var config = {
            method: 'post',
            url: 'master/lateFeeParameter/get',
            headers: {"content-type": "application/json"},
            data :{}
        };
        api(config).then(res=>{
            this.setState({graceperiod_data:res.data.data})
            console.log(this.state.graceperiod_data);
        })
        .catch(err=>{
            console.log(err);
        })
    }



    handleSubmit=async()=>{
        if(this.state.editing===false){
            try{ 
                const value = await this.formRef.current.validateFields();
                const params = {
                compoundingPeriodSlno:this.state.premiumtype,
                lateFees:this.state.latefee,
                gracePeriod:this.state.graceperiod
                }
                api.post(`master/lateFeeParameter/create`, params)
                .then(res => {
                    this.setState({editing:false})
                    console.log(res)
                    message.success({content:(res.data.data),style: { textAlign: "center" ,marginTop:"100px"}});
                    setTimeout(function(){window.location.reload(); }, 1000);
                })
                .catch(err=>{
                    console.log(err);
                    message.error({content:(err.response.data.message),style: { textAlign: "center" ,marginTop:"100px"}});
                    setTimeout(function(){window.location.reload(); }, 1000);
                })
            }catch (errorInfo) {
                console.log("failure", errorInfo);
            }
        }
        else{
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
    
    

     //edit data
getlatefeeByslno= (slno) => {
     
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
        this.setState({premiumtype:res.data.data[0].compoundingPeriodSlno,latefee:res.data.data[0].LateFees,graceperiod:res.data.data[0].GracePeriod,id:res.data.data[0].slno,editing:true,button:"Update"})
        this.formRef.current.setFieldsValue({premiumtype:res.data.data[0].compoundingPeriodSlno,latefee:res.data.data[0].LateFees,graceperiod:res.data.data[0].GracePeriod,id:res.data.data[0].slno})
})
    .catch(err => {
    console.log(err)
    })
    }
   

    componentDidMount() {
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
                        <div className="btnblue heading" style={{width:"160px"}}><label className="l1">Late Fee Parameter</label></div>
                            <div className="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                                <div className="panel-body">
                                    <div className="panel-group" style={{backgroundColor:"#fff"}}>
                                        <div className="row">
                                            <div className="form-group col-md-12 col-sm-12">
                                                <div className="panel-group" style={{marginBottom: "8px"}}>
                                                    <div className="row" style={{padding:"10px"}}>
                                                            <Form ref={this.formRef}>
                                                                <div className="form-group col-md-3 col-sm-3">
                                                                    <label className="control-label" for="premium_type">Premium Type <span style={{color:"red"}}>*</span></label>
                                                                    <Form.Item name="premiumtype"  rules={[{ required: true, message: "Please enter Premium type" }]}>
                                                                        <Select onChange={this.handleChangecompoundingperiod}  placeholder="--Premium Type--" className="form-control" value={this.state.premiumtype}  name="premiumtype" >
                                                                            {/* <Option>--Premium Type--</Option> */}
                                                                            {this.state.premium_data.map((data) =>
                                                                                <Option value={data.slno}>{data.compoundingPeriod}</Option>
                                                                            )}
                                                                        </Select>
                                                                    </Form.Item>
                                                                </div>
                                                                <div class="form-group col-md-3 col-sm-3">
                                                                    <label class="control-label" style={{fontSize:"16px"}}>Late Fee(%) <span style={{color:"red"}}>*</span></label>
                                                                    <Form.Item name="latefee" 
                                                                        rules={[{ required: true, message: "Please enter Late Fee" },{pattern:/^[0-9]$/, message:"Numbers should be positive integer only"}]}>
                                                                        <Input type='text' style={{width:"70%"}}  class="form-control" autocomplete="off" placeholder="Enter Late Fee"  name="latefee" value={this.state.latefee} onChange={this.handleChange} />
                                                                    </Form.Item>
                                                                </div>
                                                                <div class="form-group col-md-3 col-sm-3">
                                                                    <label class="control-label" style={{fontSize:"16px"}}>Grace Period <span style={{color:"red"}}>*</span></label>
                                                                    <Form.Item name="graceperiod"  
                                                                        rules={[{ required: true, message: "Please enter Grace Period" },{pattern:/^[0-9]$/, message:"Numbers should be positive integer only"}]}>
                                                                        <Input type='text' style={{width:"70%"}} class="form-control" autocomplete="off"  name="graceperiod" placeholder="Enter Grace Period" value={this.state.graceperiod} onChange={this.handleChange} />
                                                                    </Form.Item>
                                                                </div>
                                                            </Form>
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
                                            <th style={{textAlign:"center"}}>Premium<span style={{visibility:"hidden"}}>_</span>Type</th>
                                            <th style={{textAlign:"center"}}>Late<span style={{visibility:"hidden"}}>_</span>Fee</th>
                                            <th style={{textAlign:"center"}}>Grace<span style={{visibility:"hidden"}}>_</span>Period</th>
                                            <th style={{textAlign:"center"}}>Enable / Disable</th>

                                            <th style={{textAlign:"center"}}><span style={{visibility:"hidden"}}>_</span>Action<span style={{visibility:"hidden"}}>_</span></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                  { this.state.graceperiod_data.map((data, index) =>
                                            <tr>
                                                <td style={{textAlign:"center"}}>{index +1}</td>
                                                <td style={{textAlign:"left"}}>{data.compoundingPeriod}</td>
                                                <td style={{textAlign:"right"}}>{data.LateFees}</td>
                                                <td style={{textAlign:"right"}}>{data.GracePeriod}</td>
                                              
                                                <td style={{textAlign:"center"}}>
                                                <label className="switch">
                                                    <input type="checkbox" name="isediting" defaultChecked={data.isActive} onChange={this.handleEnableChange}/>
                                                    <span className="slider round"></span>    
                                                </label>
                                                </td>
                                                <td style={{textAlign:"center"}}>
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

export default Latefeeparameter;