import React,{Component,Fragment} from "react";
import {Switch,Route,Redirect} from "react-router-dom";
import NotFound from "../pages/NotFound"
import Login from "../pages/Login";
import Coins from "../pages/Coins";
import AddCurrency from "../pages/AddCurrency";
import EditCurrency from "../pages/EditCurrency";
import Blog from "../pages/Blog";
import AddBlog from "../pages/AddBlog";
import EditBlog from "../pages/EditBlog";
import Users from "../pages/Users";
import UserUpdate from "../pages/UserUpdate";
import ReferralSettings from "../pages/ReferralSettings";
import AllPayments from "../pages/AllPayments";
import AllDeposit from "../pages/AllDeposit";
import AllWithdrew from "../pages/Withdrew";
import WithdrewEdit from "../pages/WithdrewEdit";
import UserDetails from "../pages/UserDetails";
import WithdrewPending from "../pages/WithdrewPending";
import Convert from "../pages/Convert";
import Info from "../pages/Info";
import AddInfo from "../pages/AddInfo";
import EditInfo from "../pages/EditInfo";
import CoinsAirdrop from "../pages/CoinsAirdrop";
import AddAirdropCurrency from "../pages/AddAirdropCurrency";
import EditAirdropCurrency from "../pages/EditAirdropCurrency";
import AirdropLisi from "../pages/AirdropLisi";
import AddAirdrop from "../pages/AddAirdrop";
import EditAirdrop from "../pages/EditAirdrop";
import AirdropDetails from "../pages/AirdropDetails";
import StakingCoin from "../pages/StakingCoin";
import AddStakingCoin from "../pages/AddStakingCoin";
import EditStaking from "../pages/EditStaking";
import StakeTrx from "../pages/StakeTrx";
import Quiz from "../pages/Quiz";
import Collectibles from "../pages/Collectibles";
import UpdateCollectible from "../pages/UpdateCollectible";
import AddCollectible from "../pages/AddCollectible";
import UsersTakenCollectible from "../pages/UsersTakenCollectible";
import Notifications from "../pages/Notifications";
import AddNotifications from "../pages/AddNotification";
import UpdateNotification from "../pages/UpdateNotification";
import TgeAndClaim from "../pages/TgeAndClaim";

class RouterPage extends Component {
    render() { 
        return ( 
         <Fragment>   
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/currency" component={Coins}/>
                <Route exact path="/currency/add" component={AddCurrency}/>
                <Route exact path="/currency/edit/:id" component={EditCurrency}/>
                <Route exact path="/currency/airdrop" component={CoinsAirdrop}/>
                <Route exact path="/currency/add/airdrop" component={AddAirdropCurrency}/>
                <Route exact path="/currency/airdrop/edit/:id" component={EditAirdropCurrency}/>
                <Route exact path="/airdroplist" component={AirdropLisi}/>
                <Route exact path="/add/airdrop" component={AddAirdrop}/>
                <Route exact path="/airdrop/edit/:id" component={EditAirdrop}/>
                <Route exact path="/airdrop/details/:id" component={AirdropDetails}/>
                <Route exact path="/stakingcoin" component={StakingCoin}/>
                <Route exact path="/add/stakingcoin" component={AddStakingCoin}/>
                <Route exact path="/stakingcoin/edit/:id" component={EditStaking}/>
                <Route exact path="/stakingchistory" component={StakeTrx}/>
                <Route exact path="/blog" component={Blog}/>
                <Route exact path="/blog/add" component={AddBlog}/>
                <Route exact path="/blog/edit/:id" component={EditBlog}/>
                <Route exact path="/info" component={Info}/>
                <Route exact path="/info/add" component={AddInfo}/>
                <Route exact path="/info/edit/:id" component={EditInfo}/>
                <Route exact path="/" component={Users}/>
                <Route exact path="/user/edit/:id" component={UserUpdate}/>
                <Route exact path="/user/details/:id" component={UserDetails}/>
                <Route exact path="/referral/settings" component={ReferralSettings}/>
                <Route exact path="/quiz" component={Quiz}/>
                <Route exact path="/collectibles" component={Collectibles}/>
                <Route exact path="/add-collectible" component={AddCollectible}/>
                <Route exact path="/update-collectible/:id" component={UpdateCollectible}/>
                <Route exact path="/users-taken-collectible" component={UsersTakenCollectible}/>
                <Route exact path="/notifications" component={Notifications}/>
                <Route exact path="/tge-and-claim" component={TgeAndClaim}/>
                <Route exact path="/add-notification" component={AddNotifications}/>
                <Route exact path="/update-notification/:id" component={UpdateNotification}/>
                <Route exact path="/payments" component={AllPayments}/>
                <Route exact path="/deposit" component={AllDeposit}/>
                <Route exact path="/withdrew" component={AllWithdrew}/>
                <Route exact path="/withdrew/pending" component={WithdrewPending}/>
                <Route exact path="/withdrew/edit/:id" component={WithdrewEdit}/>
                <Route exact path="/convert" component={Convert}/>
                <Route component={NotFound}/>
          </Switch>
        </Fragment>
         );
    }
}
 
export default RouterPage;