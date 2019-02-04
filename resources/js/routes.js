
// Member
import MemberLogin  from './FoodDelivery/MemberLogin';
import Home         from './Member/Home/Home';
import CreditCard   from "./Member/CreditCard/CreditCard";
import EditProfile  from "./Member/EditProfile/EditProfile";
import EditLocation from "./Member/EditProfile/EditLocation";
import ShoppingCart from "./Member/Cart/ShoppingCart";

// Restaurant
import RestaurantHome   from './Restaurant/Home/RestaurantHome';
import RestaurantLogin  from './FoodDelivery/RestaurantLogin';
import EditRestaurant   from "./Restaurant/EditRestaurant/EditRestaurant";
import DeliveryList     from "./Restaurant/DeliveryList/DeliveryList";
import DeliveryTeam     from "./Restaurant/DeliveryList/DeliveryTeam";
import AddFood          from "./Restaurant/AddFood/AddFood";

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
    path: '/restaurant/login',
    component: RestaurantLogin
}, {
    path: '/restaurant/manage/account',
    component: EditRestaurant
}, {
    path: '/restaurant/',
    component: AddFood
}, {
    path: '/restaurant/delivery/list',
    component: DeliveryList
}, {
    path: '/restaurant/delivery/team',
    component: DeliveryTeam
}];