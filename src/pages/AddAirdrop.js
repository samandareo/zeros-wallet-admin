import React, {Component} from 'react';
import Menu from "../components/Menu";
import Axios from "axios";
import ApiUrl from "../AppUrl/ApiUrl";
import {toast} from "react-toastify";
import slugify from "slugify";
import DatePicker from "react-datepicker";
import moment from "moment";

class AddAirdrop extends Component {
    constructor() {
        super();
        this.state={
            title:"",des:"",coin_raw_id:"",end:moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            ,telegram:"",telegram2:"",twitter:"",
            twitter2:"", facebook:"",website:"",status:"Ongoing",reward:"",discord:"",
            logo_img:"",token:"",fromDate:new Date(),
        }
    }

    componentDidMount() {
        var token = localStorage.getItem("admintoken")
        this.setState({token:token})
    }
    reward=(e)=>{
        this.setState({reward:e.target.value})
    }
    discord=(e)=>{
        this.setState({discord:e.target.value})
    }
    logo_img=(e)=>{
        this.setState({logo_img:e.target.value})
    }
    title=(e)=>{
        this.setState({title:e.target.value})
    }
    facebook=(e)=>{
        this.setState({facebook:e.target.value})
    }
    des=(e)=>{
        this.setState({des:e.target.value})
    }
    coin_raw_id=(e)=>{
        this.setState({coin_raw_id:e.target.value})
    }
    end=(date)=>{
        this.setState({fromDate:date,end:moment(date).format("YYYY-MM-DD HH:mm:ss")})
        console.log(moment(date).format())
    }
    telegram=(e)=>{
        this.setState({telegram:e.target.value})
    }
    telegram2=(e)=>{
        this.setState({telegram2:e.target.value})
    }

    twitter=(e)=>{
        this.setState({twitter:e.target.value})
    }
    twitter2=(e)=>{
        this.setState({twitter2:e.target.value})
    }
    website=(e)=>{
        this.setState({website:e.target.value})
    }
    status=(e)=>{
        this.setState({status:e.target.value})
    }


    onSubmitForm= (event)=>{
        var val = this.state
        var formData = new FormData()
        formData.append("token",val.token)
        formData.append("title",val.title)
        formData.append("des",val.des)
        formData.append("coin_raw_id",val.coin_raw_id)
        formData.append("end",val.end)
        formData.append("telegram",val.telegram)
        formData.append("telegram2",val.telegram2)
        formData.append("twitter",val.twitter)
        formData.append("twitter2",val.twitter2)
        formData.append("status",val.status)
        formData.append("facebook",val.facebook)
        formData.append("website",val.website)
        formData.append("reward",val.reward)
        formData.append("logo",val.logo_img)
        formData.append("discord",val.discord)
        Axios.post(ApiUrl.baseurl+"add-airdrop", formData)
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
                        () => this.props.history.push(`/airdroplist`),
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
        return (
            <Menu title="Add New Currency And Coin">
                 <h3 className="bg-white title-head"> Add Airdrop </h3>
                 <div className="container-fluid currency-add">
                         <div className="row">
                             <div className="col-md-12">
                                 <form onSubmit={this.onSubmitForm}>
                                     <div className="row">
                                         <div className="col-md-6">
                                             <label>Title</label>
                                             <input type="text" required value={this.state.title} onChange={this.title} className="form-control shadow-none" placeholder=" "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Description</label>
                                             <input type="text" value={this.state.des} onChange={this.des} className="form-control shadow-none" required placeholder=" "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>End Time</label>
                                             <DatePicker selected={this.state.fromDate} onChange={this.end} name="startDate"/>
                                         </div>


                                         <div className="col-md-6">
                                             <label>Telegram Channel</label>
                                             <input type="text" value={this.state.telegram} onChange={this.telegram} className="form-control shadow-none" placeholder="  "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Telegram Group</label>
                                             <input type="text" value={this.state.telegram2} onChange={this.telegram2} className="form-control shadow-none" placeholder=" "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Twitter</label>
                                             <input type="text" value={this.state.twitter} onChange={this.twitter} className="form-control shadow-none" placeholder=" "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Twitter 2</label>
                                             <input type="text" value={this.state.twitter2} onChange={this.twitter2} className="form-control shadow-none" placeholder=" "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Status</label>
                                             <select id="inputState" required onChange={this.status} className="form-control shadow-none">
                                                 <option selected value="Ongoing">Ongoing</option>
                                                 <option value="Closed">Closed</option>
                                             </select>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Facebook</label>
                                             <input type="text" value={this.state.facebook} onChange={this.facebook} className="form-control shadow-none" placeholder=" "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Website</label>
                                             <input type="text" value={this.state.website} onChange={this.website} className="form-control shadow-none" placeholder=" "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Reward</label>
                                             <input type="text" value={this.state.reward} onChange={this.reward} className="form-control shadow-none" placeholder=" 000 "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Airdrop Logo</label>
                                             <input type="text"  onChange={this.logo_img} value={this.state.logo_img}
                                                    className="form-control shadow-none" placeholder="Logo Link "/>
                                         </div>
                                         <div className="col-md-6">
                                             <label>Discord</label>
                                             <input type="text"  onChange={this.discord} value={this.state.discord}
                                                    className="form-control shadow-none" placeholder="Discord Link "/>
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

export default AddAirdrop;