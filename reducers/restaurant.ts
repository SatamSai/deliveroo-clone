import { Restaurant, RestaurantRedux } from "@/types/globalTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState :RestaurantRedux= {
    restaurant :null
}


export const basketSlice = createSlice({
    name:'restaurant',
    initialState,
    reducers:{
        setRestaurant: (state,action:PayloadAction<Restaurant>) => {
            state.restaurant = action.payload
        },
    }
})

export const {setRestaurant} = basketSlice.actions

export default basketSlice.reducer