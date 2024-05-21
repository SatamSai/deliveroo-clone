import { selectOrderItemsByRestaurantId } from '@/reducers/orders'
import {  Orders, RootStackParamList } from '@/types/globalTypes'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Text, Pressable, Image, View } from 'react-native'
import { ArrowRightCircleIcon, ArrowRightIcon } from 'react-native-heroicons/solid'
import { useSelector } from 'react-redux'

type NavigationProp = NativeStackNavigationProp<RootStackParamList,"Restaurant">

interface Props {
    restaurantId:string
}

const BasketPopup: React.FC<Props> = ({restaurantId}) => {
    const [BasketPressed,setBasketPressed] = useState<boolean>(false)
    const [totalItems,setTotalItems] = useState<number>(0)
    const items = useSelector((state:{orders:Orders}) => selectOrderItemsByRestaurantId(state.orders,restaurantId))?.orderItems
    const navigation = useNavigation<NavigationProp>()

    useEffect(() => {
        const totalItemTemp = items?.reduce((total,item) => total += item.quantity ,0)
        setTotalItems(totalItemTemp || 0)
    })
    return (
        <Pressable 
            onPressIn = {() => setBasketPressed(true)}
            onPressOut = {() => setBasketPressed(false)}
            onPress={() => {
                navigation.navigate("Checkout")
            }}
            style={{
                opacity:BasketPressed ? 0.9 : 1
            }}
            className='absolute bottom-0 left-0 z-10 w-full bg-[#00CCBB] items-center flex-1 space-x-2 p-5 justify-between'
        >
            <View className='flex-1 flex-row items-center space-x-2 justify-center pb-1'>
                <Text className="font-extrabold text-white text-2xl">
                    {totalItems}  items added 
                </Text>
                <ArrowRightCircleIcon size={20} color="#fff"/>
            </View>
            <View className='flex-1 pr-2 pb-2'><Text className='text-[#F3F3F3] text-base'>Click to view cart</Text></View>
        </Pressable>
    )
}

export default BasketPopup
