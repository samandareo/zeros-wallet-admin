import React, {Component} from 'react';
import Menu from "../components/Menu";
import Axios from "axios";
import AppUrl from "../AppUrl/ApiUrl";
import {toast} from "react-toastify";
import Loading from "../components/Loading";
import ReactQuill from "react-quill";

const modules = {
    toolbar: [
        [{size: []}],
        [{ 'font': [] }],
        ['bold', 'italic', ],//'underline', 'strike', 'blockquote'
        //[{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: true,
    }
}

class ReferralSettings extends Component {
    constructor() {
        super();
        this.state={
            data:[],token:"",registerbonus:"",referralbonus:"",miningbonus:"",
            coin_raw_id:"",loading:true,commission:"",maxswap:""
        }

    }
    async componentDidMount() {
        var token = localStorage.getItem("admintoken")
        this.setState({token:token})
        await Axios.get(AppUrl.baseurl+"all-ccoin")
            .then(res=>{
                console.log(res)
                if (res.data.error) {
                    this.setState({loading: false})
                } else {
                    this.setState({data: res.data, loading: false})
                }
            })
            .catch(err=>{
                console.log(err)
            })
        await Axios.get(AppUrl.baseurl+"settings/get")
            .then(res=>{
                if (res.data.error) {
                    this.setState({loading: false})
                } else {
                    var val = res.data
                    //console.log(val)
                    this.setState({registerbonus:val["registerbonus"],referralbonus:val["referralbonus"],
                        coin_raw_id:val["coin_raw_id"],miningbonus:val["miningbonus"],
                        maxswap:val["maxswap"],commission:val["commission"],loading:false
                    })
                }

            })
            .catch(err=>{
                console.log(err)
            })
    }

    maxswap=(e)=>{
        this.setState({maxswap:e.target.value})
    }
    commission=(e)=>{
        this.setState({commission:e.target.value})
    }
    registerbonus=(e)=>{
        this.setState({registerbonus:e.target.value})
    }
    referralbonus=(e)=>{
        this.setState({referralbonus:e.target.value})
    }
    miningbonus=(e)=>{
        this.setState({miningbonus:e.target.value})
    }

    coin_raw_id=(e)=>{
        this.setState({coin_raw_id:e.target.value})
    }

    onsubmitForm=async (event)=>{
        var formData = new FormData()
        formData.append("token",this.state.token)
        formData.append("coin_raw_id",this.state.coin_raw_id)
        formData.append("registerbonus",this.state.registerbonus)
        formData.append("referralbonus",this.state.referralbonus)
        formData.append("miningbonus",this.state.miningbonus)
        formData.append("maxswap",this.state.maxswap)
        formData.append("commission",this.state.commission)
        await Axios.post(AppUrl.baseurl+"settings",formData)
            .then(res=> {
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
            .catch(err=>{
                console.log(err)
            })


        //event.preventDefault()
    }

    render() {
        var basecurrency = this.state.data.map(res=>{
            return(
                <>
                    <option selected={this.state.coin_raw_id==res.id} value={res.id}>{res.coin_symbol}</option>
                </>
            )

        })

        var feecoin = this.state.data.map(res=>{
            return(
                <>
                    <option selected={this.state.fee_coin==res.id} value={res.id}>{res.coin_symbol}</option>
                </>
            )

        })

        return (
            <Menu title="Referral and Mining Settings">
                <h3 className="bg-white title-head">  Settings  </h3>
                <div className="container-fluid currency-add">
                    <div className="row">
                        <div className="col-md-11">
                            {
                                this.state.loading==true?<Loading/>:
                                    <form className="mt-5">
                                        <div className="row">

                                            <div className="col-md-6">
                                                <label>Your Coin</label>
                                                <select onChange={this.coin_raw_id}  id="inputState" required  className="form-control shadow-none">
                                                    <option>Select Coin</option>
                                                    {basecurrency}
                                                </select>
                                            </div>


                                            <div className="col-md-6">
                                                <label>Registration Bonus</label>
                                                <input type="number" onChange={this.registerbonus} required value={this.state.registerbonus} className="form-control shadow-none" placeholder=""/>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Referral Instant Bonus</label>
                                                <input type="number" onChange={this.referralbonus} required value={this.state.referralbonus} className="form-control shadow-none"
                                                       placeholder=""/>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Max Swap $</label>
                                                <input type="number" onChange={this.maxswap} required value={this.state.maxswap} className="form-control shadow-none" placeholder=""/>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Referral Commission %</label>
                                                <input type="number" onChange={this.commission} required value={this.state.commission} className="form-control shadow-none"
                                                       placeholder=""/>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Task Daily Bonus</label>
                                                <input type="number" onChange={this.miningbonus} required value={this.state.miningbonus} className="form-control shadow-none"
                                                       placeholder=""/>
                                            </div>
                                            {/*<div className="col-md-6">
                                                <label>Mining Bonus</label>
                                                <input type="number" onChange={this.miningbonus} required value={this.state.miningbonus} className="form-control shadow-none"
                                                       placeholder=""/>
                                            </div>*/}

                                            <div className="col-md-12 mt-4 mb-5">
                                                <button type="button" onClick={this.onsubmitForm} className="btn btn-primary shadow-none">Update</button>
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

export default ReferralSettings;