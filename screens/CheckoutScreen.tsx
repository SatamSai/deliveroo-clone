import Alert from '@/components/Alert'
import { addToBasket, removeFromBasket, selectOrderItemsByRestaurantId } from '@/reducers/orders'
import { Dish, OrderItem, Orders, Restaurant, RestaurantForFeature, RestaurantRedux, RootStackParamList } from '@/types/globalTypes'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, SafeAreaView, Pressable, Image, ScrollView} from 'react-native'
import { ArrowLeftCircleIcon, ArrowLeftIcon, MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

interface Props {}
interface PressEvent {
    button:string,
    pressed:boolean
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList,"Restaurant">

const CheckoutScreen: React.FC<Props> = props => {
    const restaurant = useSelector((state:{restaurant:RestaurantRedux}) => state.restaurant.restaurant)
    const items = restaurant ? useSelector((state:{orders:Orders}) => selectOrderItemsByRestaurantId(state.orders,restaurant?.id))?.orderItems : []
    const navigation = useNavigation<NavigationProp>()
    const [buttonPressed,setButtonPressed] = useState<PressEvent>({button:"back",pressed:false})
    const dispatch = useDispatch()
    const [basketTotal,setBasketTotal] = useState<number>(0)
    const [lastCartItem,setLastCartItem] = useState<Dish|null>(null)

    useEffect(() => {
        const total = items?.reduce((total,item) => total += item.dish.price * item.quantity,0)
        setBasketTotal(total || 0)
    },[items])

    const handleAddItemToBasket = (dish:Dish) => {
        if(restaurant)
            dispatch(addToBasket({dish,restaurantId:restaurant.id}))
    }
    
    const handleRemoveItemFromBasket = (dish:Dish|null) => {
        if(!items) return;
        if(restaurant && dish){
            dispatch(removeFromBasket({dishId:dish.id,restaurantId:restaurant.id}))
        }
    }
    return (
        <SafeAreaView>
            <Alert 
                visible={lastCartItem ? true : false} 
                onCancel={() => setLastCartItem(null)} 
                onAccept={() => {
                    handleRemoveItemFromBasket(lastCartItem)
                    navigation.navigate('Restaurant',restaurant as RestaurantForFeature)
                }} 
                message='Do you want to cancel the order?'/>
            <View className='h-[100%] flex-col'>
                <View>
                    <View className=' bg-gray-100 shadow-lg shadow-slate-500'>
                        <View className='mx-4 my-7 relative'>
                            <Text className='text-2xl font-bold text-center text-gray-500'>Order Details</Text>
                            <View className='absolute h-[100%] justify-center'>
                                <Pressable
                                    onPress={() => {
                                        navigation.navigate("Restaurant",restaurant as RestaurantForFeature)
                                    }}
                                    onPressIn={() => setButtonPressed({
                                        button:"back",
                                        pressed:true
                                    })}
                                    onPressOut={() => setButtonPressed({
                                        button:"back",
                                        pressed:false
                                    })}
                                    className='bg-gray-100 p-2 rounded-full shadow shadow-slate-700'
                                    style={{
                                        opacity:buttonPressed.button == "back" && buttonPressed.pressed ? 0.5: 1,
                                    }}
                                >
                                    <ArrowLeftIcon size={25} color="#00CCBB"/>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
                    <Image
                        source={
                            require('../assets/images/logo.png')
                        }
                        className='h-7 w-7 bg-gray-300 p-4 rounded-full'
                    />
                    <Text className='flex-1'>Deliver in 50-70 min</Text>
                    <Pressable>
                        <Text className='text-[#00CCBB]'>Change</Text>
                    </Pressable>
                </View>
                <View className='flex-1'>
                    <ScrollView>
                        {
                            items && items.map((item) => {
                                return (
                                    <View key={item.dish.id} className='flex-row items-center space-x-3 bg-white py-3 px-5 mb-1'>
                                        <Image
                                            source={{
                                                uri:item.dish.img
                                            }}
                                            className='h-12 w-12 rounded-full'
                                        />
                                        <Text className='flex-1 text-base'>{item.dish.title}</Text>
                                        <Text>₹ {item.dish.price}</Text>
                                        <View className='items-center'>
                                            <View className='flex-row items-center space-x-2'>
                                                <Pressable
                                                    onPress={() => {
                                                        if(items && items.length ==1 && items[0].quantity==1)
                                                            setLastCartItem(item.dish)
                                                        else
                                                            handleRemoveItemFromBasket(item.dish)
                                                    }}
                                                >
                                                    <MinusCircleIcon size={30} color="#00CCBB"/>
                                                </Pressable>
                                                <Text className='font-bold'>{item.quantity}</Text>
                                                <Pressable
                                                    onPress={() => handleAddItemToBasket(item.dish)}
                                                >
                                                    <PlusCircleIcon size={30} color="#00CCBB"/>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View 
                    className='p-5 bg-white space-y-5 shadow-slate-600 transition-shadow'
                    style={{
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: -4, // Negative height value to create upward shadow
                        },
                        shadowOpacity: 0.75,
                        shadowRadius: 10,
                        elevation: 25, // For Android shadow
                      }}
                >
                    <View className='flex-row justify-between'>
                        <Text className='text-gray-400'>Subtotal</Text>
                        <Text className='text-gray-400'>₹ {basketTotal}</Text>
                    </View>
                    <View className='flex-row justify-between'>
                        <Text className='text-gray-400'>Delivery Fee</Text>
                        <Text className='text-gray-400'>₹ {100}</Text>
                    </View>
                    <View className='flex-row justify-between'>
                        <Text>Basket Total</Text>
                        <Text className='font-extrabold'>₹ {basketTotal + 100}</Text>
                    </View>
                    <Pressable
                        onPress={() => {
                            navigation.navigate('PreparingOrder')
                        }}
                        className='rounded-lg bg-[#00CCBB] p-4 items-center justify-center'
                    >
                        <Text className='text-white text-lg font-bold'>Place Order</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CheckoutScreen
