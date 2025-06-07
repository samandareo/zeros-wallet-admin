import React, {Component} from 'react';
import Menu from "../components/Menu";
import {Link} from "react-router-dom";
import ImgNot from "../images/404.png"
import Axios from "axios";
import AppUrl from "../AppUrl/ApiUrl";
import moment from "moment";
import {toast} from "react-toastify";
import Loading from "../components/Loading";


class StakingCoin extends Component {
    constructor() {
        super();
        this.state={
            data:[],token:"",name:"",loading:true,count:20,
        }
    }

    componentDidMount() {
        var token = localStorage.getItem("admintoken")
        this.setState({token:token})
        Axios.get(AppUrl.baseurl+"allstake")
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
            Axios.post(AppUrl.baseurl+"deletestake",FormDa)
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
            }else if(val.coin_name.toLowerCase().includes(this.state.name.toLowerCase())){
                return val;
            }
        }).map(res=>{
            countval+=1
            if(countval<=this.state.count){
                return(
                    <tr>
                        <td>{res.id}</td>
                        <td>{res.coin_name}</td>
                        <td>{res.profitsymbol}</td>
                        <td>{res.days}</td>
                        <td>{res.profit}</td>
                        <td>{ res.min_invest } { res.coin_name}</td>
                        <td>1 { res.coin_name}  {res.rate } { res.profitsymbol}</td>
                        <td>{moment(res.created_at).format("MMM Do YY")}</td>
                        <td style={{width:"200px"}}>
                            <ul className="list-inline m-0">
                                <li className="list-inline-item">
                                    <Link to={"/stakingcoin/edit/"+res.id}className="btn btn-success btn-sm shadow-none rounded-0"
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
            <Menu title={"Staking Coin"}>
                <h3 className="bg-white title-head"> Staking Coin List ({this.state.data.length}) </h3>
                <div className="container-fluid currency">
                    <div className="row">
                       <div className="col-md-12 p-0 m-0">

                           <div className="list bg-white p-2">
                               <div className="taddb">
                                   <Link to="/add/stakingcoin" className="btn btn-primary btn-sm pl-5 shadow-none">Add Staking</Link>
                                   <input onChange={this.onName} placeholder="Search by coin name"
                                          className="form-control shadow-none form-control-sm"/>
                               </div>
                               <div className="table-responsive mt-3">
                                   <table className="table table-bordered bg-white">
                                       <thead>
                                       <tr>
                                           <th>ID</th>
                                           <th>Coin Name</th>
                                           <th>Profit Coin</th>
                                           <th>Days</th>
                                           <th>Interest Percent</th>
                                           <th>Min Invest</th>
                                           <th>Price</th>
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

export default StakingCoin;