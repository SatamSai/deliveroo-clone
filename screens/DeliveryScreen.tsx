import { Restaurant, RestaurantRedux, RootStackParamList } from '@/types/globalTypes'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Pressable, Image } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/solid'
import * as Animatable from "react-native-animatable"
import * as Progress from "react-native-progress"
import MapView, {Marker} from 'react-native-maps';
import { useSelector } from 'react-redux'

interface Props {}

type NavigationProp = NativeStackNavigationProp<RootStackParamList,"Restaurant">

const DeliveryScreen: React.FC<Props> = props => {
  const navigation = useNavigation<NavigationProp>()
  const restaurant = useSelector((state:{restaurant:RestaurantRedux}) => state.restaurant.restaurant)
  return(
    <View className='bg-[#00CCBB] flex-1'>
      <SafeAreaView className='z-50'>
        <View className='flex-row justify-between items-center p-5'>
          <Pressable 
            onPress={() => {
              navigation.navigate('Home')
            }}
          >
            <XMarkIcon color="white" size={30}/>
          </Pressable>
          <Text className='font-light text-white text-lg'> Order Help </Text>
        </View>
        <View className='bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md'>
          <View className='flex-row justify-between'>
            <View>
              <Text className='text-lg text-gray-400'>Estimated Arrival</Text>
              <Text className='text-3xl font-bold'>45-55 Minutes</Text>
            </View>
            <Animatable.Image
                source={require("../assets/images/Map.gif")}
                className='h-20 w-20'
            />
          </View>
          <Progress.Bar indeterminate={true} color='#00CCBB'/>
          <Text className='mt-3 text-gray-500'>
            Your order at {restaurant?.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={
          restaurant?.latitude ? {
            latitude:restaurant?.latitude,
            longitude:restaurant?.longitude,
            latitudeDelta:0.005,
            longitudeDelta:0.005
          } : undefined
        }
        className='flex-1 -mt-10 z-0'
        mapType='mutedStandard'
      > 
      {restaurant?.latitude && restaurant?.longitude && (
        <Marker
          coordinate={{
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
          }}
          title={restaurant?.title}
          description={restaurant?.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />)
      }
      </MapView>
      <SafeAreaView className='bg-white flex-row items-center space-x-5 h-20'>
        <Image
          source={require('../assets/images/logo.png')}
          className='h-12 w-12 bg-gray-300 p-4 rounded-full ml-5'
        />
        <View className='flex-1'>
          <Text className='text-lg'>Sainam Satam</Text>
          <Text className='text-gray-400'>Your Rider</Text>
        </View>
        <Text className='text-[#00CCBB] text-lg mr-5 font-bold'>Call</Text>
      </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen
