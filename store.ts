import { configureStore } from "@reduxjs/toolkit";
import orders from "./reducers/orders";
import restaurant from "./reducers/restaurant";

export const store = configureStore({
    reducer:{
        orders,
        restaurant
    }
})