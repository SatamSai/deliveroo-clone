import { Feature, Restaurant, RestaurantForFeature } from '@/types/globalTypes'
import React,{useState, useEffect} from 'react'
import { ScrollView, Text, View } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from '../RestaurantCard'
import sanityClient from '@/sanity'

interface Props {
  featureInfo:Feature,
}
const FeaturedRow:React.FC<Props> = ({featureInfo}) => {
  const [restaurants,setRestaurants] = useState<RestaurantForFeature[]>([])

  useEffect(() => {
    sanityClient.fetch(
      `
        *[_type == "featured" && _id == "${featureInfo.id}"] {
          restaurants[]->{
            _id,
            title,
            rating,
            short_description,
            genre->{
              ...,
            },
            img {
              asset->{
                url
              }
            },
            address,
            latitude,
            longitude
          }
        }[0]
      `
    ).then(data => {
      const tempRestaurants:RestaurantForFeature[] = data.restaurants.map((restaurant:any)=> {
        const tempRestaurant:RestaurantForFeature = {
            id:restaurant._id,
            title:restaurant.title,
            short_description:restaurant.short_description,
            img:restaurant.img.asset.url,
            rating:restaurant.rating,
            genre:{
              id:restaurant.genre._id,
              img:restaurant.genre.img.asset.url,
              title:restaurant.genre.title
            },
            address:restaurant.address,
            latitude:restaurant.latitude,
            longitude:restaurant.longitude
        }
        return tempRestaurant
      })
      setRestaurants(tempRestaurants)
    }
)}, [])
  
  return (
    <View >
      <View className='mt-4 flex-row items-center justify-between px-4'>
        <Text className='font-bold text-lg'>{featureInfo.title}</Text>
        <ArrowRightIcon size={25} color="#00CCBB"/>
      </View>
      <Text className='text-xs text-gray-500 px-4'>{featureInfo.description}</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          paddingHorizontal:15,
        }}
        showsHorizontalScrollIndicator={false}
        className='pt-4'
      >
        {
          restaurants.map((restaurant:RestaurantForFeature,index:number)=>{
            return <RestaurantCard key={index} restaurant={restaurant}/>
          })
        }
      </ScrollView>
    </View>
  )
}

export default FeaturedRow