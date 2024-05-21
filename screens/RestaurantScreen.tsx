import BasketIcon from '@/components/BasketPopup'
import DishRow from '@/components/DishRow'
import { selectOrderItemsByRestaurantId } from '@/reducers/orders'
import { setRestaurant } from '@/reducers/restaurant'
import sanityClient from '@/sanity'
import { Dish, Orders, Restaurant, RestaurantForFeature, RootStackParamList } from '@/types/globalTypes'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import { ChevronRightIcon, MapPinIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline'
import { ArrowLeftIcon, StarIcon } from 'react-native-heroicons/solid'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

type ParamList = {
    Restaurant:RestaurantForFeature
}
interface PressEvent {
    button:string,
    pressed:boolean
}
type NavigationProp = NativeStackNavigationProp<RootStackParamList,"Restaurant">
interface Props {}
const RestaurantScreen: React.FC<Props> = props => {

    const route = useRoute<RouteProp<ParamList , "Restaurant">>();
    const restaurantInfo = route.params

    const [restaurantDishes,setRestaurantDishes] = useState<Dish[]>([])
    const [buttonPressed,setButtonPressed] = useState<PressEvent>({
        button:"back",
        pressed:false
    })
    const items = useSelector((state:{orders:Orders}) => selectOrderItemsByRestaurantId(state.orders,restaurantInfo.id))?.orderItems
    const navigation = useNavigation<NavigationProp>();

    const dispatch = useDispatch()

    useEffect(() => {
        sanityClient.fetch(
            `
              *[_type == "restaurant" && _id == "${route.params.id}"] {
                ...,
                genre -> {
                    title,
                },
                img {
                  asset->{
                    url
                  }
                },
                dishes[]->{
                    ...,
                    title,
                    img {
                      asset->{
                        url
                      }
                    },
                    price
                }
              }[0]
            `
        ).then(data => {
            const dishes:Dish[] = data.dishes.map((dish:any) => {                
                    const dishTemp:Dish = {
                        id:dish._id,
                        title:dish.title,
                        img:dish.img.asset.url,
                        description:dish.description,
                        price:dish.price
                    }
                    return dishTemp
                })
            setRestaurantDishes(dishes)
        })
    },[])

    useEffect(() => {
        const restaurant:Restaurant = {
            ...restaurantInfo,
            dishes:restaurantDishes
        }
        dispatch(setRestaurant(restaurant))
    },[])

    return (
        <>
        {
            items && <BasketIcon restaurantId={restaurantInfo.id}/>
        }
        <ScrollView className='z-0'>
            <View className='relative h-56'>
                <Image
                    source={{
                        uri:restaurantInfo.img
                    }}
                    className='h-56 w-full bg-gray-300 p-4'

                />
                <Pressable
                    onPress={() => {
                        navigation.navigate("Home")
                    }}
                    onPressIn={() => setButtonPressed({
                        button:"back",
                        pressed:true
                    })}
                    onPressOut={() => setButtonPressed({
                        button:"back",
                        pressed:false
                    })}
                    className='absolute bg-gray-100 top-5 left-5 p-2 rounded-full'
                    style={{
                        opacity:buttonPressed.button == "back" && buttonPressed.pressed ? 0.5: 1,
                    }}
                >
                    <ArrowLeftIcon size={25} color="#00CCBB"/>
                </Pressable>
            </View>
            <View className='bg-white'>
                <View className='px-4 pt-4'>
                    <Text className='text-2xl font-bold'>{restaurantInfo.title}</Text>
                    <View className='flex-row space-x-2 my-1'>
                        <View className='flex-row items-center'>
                            <StarIcon color='green' opacity={0.5} size={22}/>
                            <Text className='text-xs text-gray-500'>
                                <Text className='text-green-500'>{restaurantInfo.rating}</Text> &bull; {restaurantInfo.genre.title}
                            </Text>
                        </View>
                        <View className='flex-row items-center'>
                            <MapPinIcon color='gray' opacity={0.4} size={22}/>
                            <Text className='text-xs text-gray-500 w-[70%]' numberOfLines={1}>
                                Nearby &bull; {restaurantInfo.address}
                            </Text>
                        </View>
                    </View>
                    <Text className='text-gray-500 mt-2 pb-4'>{restaurantInfo.short_description}</Text>
                </View>
            </View>
            <Pressable 
                onPressIn={()=> setButtonPressed({
                    button:"allergy",
                    pressed:true
                })}
                onPressOut={()=> setButtonPressed({
                    button:"allergy",
                    pressed:false
                })}
                className='flex-row items-center space-x-2 p-4 border-y-2 border-gray-200'
                style={{
                    opacity:buttonPressed.button == "allergy" && buttonPressed.pressed ? 0.5: 1,
                }}
            >
                <QuestionMarkCircleIcon color="gray" size={20} opacity={0.6}/>
                <Text className='pl-2 flex-1 text-md font-bold'>
                    Have a food allergy?
                </Text>
                <ChevronRightIcon size={20} opacity={0.5} color="#00CCBB" />
            </Pressable>
            <View>
                <Text className='px-4 pt-6 mb-3 font-bold text-xl'>Menu</Text>
                <View className={`${items ? 'pb-32' : ""}`}>
                    {
                        restaurantDishes.map((dish:Dish,index:number) => {
                            return <DishRow dish={dish} key={index} restaurantId={restaurantInfo.id}/>
                        })
                    }
                </View>
            </View>
        </ScrollView>
        </>
    )
}

export default RestaurantScreen