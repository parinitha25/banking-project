import React, { Component } from 'react';
import api from '../../api/index';
import 'antd/dist/antd.css';
import { Modal,message } from 'antd';
import {Form ,Input} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

class Share extends Component{
    formRef = React.createRef();
    state={
        member_data:[],
        share_data:[],
        membertype:'',
        persharevalue:'',
        min_share:'',
        max_share:'',
        dividend_declared:'',
        editing:false,
        isediting:true,
        button:"ADD",
        membertypeError:'',
        shareError:'',
        MinshareError:'',
        MaxshareError:'',
        DividendError:'',
        id:''
    }

    validate=()=>{
         
        const errors={};
        if(this.state.membertype === ''){
            errors.membertypeError='Member  type is required.';
        }
        if(this.state.persharevalue === ''){
            errors.shareError='Per share value  is required.';
        }
        // else if(!this.state.persharevalue.match(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)){
        //     errors.shareError = "Per share value is not correct";
        // }
        if(this.state.min_share === ''){
            errors.MinshareError='Minimum share is required.';
        }
        // else if(!this.state.min_share.match(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)){
        //     errors.MinshareError = "Minimum share is not correct";
        // }
      
        if(this.state.max_share === ''){
            errors.MaxshareError='Maximum share is required.';
        }
        // else if(!this.state.max_share.match(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)){
        //     errors.MaxshareError = "Maximum share is not correct";
        // }
        if(this.state.dividend_declared === ''){
            errors.DividendError='Dividend declared is required.';
        }
        // else if(!this.state.dividend_declared.match(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)){
        //     errors.DividendError = "Dividend declared is not correct";
        // }
        return Object.keys(errors).length=== 0 ? null : errors;
    }
   
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    componentDidMount(){
        this.getMembertypeList();
        this.getShareList();
    }

    // change the member type value
    handleChangemembertype=(e)=>{
         
        this.setState({membertype:e.target.value})
    }

