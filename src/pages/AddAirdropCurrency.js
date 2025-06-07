import React, {Component} from 'react';
import Menu from "../components/Menu";
import Axios from "axios";
import ApiUrl from "../AppUrl/ApiUrl";
import {toast} from "react-toastify";
import slugify from "slugify";
import AppUrl from "../AppUrl/ApiUrl";

class AddAirdropCurrency extends Component {
    constructor() {
        super();
        this.state={
            coin_name:"",coin_symbol:"",coin_code:"",coin_type:"Token",coin_platform:"Binance",smart_contract:"",coin_decimal:"",
            withdrew_fee:"0.005", fee_currency_name:"ETH",can_deposit:"1",can_withdraw:"1",explorer:"",
            address_default:"",price:"0",day_change:"0",status:"1",swap:"1",
            logo_img:"",token:"",coin:[],
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

    logo_img=(e)=>{
        this.setState({logo_img:e.target.value})
    }

    explorer=(e)=>{
        this.setState({explorer:e.target.value})
    }
    can_withdraw=(e)=>{
        this.setState({can_withdraw:e.target.value})
    }
    can_deposit=(e)=>{
        this.setState({can_deposit:e.target.value})
    }
    fee_currency_name=(e)=>{
        this.setState({fee_currency_name:e.target.value})
    }
    withdrew_fee=(e)=>{
        this.setState({withdrew_fee:e.target.value})
    }
    coin_code=(e)=>{
        this.setState({coin_code:e.target.value})
    }

    coin_decimal=(e)=>{
        this.setState({coin_decimal:e.target.value})
    }
    smart_contract=(e)=>{
        this.setState({smart_contract:e.target.value})
    }
    coin_platform=(e)=>{
        this.setState({coin_platform:e.target.value})
    }
    coin_type=(e)=>{
        this.setState({coin_type:e.target.value})
    }
    coin_name=(e)=>{
        this.setState({coin_name:e.target.value})
    }
    coin_symbol=(e)=>{
        this.setState({coin_symbol:e.target.value})
    }
    status=(e)=>{
        this.setState({status:e.target.value})
    }
    swap=(e)=>{
        this.setState({swap:e.target.value})
    }
    price=(e)=>{
        this.setState({price:e.target.value})
    }
    address_default=(e)=>{
        this.setState({address_default:e.target.value})
    }


    onSubmitForm= (event)=>{
        var val = this.state
        var formData = new FormData()
        formData.append("token",val.token)
        formData.append("coin_name",val.coin_name)
        formData.append("coin_symbol",val.coin_symbol)
        formData.append("code",val.coin_code)
        formData.append("coin_type",val.coin_type)
        formData.append("platform",val.coin_platform)
        formData.append("contract",val.smart_contract)
        formData.append("coin_decimal",val.coin_decimal)
        formData.append("price",val.price)
        formData.append("status",val.status)
        formData.append("swap",val.swap)
        formData.append("fee",val.withdrew_fee)
        formData.append("fee_coin",val.fee_currency_name)
        formData.append("deposit",val.can_deposit)
        formData.append("withdrew",val.can_withdraw)
        formData.append("explorer",val.explorer)
        formData.append("logo",val.logo_img)
        formData.append("fund_address",val.address_default)
        Axios.post(ApiUrl.baseurl+"add-ccoin", formData)
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
                        () => this.props.history.push(`/currency/airdrop`),
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
                    <option selected={res.id == this.state.fee_currency_name} value={res.id}>{res.coin_symbol}</option>
                </>
            )

        })
        return (
            <Menu title="Add New Currency And Coin">
                 <h3 className="bg-white title-head"> Add Airdrop Currency </h3>
                 <div className="container-fluid currency-add">
                         <div className="row">
                             <div className="col-md-12">
                                 <form onSubmit={this.onSubmitForm}>
                                     <div className="row">
                                         <div className="col-md-6">
                                             <label>Coin Name</label>
                                             <input type="text" required value={this.state.coin_name} onChange={this.coin_name} className="form-control shadow-none" placeholder="Bitcoin "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Coin Symbol</label>
                                             <input type="text" value={this.state.coin_symbol} onChange={this.coin_symbol} className="form-control shadow-none" required placeholder="BTC "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Coin Code</label>
                                             <input type="text" value={this.state.coin_code} onChange={this.coin_code} className="form-control shadow-none" required placeholder="BTC "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Coin Type</label>
                                             <select id="inputState" required onChange={this.coin_type} className="form-control shadow-none">
                                                 <option selected value="">Select Type</option>
                                                 <option  value="Coin">Coin</option>
                                                 <option value="Token">Token</option>
                                             </select>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Coin Platform</label>
                                             <select id="inputState" required onChange={this.coin_platform} className="form-control shadow-none">
                                                 <option value="">Select Platform</option>
                                                 <option value="Solana">Solana</option>
												 <option value="Tron">Tron </option>
                                                 <option value="Avalanche">Avalanche</option>
                                                 <option value="Ethereum">Ethereum</option>
                                                 <option value="Binance">Binance</option>
                                                 <option value="Fantom">Fantom</option>
                                                 <option value="Polygon">Polygon</option>
                                                 <option value="Base">Base</option>
                                             </select>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Coin Smart Contract</label>
                                             <input type="text" value={this.state.smart_contract} onChange={this.smart_contract} className="form-control shadow-none" placeholder=" Ethereum Smart Contract if any "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Coin Decimal</label>
                                             <input type="number" value={this.state.coin_decimal} onChange={this.coin_decimal} className="form-control shadow-none" placeholder=" 8"/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Coin Withdrew Fee</label>
                                             <input type="number" value={this.state.withdrew_fee} onChange={this.withdrew_fee} className="form-control shadow-none" placeholder="0.001"/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Withdrew Currency Name</label>
                                             <select id="inputState"  onChange={this.fee_currency_name} className="form-control shadow-none">
                                                 <option value="">Select Fee Currency</option>
                                                 {currency}
                                             </select>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Can Deposit</label>
                                             <select id="inputState" required onChange={this.can_deposit} className="form-control shadow-none">
                                                 <option selected value="1">Yes</option>
                                                 <option value="0">No</option>
                                             </select>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Can Withdrew</label>
                                             <select id="inputState" required onChange={this.can_withdraw} className="form-control shadow-none">
                                                 <option selected value="1">Yes</option>
                                                 <option value="0">No</option>
                                             </select>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Coin Status</label>
                                             <select id="inputState" required onChange={this.status} className="form-control shadow-none">
                                                 <option selected value="1">Yes</option>
                                                 <option value="0">No</option>
                                             </select>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Swap Status</label>
                                             <select id="inputState" required onChange={this.swap} className="form-control shadow-none">
                                                 <option selected value="1">Yes</option>
                                                 <option value="0">No</option>
                                             </select>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Explorer</label>
                                             <input type="text" value={this.state.explorer} onChange={this.explorer} className="form-control shadow-none" placeholder=" explorer link "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Coin Logo Link</label>
                                             <input type="text"  onChange={this.logo_img} className="form-control shadow-none" placeholder="Logo Link "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Fund Transfer Address</label>
                                             <input type="text" value={this.state.address_default} onChange={this.address_default} className="form-control shadow-none" placeholder=" explorer link "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Coin Price</label>
                                             <input type="text" value={this.state.price} onChange={this.price} className="form-control shadow-none" placeholder=" explorer link "/>
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

export default AddAirdropCurrency;