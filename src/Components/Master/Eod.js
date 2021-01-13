import React, { Component } from 'react';
import '../../css/Master/Bod.css';
import 'antd/dist/antd.css';
import api from '../../api/index';
import moment from 'moment';
import { DatePicker,Form } from 'antd';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

class EOD extends Component{
    formRef = React.createRef();
    state={
        date:'',
        eod_data:[],
        id:'',
        isediting:true,
        editing:false,
        eodError:'',
        button:'ADD'
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

    //validation purpose
    validate=()=>{
        const errors={};
        if(this.state.date === ''){
            errors.eodError='EOD is required.';
        }
        return Object.keys(errors).length=== 0 ? null : errors;
    }

    dateChange=(dateString)=>{
        this.setState({ date: moment(dateString).format("DD/MM/YYYY")});
    }
   
    //create the data
    handleSubmit=()=>{
        const errors=this.validate();
        this.setState({errors})
        if(errors) return;
        if(this.state.editing===false){  
            const params = {
                eod:this.state.date, 
            }   
            api.post(`master/eod/create`, params)      
            .then(res =>{     
                this.setState({editing:false})
                message.success({content: (res.data.data),style: { textAlign: "center" ,marginTop:"100px"},});
                setTimeout(function(){window.location.reload();}, 1000);
            })
            .catch(err=>{
                console.log(err)
                message.error({content: (err.response.data.message),style: { textAlign: "center" ,marginTop:"100px"},});
                setTimeout(function(){window.location.reload();}, 1000);
            })
        }
        else
        {
        const params = {
            slno:this.state.id,
            eod:this.state.date, 
            isActive:this.state.isediting
        }    
        api.post(`master/eod/update`, params)
            .then(res => {      
                 message.success({content: (res.data.data),style: { textAlign: "center" ,marginTop:"100px"},});

                setTimeout(function(){window.location.reload(); }, 1000);
                	
            })
            .catch(err=>{
                 message.error({content: (err.response.data.message),style: { textAlign: "center" ,marginTop:"100px"},});

                setTimeout(function(){window.location.reload(); }, 1000);     
            })
        }
    }


    componentDidMount(){
        this.geteodlist();
    }

    //get bod list
    geteodlist = () => {
        var config = {
            method: 'post',
            url: 'master/eod/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
          this.setState({eod_data:res.data.data})
            console.log(this.state.eod_data);
        }).catch(err=>{
            console.log(err);
        })
    } 

    //edit data
    geteodbyslno= (slno) => {
        var config = {
            method: 'post',
            url: 'master/eod/getBySlno',
            headers: {"content-type": "application/json"},
            data :{ 
                "slno":slno,
            }                 
        };
        api(config).then(res=>{
            this.setState({date: res.data.data[0].eod,id:res.data.data[0].slno,editing:true,button:"Update"})
            var temp= (res.data.data[0].eod).toString()
            var temp1=moment((temp.substr(1, 31)+ ''))  
            this.formRef.current.setFieldsValue({ date: temp1});   
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
                    url: 'master/eod/delete',
                    headers: {"content-type": "application/json"},
                    data :{ 
                    "slno":slno,
                    }
                };
                api(config).then(res => {  
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
   

    render(){
        return(
            <div style={{backgroundColor:"#eeeeee;"}} >
                <div className="container-fluid" >
                    <div className="row">
                        <div className="col-md-1 col-sm-1"></div>
                        <div className="col-md-10 col-sm-10 ">
                        <h4>EOD</h4>
                        <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px"}}>EOD</p>
                        <div className="btnblue heading"><label className="l1">EOD</label></div>
                            <div className="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                                <div className="panel-body">
                                    <div className="panel-group" style={{backgroundColor:"#fff"}}>
                                        <div className="row">
                                            <div className="form-group col-md-12 col-sm-12">
                                                <div className="panel-group" style={{marginBottom: "8px"}}>
                                                    <div className="row" style={{padding:"10px"}}>
                                                        <div className="form-group col-md-4 col-sm-12">
                                                            <label className="control-label" for="bod">EOD<span style={{color:"red"}}>*</span></label>
                                                            <div className="input-group">
                                                                <Form ref={this.formRef} >
                                                                    <Form.Item name="date">
                                                                        <DatePicker onChange={this.dateChange}/>
                                                                    </Form.Item>
                                                                </Form>
                                                                <span className="input-group-btn">
                                                                    <button  class="btn btn-primary" onClick={()=>this.handleSubmit()} class="btn btnblue" style={{width:"100px",borderRadius:"3px",marginRight:"20px",marginLeft:"20px"}}>{this.state.button}</button>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel-group table-responsive" style={{marginBottom:" 8px",backgroundColor:"#fff"}}>
                                        <table className="table table-bordered table-hover table-striped" id="tabel1">
                                            <thead>
                                                <tr style={{color:"#3869ae"}}>
                                                    <th style={{textAlign:"center;"}}>Sl<span style={{visibility:"hidden"}}>_</span>No.</th>
                                                    <th style={{textAlign:"Center"}}>EOD</th>
                                                    <th style={{textAlign:"Center"}}>Enable / Disable</th>
                                                    <th style={{textAlign:"center"}}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { this.state.eod_data.map((data, index) => 
                                                    <tr role="row" className="odd">
                                                        <td style={{textAlign:"center"}}>{index +1}</td>  
                                                        <td style={{textAlign:"center"}}>{data.eod}</td>  
                                                        <td style={{textAlign:"center"}}>
                                                            <label className="switch">
                                                                <input type="checkbox" name="isediting"  defaultChecked={data.isActive}  onChange={this.handleEnableChange}/>
                                                                <span className="slider round"></span>    
                                                            </label></td>
                                                        <td  style={{textAlign:"center"}}>
                                                            <button class="btn w3-white edit-data" id="1">
                                                                <i class="fa fa-pencil text-primary" style={{color:"blue",fontSize:"20px"}} onClick={(e) => this.geteodbyslno(data.slno)} ></i>
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

export default EOD;