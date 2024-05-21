import { addToBasket, removeFromBasket, selectOrderItemsByRestaurantId } from '@/reducers/orders'
import {  Dish, Orders } from '@/types/globalTypes'
import React, { useEffect, useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

interface DishProps {
    dish:Dish,
    restaurantId:string
}

const DishRow: React.FC<DishProps> = ({dish,restaurantId}) => {
    const [isPressed,setIsPressed] = useState<boolean>(false)
    const [currentItemCount,setCurrentItemCount] = useState<number>(0)
    const dispatch = useDispatch()    
    const items = useSelector((state:{orders:Orders}) => selectOrderItemsByRestaurantId(state.orders,restaurantId))?.orderItems


    useEffect(() => {
        setCurrentItemCount(items?.find(item => item.dish.id == dish.id)?.quantity || 0)
    },[items])

    const handleAddItemToBasket = (dish:Dish) => {
        console.log("Adding item to cart")
        dispatch(addToBasket({dish,restaurantId}))
    }
    
    const handleRemoveItemFromBasket = (dish:Dish) => {
        if(!items) return;
        dispatch(removeFromBasket({dishId:dish.id,restaurantId}))
    }

    return (
        <View className='bg-white border p-4 border-gray-200'>
            <Pressable 
                onPress={()=> setIsPressed(isPressed => !isPressed)}
            >
                <View className='flex-row'>
                    <View className='flex-1 pr-2'>
                        <Text className='text-lg mb-1'>{dish.title}</Text>
                        <Text className='text-gray-400'>{dish.description}</Text>
                        <Text className='text-gray-400 mt-2'>
                        ₹ {dish.price}
                        </Text>
                    </View>
                    <View>
                        <Image
                            style={{
                                borderWidth:1,
                                borderColor:"#F3F3F4"
                            }}
                            source={
                                dish.img ? {uri:dish.img} : require('../../assets/images/sushi.png')
                            }
                            className='h-20 w-20 bg-gray-400 mt-2'
                        />
                    </View>
                </View>
            </Pressable>
                {
                    isPressed && (
                        <View className='mt-4'>
                            <View className='flex-row items-center space-x-2'>
                                <Pressable
                                    disabled={currentItemCount==0}
                                    onPress={() => handleRemoveItemFromBasket(dish)}
                                >
                                    <MinusCircleIcon size={30} color={currentItemCount>0 ? "#00CCBB" : "gray"}/>
                                </Pressable>
                                <Text className='font-bold'>{currentItemCount}</Text>
                                <Pressable
                                    onPress={() =>handleAddItemToBasket(dish)}
                                >
                                    <PlusCircleIcon size={30} color="#00CCBB"/>
                                </Pressable>
                            </View>
                        </View>
                    )
                }
        </View>
    )
}

export default DishRow