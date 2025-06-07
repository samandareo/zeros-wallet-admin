import React, {Component} from "react";
import Axios from "axios";
import ApiUrl from "../AppUrl/ApiUrl";
import {toast} from "react-toastify";
import Menu from "../components/Menu";
import Loading from "../components/Loading";

class UpdateNotification extends Component {
    constructor({match}) {
        super();
        this.state = {
            data: [],
            id: parseInt(match.params.id),
            token: "",
            loading: true,
            submitting: false
        }
    }

    componentDidMount() {
        const token = localStorage.getItem("admintoken");
        this.setState({token: token});

        if(!token) {
            this.props.history.push("/login");
            return;
        }

        const params = {
            token: token,
        };
        // Fetch notification details
        Axios.get(ApiUrl.baseurl + "admin/notifications/" + this.state.id, {params})
        .then(res => {
            if(res.data.error) {
                toast.error(res.data.error);
            } else {
                const notification = res.data.notification;
                this.setState({data: notification, loading: false});
            }
        })
        .catch(err => {
            console.error("Fetch error:", err);
            toast.error("Failed to fetch notification");
            this.setState({loading: false});
            this.componentDidMount();
        });
    }

    onUpdate = (id, type, image, redirect_url, is_active, duration_seconds) => {
        const formData = new FormData();
        formData.append("token", this.state.token);
        formData.append("type", type);
        formData.append("image", image);
        formData.append("redirect_url", redirect_url);
        formData.append("is_active", is_active);
        formData.append("duration_seconds", duration_seconds);

        this.setState({ submitting: true });

        Axios.put(ApiUrl.baseurl + "admin/notifications/" + id, formData)
            .then(response => {
                if (response.data.error) {
                    toast.error(response.data.error);
                } else {
                    toast.success("Notification updated successfully");
                    this.props.history.push("/notifications");
                }
            })
            .catch(error => {
                console.error("Update error:", error);
                toast.error("Failed to update notification");
            })
            .finally(() => {
                this.setState({ submitting: false });
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { id, type, image_url, redirect_url, is_active, duration_seconds } = this.state.data;
        
        if (!type || !redirect_url || !is_active) {
            toast.error("Please fill all required fields");
            return;
        }

        console.log("Submitting:", id, type, image_url, redirect_url, is_active, duration_seconds);

        // if (typeof image_url === ) {
        //     image_url = image_url; // If it's a string, use it directly
        // }

        this.onUpdate(
            id,
            type,
            image_url,
            redirect_url,
            parseInt(is_active),
            parseInt(duration_seconds) || 0
        );
    }

    render() {
        const { type, image_url, redirect_url, is_active, duration_seconds } = this.state.data;

        return (
            <Menu title="Update Notification">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card rounded-0">
                                <div className="card-header">
                                    <h4 className="card-title">Update Notification</h4>
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
                                                    value={redirect_url || ''}
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
                                                <label>Duration (seconds)</label>
                                                <input
                                                    type="number"
                                                    className="form-control rounded-0"
                                                    value={duration_seconds || ''}
                                                    onChange={(e) => this.setState(prevState => ({
                                                        data: {
                                                            ...prevState.data,
                                                            duration_seconds: e.target.value
                                                        }
                                                    }))}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>State</label>
                                                <select
                                                    className="form-control rounded-0"
                                                    value={is_active || ''}
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
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-primary rounded-0" 
                                                    disabled={this.state.submitting}
                                                >
                                                    {this.state.submitting ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            {" "}Updating...
                                                        </>
                                                    ) : (
                                                        "Update Notification"
                                                    )}
                                                </button>
                                                <a 
                                                    href="/notifications" 
                                                    className="btn btn-secondary rounded-0 ml-2"
                                                    style={{pointerEvents: this.state.submitting ? 'none' : 'auto'}}
                                                >
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

export default UpdateNotification;