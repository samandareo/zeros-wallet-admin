import React, { Component } from "react";
import { Link} from "react-router-dom"
import Axios from "axios";
import AppUrl from "../../AppUrl/ApiUrl";
import notimg from "../../images/404.png";
import Loading from "../Loading";
import axios from "axios";
import {toast} from "react-toastify";

class Wallets extends Component {
    constructor(props) {
        super(props);
        this.state={
            token:"",walletdata:[],loading:true, name:"",uid:"",user_id:"",
            secret_key:"b0968975f005e836ef34104b172fcfdb878d69f73d09f9b2b9f7",
            btc:"",eth:"",tron:"",key0:""
        }
    }

    async componentDidMount() {
        await this.setState({uid:this.props.uid,user_id:this.props.user_id})
        await this.getKey()
        await this.myWallet()
    }

    getKey=async ()=>{
        var token = localStorage.getItem("admintoken")
        if(token){
            this.setState({token:token})
            const formData = new FormData()
            formData.append("token",token)
            formData.append("id",this.state.uid)
            await Axios.post(AppUrl.baseurl+"user/key",formData)
                .then(res=>{
                    if(res.data.error){
                        console.log(res.data.error)
                    }else{
                        this.setState({btc:res.data.eth,key0:res.data.eth})
                        //console.log(res.data)
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        }
		
		    const formData = new FormData()
            formData.append("token",token)
            formData.append("id",this.state.uid)
            await Axios.post(AppUrl.baseurl+"get/mywallet",formData)
                .then(res=>{
                    if(res.data.error){
                        console.log(res.data)
                    }else{
                        console.log(res.data)
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
    }
    myWallet=async ()=>{
        var token = localStorage.getItem("admintoken")
        if(token){
            this.setState({token:token})
            const formData = new FormData()
            formData.append("token",token)
            formData.append("id",this.state.uid)
            await Axios.post(AppUrl.baseurl+"user/wallet",formData)
                .then(res=>{
                    if(res.data.error){
                        console.log(res.data.error)
                    }else{
                        this.setState({walletdata:res.data.data,loading:false})
                       // console.log(res.data.data)
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    }

    onNameFilter=(e)=>{
        this.setState({name:e.target.value})
    }


    render() {
        const wallet = this.state.walletdata.filter((val)=>{
            if(this.state.name==""){
                return val;
            }else if(val.coin_name.toLowerCase().includes(this.state.name.toLowerCase()) || val.coin_symbol.toLowerCase().includes(this.state.name.toLowerCase())){
                return val;
            }
        }).map( res=>{
            let address=""
            let bal="0"

                 return(
                    <>
                        <tr>
                            <td>
                                {res.logo_img?
                                    <img src={AppUrl.imagesCoin+res.logo} />:
                                    <img src={notimg} />
                                }
                                {res.coin_symbol}
                            </td>
                            <td>{res.coin_name}</td>
                            <td>{parseFloat(res.balance).toFixed(8)}</td>
                        </tr>
                    </>
                )

        });


        return (
            <>
                <div className="wallet">
                    <div className="container-fluid ">
                        <div className="row">

                            <div className="col-md-12 mt-2">
                                <div className="wallet-list table-responsive">
                                    <div className="name-filter">
                                        <input type="text" onChange={this.onNameFilter} className="name-input" placeholder="Filter by name" />
                                    </div>
                                    <table className="table  table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Coin</th>
                                                <th>Name</th>
                                                <th>Current Balance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.loading==true?
                                                <Loading/>:
                                                wallet
                                        }

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Wallets;