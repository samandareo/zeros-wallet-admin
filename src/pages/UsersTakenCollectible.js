import React, {Component} from "react";
import Axios from "axios";
import ApiUrl from "../AppUrl/ApiUrl";
import {toast} from "react-toastify";
import moment from "moment";
import Menu from "../components/Menu";
import Loading from "../components/Loading";
import {Link} from "react-router-dom";

class Collectibles extends Component {
    constructor() {
        super();
        this.state={
            data:[], token:"", loading:true, deletingIds: new Set(),
        }
    }

    componentDidMount() {
        this.users()
    }

    users=()=>{
        var token = localStorage.getItem("admintoken")
        this.setState({token:token})
        console.log(token)
        const params = "token="+token
        Axios.get(ApiUrl.baseurl+"users-taken-collectible"+"?"+params)
            .then(res=>{
                if(res.data.error){
                    console.log(res.data.error)
                    //this.collectibles()
                }else{
                    const users = res.data.users_taken
                    this.setState({data:users,loading:false})
                }
            })
            .catch(err=>{
                console.log(err)
            })

    }

    onDel = (id) => {
        var confirm = window.confirm("Are you sure to delete ")
        if(confirm){
            const FormDa = new FormData()
            FormDa.append("token", this.state.token)
            FormDa.append("id", id)
            
            // Add id to deletingIds
            this.setState(prevState => ({
                deletingIds: new Set(prevState.deletingIds).add(id)
            }));

            Axios.post(ApiUrl.baseurl + "utc-del", FormDa)
                .then(res => {
                    if(res.data.success){
                        this.componentDidMount()
                        toast.success("Collectible Deleted Successfully");
                    } else {
                        toast.error("Collectible Not Deleted");
                    }
                })
                .catch(err => {
                    console.log(err)
                    toast.error("Error deleting collectible");
                })
                .finally(() => {
                    // Remove id from deletingIds
                    this.setState(prevState => {
                        const newDeletingIds = new Set(prevState.deletingIds);
                        newDeletingIds.delete(id);
                        return { deletingIds: newDeletingIds };
                    });
                    this.users()
                });
        }
    }

    render() {
        var datas = this.state.data
        .map(res => {
            return (
                <tr key={res.id}>
                    <td>{res.id}</td>
                    <td>{res.user_id}</td>
                    <td>{res.collectible_name}</td>
                    <td>
                        <img 
                            src={res.collectible_image} 
                            style={{ height: '50px', width: '50px', objectFit: 'cover' }}
                        />
                    </td>
                    <td>{parseFloat(res.purchase_price)}</td>
                    <td>{res.coin_symbol}</td>
                    <td>{res.purchase_timestamp}</td>
                    <td>
                        <ul className="list-inline m-0">
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
            <Menu title={"User Taken Collectibles"}>
                <h3 className="bg-white title-head">Users with Collectibles ({this.state.data.length})</h3>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 p-0 m-0">
                            <div className="list bg-white p-2">
                                <div className="table-responsive mt-3">
                                    <table className="table table-bordered bg-white">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>User ID</th>
                                                <th>NFT</th>
                                                <th>Image</th>
                                                <th>Price</th>
                                                <th>Symbol</th>
                                                <th>Purchase time</th>
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

export default Collectibles;