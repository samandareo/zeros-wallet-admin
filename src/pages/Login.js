import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom"
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import AppUrl from "../AppUrl/ApiUrl";
import jwt_decode from "jwt-decode";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            password: "",passwordvalidity:"",loading:false
        }
    }

    componentDidMount(){
        var token = localStorage.getItem("admintoken");
        if(token){
          this.props.history.push("/")
        }
    }

    onpassword = (e) => {
        var password = e.target.value
        this.setState({ password: password })
        if(password==""){
            this.setState({passwordvalidity:"0"})
        }else{
            this.setState({passwordvalidity:"1"})
        }
    }

    formSubmit = (event) => {
        const formData = new FormData();
        formData.append("uid", this.state.password);

           if(this.state.password==""){
                this.setState({passwordvalidity:"0"})
            }else{
                this.setState({loading:true})
            console.log(AppUrl.baseurl+"login")
                Axios.post(AppUrl.baseurl+"login", formData)
                .then(res => {
                    this.setState({loading:false})
                  if (res.data.success) {
                    toast.success(res.data.success, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                } else {
                    toast.error(res.data.error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                }
                    //console.log(res.data)
                    var token = res.data.token
                    var decoded = jwt_decode(token);
                    var type = decoded.usertype
                    if(type=="Admin" || type=="Manager"){
                        console.log("okkk")
                      localStorage.setItem("admintoken",res.data.token)
                      setTimeout(
                          () => {
                              this.props.history.push("/")
                          }, 1000
                      )

                    }else{
                      toast.error("you are not authorized as admin", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.setState({loading:false})
                })
            }


        event.preventDefault()
    }

    render() {
        return (
            <>
                <title>Account Login</title>
                <div className="container">
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
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4 login ">

                            <h3 className="crp ">Login to your admin account<br /></h3>
                            <form onSubmit={this.formSubmit}>
                                <input onChange={this.onpassword} className={this.state.passwordvalidity=="1"?" form-control form-control-lg shadow-none mb-2 is-valid":
                                this.state.passwordvalidity=="0"?"form-control form-control-lg shadow-none mb-2 is-invalid":
                                "form-control form-control-lg shadow-none mb-2"} type="password" 
                                    placeholder="Wallet Key" aria-label="password" />
                               <br />
                                <div className="row">
                                    <div className="col-md-12">
                                        <button type="submit" disabled={this.state.loading}
                                                className="btn btn-primary shadow-none loginb ">
                                            {this.state.loading==true?"Loading...":"Log In"}
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
            </>
        );
    }
}


export default withRouter(Login);