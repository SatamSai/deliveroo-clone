import Categories from '@/components/Categories';
import FeaturedRow from '@/components/FeaturedRow';
import FloatingOrders from '@/components/FloatingOrders';
import Header from '@/components/Header.tsx';
import sanityClient from '@/sanity';
import { Feature, OrderState, Orders } from '@/types/globalTypes';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux';


interface Props {}

const HomeScreen: React.FC<Props> = props => {

    const [featuredArray,setFeaturedArray] = useState<Feature[]>([])
    const orders = useSelector((state:{orders:Orders})=> state.orders.orders)

    useEffect(() => {
        sanityClient.fetch(`
            *[_type == "featured"] {
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->,
                    genre-> {
                        title
                    }
                }
            }
        `).then((data:any[]) => {
            const featuredData:Feature[] = data.map((feature:any) => {
                const tempFeature:Feature = {
                    id:feature._id,
                    title:feature.title,
                    description:feature.short_description,
                }
                return tempFeature
            })
            setFeaturedArray(featuredData.reverse())
        })
    },[])
    
    return (
        <SafeAreaView className='flex-1'>
        {
            orders.length>0 && <FloatingOrders orders={orders}/>
        }
            <View className='flex-1'>
            <Header/>
            <ScrollView 
                contentContainerStyle={{
                    paddingBottom:20
                }}
                className='z-20'
            >
                <Categories/>
                {
                    featuredArray.map((feature:Feature)=>{
                        return <FeaturedRow key={feature.id} featureInfo={feature} />
                    })
                }
            </ScrollView>
            </View>
        </SafeAreaView>
    );
}


export default HomeScreen
