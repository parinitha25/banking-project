import React, { Component } from 'react';
import '../../css/Master/news.css';
import api from '../../api/index';
import moment from 'moment';
import 'antd/dist/antd.css';
import { DatePicker,Form } from 'antd';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;


class News extends Component{
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state={
            title:'', 
            description:'', 
            news_data:[],
            editing:false,
            date:new Date(),
            active:'',
            edit_data:[],
            delete_posts:[],
            newsObject:[],
            button:'ADD',
            isediting:true,
            titleError:'',
            errors:{},
            message:'',
            descriptionError:''
        }
    }

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    handleChangea=(e)=>{
        this.setState({active:e.target.value}) 
    }

    //handle change for enable button
    handleEnableChange=(e) =>{
        this.setState({
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    }

    validate=()=>{
        debugger
        const errors={};
        if(this.state.title === ''){
            errors.titleError='Title is required.';
        }
        else if(!this.state.title.match(/^[a-zA-Z ]+$/)){
            errors.titleError = "Only letters";
        }
        if(this.state.description === ''){
            errors.descriptionError='relationship is required.';
        }
        else if(!this.state.description.match(/^[a-zA-Z ]+$/)){
            errors.descriptionError = "Only letters";
        }
        return Object.keys(errors).length=== 0 ? null : errors;
    }

    dateChange=(dateString)=>{
        debugger
        // this.setState({date:dateString})
        this.setState({ date: moment(dateString).format("DD/MM/YYYY")});
    }
    // create data
    handleSubmit=()=>{
        const errors=this.validate();
        this.setState({errors})
        if(errors) return;
        if(this.state.editing===false){   
            const params = {
                title:this.state.title,
                newsDate:this.state.date,    
                description:this.state.description
            }   
            const headers= {
                'Content-Type': 'application/json'
            }       
            api.post(`master/news/create`, params,headers)   
            .then(res => {
                debugger
                console.log(res);
                this.setState({editing:false})
                message.success(res.data.data);
                setTimeout(function(){window.location.reload(); }, 1000);	
            })
            .catch(err=>{
                debugger
                console.log(err);
                message.error(err.response.data.message);
                setTimeout(function(){window.location.reload(); }, 1000);
            })
        }
        else{
            debugger
            const params = {
                slno:this.state.id,
                title:this.state.title,
                newsDate:this.state.date,    
                description:this.state.description,
                isActive:this.state.isediting
            }     
            api.post(`master/news/update`, params)
            .then(res => {
                console.log(res);
                message.success(res.data.data);
                setTimeout(function(){window.location.reload(); }, 1000);
                // this.getnewsList();				
            })
            .catch(err=>{
                console.log(err);
                message.error(err.response.data.message);
                setTimeout(function(){window.location.reload(); }, 1000);
               
            })
        }          
    
    }
    componentDidMount(){
        this.getnewsList();
    }
    //get news data
    getnewsList = () => {
        var config = {
            method: 'post',
            url: 'master/news/get',
            headers: {"content-type": "application/json"},
            data :{}
        }; 
        api(config).then(res=>{
            this.setState({news_data:res.data.data})
            console.log(this.state.news_data);
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
                    url: 'master/news/delete',
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
    
    // edit data
    getnewsbyslno= (slno) => {
        debugger
        var config = {
            method: 'post',
            url: 'master/news/getBySlno',
            headers: {"content-type": "application/json"},
            data :{ 
                "slno":slno,
            }                 
        };
        console.log(config)
        api(config).then(res=>{
            this.setState({title:res.data.data[0].title,date:res.data.data[0].newsDate,description:res.data.data[0].description,id:res.data.data[0].slno,editing:true,button:"Update"})
            var temp= this.state.date.toString()
            console.log(temp)
            var temp1=moment(new Date(temp.substr(0, 16)));
            this.formRef.current.setFieldsValue({ date: temp1 });
            console.log(temp1)
            
            
            console.log(this.state.date)
        })
        .catch(err => {
            console.log(err)
        })
    }
   
    
    render(){
        return(
            <div style={{backgroundColor:"#eeeeee"}}>
                <div  className="container" style={{marginTop:"75px"}}>
                    <div className="row">
                        <div className="col-md-1 col-sm-1"></div>
                        <div className="col-md-10 col-sm-10 ">
                            <h4>News</h4>
                            <p style={{backgroundColor:"#d3d3d3",paddingLeft:"10px"}}>News</p>
                            <div className="btnblue heading"><label className="l1">News</label></div>
                            <div class="panel panel-default" style={{borderTop:"3px solid #3869ae"}}>
                                <div class="panel-body">
                                    <div class="panel-group" style={{backgroundColor:"#fff"}}>
                                        <div class="row">									
                                            <div class="form-group col-md-12 col-sm-12">
                                                <div class="panel-group" style={{marginBottom: "8px"}}>
                                                    <div class="row" style={{padding:"10px"}}>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <label class="control-label" for="city">Title</label>
                                                            <span><i class="fa fa-star" style={{color:"red",fontSize:"6px",marginLeft:"5px"}}></i></span>
                                                            <input class="form-control"  placeholder="Enter news" type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.titleError}</div>}   
                                                        </div>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <label class="control-label" for="city">News Date</label> 
                                                            <span><i class="fa fa-star" style={{color:"red",fontSize:"6px",marginLeft:"5px"}}></i></span>
                                                                <Form ref={this.formRef} name="date" value={this.state.date} >
                                                                    <Form.Item name="date" value={this.state.date}>
                                                                        <DatePicker 
                                                                         onChange={this.dateChange}
                                                                        />
                                                                    </Form.Item>
                                                                </Form>
                                                             <div style={{color:"red"}}>{this.state.dateError}</div> 
                                                        </div>
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <label class="control-label" for="city">Discription</label>
                                                            <span><i class="fa fa-star" style={{color:"red",fontSize:"6px",marginLeft:"5px"}}></i></span>
                                                            <textarea class="form-control text-box single-line"  name="description" type="text" value={this.state.description}  placeholder="Enter Discription" onChange={this.handleChange}></textarea>	  
                                                            {this.state.errors && <div style={{color:"red"}}>{this.state.errors.descriptionError}</div>} 
                                                        </div> 
                                                        <div class="form-group col-md-3 col-sm-3">
                                                            <button onClick={() => this.handleSubmit()}  class="btn  btnblue" style={{width:"100px",borderRadius:"3px",marginTop:'25px'}}>{this.state.button}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>       
                                    <div class="panel-group table-responsive tb" style={{marginBottom:" 8px"}}>
                                        <table class="table table-bordered table-hover table-striped" id="example">
                                            <thead>
                                                <tr style={{color:"#3869ae"}}>
                                                    <th style={{textAlign:"center"}}>Sl No.</th>
                                                    <th style={{textAlign:"center"}}>Title</th>
                                                    <th style={{textAlign:"center"}}>News Date</th>
                                                    <th style={{textAlign:"center"}}>Discription</th>
                                                    <th style={{textAlign:"center"}}>Enable / Disable</th>
                                                    <th style={{textAlign:"center"}}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { this.state.news_data.map((data, index) => 
                                                    <tr role="row" className="odd">
                                                        <td style={{textAlign:"center"}}>{index +1}</td>  
                                                        <td style={{textAlign:"center"}}>{data.title}</td>
                                                        <td style={{textAlign:"center"}}>{data.newsDate}</td>    
                                                        <td style={{textAlign:"center"}}>{data.description}</td> 
                                                        <td style={{textAlign:"center"}}>  
                                                            <label className="switch">
                                                            <input type="checkbox" name="isediting"  defaultChecked={data.isActive}  onChange={this.handleEnableChange}/>
                                                                <span className="slider round"></span>    
                                                            </label>
                                                        </td>
                                                        <td  style={{textAlign:"center"}}>
                                                            <button class="btn w3-white edit-data" id="1">
                                                                <i class="fa fa-pencil text-primary" style={{color:"blue",fontSize:"20px"}} onClick={(e) => this.getnewsbyslno(data.slno)} ></i>
                                                            </button>
                                                            <button class="btn w3-white delete-data" id="1">
                                                                <i  class="fa fa-trash text-primary" style={{color:"red",fontSize:"20px"}} onClick={(e) => this.deletedata(data.slno)}></i>
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

export default News;