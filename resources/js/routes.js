import MemberLogin from './FoodDelivery/MemberLogin';
import Home from './Member/Home/Home';
import CreditCard from "./Member/CreditCard/CreditCard";
import EditProfile from "./Member/EditProfile/EditProfile";

export const routes = [{
    path: '/member/login',
    component: MemberLogin
}, {
    path: '/member',
    component: Home
}, {
    path: '/member/manage/account',
    component: EditProfile
}, {
    path: '/member/credit/card',
    component: CreditCard
}];