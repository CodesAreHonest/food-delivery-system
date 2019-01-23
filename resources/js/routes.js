import MemberLogin from './FoodDelivery/MemberLogin';
import Home from './Member/Home/Home';
import ManageAccount from "./Member/ManageAccount/ManageAccount";

export const routes = [{
    path: '/member/login',
    component: MemberLogin
}, {
    path: '/member',
    component: Home
}, {
    path: '/member/manage/account',
    component: ManageAccount
}];