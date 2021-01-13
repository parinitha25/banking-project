import React, { Component } from 'react';
import '../../css/Master/holidaylist.css';
import api from '../../api/index';
import 'antd/dist/antd.css';
import moment from 'moment';
import { DatePicker,Form } from 'antd';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

class HolidayList extends Component{
    formRef = React.createRef();
    state={
        branch:'',
        holiday_data:[],
        branch_data:[],
        financialyear_data:[],
        date:new Date(),
        holiday_name:'',
        financial_year:'',
        button:'ADD',
        isediting:true,
        editing:false,
        branchError:'',
        financilayearError:'',
        holidaydateError:'',
        holidaynameError:''
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    //change branch value
      handleChangebranch=(e)=>{
        this.setState({branch:e.target.value})
    }
     //change financialyear value
     handleChangefinancialyear=(e)=>{
        this.setState({financial_year:e.target.value})
    }

    //handle change for enable button
     handleEnableChange=(e) =>{
        this.setState({
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    }
    dateChange=(dateString)=>{
         
        // this.setState({date:dateString})
        this.setState({ date: moment(dateString).format("YYYY/MM/DD")});
      }
    componentDidMount(){
        this.getholidaylist();
        this.getbranchList();
        this.getfinancialyearList();
    }

    //validation purpose
    validate=()=>{
        const errors={};
        if(this.state.branch === ''){
            errors.branchError='Branch name is required.';
        }
        if(this.state.financial_year === ''){
            errors.financilayearError='Financial year is required.';
        }
        if(this.state.date === ''){
            errors.holidaydateError='Holiday date is required.';
        }
        if(this.state.holiday_name.trim() === ''){
            errors.holidaynameError='Holiday name is required.';
        }
      
       
        return Object.keys(errors).length=== 0 ? null : errors;
    }

    //create the data
    handleSubmit=async()=>{
         
        const errors=this.validate();
        this.setState({errors})
        if(errors) return;
        if(this.state.editing===false){  
            try{ 
            const value = await this.formRef.current.validateFields();
            const params = {
                branchSlno:this.state.branch,
                financialYearSlno:this.state.financial_year,
                holidayDate:this.state.date,
                holidayName:this.state.holiday_name,

            }   
            api.post(`master/holidayList/create`, params)      
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
        }catch (errorInfo) {
            console.log("failure", errorInfo);
          }
        }
        else
        {
        const params = {
            slno:this.state.id,
            branchSlno:this.state.branch,
            financialYearSlno:this.state.financial_year,
            holidayDate:this.state.date,
            holidayName:this.state.holiday_name,
            isActive:this.state.isediting
        }    
        api.post(`master/holidayList/update`, params)
            .then(res => {      
                 message.success({content: (res.data.data),style: { textAlign: "center" ,marginTop:"100px"},});

                setTimeout(function(){window.location.reload(); }, 1000);		
            })
            .catch(err=>{
                //  message.error({content: (err.response.data.message),style: { textAlign: "center" ,marginTop:"100px"},});

                // setTimeout(function(){window.location.reload(); }, 1000);     
            })
        }
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
    //get financialyear data
    getfinancialyearList = () => {
        var config = {
            method: 'post',
            url: 'master/financialYear/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({financialyear_data:res.data.data})
        })
        .catch(err=>{
            console.log(err);
        })
    }

    //get bod list
    getholidaylist = () => {
        var config = {
            method: 'post',
            url: 'master/holidayList/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
          this.setState({holiday_data:res.data.data})
            console.log(this.state.holiday_data);
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
                    url: 'master/holidayList/delete',
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

    dateChange=(dateString)=>{
         
        // this.setState({date:dateString})
        this.setState({ date: moment(dateString).format("DD/MM/YYYY")});
    }
   
    //edit data
    getholidaylistbyslno= (slno) => {
         
      var config = {
          method: 'post',
          url: 'master/holidayList/getBySlno',
          headers: {"content-type": "application/json"},
          data :{ 
              "slno":slno,
          }                 
      };
      api(config).then(res=>{
        var temp= new Date(this.state.date).toString()
        var temp1=moment(new Date(temp.substr(0, 16))) 
        this.formRef.current.setFieldsValue({ date: temp1 });
        this.setState({branch:res.data.data[0].branchSlno,financial_year:res.data.data[0].financialYearSlno,holiday_name:res.data.data[0].holidayName,date:res.data.data[0].holidayDate,id:res.data.data[0].slno,editing:true,button:"Update"})
        console.log(this.state.date);
      })
      .catch(err => {
         console.log(err)
      })
  }
    render(){
        return(
            <div style={{backgroundColor:"#eeeeee;"}} >
                <div className="container-fluid" >
                    <div className="row">
                        <div className="col-md-1 col-sm-1"></div>
                        <div className="col-md-10 col-sm-10 ">
                            <h4>Holiday List</h4>
                            <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px"}}>Holiday List</p>
                            <div className="btnblue heading"><label className="l1">Holiday List</label></div>
                            <div className="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                                <div className="panel-body">
                                    <div className="panel-group" style={{backgroundColor:"#fff"}}>
                                        <div className="row">
                                            <div className="form-group col-md-12 col-sm-12">
                                                <div className="panel-group" style={{marginBottom: "8px"}}>
                                                    <div className="row" style={{padding:"10px"}}>
                                                        <div className="form-group col-md-3 col-sm-3">
                                                            <label className="control-label" for="bod">Select Branch<span style={{color:"red"}}>*</span></label>
                                                            <select value={this.state.branch} onChange={this.handleChangebranch} className="form-control">
                                                                <option>--Select Branch--</option>
                                                                {this.state.branch_data.map((data) => 
                                                                    <option value={data.slno}>{data.branchName}</option>
                                                                )}
                                                            </select>
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.branchError}</div>}  
                                                        </div>
                                                        <div className="form-group col-md-3 col-sm-3">
                                                            <label className="control-label" for="financial_year">Financial Year<span style={{color:"red"}}>*</span></label>
                                                            <select value={this.state.financial_year} onChange={this.handleChangefinancialyear} className="form-control">
                                                                <option>--Select Financial Year--</option>
                                                                {this.state.financialyear_data.map((data) => 
                                                                    <option value={data.slno}>{data.fromYear}-{data.toYear}</option>
                                                                )}
                                                            </select>
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.financilayearError}</div>}  
                                                        </div>
                                                        <div className="form-group col-md-3 col-sm-3">
                                                                <label className="control-label" for="holiday_date">Holiday Date
                                                                <span style={{color:"red"}}>*</span></label>
                                                                <Form ref={this.formRef} >
                                                                    <Form.Item name="date" rules={[{ required: true, message: "Holiday date is required" }]}>
                                                                        <DatePicker 
                                                                            onChange={this.dateChange}
                                                                        />
                                                                    </Form.Item>
                                                                  
                                                                </Form>
                                                                 
                                                        </div>
                                                      
                                                        <div className="form-group col-md-3 col-sm-3">
                                                            <label className="control-label" for="holiday_name">Holiday Name
                                                            <span style={{color:"red"}}>*</span></label>
                                                            <input className="form-control" name="holiday_name" onChange={this.handleChange} placeholder="Enter Holiday Name" type="text" value={this.state.holiday_name}/>
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.holidaynameError}</div>}  
                                                        </div>
                                                    </div>
                                                    <div className="row" >
                                                        <div className="form-group col-md-3 col-sm-3" >
                                                            <span className="input-group-btn">
                                                                <button onClick={() => this.handleSubmit()}  class="btn  btnblue" style={{width:"100px",borderRadius:"3px",marginTop:'25px'}}>{this.state.button}</button>
                                                            </span>
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
                                                    <th style={{textAlign:"Center"}}>Branch</th>
                                                    <th style={{textAlign:"Center"}}>Financial Year</th>
                                                    <th style={{textAlign:"Center"}}>Holdiay Date</th>
                                                    <th style={{textAlign:"Center"}}>Holdiay Name</th>
                                                    <th style={{textAlign:"center"}}>Enable / Disable</th>
                                                    <th style={{textAlign:"center"}}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { this.state.holiday_data.map((data, index) => 
                                                    <tr role="row" className="odd">
                                                        <td style={{textAlign:"center"}}>{index +1}</td>  
                                                        <td style={{textAlign:"left"}}>{data.branchName}</td>  
                                                        <td style={{textAlign:"left"}}>{data.financialYear}</td>  
                                                        <td style={{textAlign:"left"}}>{data.holidayDate}</td>  
                                                        <td style={{textAlign:"left"}}>{data.holidayName}</td>  
                                                        <td style={{textAlign:"center"}}>
                                                            <label className="switch">
                                                                <input type="checkbox" name="isediting"  defaultChecked={data.isActive}  onChange={this.handleEnableChange}/>
                                                                <span className="slider round"></span>    
                                                            </label></td>
                                                        <td  style={{textAlign:"center"}}>
                                                            <button class="btn w3-white edit-data" id="1">
                                                                <i class="fa fa-pencil text-primary" style={{color:"blue",fontSize:"20px"}} onClick={(e) => this.getholidaylistbyslno(data.slno)} ></i>
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

export default HolidayList;