    //handle change for enable button
     handleEnableChange=(e) =>{
        this.setState({
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    }

    handleSubmit=async()=>{
        // const errors=this.validate();
        // this.setState({errors})
        // if(errors) return;
       
        if(this.state.editing===false){ 
            try{ 
                const value = await this.formRef.current.validateFields();
                const params = {
                    memberTypeSlno:this.state.membertype,
                    shareValue:this.state.persharevalue,
                    minShare:this.state.min_share,
                    maxShare:this.state.max_share,
                    dividendDeclared:this.state.dividend_declared
                }   
                api.post(`master/shareParameter/create`, params)      
                .then(res =>{     
                    this.setState({editing:false})
                     message.success({content: (res.data.data),style: { textAlign: "center" ,marginTop:"100px"},});

                    setTimeout(function(){window.location.reload(); }, 1000);
                    // this.getMembertypeList();   
                })
                .catch(err=>{
                     message.error({content: (err.response.data.message),style: { textAlign: "center" ,marginTop:"100px"},});

                    setTimeout(function(){window.location.reload(); }, 1000);
                })
            }catch (errorInfo) {
            console.log("failure", errorInfo);
          }
    
}
        else
        {
        const params = {
            slno:this.state.id,
            memberTypeSlno:this.state.membertype,
            shareValue:this.state.persharevalue,
            minShare:this.state.min_share,
            maxShare:this.state.max_share,
            dividendDeclared:this.state.dividend_declared,
            isActive:this.state.isediting
        }    
        api.post(`master/shareParameter/update`, params)
        .then(res => {      
            console.log(res);
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
    //get member  data
    getMembertypeList = () => {
        var config = {
            method: 'post',
            url: 'master/memberType/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({member_data:res.data.data})
        }).catch(err=>{
            console.log(err);
        })
    } 
     
    //get share  data
    getShareList = () => {
        var config = {
            method: 'post',
            url: 'master/shareParameter/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({share_data:res.data.data})
            console.log(this.state.share_data);
        }).catch(err=>{
            console.log(err);
        })
    } 

    //edit data
    getsharebyslno= (slno) => {
        var config = {
            method: 'post',
            url: 'master/shareParameter/getBySlno',
            headers: {"content-type": "application/json"},
            data :{ 
                "slno":slno,
            }                 
        };
        api(config).then(res=>{ 
        this.setState({ membertype:res.data.data[0].memberTypeSlno,
                        persharevalue:res.data.data[0].shareValue,
                        min_share:res.data.data[0].minShare,
                        max_share:res.data.data[0].maxShare,
                        dividend_declared:res.data.data[0].dividendDeclared,
                        id:res.data.data[0].slno,
                        editing:true,
                        button:"Update"
                    })
                    this.formRef.current.setFieldsValue({membertype:res.data.data[0].memberTypeSlno,
                        persharevalue:res.data.data[0].shareValue,
                        min_share:res.data.data[0].minShare,
                        max_share:res.data.data[0].maxShare,
                        dividend_declared:res.data.data[0].dividendDeclared,
                        id:res.data.data[0].slno})
        
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
                    url: 'master/shareParameter/delete',
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


    render(){
        return(
            <div style={{backgroundColor:"#eeeeee"}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-1 col-sm-1"></div>
                        <div className="col-md-10 col-sm-10 res">
                            <h4>Share Parameter</h4>
                            <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px"}}>Share Parameter</p>
                            <div className="btnblue heading" style={{width:"140px"}}>
                                <label className="l1">Share Parameter</label>
                            </div>
                            <div class="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                                <div class="panel-body">
                                    <div class="panel-group" style={{backgroundColor:"#fff"}}>
                                        <div class="row">
                                            <div class="form-group col-md-12 col-sm-12">
                                                <div class="panel-group" style={{marginBottom: "8px"}}>
                                                    <div class="row" style={{padding:"10px"}}>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <label class="control-label" for="branch">Member Type</label>
                                                            <select class="form-control" name="membertype"  value={this.state.membertype}  onChange={this.handleChangemembertype}>
                                                                <option>--Select Membertype--</option>
                                                                {this.state.member_data.map((data) => 
                                                                    <option value={data.slno}>{data.memberType}</option>             
                                                                )}
                                                            </select>
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.membertypeError}</div>}
                                                        </div>
                                                        <Form ref={this.formRef}>
                                                            <div class="form-group col-md-3 col-sm-3">
                                                                <label class="control-label" for="per_share_value">Per Share Value</label>
                                                                <Form.Item name="persharevalue" 
                                                                    rules={[{ required: true, message: "Please enter per share value" },{pattern:/^[1-9]$/, message:"Share value should be greter than zero"}]}>
                                                                    <Input type='text' class="form-control" autocomplete="off" placeholder="Enter Per Share value" name="persharevalue" value={this.state.persharevalue} onChange={this.handleChange} />
                                                                </Form.Item>
                                                                {/* {this.state.errors && <div style={{color:"red"}}>{this.state.errors.shareError}</div>} */}
                                                            </div>
                                                        {/* </Form>
                                                        <Form ref={this.formRef}> */}
                                                            <div class="form-group col-md-3 col-sm-3">
                                                                <label class="control-label" for="per_share_value">Minimum Shares</label>
                                                                <Form.Item name="no_of_units" 
                                                                    rules={[{ required: true, message: "Please enter Minimum share" },{pattern:/^[1-9]$/, message:"Shares should be greter than zero"}]}>
                                                                <Input type='number' class="form-control" autocomplete="off" placeholder="Enter Minimum Share" type="text" name="min_share" value={this.state.min_share} onChange={this.handleChange} />
                                                                
                                                                </Form.Item>
                                                                {/* {this.state.errors && <div style={{color:"red"}}>{this.state.errors.MinshareError}</div>} */}
                                                            </div>
                                                        {/* </Form>
                                                        <Form ref={this.formRef}> */}
                                                            <div class="form-group col-md-3 col-sm-3">
                                                                <label class="control-label" for="per_share_value">Maximum Shares</label>
                                                                <Form.Item name="no_of_units" 
                                                                    rules={[{ required: true, message: "Please enter maximum share" },{pattern:/^[1-9]$/, message:"Shares should be greter than zero"}]}>
                                                                <Input type='number' class="form-control" autocomplete="off" placeholder="Enter Maximum Share" type="text" name="max_share" value={this.state.max_share} onChange={this.handleChange} />
                                                                    
                                                                </Form.Item>
                                                                {/* {this.state.errors && <div style={{color:"red"}}>{this.state.errors.MaxshareError}</div>} */}
                                                            </div>
                                                        {/* </Form>
                                                        <Form ref={this.formRef}> */}
                                                            <div class="form-group col-md-3 col-sm-3">
                                                                <label class="control-label" for="per_share_value">Dividend Declared</label>
                                                                <Form.Item name="no_of_units" 
                                                                    rules={[{ required: true, message: "Please enter dividend declared" },{pattern:/^[1-9]*$/, message:"Dividend declared should be greter than zero"}]}>
                                                                <Input type='' class="form-control" autocomplete="off" placeholder="Enter Dividend Declared"  name="dividend_declared" value={this.state.dividend_declared} onChange={this.handleChange} />
                                                                </Form.Item>
                                                                {/* {this.state.errors && <div style={{color:"red"}}>{this.state.errors.DividendError}</div>} */}
                                                            </div>
                                                        </Form>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <button  class="btn btn-primary" onClick={()=>this.handleSubmit()} class="btn btnblue" style={{width:"100px",borderRadius:"3px",marginRight:"20px",marginTop:"25px"}}>{this.state.button}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="panel-group table-responsive" style={{marginBottom:" 8px",backgroundColor:"#fff"}}>
                                                    <table class="table table-bordered table-hover table-striped" id="tabel1">
                                                        <thead>
                                                            <tr style={{color:"#3869ae"}}>
                                                                <th style={{textAlign:"center"}}>Sl<span style={{visibility:"hidden"}}>_</span>No.</th>
                                                                <th style={{textAlign:"center"}}>Member<span style={{visibility:"hidden"}}>_</span>Type</th>
                                                                <th style={{textAlign:"center"}}>Per<span style={{visibility:"hidden"}}>_</span>Share<span style={{visibility:"hidden"}}>_</span>Value</th>
                                                                <th style={{textAlign:"center"}}>Minimum<span style={{visibility:"hidden"}}>_</span>Shares</th>
                                                                <th style={{textAlign:"center"}}>Maximum<span style={{visibility:"hidden"}}>_</span>Shares</th>
                                                                <th style={{textAlign:"center"}}>Dividend<span style={{visibility:"hidden"}}>_</span>Declared.</th>
                                                                <th style={{textAlign:"center"}}>Enable / Disable</th>
                                                                <th style={{textAlign:"center"}}><span style={{visibility:"hidden"}}>_</span>Action<span style={{visibility:"hidden"}}>_</span></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        { this.state.share_data.map((data, index) => 
                                                            <tr>
                                                                <td style={{textAlign:"center"}}>{index +1}</td>
                                                                <td style={{textAlign:"left"}}>{data.memberType}</td>
                                                                <td style={{textAlign:"center"}}>{data.shareValue}</td>
                                                                <td style={{textAlign:"center"}}>{data.minShare}</td>
                                                                <td style={{textAlign:"center"}}>{data.maxShare}</td>
                                                                <td style={{textAlign:"center"}}>{data.dividendDeclared}</td>
                                                                <td style={{textAlign:"center"}}>  
                                                                    <label className="switch">
                                                                    <input type="checkbox" name="isediting"  defaultChecked={data.isActive}  onChange={this.handleEnableChange}/>
                                                                        <span className="slider round"></span>    
                                                                    </label>
                                                                </td>
                                                                <td style={{textAlign:"center"}}>
                                                                    <button class="btn w3-white edit-data" id="1">
                                                                        <i class="fa fa-pencil text-primary" style={{color:"blue",fontSize:"20px"}} onClick={(e) => this.getsharebyslno(data.slno)} ></i>
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
                    </div>
                </div>
            </div>
        )
    }
}
export default Share;