import { Order, Orders } from '@/types/globalTypes';
import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable, Animated, LayoutAnimation } from 'react-native'
import { useSelector } from 'react-redux';
import OrderItem from '../OrderItem';
import { ChevronDownIcon } from 'react-native-heroicons/outline';
import { ChevronUpIcon } from 'react-native-heroicons/solid';

interface Props {
    orders:Order[]
}

const FloatingOrders: React.FC<Props> = ({orders}) => {
    const [expanded, setExpanded] = useState(false);
    const animatedHeight = useRef(new Animated.Value(0)).current;

    const toggleExpand = () => {
        Animated.timing(animatedHeight, {
            toValue: expanded ? 100 : 400,
            duration: 700,
            useNativeDriver: false,
        }).start();

        setExpanded(!expanded);
    };

    return (
        <View
            className="absolute bottom-4 left-4 right-4 z-40 items-center justify-center bg-white"
            style={{
                borderRadius:expanded ? 5 : 38,
                maxHeight:400
            }}
        >
            <View className='w-[100%] relative'>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View key={orders[0].restaurantId}>
                        <OrderItem order={orders[0]}/>
                    </View>
                    <View className={`${!expanded?'hidden':''}`}>
                    {
                        orders.map((order,index) => {
                            if(index!=0)
                            return (
                                <View key={order.restaurantId}>
                                    <OrderItem order={order}/>
                                </View>
                            )
                        })
                    }
                    </View>

                </ScrollView>
                    <Pressable
                        className='bg-[#00CCBB] h-6 w-30 absolute -top-3 left-1/2 -translate-x-10 z-50 items-center justify-center rounded-full px-3'           
                        onPress={() => {
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                            setExpanded(!expanded);
                        }}
                    >
                        <Text className='text-white'>
                            {
                                expanded ?  "Hide all" : "View all"
                            }
                        </Text>
                    </Pressable>
            </View>
        </View>
    );
}

export default FloatingOrders
