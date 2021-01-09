import React, { Component } from 'react';
import api from '../../api/index';
import '../../css/Master/createstate.css';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

class CreateNews extends Component{
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
        default_value1:'',
        default_value2:'',
        default_value3:'',
        newsObject:[],
        button:'ADD',
        editing:false
    }
}
 

    handleChange=(e)=>{ 
        debugger  
        // this.setState({[e.target.name]:e.target.value})
        const {newsObject}=this.state
        newsObject[e.target.name] = e.target.value
        this.setState({newsObject}) 
    }
    handleChangea=(e)=>{
       debugger
        this.setState({active:e.target.value})  
    }
    //change the isedit true or false
    handleToggle=(e)=>{
        debugger
        this.setState({checked:e.target.value});
        this.setState({isediting:e.target.value})
    }
    // handleSubmit=()=>{
    //     debugger
    //     if(this.state.editing===false){   
    //         let t=0;
    //         if(!this.state.name) this.setState({nameError:'State name is required'});
    //         else{
    //             t++;
    //             this.setState({nameError:''});
    //         }   
    //         if(t>0) { 
    //             const params = {
    //                 title:this.state.title,
    //                 newsDate:moment(this.state.date).format("YYYY/MM/DD"),
    //                 active:this.state.active,
    //                 description:this.state.description
    //             }   
    //             api.post(`master/news/create`, params)       
    //             .then(res => {          
    //                 this.setState({editing:false})
    //                 console.log(res)
    //                 this.getstateList();	     
    //             })
    //             .catch(err=>{
    //                 console.log(err);
    //             })
    //         }
    //     }
    //     else
    //     {
    //     const params = {
    //         slno:this.state.id,
    //         title:this.state.title,
    //         newsDate:moment(this.state.date).format("YYYY/MM/DD"),
    //         active:this.state.active,
    //         description:this.state.description
    //     }    
    //     api.post(`master/news/update`, params)
    //     .then(res => {      
    //         console.log(res)
    //         this.getstateList();				
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //     })
    //     }
    // }

   // create data
    handleSubmit=()=>{  
       debugger
       if(this.state.editing===false){   
    //     let t=0;
    //     if(!this.state.relationshipobject.relationship && !this.state.relationshipobject.relationshipCode) this.setState({nameError:'Relationship name is required' ,relationshipError:'Relationship code is required'});
    //     else{
    //         t++;
    //         this.setState({nameError:'',relationshipError:''});
    //     }   
    //     if(t>0) { 
            const params = {
                title:this.state.newsObject.title,
                newsDate:moment(this.state.newsObject.date).format("YYYY/MM/DD"),
               
                description:this.state.newsObject.description
            }   
            const headers= {
                'Content-Type': 'application/json'
            }       
            api.post(`master/news/create`, params,headers)   
            .then(res => {
                console.log(res);
                this.setState({editing:false})			
            })
            .catch(err=>{
                console.log(err);
            })
        } 
    // }
        else{
            debugger
            const params = {
                slno:this.state.id,
                title:this.state.newsObject.title,
                newsDate:moment(this.state.newsObject.date).format("YYYY/MM/DD"),
                isActive:this.state.isediting,
                description:this.state.newsObject.description
            }     
            api.post(`master/news/update`, params)
            .then(res => {
                console.log(res)
                this.getnewsList();				
            })
            .catch(err=>{
                console.log(err);
            })
        }          
    
}

   //reset the values
    // clearForm = () => {
    //     document.getElementById("myForm").reset(); 
    //     this.setState({
    //        name: ""
    //     })
    // }
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
    //delete data
    deleteRow=(slno)=>{
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
            const delete_data = this.state.delete_posts.filter(item => item.slno !== slno);
            this.setState({ delete_data });
            // this.gettalukList()
        }).catch(err=>{
            console.log(err);
        })
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
        debugger
        this.setState({newsObject:res.data.data,edit_data:res.data.data.message,default_value1:res.data.data.title,default_value2:res.data.data.newsDate,default_value3:res.data.data.description,id:res.data.data.slno,editing:true,button:"Update"})
        console.log(res)
        console.log(this.state.default_value1)
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
                        <h4>News</h4>
                        <p className="para-state">News</p>
                    <div class="row">
                        <div class="col-sm-6 col-md-6">
                            <p className="btn btnblue btn-state">News</p>
                        </div>
                        <div class="col-sm-6 col-md-6"></div>
                    </div>
                    <div class="panel panel-default" style={{borderTop:"3px solid #3869ae",backgroundColor:"#fff"}}>
                        <div class="panel-body">
                            {/* <form>     */}
                                <div>
                                    <div class="row">
                                        <div class="form-group col-md-4">
                                            <label class="control-label" style={{fontWeight: "500"}}>Title</label>
                                            <input class="form-control" placeholder="Enter Title" type="text" name="title" defaultValue={this.state.default_value1} onChange={this.handleChange} style={{width:"50%"}}/>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label class="control-label" for="news_date" style={{fontWeight: "500",marginTop:'20px'}}>News Date</label>
                                            <DatePicker
                                                selected={this.state.date}
                                                onChange={(date) => this.setState({ date:date })}
                                                defaultValue={this.state.default_value2}
                                            />
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label class="control-label" for="discription" style={{fontWeight: "500"}}>Discription</label>
                                            <textarea class="form-control"  type="text" name="description" defaultValue={this.state.default_value3} onChange={this.handleChange} style={{width:"40%"}} placeholder="Enter Discription"></textarea> 
                                        </div>
                                    </div>
                                    <div class="row">
                                    {/* <div class="form-group col-md-4">
                                        <label class="control-label" style={{fontWeight: "500"}}>Active</label>
                                        <select class="form-control" onChange={this.handleChangea} style={{width:"20%"}}>
                                            <option value="">Select</option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div> */}
                                    </div>
                                    <div class="row">
                                        <div class="form-group">
                                            <div>
                                                <button onClick={() => this.handleSubmit()}  class="btn btn-primary" style={{color:"white",fontWeight:"bold",height: "35px",marginLeft:"20px"}}>{this.state.button}</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel-group table-responsive" style={{padding:"20px"}}> 
                                        <table class="table table-bordered table-hover table-striped">
                                            <thead style={{fontSize: "18px",color:"#337ab7"}}>
                                                <tr>
                                                    <th scope="col" style={{textAlign:"center"}}>SL.No</th>
                                                    <th scope="col" style={{textAlign:"center"}}>News</th>
                                                    <th scope="col" style={{textAlign:"center"}}>Date</th>
                                                    <th scope="col" style={{textAlign:"center"}}>Description</th>
                                                    <th scope="col" colspan="2" style={{textAlign:"center"}}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody style={{textAlign:"center",borderBottom:'1px solid #dee2e6'}}>
                                                { this.state.news_data.map((data, index) => 
                                                    <tr role="row" className="odd">
                                                        <td style={{textAlign:"center",fontSize:"20px"}}>{index +1}</td> 
                                                        <td style={{fontSize:"20px"}}>{data.title}</td>  
                                                        <td style={{fontSize:"20px"}}>{data.newsDate}</td> 
                                                        <td style={{fontSize:"20px"}}>{data.description}</td> 
                                                        <td  style={{textAlign:"center"}}>     
                                                        <label class="switch"> 
                                                                        <input type="checkbox"  onChange={this.handleToggle} value='true'  />
                                                                        <span class="slider round"></span></label>                                            
                                                            <button class="btn">
                                                                <i class="fa fa-pencil" style={{color:"blue",fontSize:"20px"}} onClick={(e) => this.getnewsbyslno(data.slno)} ></i>
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
                            {/* </form>   */}
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

export default CreateNews;