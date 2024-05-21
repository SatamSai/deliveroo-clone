import React from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import { AdjustmentsVerticalIcon, ChevronDownIcon, MagnifyingGlassIcon, UserIcon } from 'react-native-heroicons/outline'

interface Props {}

const Header:React.FC<Props> = props => {
  return (
    <View className='bg-white pt-5 px-4'>
        <View className='flex-row items-center space-x-2 my-2'>
            <Image
                source={
                    require('../../assets/images/logo.png')
                }
                className='h-8 w-8 bg-red-300 rounded-full'
            />
            <View className='flex-row flex-1 items-center justify-between pl-1'>
                <View>
                    <Text className='font-bold text-gray-400 text-xs'>Deliver Now</Text>
                    <Text className='flex-row text-xl font-bold items-center'>Current Location<ChevronDownIcon size={20} color="#00CCBB"/></Text>
                </View>
                <View>
                    <UserIcon size={25} color="#00CCBB"/>
                </View>
            </View>
        </View>
        <View className='flex-row items-center space-x-2 my-2'>
            <View className='flex-row items-center space-x-2 flex-1 bg-gray-200 p-3 rounded-lg mb-1 max-w-xl'>
                <MagnifyingGlassIcon size={20} color="#00CCBB"/>
                <TextInput
                    className='b-1 flex-1' 
                    placeholder='Search...'
                    inputMode='text'
                />
            </View>
            <AdjustmentsVerticalIcon size={20} color="#00CCBB"/>
        </View>
    </View>
  )
}

export default Header