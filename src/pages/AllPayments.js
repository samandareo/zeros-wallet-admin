import React, {Component} from 'react';
import Menu from "../components/Menu";
import Axios from "axios";
import AppUrl from "../AppUrl/ApiUrl";
import {Link} from "react-router-dom";
import Loading from "../components/Loading";
import DatePicker from "react-datepicker";
import moment from "moment";
import {toast} from "react-toastify";

class AllPayments extends Component {
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
         await Axios.get(AppUrl.baseurl+"all-ccoin")
             .then(res=>{
                 console.log(res.data)
                 this.setState({coin:res.data})
             })
             .catch(err=>{
                 console.log(err)
             })
        await this.myPayments()
    }

    status=(e)=>{
        this.setState({status:e.target.value})
        console.log(e.target.value)
    }
    typeT=(e)=>{
        this.setState({type:e.target.value})
        console.log(e.target.value)
    }
    coin_raw_id=(e)=>{
        this.setState({coin_raw_id:e.target.value})
        console.log(e.target.value)
    }


    fromDate=(date)=>{
        this.setState({fromDate:date,start:moment(date).format("YYYY-MM-DD HH:mm:ss")})
        console.log(moment(date).format())
    }
    toDate=(date)=>{
        this.setState({toDate:date,end:moment(date).format("YYYY-MM-DD HH:mm:ss")})
        console.log(moment(date).format("YYYY-MM-DD HH:mm:ss"))
    }

    myPayments=()=>{
        var token = localStorage.getItem("admintoken")
        if(token){
            var fda = new FormData()
            fda.append("token",token)
            fda.append("limit",this.state.count)
            Axios.post(AppUrl.baseurl+"all/payments",fda)
                .then(res => {
                    if (res.data.error) {
                        this.myPayments()
                    } else {
                        this.setState({data: res.data.data,pcount:res.data.pcount, loading: false})
                    }
                })
                .catch(err => {
                    console.log(err)
                    //this.myPayments()
                })
        }
    }

    loadMore=async (e)=>{
        var countval = this.state.count+20
        await this.setState({count:countval})
        await this.myPayments()
    }

    reportSubmit=()=>{
        var token = localStorage.getItem("admintoken")
        if(token){
            var fda = new FormData()
            fda.append("token",token)
            fda.append("fromDate",this.state.start)
            fda.append("toDate",this.state.end)
            this.setState({loading:true})
            Axios.post(AppUrl.baseurl+"all/payment/history/date",fda)
                .then(res => {
                    console.log(res.data)
                    if (res.data.error) {
                        this.setState({loading: false})
                    } else {
                        this.setState({data: res.data.data, loading: false})
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.setState({loading: false})
                })
        }
    }

    delete=(id)=>{
        var confirm = window.confirm("Are you sure to Delete ")
        if(confirm){
            var token = localStorage.getItem("admintoken")
            if(token){
                var fda = new FormData()
                fda.append("token",token)
                fda.append("id",id)
                Axios.post(AppUrl.baseurl+"pay/delete",fda)
                    .then(res => {
                        console.log(res)
                        if(res.data.success){
                            this.myPayments()
                            toast.success(res.data.success, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });

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
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }

    render() {
        const data = this.state.data.filter((val)=>{
            if(this.state.status=="" && this.state.type=="" && this.state.coin_raw_id==""){
                return val;
            }else if(val.type==this.state.type ){
                return val;

            }else if(val.status==this.state.status ){
                return val;

            }else if(val.coin==this.state.coin_raw_id ){
                return val;

            }else if(val.status==this.state.status ||
                val.type==this.state.type ||
                val.coin_id==this.state.coin_raw_id){
                return val;
            }else if(val.status==this.state.status && val.type==this.state.type && val.coin==this.state.coin_raw_id ){
                return val;

            }
        }).map(res=>{
            return(
                <tr>
                    <td>{moment(res.created_at).fromNow()}</td>
                    <td> <Link to={"/user/details/"+res.uid}>{res.uid}</Link> </td>
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

                    <td>
                        {
                            res.type!=="Deposit"?
                                <li className="list-inline-item">
                                    <button className="btn btn-danger btn-sm rounded-1 shadow-none" type="button"
                                            onClick={this.delete.bind(this,res.id)}  data-toggle="tooltip" data-placement="top"
                                            title="Delete"><i className="fa fa-trash"></i></button>
                                </li>:""
                        }
                    </td>
                </tr>
            )
        },)

        var currency = this.state.coin.map(res=>{
            return(
                <>
                    <option value={res.id}>{res.coin_symbol}</option>
                </>
            )

        })

        return (
            <Menu title="All Payment history">
                <>
                    <h3 className="bg-white title-head"> All Payment History ({this.state.pcount})</h3>
                    <div className="row m-0 p-1 bg-white">
                        <div className="col-md-2">
                            <label>Sart</label>
                            <DatePicker selected={this.state.fromDate} onChange={this.fromDate} name="startDate"/>
                        </div>
                        <div className="col-md-2">
                            <label>End</label>
                            <DatePicker selected={this.state.toDate} onChange={this.toDate} name="startDate"/>
                        </div>
                        <div className="col-md-2">
                            <label>Currency</label>
                            <select onChange={this.coin_raw_id}  id="inputState" required  className="form-control form-control-sm shadow-none">
                                <option selected value="">All</option>
                                {currency}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label>Status</label>
                            <select onChange={this.status}  id="inputState" required  className="form-control form-control-sm shadow-none">
                                <option selected value="">All</option>
                                <option  value="Success">Success</option>
                                <option  value="Rejected">Rejected</option>
                                <option  value="Pending">Pending</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label>Type</label>
                            <select onChange={this.typeT}  id="inputState" required  className="form-control form-control-sm shadow-none">
                                <option selected value="">All</option>
                                <option  value="Deposit">Deposit</option>
                                <option  value="Withdrew">Withdrew</option>
                                <option  value="Referral">Referral</option>
                                <option  value="Register Bonus">Register Bonus</option>
                                <option  value="Mining">Mining</option>
                                <option  value="Transfer">Mining Transfer</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <button onClick={this.reportSubmit} className="btn btn-primary mt-4 shadow-none btn-sm btn-report">Create Report</button>
                        </div>
                    </div>

                    <div className="bg-white m-0 pt-2">
                    <div className="table-responsive report-table-main bg-white">
                        <title>All Payment history </title>
                        <table className="table table-striped report-table ">
                            <thead>
                            <tr>
                                <th>Time (UTC)</th>
                                <th>User ID </th>
                                <th>ID  </th>
                                <th>Type  </th>
                                <th>Currency </th>
                                <th>Amount </th>
                                <th>Payment status</th>
                                <th>Details	</th>
                                <th></th>
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

export default AllPayments;