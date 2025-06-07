import React, {Component} from 'react';
import Menu from "../components/Menu";
import Axios from "axios";
import ApiUrl from "../AppUrl/ApiUrl";
import {toast} from "react-toastify";
import slugify from "slugify";
import DatePicker from "react-datepicker";
import moment from "moment";
import AppUrl from "../AppUrl/ApiUrl";

class AddStakingCoin extends Component {
    constructor() {
        super();
        this.state={
            coin_raw_id:"",profit_coin:"",
            days:"",profit:"",status:"1",
            min_invest:"",rate:"",
            token:"",coin:[]
        }
    }

    componentDidMount() {
        var token = localStorage.getItem("admintoken")
        this.setState({token:token})
        Axios.get(AppUrl.baseurl+"all-ccoin")
            .then(res=>{
                console.log(res.data)
                this.setState({coin:res.data})
            })
            .catch(err=>{
                console.log(err)
            })
    }
    coin_raw_id=(e)=>{
        this.setState({coin_raw_id:e.target.value})
    }
    profit_coin=(e)=>{
        this.setState({profit_coin:e.target.value})
    }
    days=(e)=>{
        this.setState({days:e.target.value})
    }
    profit=(e)=>{
        this.setState({profit:e.target.value})
    }
    min_invest=(e)=>{
        this.setState({min_invest:e.target.value})
    }
    rate=(e)=>{
        this.setState({rate:e.target.value})
    }

    onSubmitForm= (event)=>{
        var val = this.state
        var formData = new FormData()
        formData.append("token",val.token)
        formData.append("coin_raw_id",val.coin_raw_id)
        formData.append("profit_coin",val.profit_coin)
        formData.append("days",val.days)
        formData.append("profit",val.profit)
        formData.append("min_invest",val.min_invest)
        formData.append("rate",val.rate)
        formData.append("status",val.status)
        Axios.post(ApiUrl.baseurl+"addstake", formData)
            .then(res=>{
                if(res.data.success){
                    toast.success(res.data.success, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(
                        () => this.props.history.push(`/stakingcoin`),
                        300
                    )
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

        event.preventDefault()
    }

    render() {
        var currency = this.state.coin.map(res=>{
            return(
                <>
                    <option selected={res.id == this.state.coin_raw_id} value={res.id}>{res.coin_symbol}</option>
                </>
            )
        })
        var profitcoin = this.state.coin.map(res=>{
            return(
                <>
                    <option selected={res.id == this.state.profit_coin} value={res.id}>{res.coin_symbol}</option>
                </>
            )
        })

        return (
            <Menu title="Add New Currency And Coin">
                 <h3 className="bg-white title-head"> Add Staking Coin </h3>
                 <div className="container-fluid currency-add">
                         <div className="row">
                             <div className="col-md-12">
                                 <form onSubmit={this.onSubmitForm}>
                                     <div className="row">
                                         <div className="col-md-6">
                                             <label>Staking Coin</label>
                                             <select id="inputState"  onChange={this.coin_raw_id} className="form-control shadow-none">
                                                 <option value="">Select Staking Coin</option>
                                                 {currency}
                                             </select>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Profit Coin</label>
                                             <select id="inputState"  onChange={this.profit_coin} className="form-control shadow-none">
                                                 <option value="">Select Profit Coin</option>
                                                 {profitcoin}
                                             </select>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Days</label>
                                             <input type="text" value={this.state.days} onChange={this.days} className="form-control shadow-none" placeholder=" "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Frofit %</label>
                                             <input type="text" value={this.state.profit} onChange={this.profit} className="form-control shadow-none" placeholder=" "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Min Invest</label>
                                             <input type="number" value={this.state.min_invest} onChange={this.min_invest} className="form-control shadow-none" placeholder=" "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Price</label>
                                             <input type="number" value={this.state.rate} onChange={this.rate} className="form-control shadow-none" placeholder=" 000 "/>
                                         </div>
                                         <div className="col-md-12 mt-4 mb-5">
                                             <button type="submit" className="btn btn-primary shadow-none">Submit</button>
                                         </div>
                                     </div>
                                 </form>
                             </div>
                         </div>
                 </div>
            </Menu>
        );
    }
}

export default AddStakingCoin;