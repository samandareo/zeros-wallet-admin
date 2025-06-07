import React, { Component } from "react";
import { Link,withRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Axios from "axios"
import jwt_decode from "jwt-decode";
import Logo from "../images/logo2.png"
import AppUrl from "../AppUrl/ApiUrl";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidemenu: "sidemenuOpen",
            content: "contentClose",
            path:"",
        }
    }

    componentDidMount() {
        var path = window.location.pathname
        this.setState({path:path})
        var token = localStorage.getItem("admintoken")
        if(token){
            var decoded = jwt_decode(token);
            var type = decoded.usertype
            if(type=="Admin"){
                this.setState({token:token})
                /*
                const formData = new FormData()
                formData.append("token",token)
                Axios.post(AppUrl.baseurl+"auth/profile",formData)
                    .then(res=>{
                      console.log(res.data)
                    })
                    .catch(err=>{
                        console.log(err)
                        //localStorage.removeItem("admintoken")
                        this.props.history.push("/login")
                        //this.componentDidMount()
                    })*/
            }else{
                this.props.history.push("/login")
            }

        }else{
            this.props.history.push("/login")
        }
    }

    menuClick = () => {
        if (this.state.sidemenu == "sidemenuOpen") {
            this.setState({ sidemenu: "sidemenuClose", content: "contentOpen" })
        } else {
            this.setState({ sidemenu: "sidemenuOpen", content: "contentClose" })
        }
    }

    logout=()=>{
        localStorage.removeItem("admintoken")
        toast.success("Logout Successful", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setTimeout(
            () => {
                this.props.history.push("/login")
            }, 1000
        )
    }

    render() {
        return (
            <>
                <title>{this.props.title}</title>
                <div className="menu">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2 col-6 top-logo">
                                <Link to="/">
                                    <img className="logoimage" src={Logo} />
                                </Link>
                            </div>
                            <div className="col-md-10 col-6">
                                <a onClick={this.menuClick} className="menu-bar"><i className="fa fa-bars"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-body">
                    <div className="sidebar">
                        <ul className={this.state.sidemenu}>
                            <div className="sidelogo">
                                <Link to="/">
                                    <img className="logoimage" src={Logo} />
                                </Link>
                            </div>
                            <Link to="/">
                                <li className={this.state.path=="/"?"active":""}>
                                    <i className="far fa-users"></i> User List
                                </li>
                            </Link>
                            <Link to="/currency">
                                <li className={this.state.path=="/currency"?"active":""}>
                                    <i className="far fa-coins"></i> Decentralized Coin
                                </li>
                            </Link>
                            <Link to="/currency/airdrop">
                                <li className={this.state.path=="/currency/airdrop"?"active":""}>
                                    <i className="far fa-coins"></i> Airdrop Coin
                                </li>
                            </Link>
                            <Link to="/payments">
                                <li className={this.state.path=="/payments"?"active":""}>
                                    <i className="far fa-badge-dollar"></i> All Payments
                                </li>
                            </Link>
                            <Link to="/deposit">
                                <li className={this.state.path=="/deposit"?"active":""}>
                                    <i className="far fa-badge-dollar"></i> All Deposit
                                </li>
                            </Link>
                            <Link to="/withdrew">
                                <li className={this.state.path=="/withdrew"?"active":""}>
                                    <i className="far fa-badge-dollar"></i> All Withdrew
                                </li>
                            </Link>
                            <Link to="/withdrew/pending">
                                <li className={this.state.path=="/withdrew/pending"?"active":""}>
                                    <i className="far fa-pen"></i> All Pending
                                </li>
                            </Link>
                            <Link to="/airdroplist">
                                <li className={this.state.path=="/airdroplist"?"active":""}>
                                    <i className="far fa-coins"></i> Airdrop List
                                </li>
                            </Link>
                            <Link to="/stakingcoin">
                                <li className={this.state.path=="/stakingcoin"?"active":""}>
                                    <i className="far fa-coins"></i> Staking Coin
                                </li>
                            </Link>
                            <Link to="/stakingchistory">
                                <li className={this.state.path=="/stakingchistory"?"active":""}>
                                    <i className="far fa-coins"></i> Staking History
                                </li>
                            </Link>
                            <Link to="/blog">
                                <li className={this.state.path=="/blog"?"active":""}>
                                    <i className="far fa-blog"></i> All Blogs
                                </li>
                            </Link>
                            <Link to="/info">
                                <li className={this.state.path=="/info"?"active":""}>
                                    <i className="far fa-blog"></i> All Info
                                </li>
                            </Link>
                            <Link to="/convert">
                                <li className={this.state.path=="/convert"?"active":""}>
                                    <i className="far fa-retweet"></i> Swap History
                                </li>
                            </Link>
                            <Link to="/quiz">
                                <li className={this.state.path=="/quiz"?"active":""}>
                                    <i className="far fa-question"></i>  Quiz
                                </li>
                            </Link>
                            <Link to="/collectibles">
                                <li className={this.state.path=="/collectibles"?"active":""}>
                                    <i className="far fa-folder"></i>  Collectibles
                                </li>
                            </Link>
                            <Link to="/notifications">
                                <li className={this.state.path=="/notifications"?"active":""}>
                                    <i className="far fa-bell"></i>  Notifications
                                </li>
                            </Link>
                            <Link to="/tge-and-claim">
                                <li className={this.state.path=="/tge-and-claim"?"active":""}>
                                    <i className="far fa-chart-line"></i>  TGE & Claim
                                </li>
                            </Link>
                            <Link to="/referral/settings">
                                <li className={this.state.path=="/referral/settings"?"active":""}>
                                    <i className="far fa-tools"></i>  Settings
                                </li>
                            </Link>

                            <Link >
                               <li onClick={this.logout}>
                                   <i className="far fa-sign-out"></i> Logout
                               </li>
                            </Link>
                            <br/><br/><br/><br/><br/><br/>
                        </ul>
                    </div>
                    <div className={this.state.content}>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                        {this.props.children}
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Menu);