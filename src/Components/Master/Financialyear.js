import React, { Component } from 'react';
import api from '../../api/index';
import '../../css/Master/financialyear.css';
import 'antd/dist/antd.css';
import {Form ,Input} from 'antd';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

class Financialyear extends Component{
    formRef = React.createRef();
    state={
        fromYear:'',
        toYear:'',
        year_data:[],
        button:'ADD',
        isediting:true,
        editing:false,
        id:'',
        fromyearError:'',
        toyearError:'',
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

    componentDidMount(){
        this.getfinancialyearList();
    }

    validate=()=>{
        const errors={};
        if(this.state.fromYear.trim() === ''){
            errors.fromyearError='From year is required.';
        }
        if(this.state.toYear.trim()=== '')
            errors.toyearError='To year  is required.';
        return Object.keys(errors).length=== 0 ? null : errors;
    }

      // create data
      handleSubmit=async()=>{ 
         
        // const errors=this.validate();
        // this.setState({errors})
        // if(errors) return;
        if(this.state.editing===false){  
            try{ 
                const value = await this.formRef.current.validateFields();
            const params = {
                fromYear:this.state.fromYear,
                toYear:this.state.toYear    
            }   
            api.post(`master/financialYear/create`, params)       
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
        }catch (errorInfo) {
            console.log("failure", errorInfo);
          }
        }
        else{
            const params = { 
                slno:this.state.id,
                fromYear:this.state.fromYear,
                toYear:this.state.toYear,
                isActive:this.state.isediting
            }    
            api.post(`master/financialYear/update`, params)
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
        
    //get financialyear data
    getfinancialyearList = () => {
         
        var config = {
            method: 'post',
            url: 'master/financialYear/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({year_data:res.data.data})
            console.log(this.state.year_data);
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
                    url: 'master/financialYear/delete',
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
    getyearbyslno= (slno) => {
         
        var config = {
            method: 'post',
            url: 'master/financialYear/getBySlno',
            headers: {"content-type": "application/json"},
            data :{ 
              "slno":slno,
            }                 
        };
        api(config).then(res=>{
            this.setState({fromYear:res.data.data.fromYear,toYear:res.data.data.toYear,id:res.data.data.slno,editing:true,button:"Update"})
            console.log(this.state.fromYear)
            console.log(this.state.toYear)
            this.formRef.current.setFieldsValue({fromYear:res.data.data.fromYear,toYear:res.data.data.toYear,id:res.data.data.slno})
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
                        <div className="col-md-10 col-sm-10 ">
                            <h4>Financial Year</h4>
                            <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px",fontSize:"14px"}}>Financial Year</p>
                            <div className="btnblue heading">
                                <label className="l1">Financial Year</label>
                            </div>
                            <div class="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                                <div class="panel-body">
                                    <div class="panel-group" style={{backgroundColor:"#fff"}}>
                                        <div class="row">
                                            <div class="form-group col-md-12 col-sm-12">
                                                <div class="panel-group" style={{marginBottom: "8px"}}>
                                                    <div class="row" style={{padding:"10px"}}>
                                                        {/* <div class="form-group col-md-3 col-sm-4">
                                                            <label class="control-label" for="fdate" style={{fontSize:"16px"}}>From Year<span style={{color:"red"}}>*</span></label>
                                                            <input type="number" name="fromYear" placeholder="From year" value={this.state.fromYear} onChange={this.handleChange}/>
                                                                {this.state.errors && <div style={{color:"red"}}>{this.state.errors.fromyearError}</div>}  
                                                        </div> */}
                                                        <Form ref={this.formRef}>
                                                            <div class="form-group col-md-3 col-sm-3">
                                                                <label class="control-label" style={{fontSize:"16px"}}>From Year<span style={{color:"red"}}>*</span></label>
                                                                <Form.Item name="fromYear"  
                                                                    rules={[{ required: true, message: "Please enter From Year" },{pattern:/^[0-9]{4}$/, message:"Numbers should not greater than 4",maxlength:"4"}]}>
                                                                    <Input type='text' style={{width:"70%"}}  class="form-control" autocomplete="off" placeholder="From year" maxlength="4" name="fromYear" value={this.state.fromYear} onChange={this.handleChange} />
                                                                </Form.Item>
                                                            </div>
                                                        {/* </Form>
                                                        <Form ref={this.formRef}> */}
                                                            <div class="form-group col-md-3 col-sm-3">
                                                                <label class="control-label" style={{fontSize:"16px"}}>To Year<span style={{color:"red"}}>*</span></label>
                                                                <Form.Item name="toYear"  
                                                                    rules={[{ required: true, message: "Please enter To Year" },{pattern:/^[0-9]{4}$/, message:"Numbers should not greater than 4"}]}>
                                                                    <Input type='text' style={{width:"70%"}} class="form-control" autocomplete="off" maxlength="4" name="toYear" placeholder="To year" value={this.state.toYear} onChange={this.handleChange} />
                                                                </Form.Item>
                                                            </div>
                                                        </Form>
                                                        {/* <div class="form-group col-md-3 col-sm-3">
                                                            <label class="control-label" for="tdate" style={{fontSize:"16px"}}>To Year<span style={{color:"red"}}>*</span></label>
                                                            <input type="number" name="toYear" placeholder="To year" value={this.state.toYear}  onChange={this.handleChange}/>
                                                                {this.state.errors && <div style={{color:"red"}}>{this.state.errors.toyearError}</div>}
                                                        </div> */}
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <button onClick= {()=>this.handleSubmit()}  class="btn btnblue"  style={{width:"100px",borderRadius:"3px",marginRight:"20px",marginLeft:"20px",marginTop:"28px"}}>{this.state.button}</button>
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
                                                    <th style={{textAlign:"center"}}>From Date</th>
                                                    <th style={{textAlign:"center"}}>To Date</th>
                                                    <th style={{textAlign:"center"}}>Enable / Disable</th>
                                                    <th style={{textAlign:"center"}}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            { this.state.year_data.map((data, index) =>
                                                <tr>
                                                    <td style={{textAlign:"center"}}>{index +1}</td>
                                                    <td style={{textAlign:"center"}}>{data.fromYear}</td>
                                                    <td style={{textAlign:"center"}}>{data.toYear}</td>
                                                    <td style={{textAlign:"center"}}>  
                                                        <label className="switch">
                                                            <input type="checkbox" name="isediting"  defaultChecked={data.isActive}  onChange={this.handleEnableChange}/>
                                                            <span className="slider round"></span>    
                                                        </label>
                                                    </td>
                                                    <td style={{textAlign:"center"}}>
                                                        <button class="btn w3-white edit-data" id="1">
                                                            <i class="fa fa-pencil text-primary" style={{color:"blue",fontSize:"20px"}} onClick={(e) => this.getyearbyslno(data.slno)} ></i>
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
export default Financialyear;