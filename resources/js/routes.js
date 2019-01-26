
// Member
import MemberLogin from './FoodDelivery/MemberLogin';
import Home from './Member/Home/Home';
import CreditCard from "./Member/CreditCard/CreditCard";
import EditProfile from "./Member/EditProfile/EditProfile";

// Restaurant
import RestaurantHome from './Restaurant/Home/RestaurantHome';
import RestaurantLogin from './FoodDelivery/RestaurantLogin';
import EditRestaurant from "./Restaurant/EditRestaurant/EditRestaurant";
import DeliveryList from "./Restaurant/DeliveryList/DeliveryList";
import DeliveryTeam from "./Restaurant/DeliveryList/DeliveryTeam";

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
}, {
    path: '/restaurant/login',
    component: RestaurantLogin
}, {
    path: '/restaurant/manage/account',
    component: EditRestaurant
}, {
    path: '/restaurant',
    component: RestaurantHome
}, {
    path: '/restaurant/delivery/list',
    component: DeliveryList
}, {
    path: '/restaurant/delivery/team',
    component: DeliveryTeam
}];