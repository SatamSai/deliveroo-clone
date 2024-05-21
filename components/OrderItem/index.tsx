import { getOrderItemCount } from '@/reducers/orders'
import sanityClient from '@/sanity'
import { Order, Orders, Restaurant } from '@/types/globalTypes'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useSelector } from 'react-redux'

interface Props {
    order:Order
}
interface RestaurantBasicInfo {
    title:string,
    img:string
}

const OrderItem: React.FC<Props> = ({order}) => {
    const [restaurant,setRestaurant] = useState<RestaurantBasicInfo>();
    const itemsCount = useSelector((state:{orders:Orders}) => getOrderItemCount(state.orders,order.restaurantId));

    useEffect(() => {
        sanityClient.fetch(
            `     
                *[_type == "restaurant" && _id == "${order.restaurantId}"] {
                    _id,
                    title,
                    img {
                        asset->{
                            url
                        }
                    }
                }[0]
            `
        ).then(data => {
            const restaurantInfo:RestaurantBasicInfo = {
                title:data.title,
                img:data.img.asset.url
            }
            setRestaurant(restaurantInfo)
        })
    })

    return (
        <View className='flex-row space-x-3 p-3 items-center'>
            <Image
                source={
                    restaurant?.img ?{uri:restaurant.img} : require('../../assets/images/logo.png')
                }
                className='h-12 w-12 rounded-full'
            />
            <View className='flex-1'>
                <Text className='text-base font-bold' numberOfLines={1}>{restaurant?.title}</Text>
                <Text className=''>{itemsCount} items in cart</Text>
            </View>
            <Text className='bg-[#00CCBB] px-3 py-2 mr-3 rounded-md text-white'>View Cart</Text>
        </View>
    )
}

export default OrderItem
