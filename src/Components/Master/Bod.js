import React, { Component } from 'react';
import '../../css/Master/Bod.css';
import 'antd/dist/antd.css';
// import DatePicker from "react-datepicker";
import { DatePicker,Form } from 'antd';
// import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import api from '../../api/index';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;


class BOD extends Component{
    formRef = React.createRef();
    state={
        date:'',
        bod_data:[],
        id:'',
        isediting:true,
        editing:false,
        bodError:'',
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
            errors.bodError='BOD is required.';
        }
        return Object.keys(errors).length=== 0 ? null : errors;
    }

    //create the data
    handleSubmit=()=>{
         debugger
        const errors=this.validate();
        this.setState({errors})
        if(errors) return;
        if(this.state.editing===false){  
            const params = {
                bod:this.state.date, 
            }   
            api.post(`master/bod/create`, params)      
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
            bod:this.state.date,
            isActive:this.state.isediting
        }    
        api.post(`master/bod/update`, params)
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
        this.getbodlist();
    }

    //get bod list
    getbodlist = () => {
        var config = {
            method: 'post',
            url: 'master/bod/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
          this.setState({bod_data:res.data.data})
            console.log(this.state.bod_data);
        }).catch(err=>{
            console.log(err);
        })
    } 
      //edit data
      getbodbyslno= (slno) => {
          debugger 
        var config = {
            method: 'post',
            url: 'master/bod/getBySlno',
            headers: {"content-type": "application/json"},
            data :{ 
                "slno":slno,
            }                 
        };
        api(config).then(res=>{     
            this.setState({date: res.data.data[0].bod,id:res.data.data[0].slno,editing:true,button:"Update"})
            // var temp= (res.data.data[0].bod)
            // console.log(temp)
            // debugger
            // var temp1=moment((temp))  
        
            var temp= (res.data.data[0].bod)
            console.log(temp)
            console.log(typeof(temp))
            console.log(temp)
            debugger
            var temp1=moment((temp.substr(0, 31)+''))  
            console.log(temp1)
            console.log(typeof(temp1))
            // var temp2=moment((temp1).format("DD/MM/YYYY"));
            var temp2=toString(temp1);
            this.formRef.current.setFieldsValue({ date: temp2});  
            console.log(typeof(date))
            console.log(typeof(temp2))
            console.log(this.state.date)     
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
                    url: 'master/bod/delete',
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

    dateChange=(date,dateString)=>{
        debugger
        this.setState({ date: moment(date).format("DD/MM/YYYY")});
    }
   
    render(){
        return(
            <div style={{backgroundColor:"#eeeeee;"}} >
                <div className="container-fluid" style={{marginTop:"55px"}} >
                    <div className="row">
                        <div className="col-md-1 col-sm-1"></div>
                        <div className="col-md-10 col-sm-10 ">
                        <h4>BOD</h4>
                        <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px"}}>BOD</p>
                        <div className="btnblue heading"><label className="l1">BOD</label></div>
                            <div className="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                                <div className="panel-body">
                                    <div className="panel-group" style={{backgroundColor:"#fff"}}>
                                        <div className="row">
                                            <div className="form-group col-md-12 col-sm-12">
                                                <div className="panel-group" style={{marginBottom: "8px"}}>
                                                    <div className="row" style={{padding:"10px"}}>
                                                        <div className="form-group col-md-4 col-sm-12">
                                                            <label className="control-label" for="bod">BOD<span style={{color:"red"}}>*</span></label>
                                                            <div className="input-group">
                                                                 <Form ref={this.formRef} name="date">
                                                                    <Form.Item name="date">
                                                                        <DatePicker 
                                                                            // value={moment(this.state.date)}
                                                                            format="DD/MM/YYYY"
                                                                            onChange={this.dateChange}
                                                                        />
                                                                    </Form.Item>
                                                                </Form>
                                                                {/* <input type='date' value={this.state.date} onChange={(date) => this.setState({ date:date })}/> */}
                                                                {/* // onChange={(date)=>date:date}/> */}
                                                                 {this.state.errors && <div style={{color:"red"}}>{this.state.errors.bodError}</div>}
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
                                                    <th style={{textAlign:"Center"}}>BOD</th>
                                                    <th style={{textAlign:"center"}}>Enable / Disable</th>
                                                    <th style={{textAlign:"center"}}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { this.state.bod_data.map((data, index) => 
                                                    <tr role="row" className="odd">
                                                        <td style={{textAlign:"center"}}>{index +1}</td>  
                                                        <td style={{textAlign:"left"}}>{data.bod}</td> 
                                                        <td style={{textAlign:"center"}}>
                                                            <label className="switch">
                                                                <input type="checkbox" name="isediting"  defaultChecked={data.isActive}  onChange={this.handleEnableChange}/>
                                                                <span className="slider round"></span>    
                                                            </label></td>
                                                        <td  style={{textAlign:"center"}}>
                                                            <button class="btn w3-white edit-data" id="1">
                                                                <i class="fa fa-pencil text-primary" style={{color:"blue",fontSize:"20px"}} onClick={(e) => this.getbodbyslno(data.slno)} ></i>
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

export default BOD;