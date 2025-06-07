import React, {Component} from 'react';
import Axios from "axios";
import ApiUrl from "../AppUrl/ApiUrl";
import AppUrl from "../AppUrl/ApiUrl";
import {toast} from "react-toastify";
import ImgNot from "../images/404.png";
import moment from "moment";
import {Link} from "react-router-dom";
import Menu from "../components/Menu";
import Loading from "../components/Loading";

class Users extends Component {
    constructor() {
        super();
        this.state={
            data:[],name:"",user_count:"",
            token:"",loading:true,count:50
        }
    }

    componentDidMount() {
        this.users()
    }

    users=()=>{
        var token = localStorage.getItem("admintoken")
        this.setState({token:token})
        const formd = new FormData()
        formd.append("token",token)
        formd.append("limit",this.state.count)
        Axios.post(ApiUrl.baseurl+"alluser",formd)
            .then(res=>{
                console.log(res.data)
                if(res.data.error){
                    //this.users()
                }else{
                    this.setState({data:res.data.data,user_count:res.data.user_count,loading:false})
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }
    onName= (e)=>{
        console.log(e.target.value)
        const formd = new FormData()
        formd.append("token",this.state.token)
        formd.append("id",e.target.value)
        if(e.target.value!==""){
            Axios.post(ApiUrl.baseurl+"searchuser",formd)
                .then(res=>{
                    console.log(res.data)
                    if(res.data.error){
                        var a=0
                    }else{
                        this.setState({data:res.data.data,loading:false})
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    }

    onDel=(id)=>{
        var confirm = window.confirm("Are you sure to delete ")
        const FormDa = new FormData()
        FormDa.append('token',this.state.token)
        FormDa.append('id',id)
        if(confirm){
            Axios.post(AppUrl.baseurl+"delete-user",FormDa)
                .then(res=>{
                    if(res.data.success){
                        this.componentDidMount()
                        toast.success(res.data.success, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                    }else{
                        toast.error(res.data.error, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                    }
                })
                .catch(error=>{
                    console.log(error)
                })
        }
    }

    loadMore=async (e)=>{
        var countval = this.state.count+50
        await this.setState({count:countval})
        await this.users()
    }

    render() {
        var datas = this.state.data.filter((val)=>{
            if(this.state.name==""){
                return val;
            }else if(val.username.toLowerCase().includes(this.state.name.toLowerCase())
                || val.email.toLowerCase().includes(this.state.name.toLowerCase()) || val.ref_code.toLowerCase().includes(this.state.name.toLowerCase()) ){
                return val;
            }
        }).map(res=>{
            return(
                <tr>
                    <td>{res.uuid}</td>
                    <td>{res.id}</td>
                    <td>{res.type}</td>
                    <td>{res.refer_by}</td>
                    <td>{res.lip}</td>
                    <td>{moment(res.created_at).fromNow()}</td>
                    <td>
                        <ul className="list-inline m-0">
                            <li className="list-inline-item">
                                <Link to={"/user/details/"+res.id}className="btn btn-primary btn-sm shadow-none rounded-0"
                                      type="button" data-toggle="tooltip" data-placement="top"
                                      title="Edit"><i className="fa fa-book"></i></Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to={"/user/edit/"+res.id}className="btn btn-success btn-sm shadow-none rounded-0"
                                      type="button" data-toggle="tooltip" data-placement="top"
                                      title="Edit"><i className="fa fa-edit"></i></Link>
                            </li>
                            <li className="list-inline-item">
                                <button className="btn btn-danger btn-sm rounded-0 shadow-none" type="button"
                                        onClick={this.onDel.bind(this,res.id)}  data-toggle="tooltip" data-placement="top"
                                        title="Delete"><i className="fa fa-trash"></i></button>
                            </li>
                        </ul>
                    </td>
                </tr>
            )
        })
        return (
            <Menu title={"All Users"}>
                <h3 className="bg-white title-head"> Users ({this.state.user_count})</h3>
                <div className="container-fluid currency">
                    <div className="row">
                        <div className="col-md-12 p-0 m-0">

                            <div className="list bg-white p-2">
                                <div className="taddb">
                                    <input onChange={this.onName} placeholder="Search by User_id or UID"
                                           className="form-control shadow-none form-control-sm"/>
                                </div>
                                <div className="table-responsive mt-3">
                                    <table className="table table-bordered bg-white">
                                        <thead>
                                        <tr>
                                            <th>UID</th>
                                            <th>User ID</th>
                                            <th>Role</th>
                                            <th>Invited By Code</th>
                                            <th>IP</th>
                                            <th>Created Date</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.loading==true?<Loading/>:datas}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.data.length>=this.state.count?
                        <div className="row" style={{margin:"0"}}>
                            <div className="col-md-12 loadmore" >
                                <button onClick={this.loadMore} className="btn btn-secondary btn-sm mb-3 shadow-none"> Load more ...</button>
                            </div>
                        </div>:""
                }
            </Menu>
        );
    }
}

export default Users;
