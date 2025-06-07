import React, {Component} from 'react';
import Axios from "axios";
import AppUrl from "../../AppUrl/ApiUrl";
import notimg from "../../images/404.png";
import Loading from "../Loading";
import {toast} from "react-toastify";

class BalanceAdjustUser extends Component {
    constructor(props) {
        super(props);
        this.state={
            token:"",walletdata:[],loading:true, name:"",uid:"",user_id:"",email:"",stock_update:"0",
            coin_raw_id:"",balance:"0",orders:"0",mining:"0",miningamount:"0",balanceamount:"0",
            btc:"",eth:"",tron:"",key0:"",address:"",chainbal:0,token_contract:"",type:"",
            platform:"",symbol:"",raddress:"",amountto:"",decimal:"",loadsend:false, trx:"",
            keysol:""
        }
    }

    async componentDidMount() {
        await this.setState({uid:this.props.uid,user_id:this.props.user_id,email:this.props.email})
        var token =await localStorage.getItem("admintoken")
        await this.setState({token:token})
        await this.myWallet()
        this.getKey()
    }

    trx=(e)=>{
        this.setState({trx:e.target.value})
    }
    balanceamount=(e)=>{
        this.setState({balanceamount:e.target.value})
    }
    type=(e)=>{
        this.setState({type:e.target.value})
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
                        this.setState({btc:res.data.eth,key0:res.data.eth,keysol:res.data.solkey})
                        //console.log(res.data)
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    }

    coin_raw_id= (e)=>{
        this.setState({coin_raw_id:e.target.value})
        if(e.target.value==""){
            this.setState({balance:"0"})
        }else{
            const coinbal = this.state.walletdata.filter((val)=>{
                if(val.coin_id==e.target.value){
                    return val;
                }
            })
            this.setState({balance:coinbal[0]["balance"],
                symbol:coinbal[0]["coin_symbol"],platform:coinbal[0]["platform"],
                address:coinbal[0]["address"],
                token_contract:coinbal[0]["contract"], decimal:coinbal[0]["coin_decimal"],
                raddress:coinbal[0]["fund_address"]
            })
            console.log(coinbal)

        }

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
                    console.log(res.data)
                    if(res.data.error){
                        console.log(res.data.error)
                    }else{
                        this.setState({walletdata:res.data.data,loading:false})
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    }


    errorMsg=(val)=>{
        toast.error(val, {
            theme: "colored",
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    successMsg=(val)=>{
        toast.info(val,  {
            theme: "colored",
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    formSubmit=async ()=>{
        if(this.state.coin_raw_id==""){
            this.errorMsg("First Select Coin")
        }else if(this.state.balanceamount==""){
            this.errorMsg("Balance Amount  atleast 0 required")
        }else if(this.state.type==""){
            this.errorMsg("Type is required")
        }else{
            this.setState({loading:true})
            var fda = new FormData()
            fda.append("token",this.state.token)
            fda.append("id",this.state.uid)
            fda.append("coin_id",this.state.coin_raw_id)
            fda.append("amount",this.state.balanceamount)
            fda.append("type",this.state.type)
            fda.append("trx",this.state.trx)
            await Axios.post(AppUrl.baseurl+"admin/balanceadjust",fda)
                .then(res => {
                    if (res.data.error) {
                        this.errorMsg(res.data.error)
                    } else {
                        this.successMsg(res.data.success)
                    }
                    this.setState({loading:false})
                })
                .catch(err => {
                    console.log(err)
                    this.setState({loading:false})
                })
        }
    }


    render() {
        const wallet = this.state.walletdata.map(res=>{
            return(
                <>
                    <option value={res.coin_id}>{res.coin_symbol}</option>
                </>
            )

        });


        return (
            <>
                <div className="wallet">
                    <div className="container-fluid ">
                        <div className="row">

                            <div className="col-md-12 mt-5">
                                <div className="wallet-list table-responsive">
                                    <form >
                                        <p>
                                            Current Balance : {parseFloat(this.state.balance).toFixed(8)}<br/>
                                            <br/>
                                        </p>
                                        <div className="form-group mt-2">
                                            <label htmlFor="exampleInputEmail1">Wallet Coin </label>
                                            <select onChange={this.coin_raw_id} className="form-control shadow-none">
                                                <option selected value="">Select Coin</option>
                                                {wallet}
                                            </select>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label htmlFor="exampleInputEmail1">Balance Update Type </label>
                                            <select onChange={this.type} className="form-control shadow-none">
                                                <option selected value="">Select Type</option>
                                                <option  value="Increment">Increment</option>
                                                <option  value="Decrement">Decrement</option>
                                            </select>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label htmlFor="exampleInputEmail1">Balance </label>
                                            <input onChange={this.balanceamount} value={this.state.balanceamount}
                                                   type="number" required className="form-control shadow-none" id="exampleInputEmail1"
                                                   aria-describedby="emailHelp" placeholder="0.001"/>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label htmlFor="exampleInputPassword1">TRX</label>
                                            <input type="text"  onChange={this.trx} value={this.state.trx}
                                                   className="form-control shadow-none" id="exampleInputPassword1"
                                                   placeholder="0x"/>
                                        </div>
                                        <button type="button" disabled={this.state.loading} onClick={this.formSubmit} 
                                        className="btn btn-primary shadow-none mt-3">{this.state.loading==true?"Loading...":"Submit"}</button>
                                    </form>
                                    <br/>
                                    <form >
                                        <p>
                                            Key ETH all : {this.state.platform=="Solana"?this.state.keysol:this.state.key0}
                                            <br/>
                                            Address : {this.state.address}
                                        </p>

                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default BalanceAdjustUser;