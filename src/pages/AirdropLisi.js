import React, {Component} from 'react';
import Menu from "../components/Menu";
import {Link} from "react-router-dom";
import ImgNot from "../images/404.png"
import Axios from "axios";
import AppUrl from "../AppUrl/ApiUrl";
import moment from "moment";
import {toast} from "react-toastify";
import Loading from "../components/Loading";


class AirdropList extends Component {
    constructor() {
        super();
        this.state={
            data:[],token:"",name:"",loading:true,count:20,
        }
    }

    componentDidMount() {
        var token = localStorage.getItem("admintoken")
        this.setState({token:token})
        Axios.get(AppUrl.baseurl+"all-airdrop")
            .then(res=>{
                //console.log(res.data)
                if(res.data.error){
                    var a=0
                }else{
                    this.setState({data:res.data,loading:false})
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }

    onName=(e)=>{
        this.setState({name:e.target.value})
    }

    onDel=(id)=>{
        var confirm = window.confirm("Are you sure to delete ")
        const FormDa = new FormData()
        FormDa.append('token',this.state.token)
        FormDa.append('id',id)

        if(confirm){
            Axios.post(AppUrl.baseurl+"delete-airdrop",FormDa)
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

    loadMore=(e)=>{
        var countval = this.state.count+20
        this.setState({count:countval})
    }

    render() {
        var countval=0;
        const datacoin = this.state.data.filter((val)=>{
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
                        <td>{res.des}</td>
                        <td>{res.count}</td>
                        <td>
                            {res.logo?
                                <img style={{height:"30px",width:"30px"}} src={res.logo}/>
                                :
                                <img style={{height:"30px",width:"30px"}} src={ImgNot}/>
                            }
                        </td>
                        <td>{res.end}</td>
                        <td>{ res.status}</td>
                        <td>{res.reward} </td>
                        <td>{moment(res.created_at).format("MMM Do YY")}</td>
                        <td style={{width:"200px"}}>
                            <ul className="list-inline m-0">
                                <li className="list-inline-item">
                                    <Link to={"/airdrop/details/"+res.id}className="btn btn-primary btn-sm shadow-none rounded-0"
                                          type="button" data-toggle="tooltip" data-placement="top"
                                          title="Edit"><i className="fa fa-book"></i></Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to={"/airdrop/edit/"+res.id}className="btn btn-success btn-sm shadow-none rounded-0"
                                          type="button" data-toggle="tooltip" data-placement="top"
                                          title="Edit"><i className="fa fa-edit"></i></Link>
                                </li>
                                <li className="list-inline-item">
                                    <button className="btn btn-danger btn-sm rounded-0 shadow-none" type="button"
                                            data-toggle="tooltip" data-placement="top" onClick={this.onDel.bind(this,res.id)}
                                            title="Delete"><i className="fa fa-trash"></i></button>
                                </li>
                            </ul>
                        </td>
                    </tr>
                )
            }

        })
        return (
            <Menu title={"Airdrop List"}>
                <h3 className="bg-white title-head"> Airdrop List ({this.state.data.length}) </h3>
                <div className="container-fluid currency">
                    <div className="row">
                       <div className="col-md-12 p-0 m-0">

                           <div className="list bg-white p-2">
                               <div className="taddb">
                                   <Link to="/add/airdrop" className="btn btn-primary btn-sm pl-5 shadow-none">Add Airdrop</Link>
                                   <input onChange={this.onName} placeholder="Search by title description"
                                          className="form-control shadow-none form-control-sm"/>
                               </div>
                               <div className="table-responsive mt-3">
                                   <table className="table table-bordered bg-white">
                                       <thead>
                                       <tr>
                                           <th>ID</th>
                                           <th>Name</th>
                                           <th>Des</th>
                                           <th>User Count</th>
                                           <th>Logo</th>
                                           <th>End</th>
                                           <th>Status</th>
                                           <th>Reward</th>
                                           <th>Created At</th>
                                           <th>Action</th>
                                       </tr>
                                       </thead>
                                       <tbody>
                                       {this.state.loading==true?<Loading/>:datacoin}
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

export default AirdropList;