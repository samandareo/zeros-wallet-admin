import React, {Component} from 'react';
import Axios from "axios";
import AppUrl from "../AppUrl/ApiUrl";
import {toast} from "react-toastify";
import Menu from "../components/Menu";
import ApiUrl from "../AppUrl/ApiUrl";
import NotImg from "../images/404.png"
import Loading from "../components/Loading";

class UserUpdate extends Component {
    constructor({match}) {
        super();
        this.state={
            token:"",uuid:"",
            id:match.params.id,profile_status:"",usertype:"",
            role:[{name:"Admin"},{name:"User"}],
            loading:true
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
                        {uuid:val["uuid"],
                            usertype:val["type"],loading:false,
                        }
                    )
                    //console.log(val["block_status"])
                }

            })
            .catch(err=>{
                console.log(err)
            })
    }


    usertype=(e)=>{
        this.setState({usertype:e.target.value})
    }

    onsubmitForm=(event)=>{
        var formData = new FormData()
        formData.append("token",this.state.token)
        formData.append("usertype",this.state.usertype)
        formData.append("id",this.state.id)
        Axios.post(AppUrl.baseurl+"updateuseradmin",formData)
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
                    setTimeout(
                        () => this.props.history.push(`/`),
                        1000
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
            .catch(err=>{
                console.log(err)
            })

        event.preventDefault()
    }

    render() {

        const utype = this.state.role.map(res=>{
            return(<>
                    {this.state.usertype==res.name?
                        <option selected value={res.name}>{res.name}</option>:
                        <option value={res.name}>{res.name}</option>
                    }
                </>
            )
        })

        return (
            <Menu title={"Edit User "+this.state.username}>
                <h3 className="bg-white title-head"> Edit User {this.state.name} </h3>
                <div className="container-fluid currency-add">
                    <div className="row">

                        {this.state.loading==true?
                        <Loading/>:
                            <div className="col-md-11 bg-white m-3">
                                <form className="mt-5" onSubmit={this.onsubmitForm}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>User ID</label>
                                            <input type="text" disabled  value={this.state.id} required  className="form-control shadow-none" />
                                        </div>
                                        <div className="col-md-6">
                                            <label>UID</label>
                                            <input disabled={true} type="text"  value={this.state.uuid}  className="form-control shadow-none" />
                                        </div>

                                        <div className="col-md-6">
                                            <label>User Type </label>
                                            <select onChange={this.usertype} className="form-select shadow-none" aria-label="Default select example">
                                                {utype}
                                            </select>
                                        </div>
                                        <div className="col-md-12 mt-4 mb-5">
                                            <button type="submit" style={{width:"200px"}} className="btn btn-primary shadow-none">Update Profile</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        }



                    </div>
                </div>
            </Menu>
        );
    }
}

export default UserUpdate;