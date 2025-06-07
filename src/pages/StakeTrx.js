import React, {Component} from 'react';
import Menu from "../components/Menu";
import Axios from "axios";
import AppUrl from "../AppUrl/ApiUrl";
import {Link} from "react-router-dom";
import Loading from "../components/Loading";
import DatePicker from "react-datepicker";
import {toast} from "react-toastify";
import moment from "moment";

class StakeTrx extends Component {
    constructor() {
        super();
        this.state={
            token:'',uid:"",count:20,coin:[],fromDate:new Date(),toDate:new Date(),
            data:[],loading:true,coin_raw_id:"",status:"",type:"",pcount:"",
            start:moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            end:moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        }
    }
    async componentDidMount() {
        await this.myPayments()
    }


    myPayments=()=>{
        var token = localStorage.getItem("admintoken")
        if(token){
            Axios.get(AppUrl.baseurl+"allstakes/"+this.state.count)
                .then(res => {
                    if (res.data.error) {
                        //this.myPayments()
                    } else {
                        this.setState({data: res.data, loading: false})
                    }
                    console.log(res.data)
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
                        <td>{moment(res.created_at).fromNow()}</td>
                        <td>{res.id} </td>
                        <td><Link to={"/user/details/"+res.uid}>{res.uid}</Link> </td>
                        <td>{res.name} </td>
                        <td>{res.profit_coin}  </td>
                        <td>{parseFloat(res.amount).toFixed(4)} {res.name} </td>
                        <td>{res.days} Days </td>
                        <td>{(parseFloat(res.ftotal)).toFixed(4)} {res.profit_coin} </td>
                        <td>{res.status} </td>
                        <td>{res.enddate} </td>
                    </tr>
                </>
            )
        },)


        return (
            <Menu title="All Staking history">
                <>
                    <h3 className="bg-white title-head"> All Staking History </h3>

                    <div className="bg-white m-0 pt-2">
                    <div className="table-responsive report-table-main bg-white">
                        <title>All Swap history </title>
                        <table className="table table-striped report-table ">
                            <thead>
                            <tr>
                                <th>Time (UTC)</th>
                                <th>ID  </th>
                                <th>UID</th>
                                <th>Staking Coin  </th>
                                <th>Profit Coin  </th>
                                <th>Amount  </th>
                                <th>Days </th>
                                <th>Profit  </th>
                                <th>Status  </th>
                                <th>End Time  </th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.loading==true?<Loading/>:data}
                            </tbody>
                        </table>
                        {
                            this.state.loading==true?"":
                                this.state.data.length>0?""
                                    :<p className="noorderdata">Staking history Data Not Available</p>
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

export default StakeTrx;