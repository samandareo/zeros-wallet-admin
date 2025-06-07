import React, {Component} from 'react';
import Axios from "axios";
import AppUrl from "../AppUrl/ApiUrl";
import Menu from "../components/Menu";
import Loading from "../components/Loading";
import NotImg from "../images/404.png";
import {Link} from "react-router-dom";
import Payments from "../components/user/Payments";
import Wallets from "../components/user/Wallets";
import BalanceAdjustUser from "../components/user/BalanceAdjustUser";
import UserConvert from "../components/user/UserConvert";
import UserStakeTrx from "../components/user/UserStakeTrx";

class UserDetails extends Component {
    constructor({match}) {
        super();
        this.state={
            token:"",name:"",username:"",email:"",
            id:match.params.id,profile_status:"",usertype:"",
            role:[{name:"Admin"},{name:"Manager"},{name:"User"}],user_id:"",
            loading:true,path:"payments",lip:"",uuid:""
        }
    }
    componentDidMount() {
        var token = localStorage.getItem("admintoken")
        this.setState({token:token})
        const form = new FormData()
        form.append("token",token)
        form.append("id",this.state.id)
        Axios.post(AppUrl.baseurl+"oneuser",form)
            .then(res=>{
                console.log(res.data)
                if(res.data.error){
                    var a=0
                }else{
                    var val = res.data[0]
                    this.setState(
                        {
                            user_id:val["user_id"],lip:val["lip"],
                            uuid:val["uuid"],
                            usertype:val["type"],loading:false
                        }
                    )
                    setTimeout(()=>{
                        this.getRefCount()
                    },100);
                }

            })
            .catch(err=>{
                console.log(err)
            })

    }

    getRefCount=()=>{
        const form = new FormData()
        form.append("token",this.state.token)
        form.append("user_id",this.state.user_id)
        Axios.post(AppUrl.baseurl+"refcount-user",form)
            .then(res=>{
                console.log(res.data.count)
                if(res.data.count){
                    console.log(res.data.count)
                    this.setState({count:res.data.count})
                }

            })
            .catch(err=>{
                console.log(err)
            })
    }

    onReportChange=(name)=>{
        this.setState({path:name})
    }

    render() {


        return (
            <Menu title={this.state.name}>
                <h3 className="bg-white title-head">  {this.state.name} Details</h3>
                <div className="container-fluid currency-add">
                    <div className="row">

                        {this.state.loading==true?
                            <Loading/>:
                            <div className="col-md-12 ">
                               <div className="row">
                                   <div className="col-md-12">
                                       <div className="profile table-responsive">
                                           <table className="table ">
                                               <tr>
                                                   <td>
                                                       <p>
                                                           {
                                                               this.state.image?
                                                                   <img src={AppUrl.photoUrl+this.state.image} style={{height:"100px",width:"100px", borderRadius:"50%"}} />:
                                                                   <img src={NotImg} style={{height:"100px",width:"100px", borderRadius:"50%"}} />
                                                           }
                                                       </p>
                                                   </td>
                                                   <td>
                                                       <p><b>User ID</b></p>
                                                       <p>{this.state.id}</p>
                                                   </td>

                                                   <td>
                                                       <p><b>UID</b></p>
                                                       <p>{this.state.uuid}</p>
                                                   </td>
                                                   <td>
                                                       <p><b>Role</b></p>
                                                       <p>{this.state.usertype}</p>
                                                   </td>
                                                   <td>
                                                       <p><b>IP Address</b></p>
                                                       <p>{this.state.lip}</p>
                                                   </td>
                                               </tr>
                                               <tr >
                                                   <td>
                                                       <p></p>
                                                   </td>

                                                   <td>
                                                       <Link className="btn btn-primary" style={{float:"left"}} to={"/user/edit/"+this.state.id}>Edit Profile</Link>
                                                   </td>
                                               </tr>
                                           </table>
                                       </div>
                                   </div>
                               </div>
                            </div>
                        }
                        <div className="report ">
                            <ul className="report-head">
                                <li onClick={this.onReportChange.bind(this,"payments")}><Link to={"/user/details/"+this.state.id} className={this.state.path=="payments"?"active":""}>Payments</Link></li>
                                <li onClick={this.onReportChange.bind(this,"swap")}><Link to={"/user/details/"+this.state.id} className={this.state.path=="swap"?"active":""}>Swap</Link></li>
                                <li onClick={this.onReportChange.bind(this,"stake")}><Link to={"/user/details/"+this.state.id} className={this.state.path=="stake"?"active":""}>Stake</Link></li>
                                <li onClick={this.onReportChange.bind(this,"wallet")}><Link to={"/user/details/"+this.state.id} className={this.state.path=="wallet"?"active":""}>Wallet</Link></li>
                                <li onClick={this.onReportChange.bind(this,"balance")}><Link to={"/user/details/"+this.state.id} className={this.state.path=="balance"?"active":""}>Balance</Link></li>
                            </ul>
                            <div className="report-body bg-white">
                                {this.state.path=="payments"?<Payments uid={this.state.id} />:""}
                                {this.state.path=="swap"?<UserConvert uid={this.state.id} />:""}
                                {this.state.path=="stake"?<UserStakeTrx uid={this.state.id} />:""}
                                {this.state.path=="wallet"?<Wallets user_id={this.state.user_id} uid={this.state.id} />:""}
                                {this.state.path=="balance"?<BalanceAdjustUser user_id={this.state.user_id} uid={this.state.id} email={this.state.email} />:""}
                            </div>
                           <br/><br/>
                        </div>
                    </div>
                </div>
            </Menu>
        );
    }
}

export default UserDetails;
