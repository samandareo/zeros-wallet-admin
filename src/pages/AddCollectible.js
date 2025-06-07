import React, {Component} from "react";
import Axios from "axios";
import ApiUrl from "../AppUrl/ApiUrl";
import {toast} from "react-toastify";
import moment from "moment";
import Menu from "../components/Menu";
import Loading from "../components/Loading";
import { parse } from "querystring";

class AddCollectible extends Component {
    constructor() {
        super();
        this.state={
            data:[], name:"", image_url:"", banner_img:"", col_symbol:"", current_supply:"", total_supply:"", token:"", loading:true, submitting:false,
            coins:[]
        }
    }

    
    componentDidMount() {
        Axios.get(ApiUrl.baseurl+"all-ccoin")
            .then(res=>{
                //console.log(res.data)
                if(res.data.error){
                    var a=0
                }else{
                    console.log(res.data)
                    this.setState({coins:res.data,loading:false})
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }

    onAdd = (name, image, banner_img, total_supply, current_supply, price, currency_id) => {
        const token = localStorage.getItem("admintoken");
        this.setState({token:token})
        const formData = new FormData();
        
        formData.append("token", token);
        formData.append("name", name);
        formData.append("image", image);
        formData.append("banner_img", banner_img)
        formData.append("total_supply", total_supply);
        formData.append("current_supply", current_supply);
        formData.append("price", price);
        formData.append("currency_id", currency_id);

        this.setState({ loading: true });
        this.setState({ submitting: true });

        Axios.post(ApiUrl.baseurl + "add-collectible", formData)
            .then(response => {
                if (response.data.error) {
                    toast.error(response.data.error);
                } else {
                    toast.success("Collectible added successfully");// Refresh the list
                    this.props.history.push("/collectibles");
                }
            })
            .catch(error => {
                console.error("Add error:", error);
                toast.error("Failed to added collectible");
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {name, image_url, banner_img, total_supply, current_supply, price, currency_id } = this.state.data;
        if (!name || !image_url || !banner_img || !total_supply || !current_supply || !price || !currency_id) {
            toast.error("Please fill all fields");
            return;
        }
        if (parseInt(current_supply) > parseInt(total_supply)) {
            toast.error("Current supply cannot be greater than total supply");
            return;
        }
        if (parseInt(current_supply) < 0) {
            toast.error("Current supply cannot be less than 0");
            return;
        }
        if (parseInt(total_supply) < 0) {
            toast.error("Total supply cannot be less than 0");
            return;
        }
        if (parseInt(price) < 0) {
            toast.error("Price cannot be less than 0");
            return;
        }

        console.log("Submitting form with values:", {
            name, image_url, banner_img, total_supply, current_supply, price, currency_id
        });
        
        this.onAdd(name, image_url, banner_img, total_supply, current_supply, price, currency_id);
    }


    render() {
        const { name, image_url, banner_img, total_supply, current_supply, price, currency_id, loading } = this.state.data;
        const { coins } = this.state;

        return (
            <Menu title="Add Collectible">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card rounded-0">
                                <div className="card-header">
                                    <h4 className="card-title">Add Collectible</h4>
                                </div>
                                <div className="card-body">
                                    {loading ? (
                                        <Loading />
                                    ) : (
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control rounded-0"
                                                    value={name}
                                                    onChange={(e) => this.setState(prevState => ({
                                                        data: {
                                                            ...prevState.data,
                                                            name: e.target.value
                                                        }
                                                    }))}
                                                    required
                                                />
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
                                                <label>Banner Image</label>
                                                <input
                                                    type="file"
                                                    className="form-control rounded-0"
                                                    onChange={(e) => this.setState(prevState => ({
                                                        data: {
                                                            ...prevState.data,
                                                            banner_img: e.target.files[0]
                                                        }
                                                    }))}
                                                />
                                                {banner_img && (
                                                    <img
                                                        src={typeof banner_img === 'string' ? banner_img : URL.createObjectURL(banner_img)}
                                                        alt="Preview"
                                                        className="mt-2"
                                                        style={{ height: '100px' }}
                                                    />
                                                )}
                                            </div>

                                            <div className="form-group">
                                                <label>Total Supply</label>
                                                <input
                                                    type="number"
                                                    className="form-control rounded-0"
                                                    value={total_supply}
                                                    onChange={(e) => this.setState(prevState => ({
                                                        data: {
                                                            ...prevState.data,
                                                            total_supply: e.target.value
                                                        }
                                                    }))}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Current Supply</label>
                                                <input
                                                    type="number"
                                                    className="form-control rounded-0"
                                                    value={current_supply}
                                                    onChange={(e) => this.setState(prevState => ({
                                                        data: {
                                                            ...prevState.data,
                                                            current_supply: e.target.value
                                                        }
                                                    }))}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Price</label>
                                                <input
                                                    type="number"
                                                    className="form-control rounded-0"
                                                    value={price}
                                                    onChange={(e) => this.setState(prevState => ({
                                                        data: {
                                                            ...prevState.data,
                                                            price: e.target.value
                                                        }
                                                    }))}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Currency</label>
                                                <select
                                                    className="form-control rounded-0"
                                                    value={currency_id}
                                                    onChange={(e) => this.setState(prevState => ({
                                                        data: {
                                                            ...prevState.data,
                                                            currency_id: e.target.value
                                                        }
                                                    }))}
                                                    required
                                                >
                                                    <option value="">Select Currency</option>
                                                    {coins && coins.map((coin) => (
                                                        <option key={coin.id} value={coin.id}>
                                                            {coin.coin_name} ({coin.coin_symbol})
                                                        </option>
                                                    ))}
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
                                                        "Add Collectible"
                                                    )}
                                                </button>
                                                <a href="/collectibles" className="btn btn-secondary rounded-0 ml-2" style={{pointerEvents: this.state.submitting ? 'none' : 'auto'}}>
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

export default AddCollectible;