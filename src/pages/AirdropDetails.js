import React, {Component} from 'react';
import Menu from "../components/Menu";
import Axios from "axios";
import AppUrl from "../AppUrl/ApiUrl";
import {Link} from "react-router-dom";
import Loading from "../components/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {toast} from "react-toastify";
import moment from "moment";
import ImgNot from "../images/404.png";

class AirdropDetails extends Component {
    constructor({match}) {
        super();
        this.state={
            token:'',count:20,
            data:[],loading:true,id:match.params.id,
        }
    }
    async componentDidMount() {
        await this.myPayments()
    }

    myPayments=()=>{
        var token = localStorage.getItem("admintoken")
        if(token){
            var fda = new FormData()
            Axios.post(AppUrl.baseurl+"airdropid/"+this.state.id+"/"+this.state.count)
                .then(res => {
                    console.log(res.data)
                    if (res.data.length==0) {
                        this.setState({loading: false})
                    } else {
                        this.setState({data: res.data, loading: false})
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.myPayments()
                })
        }
    }

    loadMore=async (e)=>{
        var countval = this.state.count+20
        await this.setState({count:countval})
        await this.myPayments()
    }

    render() {
        const data = this.state.data.map(res=>{
            return(
                <>
                    <tr>
                        <td>{moment(res.created_at).format("MMM Do YY")}</td>
                        <td><Link to={"/user/details/"+res.uid}>{res.uid}</Link> </td>
                        <td>{res.id} </td>
                        <td>{res.title}  </td>
                        <td>{res.status}  </td>
                        <td>
                            {res.logo?
                                <img style={{height:"30px",width:"30px"}} src={res.logo}/>
                                :
                                <img style={{height:"30px",width:"30px"}} src={ImgNot}/>
                            }
                        </td>
                    </tr>
                </>
            )
        },)


        return (

            <Menu title="All Pending Withdrew ">
                <>
                    <h3 className="bg-white title-head"> Airdrop Details</h3>

                    <div className="bg-white m-0 pt-2">
                        <div className="table-responsive report-table-main ">
                            <title>All Pending Withdrew history </title>
                            <table className="table table-striped report-table ">
                                <thead>
                                <tr>
                                    <th>Time (UTC)</th>
                                    <th>User ID </th>
                                    <th>ID  </th>
                                    <th>Airdrop Name  </th>
                                    <th>Status</th>
                                    <th>Logo  </th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.loading==true?<Loading/>:data}
                                </tbody>
                            </table>
                            {
                                this.state.loading==true?"":
                                    this.state.data.length>0?""
                                        :<p className="noorderdata">Airdrop history Data Not Available</p>
                            }

                        </div>
                        {
                            this.state.data.length>=this.state.count?
                                <div className="row" style={{margin:"0"}}>
                                    <div className="col-md-12 loadmore mb-5" >
                                        <button onClick={this.loadMore} className="btn btn-secondary btn-sm shadow-none"> Load more ...</button>
                                    </div>
                                </div>:""
                        }
                    </div>

                    </>
            </Menu>
        );
    }
}

export default AirdropDetails;