// basketSlice.ts
import { OrderItem, Dish, Orders, Order, OrderState } from "@/types/globalTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Orders = {
    orders: [],
};

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addToBasket: (state, action: PayloadAction<{dish: Dish, restaurantId: string}>) => {
            const { dish, restaurantId } = action.payload;
            const order = state.orders.find(order => order.restaurantId === restaurantId && order.state === OrderState.INCART);
            
            const item:OrderItem = {
                dish:dish,
                quantity:1
            }

            if (order) {
                const existingItemIndex = order.orderItems.findIndex(item => item.dish.id === dish.id);
                if (existingItemIndex >= 0) {
                    order.orderItems[existingItemIndex].quantity += 1;
                } else {
                    order.orderItems.push(item);
                }
            } else {
                state.orders.push({
                    orderItems: [item],
                    restaurantId,
                    deliveryFee: 50,
                    discount: 10,
                    state: OrderState.INCART,
                });
            }
        },
        removeFromBasket: (state, action: PayloadAction<{ dishId: string, restaurantId: string }>) => {
            const { dishId, restaurantId } = action.payload;
            const orderIndex = state.orders.findIndex(order => order.restaurantId === restaurantId && order.state === OrderState.INCART);
            const order = state.orders.find(order => order.restaurantId === restaurantId && order.state === OrderState.INCART);

            if (order) {
                const index = order.orderItems.findIndex(item => item.dish.id === dishId);
                if (index >= 0) {
                    if (order.orderItems[index].quantity > 1) {
                        order.orderItems[index].quantity -= 1;
                    } else {
                        order.orderItems.splice(index, 1);
                    }
                } else {
                    console.log("There is no such item");
                }
            }
            if(order?.orderItems.length==0){
                state.orders.splice(orderIndex,1)
            }
        },
    }
});

export const { addToBasket, removeFromBasket } = orderSlice.actions;

export const selectOrderItemsByRestaurantId = (state: Orders, restaurantId: string): Order|undefined => {
    const order = state.orders.find(order => order.restaurantId === restaurantId && order.state === OrderState.INCART);
    
    return order;
};

export const getOrderItemCount = (state: Orders, restaurantId: string): number => {
    const order = state.orders.find(order => order.restaurantId === restaurantId && order.state === OrderState.INCART);
    const itemCount = order?.orderItems.reduce((total,item) => total += item.quantity,0)
    return itemCount || 0
};

export default orderSlice.reducer;
