import { RootStackParamList } from '@/types/globalTypes'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import * as Animatable from "react-native-animatable"
import * as Progress from "react-native-progress"

interface Props {}

type NavigationProp = NativeStackNavigationProp<RootStackParamList,"Restaurant">

const PreparingOrder: React.FC<Props> = props => {
    const navigation = useNavigation<NavigationProp>()

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Delivery')
        },4000)
    },[])
    return (
        <SafeAreaView className='bg-[#00CCBB] flex-1 justify-center items-center'>
            <Animatable.Image
                source={require("../assets/images/delivery.gif")}
                animation="slideInUp"
                iterationCount={1}
                className='h-32 w-32'
            />
            <Animatable.Text
                animation="slideInUp"
                iterationCount={1}
                className='text-lg my-10 text-white font-bold text-center'
            >
                Waiting or Restaurant to accept your order!
            </Animatable.Text>
            <Progress.Circle size={60} indeterminate={true} color='white'/>
        </SafeAreaView>
    )
}

export default PreparingOrder
