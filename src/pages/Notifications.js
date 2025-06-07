import React, {Component} from "react";
import Axios from "axios";
import ApiUrl from "../AppUrl/ApiUrl";
import {toast} from "react-toastify";
import moment from "moment";
import Menu from "../components/Menu";
import Loading from "../components/Loading";
import {Link} from "react-router-dom";

class Notifications extends Component {
    constructor() {
        super();
        this.state={
            data:[], token:"", loading:true, deletingIds: new Set(),
        }
    }

    componentDidMount() {
        this.notifications()
    }

    notifications=()=>{
        var token = localStorage.getItem("admintoken")
        this.setState({token:token})

        const params = {
            token: token,
        }
        Axios.get(ApiUrl.baseurl+"admin/notifications", {params})
            .then(res=>{
                if(res.data.error){
                    console.log(res.data.error)
                }else{
                    const notificationsData = res.data.notifications
                    this.setState({data:notificationsData,loading:false})
                }
            })
            .catch(err=>{
                console.log(err)
            })

    }

    onDel = (id) => {
        var confirm = window.confirm("Are you sure to delete ")
        if(confirm){

            const params = {
                token: this.state.token,
            }

            this.setState(prevState => ({
                deletingIds: new Set(prevState.deletingIds).add(id)
            }));

            Axios.delete(ApiUrl.baseurl + "admin/notifications/"+id, {params})
                .then(res => {
                    if(res.data.success){
                        this.componentDidMount()
                        toast.success("Notification Deleted Successfully");
                        window.location.reload()
                    } else {
                        toast.error("Notification Not Deleted");
                    }
                })
                .catch(err => {
                    console.log(err)
                    toast.error("Error deleting notification");
                })
                .finally(() => {
                    // Remove id from deletingIds
                    this.setState(prevState => {
                        const newDeletingIds = new Set(prevState.deletingIds);
                        newDeletingIds.delete(id);
                        return { deletingIds: newDeletingIds };
                    });
                });
        }
    }

    render() {
        var datas = this.state.data
        .map(res => {
            return (
                <tr key={res.id}>
                    <td>{res.id}</td>
                    <td>{res.type}</td>
                    <td>
                        <img 
                            src={res.image_url} 
                            alt="promo image"
                            style={{ height: '50px', width: '50px', objectFit: 'cover' }}
                        />
                    </td>
                    <td>{res.redirect_url}</td>
                    <td>{res.duration_seconds == null ? "No duration" : `${res.duration_seconds} seconds`}</td>
                    <td>{res.is_active === 1 ? "Active": "Disabled"}</td>
                    <td>{moment(res.created_at).fromNow()}</td>
                    <td>
                        <ul className="list-inline m-0">
                            <li className="list-inline-item">
                                <Link to={`/update-notification/${res.id}`} className="btn btn-primary btn-sm rounded-0 shadow-none" data-toggle="tooltip" data-placement="top" title="Edit">
                                    <i className="fa fa-edit"></i>
                                </Link>
                            </li>

                            <li className="list-inline-item">
                                <button 
                                    className="btn btn-danger btn-sm rounded-0 shadow-none" 
                                    type="button"
                                    onClick={() => this.onDel(res.id)} 
                                    data-toggle="tooltip" 
                                    data-placement="top"
                                    disabled={this.state.deletingIds.has(res.id)}
                                >
                                    {this.state.deletingIds.has(res.id) ? (
                                        <>
                                            Deleting... 
                                            <span className="spinner-border spinner-border-sm ms-1" role="status" aria-hidden="true"></span>
                                        </>
                                    ) : (
                                        <i className="fa fa-trash"></i>
                                    )}
                                </button>
                            </li>
                        </ul>
                    </td>
                </tr>
            )
        })

        return (
            <Menu title={"Notifications"}>
                <h3 className="bg-white title-head">Notifications ({this.state.data.length})</h3>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 p-0 m-0">
                            <div className="list bg-white p-2">
                                <div className="addNft mt-2 mb-2 d-flex justify-content-between align-items-center">
                                    <a href="/add-notification" className="btn btn-primary shadow-none rounded-0">
                                        <i className="fa fa-plus"></i> Add Notification
                                    </a>
                                </div>
                                <div className="table-responsive mt-3">
                                    <table className="table table-bordered bg-white">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Type</th>
                                                <th>Image</th>
                                                <th>Redirect URL</th>
                                                <th>Duration</th>
                                                <th>State</th>
                                                <th>Created Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.loading ? <tr><td colSpan="5"><Loading /></td></tr> : datas}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Menu>
        );
    }
}

export default Notifications;