import React, {Component} from "react";
import Axios from "axios";
import ApiUrl from "../AppUrl/ApiUrl";
import {toast} from "react-toastify";
import moment from "moment";
import Menu from "../components/Menu";
import Loading from "../components/Loading";
import { parse } from "querystring";

class AddNotification extends Component {
    constructor() {
        super();
        this.state={
            data:[], type:"", image_url:"", redirect_url:"", is_active:"", duration_seconds:"", token:"", loading:false, submitting:false
        }
    }


    onAdd = (type, image, redirect_url, is_active, duration_seconds) => {
        const token = localStorage.getItem("admintoken");
        this.setState({token:token})
        const formData = new FormData();
        
        formData.append("token", token);
        formData.append("type", type);
        formData.append("image", image);
        formData.append("redirect_url", redirect_url);
        formData.append("is_active", is_active);
        formData.append("duration_seconds", duration_seconds);

        this.setState({ loading: true });
        this.setState({ submitting: true });

        Axios.post(ApiUrl.baseurl + "admin/notifications", formData)
            .then(response => {
                if (response.data.error) {
                    toast.error(response.data.error);
                } else {
                    toast.success("Notification added successfully");
                    this.props.history.push("/notifications");
                }
            })
            .catch(error => {
                console.error("Add error:", error);
                toast.error("Failed to added notification");
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {type, image_url, redirect_url, is_active, duration_seconds} = this.state.data;
        if (!type || !image_url || !redirect_url || !is_active || !duration_seconds) {
            toast.error("Please fill all fields");
            return;
        }
        
        this.onAdd(type, image_url, redirect_url, parseInt(is_active), parseInt(duration_seconds));
    }


    render() {
        const { type, image_url, redirect_url, is_active, duration_seconds } = this.state.data;

        return (
            <Menu title="Add Notification">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card rounded-0">
                                <div className="card-header">
                                    <h4 className="card-title">Add Notification</h4>
                                </div>
                                <div className="card-body">
                                    {this.state.loading ? (
                                        <Loading />
                                    ) : (
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="form-group">
                                                <label>Type</label>
                                                <select 
                                                    className="form-control rounded-0"
                                                    value={type}
                                                    onChange={(e) => this.setState(prevState => ({
                                                        data: {
                                                            ...prevState.data,
                                                            type: e.target.value
                                                        }
                                                    }))}
                                                    required
                                                >
                                                    <option value="">Select Type</option>
                                                    <option value="splash">Splash</option>
                                                    <option value="popup">Popup</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label>Image</label>
                                                <input
                                                    type="file"
                                                    className="form-control rounded-0"
                                                    onChange={(e) => this.setState(prevState => ({
                                                        data: {
                                                            ...prevState.data,
                                                            image_url: e.target.files[0]
                                                        }
                                                    }))}
                                                />
                                                {image_url && (
                                                    <img
                                                        src={typeof image_url === 'string' ? image_url : URL.createObjectURL(image_url)}
                                                        alt="Preview"
                                                        className="mt-2"
                                                        style={{ height: '100px' }}
                                                    />
                                                )}
                                            </div>

                                            <div className="form-group">
                                                <label>Redirect URL</label>
                                                <input
                                                    type="text"
                                                    className="form-control rounded-0"
                                                    value={redirect_url}
                                                    onChange={(e) => this.setState(prevState => ({
                                                        data: {
                                                            ...prevState.data,
                                                            redirect_url: e.target.value
                                                        }
                                                    }))}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Duration</label>
                                                <input
                                                    type="number"
                                                    className="form-control rounded-0"
                                                    value={duration_seconds}
                                                    onChange={(e) => this.setState(prevState => ({
                                                        data: {
                                                            ...prevState.data,
                                                            duration_seconds: e.target.value
                                                        }
                                                    }))}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>State</label>
                                                <select
                                                    className="form-control rounded-0"
                                                    value={is_active}
                                                    onChange={(e) => this.setState(prevState => ({
                                                        data: {
                                                            ...prevState.data,
                                                            is_active: e.target.value
                                                        }
                                                    }))}
                                                    required
                                                >
                                                    <option value="">Select State</option>
                                                    <option value="1">Active</option>
                                                    <option value="2">Disabled</option>
                                                </select>
                                            </div>


                                            <div className="form-group gap-2 d-flex mt-4">
                                                <button type="submit" className="btn btn-primary rounded-0" onClick={this.handleSubmit} disabled={this.state.submitting}>
                                                    {this.state.submitting ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                              Adding...
                                                        </>
                                                    ) : (
                                                        "Add Notification"
                                                    )}
                                                </button>
                                                <a href="/notifications" className="btn btn-secondary rounded-0 ml-2" style={{pointerEvents: this.state.submitting ? 'none' : 'auto'}}>
                                                    Cancel
                                                </a>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Menu>
        );
    }
}

export default AddNotification;