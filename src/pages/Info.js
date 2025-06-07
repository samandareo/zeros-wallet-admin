import React, {Component} from 'react';
import Menu from "../components/Menu";
import {Link} from "react-router-dom";
import Loading from "../components/Loading";
import Axios from "axios";
import ApiUrl from "../AppUrl/ApiUrl";
import AppUrl from "../AppUrl/ApiUrl";
import {toast} from "react-toastify";
import ImgNot from "../images/404.png";


class Info extends Component {

    constructor() {
        super();
        this.state={
            data:[],name:"",count:20,
            token:"",loading:true
        }
    }

    componentDidMount() {
        var token = localStorage.getItem("admintoken")
        this.setState({token:token})
        var formd = new FormData()
        formd.append("token",token)
        Axios.get(ApiUrl.baseurl+"all-info",formd)
            .then(res=>{
                if(res.data.error){
                    var a=0
                }else{
                    this.setState({data:res.data,loading:false})
                }
                console.log(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    onName=(e)=>{
        this.setState({name:e.target.value})
    }
    loadMore=(e)=>{
        var countval = this.state.count+20
        this.setState({count:countval})
    }
    onDel=(id)=>{
        var confirm = window.confirm("Are you sure to delete ")
        const FormDa = new FormData()
        FormDa.append('token',this.state.token)
        FormDa.append('id',id)


        if(confirm){
            Axios.post(AppUrl.baseurl+"delete-info",FormDa)
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

    render() {
        var countval=0;
        var datas = this.state.data.filter((val)=>{
            if(this.state.name==""){
                return val;
            }else if(val.title.toLowerCase().includes(this.state.name.toLowerCase()) || val.des.toLowerCase().includes(this.state.name.toLowerCase())){
                return val;
            }
        }).map(res=>{
            countval+=1
            if(countval<=this.state.count){
                return(
                    <tr>
                        <td>{res.id}</td>
                        <td>{res.title}</td>
                        <td>{res.des.substring(0,100)}...</td>
                        <td>{res.updated_at}</td>
                        <td>
                            <ul className="list-inline m-0">
                                <li className="list-inline-item">
                                    <Link to={"/info/edit/"+res.id}className="btn btn-success btn-sm shadow-none rounded-0"
                                          type="button" data-toggle="tooltip" data-placement="top"
                                          title="Edit"><i className="fa fa-edit"></i></Link>
                                </li>
                                <li className="list-inline-item">
                                    <button className="btn btn-danger btn-sm rounded-0 shadow-none" type="button"
                                            onClick={this.onDel.bind(this,res.id)} data-toggle="tooltip" data-placement="top"
                                            title="Delete"><i className="fa fa-trash"></i></button>
                                </li>
                            </ul>
                        </td>
                    </tr>
                )
            }

        })

        return (
            <Menu title="All Info">
                <h3 className="bg-white title-head"> News and Info ({this.state.data.length})</h3>
                <div className="container-fluid currency">
                    <div className="row">
                        <div className="col-md-12 p-0 m-0">

                            <div className="list bg-white p-2">
                                <div className="taddb">
                                    <Link to="/info/add" className="btn btn-primary btn-sm pl-5 shadow-none">Add Info </Link>
                                    <input onChange={this.onName} placeholder="Search Title Description"
                                           className="form-control shadow-none form-control-sm"/>
                                </div>
                                <div className="table-responsive mt-3">
                                    <table className="table table-bordered bg-white">
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Date of update (UTC)</th>
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
                    this.state.data.length>this.state.count?
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

export default Info;