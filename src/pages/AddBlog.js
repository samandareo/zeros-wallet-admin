import React, {Component} from 'react';
import Axios from "axios";
import AppUrl from "../AppUrl/ApiUrl";
import {toast} from "react-toastify";
import Menu from "../components/Menu";
import ReactQuill from 'react-quill';

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

class AddBlog extends Component {
    constructor() {
        super();
        this.state={
            token:"",title:"",des:"",img:"",img2:"",type:"home",route:"",navigate:""
        }

    }
    componentDidMount() {
        var token = localStorage.getItem("admintoken")
        this.setState({token:token})
    }
    route=(e)=>{
        this.setState({route:e.target.value})
    }
    navigate=(e)=>{
        this.setState({navigate:e.target.value})
    }
    type=(e)=>{
        this.setState({type:e.target.value})
    }
    title=(e)=>{
        this.setState({title:e.target.value})
    }
    des=(content, delta, source, editor)=>{
        this.setState({des:content})
    }

    img=(e)=>{
        this.setState({img:e.target.value})
    }

    onsubmitForm=async (event)=>{
        var formData = new FormData()
        formData.append("token",this.state.token)
        formData.append("title",this.state.title)
        formData.append("des",this.state.des)
        formData.append("type",this.state.type)
        formData.append("img",this.state.img)
        formData.append("route",this.state.route)
        formData.append("navigate",this.state.navigate)
        await Axios.post(AppUrl.baseurl+"add-blog",formData)
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
                        () => this.props.history.push(`/blog`),
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


        //event.preventDefault()
    }

    render() {


        return (
            <Menu title="Create Blog">
                <h3 className="bg-white title-head"> Create Blog  </h3>
                <div className="container-fluid currency-add">
                    <div className="row">
                        <div className="col-md-11">
                            <form className="mt-5" >
                                <div className="row">

                                    <div className="col-md-12">
                                        <label>Title</label>
                                        <input type="text" onChange={this.title} value={this.state.title} required  className="form-control shadow-none" placeholder=" Title Here ..."/>
                                    </div>
                                    <div className="col-md-12">
                                        <label>Route URL</label>
                                        <input type="text" onChange={this.route} value={this.state.route} required  className="form-control shadow-none" placeholder=" Link url"/>
                                    </div>
                                    <div className="col-md-12">
                                        <label>Route Android</label>
                                        <input type="text" onChange={this.navigate} value={this.state.navigate} required  className="form-control shadow-none" placeholder=" navigate url"/>
                                    </div>
                                    <div className="col-md-12">
                                        <label>Bannar Type</label>
                                        <select onChange={this.type}  id="inputState" required  className="form-control shadow-none">
                                            <option value="home">Home Page</option>
                                            <option value="airdrop">Airdrop Page</option>
                                            <option value="both">Both Page</option>
                                        </select>
                                    </div>
                                    <div className="col-md-12">
                                        <label>Thumbnail Link</label>
                                        <input type="text" onChange={this.img} value={this.state.img}
                                               placeholder={"Bannar Link"}
                                               className="form-control shadow-none" />

                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label htmlFor="exampleFormControlTextarea1">Description</label>
                                        <ReactQuill style={{height:"150px"}}
                                                        modules={modules}
                                                        onChange={this.des} value={this.state.des} className="editor" theme="snow" />
                                                        <br/><br/>
                                    </div>
                                    <div className="col-md-12 mt-4 mb-5">
                                        <button type="button" onClick={this.onsubmitForm} className="btn btn-primary shadow-none">Submit</button>
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

export default AddBlog;