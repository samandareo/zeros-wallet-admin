import React, {Component} from 'react';
import Axios from "axios";
import AppUrl from "../AppUrl/ApiUrl";
import {toast} from "react-toastify";
import Menu from "../components/Menu";
import ApiUrl from "../AppUrl/ApiUrl";
import Loading from "../components/Loading";

class WithdrewEdit extends Component {
    constructor({match}) {
        super();
        this.state={
            token:"",coin_symbol:"",from_address:"",to_address:"",amount:"",status:"",email:"",
            id:match.params.id,fee_coin_name:"",fee_amount:"",trx:"",uid:"",created_at:"",type:"",verify:"",
            loading:true,loading1:false
        }

    }
    async componentDidMount() {
        var token = localStorage.getItem("admintoken")
        this.setState({token:token})
        const form = new FormData()
        form.append("id",this.state.id)
        form.append("token",token)
        await Axios.post(AppUrl.baseurl+"onepay",form)
            .then(res=>{
                console.log(res)
                if (res.data.error) {
                    this.setState({loading: false})
                } else {
                    var val = res.data.data[0]
                    this.setState({coin_symbol:val["coin_symbol"],username:val["username"],
                        created_at:val["created_at"],loading:false,
                        from_address:val["fromid"],to_address:val["toid"],
                        amount:val["amount"],fee_coin_name:val["fee_coin_name"],
                        status:val["status"],trx:val["trx"],
                        uid:val["uid"],fee_amount:val["fee_amount"],
                        type:val["type"]
                    })
                }

            })
            .catch(err=>{
                console.log(err)
            })
    }

    trx=(e)=>{
        this.setState({trx:e.target.value})
    }
    from_address=(e)=>{
        this.setState({from_address:e.target.value})
    }

    status=(e)=>{
        this.setState({status:e.target.value})
    }

    onsubmitForm=async (event)=>{
            var fda = new FormData()
            fda.append("token",this.state.token)
            fda.append("id",this.state.id)
            fda.append("status",this.state.status)
            fda.append("trx",this.state.trx)
            fda.append("fromid",this.state.from_address)
            this.setState({loading1:true})
            await Axios.post(AppUrl.baseurl+"withdrew/confirm",fda)
                .then(res => {
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
                        setTimeout(()=>{
                            this.props.history.push("/withdrew")
                        },1000)
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
                    this.setState({loading1:false})
                })
                .catch(err => {
                    console.log(err)
                    this.setState({loading1:false})
                })

        event.preventDefault()
    }

    render() {


        var feename = this.state.fee_coin_name==null?this.state.coin_symbol:this.state.fee_coin_name

        return (
            <Menu title="Edit and View ">
                <h3 className="bg-white title-head"> View Or Edit </h3>
                <div className="container-fluid currency-add">
                    <div className="row">
                        <div className="col-md-11">
                            {
                                this.state.loading==true?<Loading/>:
                                    <form className="mt-2">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>User ID</label>
                                                <input type="text"  value={this.state.uid}   className="form-control shadow-none" />
                                            </div>

                                            <div className="col-md-6">
                                                <label>Date</label>
                                                <input type="text"  value={this.state.created_at}   className="form-control shadow-none" />
                                            </div>
                                            <div className="col-md-6">
                                                <label>Payment Type</label>
                                                <input type="text"  value={this.state.type}   className="form-control shadow-none" />
                                            </div>
                                            <div className="col-md-6">
                                                <label>Staus</label>
                                                <select id="inputState" required onChange={this.status} className="form-control shadow-none">
                                                    <option selected={this.state.status=="Pending"} value="Pending">Pending</option>
                                                    <option selected={this.state.status=="Success"} value="Success">Success</option>
                                                    <option selected={this.state.status=="Rejected"} value="Rejected">Rejected</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Amount</label>
                                                <input type="text"  value={this.state.amount+" "+this.state.coin_symbol}   className="form-control shadow-none" />
                                            </div>
                                            <div className="col-md-6">
                                                <label>Withdrew Fee</label>
                                                <input type="text"  value={this.state.fee_amount+" "+ feename} required   className="form-control shadow-none" />
                                            </div>
                                            <div className="col-md-6">
                                                <label>To Address</label>
                                                <input type="text"  value={this.state.to_address} required  className="form-control shadow-none" />
                                            </div>
                                            <div className="col-md-6">
                                                <label>From Address</label>
                                                <input type="text" onChange={this.from_address} value={this.state.from_address}   className="form-control shadow-none" />
                                            </div>
                                            <div className="col-md-12">
                                                <label>Trx ID</label>
                                                <input type="text" onChange={this.trx} value={this.state.trx}   className="form-control shadow-none" />
                                            </div>

                                            <div className="col-md-12 mt-4 mb-5">
                                                <button disabled={this.state.loading1} onClick={this.onsubmitForm} type="button" style={{width:"150px"}} 
                                                className="btn btn-primary shadow-none">{this.state.loading1==true?"Loading...":"Update Payment Status"}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                            }
                        </div>
                    </div>
                </div>
            </Menu>
        );
    }
}

export default WithdrewEdit;