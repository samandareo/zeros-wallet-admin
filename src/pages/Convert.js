import React, {Component} from 'react';
import Menu from "../components/Menu";
import Axios from "axios";
import AppUrl from "../AppUrl/ApiUrl";
import {Link} from "react-router-dom";
import Loading from "../components/Loading";
import DatePicker from "react-datepicker";
import {toast} from "react-toastify";
import moment from "moment";

class Convert extends Component {
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
            Axios.get(AppUrl.baseurl+"all/convert/"+this.state.count)
                .then(res => {
                    if (res.data.error) {
                        this.myPayments()
                    } else {
                        this.setState({data: res.data.data, loading: false})
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
        const data = this.state.data.filter((val)=>{
            if(this.state.status==""  && this.state.coin_raw_id==""){
                return val;
            }else if(val.status==this.state.status ){
                return val;

            }else if(val.coin_id==this.state.coin_raw_id ){
                return val;

            }else if(val.status==this.state.status || val.coin==this.state.coin_raw_id){
                return val;
            }else if(val.status==this.state.status && val.coin==this.state.coin_raw_id ){
                return val;

            }
        }).map(res=>{
            return(
                <>
                    <tr>
                        <td>{moment(res.created_at).fromNow()}</td>
                        <td>{res.id} </td>
                        <td><Link to={"/user/details/"+res.uid}>{res.uid}</Link> </td>
                        <td>{res.fromname} </td>
                        <td>{res.toname}  </td>
                        <td>{parseFloat(res.amount).toFixed(4)} {res.fromname} </td>

                        <td>{(parseFloat(res.amount)*parseFloat(res.rate)).toFixed(4)} {res.toname} </td>
                    </tr>
                </>
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
            <Menu title="All Swap history">
                <>
                    <h3 className="bg-white title-head"> All Swap History </h3>

                    <div className="bg-white m-0 pt-2">
                    <div className="table-responsive report-table-main bg-white">
                        <title>All Swap history </title>
                        <table className="table table-striped report-table ">
                            <thead>
                            <tr>
                                <th>Time (UTC)</th>
                                <th>ID  </th>
                                <th>UID</th>
                                <th>From  </th>
                                <th>To </th>
                                <th>Cost </th>
                                <th>Received</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.loading==true?<Loading/>:data}
                            </tbody>
                        </table>
                        {
                            this.state.loading==true?"":
                                this.state.data.length>0?""
                                    :<p className="noorderdata">Swap history Data Not Available</p>
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

export default Convert;