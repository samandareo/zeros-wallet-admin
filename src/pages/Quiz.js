import React, {Component} from 'react';
import Axios from "axios";
import AppUrl from "../AppUrl/ApiUrl";
import {toast} from "react-toastify";
import Menu from "../components/Menu";
import Loading from "../components/Loading";

class Quiz extends Component {
    constructor() {
        super();
        this.state={
            token:"",title:"",ques:"",answer:"",
            reward:"",loading:true
        }

    }
    async componentDidMount() {
        var token = localStorage.getItem("admintoken")
        this.setState({token:token})
        await Axios.get(AppUrl.baseurl+"quiz/get")
            .then(res=>{
                if (res.data.error) {
                    this.setState({loading: false})
                } else {
                    var val = res.data
                    //console.log(val)
                    this.setState({title:val["title"],ques:val["ques"],
                        answer:val["answer"],reward:val["reward"],loading:false
                    })
                }

            })
            .catch(err=>{
                console.log(err)
            })
    }

    title=(e)=>{
        this.setState({title:e.target.value})
    }
    ques=(e)=>{
        this.setState({ques:e.target.value})
    }
    answer=(e)=>{
        this.setState({answer:e.target.value})
    }
    reward=(e)=>{
        this.setState({reward:e.target.value})
    }

    onsubmitForm=async (event)=>{
        var formData = new FormData()
        formData.append("token",this.state.token)
        formData.append("title",this.state.title)
        formData.append("ques",this.state.ques)
        formData.append("answer",this.state.answer)
        formData.append("reward",this.state.reward)
        await Axios.post(AppUrl.baseurl+"quiz/update",formData)
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

        return (
            <Menu title="Referral and Mining Settings">
                <h3 className="bg-white title-head"> Quiz  Setting  </h3>
                <div className="container-fluid currency-add">
                    <div className="row">
                        <div className="col-md-11">
                            {
                                this.state.loading==true?<Loading/>:
                                    <form className="mt-5">
                                        <div className="row">

                                            <div className="col-md-6">
                                                <label>Quiz Title</label>
                                                <input type="text" onChange={this.title} required value={this.state.title} className="form-control shadow-none" placeholder=""/>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Quiz Question</label>
                                                <input type="text" onChange={this.ques} required value={this.state.ques} className="form-control shadow-none"
                                                       placeholder=""/>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Quiz Answer</label>
                                                <input type="text" onChange={this.answer} required value={this.state.answer} className="form-control shadow-none" placeholder=""/>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Reward</label>
                                                <input type="number" onChange={this.reward} required value={this.state.reward} className="form-control shadow-none"
                                                       placeholder=""/>
                                            </div>

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

export default Quiz;