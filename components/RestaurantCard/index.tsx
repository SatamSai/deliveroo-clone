import { Restaurant, RestaurantForFeature, RootStackParamList } from '@/types/globalTypes'
import React, { useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { StarIcon } from 'react-native-heroicons/solid'
import {MapPinIcon} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface Props {
    restaurant:RestaurantForFeature
}
type NavigationProp = NativeStackNavigationProp<RootStackParamList,"Restaurant">

const RestaurantCard:React.FC<Props> = ({restaurant}) => {
    const [opacity,setOpacity] = useState(1)
    const navigation = useNavigation<NavigationProp>()
    return (
        <Pressable 
            className='bg-white mr-3 shadow'
            onPressIn={() => setOpacity(0.5)}
            onPressOut={() => setOpacity(1)}
            style={{
                opacity:opacity
            }}
            onPress={()=>{
                navigation.navigate("Restaurant",restaurant)
            }}
        >
            <Image
                source={{
                    uri:restaurant.img
                }}
                style={{flex:1}}
                className='h-36 rounded-sm'
            />
            <View className='px-3 pb-4'>
                <Text className='font-bold text-lg pt-2'>{restaurant.title}</Text>
                <View className='flex-row items-center space-x-1 mt-3'>
                    <StarIcon color="green" opacity={0.5} size={22}/>
                    <Text className='text-xs text-gray-500'>
                        <Text className='text-green-500'>{restaurant.rating}</Text> . {restaurant.genre.title}
                    </Text>
                </View>
                <View className='flex-row space-x-1 items-center mt-1'>
                    <MapPinIcon color="gray" opacity={0.4} size={22}/>
                    <Text 
                        className='text-xs text-gray-500'
                    >{restaurant.address}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default RestaurantCard