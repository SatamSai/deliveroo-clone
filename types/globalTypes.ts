import { ImageURISource } from "react-native"

export enum OrderState  {
    INCART = 'incart',
    PLACED = 'placed',
    DELIVERED = 'delivered'
}
export type RootStackParamList = {
  Home: undefined;
  Restaurant: RestaurantForFeature;
  Checkout: undefined;
  PreparingOrder:undefined,
  Delivery:undefined,
};

export interface Category {
    id:number
    img:string,
    title:string
}

export interface Dish {
    id:string,
    title:string,
    description:string,
    img:string,
    price:number
}

export interface Restaurant {
    id:string,
    title:string,
    short_description:string, //
    img:string,
    rating:number,
    genre:Category,
    address:string,
    dishes:Dish[],
    longitude:number,
    latitude:number
}

export interface RestaurantRedux {
    restaurant: Restaurant | null
}

export interface OrderItem {
    dish:Dish,
    quantity:number
}

export interface Order {
    orderItems:OrderItem[],
    restaurantId:string,
    deliveryFee:number,
    discount:number,
    state:OrderState
}

export interface Orders {
    orders:Order[],
}

// featured content
export interface RestaurantForFeature extends Omit<Restaurant,'dishes'>{
}

export interface Feature {
    id:string,
    title:string,
    description:string
}

