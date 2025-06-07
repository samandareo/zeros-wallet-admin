import React, {Component} from 'react';
import jwt_decode from "jwt-decode";
import Axios from "axios";
import AppUrl from "../../AppUrl/ApiUrl";
import moment from "moment";
import {Link} from "react-router-dom";
import Loading from "../Loading";
import DatePicker from "react-datepicker";

class Payments extends Component {
    constructor() {
        super();
        this.state={
            token:'',count:20,coin:[],fromDate:new Date(),toDate:new Date(),
            data:[],loading:true,coin_raw_id:"",status:"",type:"",uid:"",
        }
    }
    async componentDidMount() {
        await this.setState({uid:this.props.uid})
        await this.myPayments()
    }

    myPayments=async ()=>{
        var token = localStorage.getItem("admintoken")
        this.setState({token:token})
        console.log(this.state.uid)
        if(token){
            var fda = new FormData()
            fda.append("token",token)
            fda.append("id",this.state.uid)
            await Axios.post(AppUrl.baseurl+"user/payments",fda)
                .then(res => {
                    console.log(res)
                    if (res.data.error) {
                        this.myPayments()
                    } else {
                        console.log(res.data)
                        this.setState({data: res.data, loading: false})
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    render() {
        const data = this.state.data.map(res=>{
            return(
                <>
                    <tr>
                        <td>{res.created_at}</td>
                        <td>{res.id} </td>
                        <td>{res.type} </td>
                        <td>{res.coin_symbol}  </td>
                        <td>{parseFloat(res.amount).toFixed(8)}  </td>
                        {
                            res.status=="Success"?
                                <td className="text-success">Successfully Completed </td>:
                                res.status=="Rejected"?<td className="text-danger">{res.status} </td>:
                                    <td className="text-dark">{res.status} </td>
                        }

                        {
                            res.trx==null || res.trx==""?<td></td>:<td className="">
                                <a target="_blank" href={res.explorer+"/tx/"+res.trx}>{res.trx.substring(0,15)}...</a>
                            </td>

                        }

                    </tr>
                </>
            )
        },)


        return (
            <>
            <div className="table-responsive report-table-main">
                <title>Payment history {AppUrl.CompanyTitle}</title>
                <div className="row m-0 p-1 pb-3 bg-white">

                </div>
                <table className="table table-striped report-table ">
                    <thead>
                    <tr>
                        <th>Time (UTC)</th>
                        <th>ID  </th>
                        <th>Type  </th>
                        <th>Currency </th>
                        <th>Amount </th>
                        <th>Payment status</th>
                        <th>Details	</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.loading==true?<Loading/>:data}
                    </tbody>
                </table>
                {
                    this.state.loading==true?"":
                        this.state.data.length>0?""
                            :<p className="noorderdata">Payment history Data Not Available</p>
                }

            </div>
        </>
        );
    }
}

export default Payments;