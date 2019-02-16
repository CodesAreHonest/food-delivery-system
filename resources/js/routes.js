
// Member
import MemberLogin  from './FoodDelivery/MemberLogin';
import Home         from './Member/Home/Home';
import CreditCard   from "./Member/CreditCard/CreditCard";
import EditProfile  from "./Member/EditProfile/EditProfile";
import EditLocation from "./Member/EditProfile/EditLocation";
import ShoppingCart from "./Member/Cart/ShoppingCart";

// Restaurant
import RestaurantLogin  from './FoodDelivery/RestaurantLogin';
import EditRestaurant   from "./Restaurant/EditRestaurant/EditRestaurant";
import DeliveryList     from "./Restaurant/DeliveryList/DeliveryList";
import DeliveryTeam     from "./Restaurant/DeliveryList/DeliveryTeam";
import AddFood          from "./Restaurant/AddFood/AddFood";
import OrderHistory from "./Member/OrderHistory/OrderHistory";

//Delivery
import DeliveryLogin from "./FoodDelivery/DeliveryLogin";
import DeliveryHome from "./Delivery/CheckDelivery/DeliveryHome";
import EditDelivery from "./Delivery/EditDelivery/EditDelivery";

import Index from './FoodDelivery/Index';
import AdminLogin from "./FoodDelivery/AdminLogin";
import Admin from "./Admin/Home/Admin";

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
    path: '/member/location/information',
    component: EditLocation
}, {
    path: '/member/cart',
    component: ShoppingCart
}, {
    path: '/member/order/history',
    component: OrderHistory
}, {
    path: '/restaurant/login',
    component: RestaurantLogin
}, {
    path: '/restaurant/manage/account',
    component: EditRestaurant
}, {
    path: '/restaurant/',
    component: AddFood
}, {
    path: '/delivery/login',
    component: DeliveryLogin
},{
    path: '/delivery',
    component: DeliveryHome
},{
    path: '/delivery/manage/account',
    component: EditDelivery
},{
    path: '/',
    component: Index
}, {
    path: '/admin/login',
    component: AdminLogin
}, {
    path: '/admin/',
    component: Admin
}];