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
            data:[], id:0, name:"", image_url:"", banner_img:"", col_symbol:"", current_supply:"", total_supply:"", token:"", loading:true, deletingIds: new Set(),
        }
    }

    componentDidMount() {
        this.collectibles()
    }

    collectibles=()=>{
        var token = localStorage.getItem("admintoken")
        this.setState({token:token})

        const formd = new FormData()
        formd.append("token",token)
        Axios.get(ApiUrl.baseurl+"collectibles",formd)
            .then(res=>{
                if(res.data.error){
                    console.log(res.data.error)
                    //this.collectibles()
                }else{
                    const collectiblesData = res.data.collectibles
                    this.setState({data:collectiblesData,loading:false})
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

            Axios.post(ApiUrl.baseurl + "delete-collectible/"+id, FormDa)
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
                });
        }
    }

    render() {
        var datas = this.state.data
        .map(res => {
            return (
                <tr key={res.id}>
                    <td>{res.id}</td>
                    <td>{res.name}</td>
                    <td>
                        <img 
                            src={res.image_url} 
                            alt={res.coin_symbol}
                            style={{ height: '50px', width: '50px', objectFit: 'cover' }}
                        />
                    </td>
                    <td>
                        <img
                            src={res.banner_img}
                            alt="Nft banner"
                            style={{ height: '50px', width: '50px', objectFit: 'cover' }}
                        />
                    </td>
                    <td>{parseFloat(res.price)} {res.currency}</td>
                    <td>{res.coin_symbol}</td>
                    <td>{res.current_supply} / {res.total_supply}</td>
                    <td>{moment(res.created_at).fromNow()}</td>
                    <td>
                        <ul className="list-inline m-0">
                            <li className="list-inline-item">
                                <Link to={`/update-collectible/${res.id}`} className="btn btn-primary btn-sm rounded-0 shadow-none" data-toggle="tooltip" data-placement="top" title="Edit">
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
            <Menu title={"Collectibles"}>
                <h3 className="bg-white title-head">Collectibles ({this.state.data.length})</h3>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 p-0 m-0">
                            <div className="list bg-white p-2">
                                <div className="addNft mt-2 mb-2 d-flex justify-content-between align-items-center">
                                    <a href="/users-taken-collectible" className="btn btn-primary shadow-none rounded-0">
                                        <i className="fa fa-user"></i> Users
                                    </a>
                                    <a href="/add-collectible" className="btn btn-primary shadow-none rounded-0">
                                        <i className="fa fa-plus"></i> Add Collectible
                                    </a>
                                </div>
                                <div className="table-responsive mt-3">
                                    <table className="table table-bordered bg-white">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Image</th>
                                                <th>Banner</th>
                                                <th>Price</th>
                                                <th>Symbol</th>
                                                <th>Supply</th>
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

export default Collectibles;