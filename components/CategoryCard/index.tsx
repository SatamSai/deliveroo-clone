import { Category } from '@/types/globalTypes'
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'

interface Props{
    category:Category
}
const CategoryCard:React.FC<Props> = ({category}) => {
  return (
    <Pressable className='mr-2 my-2 bg-slate-600 relative'>
      <View>
        <Image
          source={
              category.img ? { uri: category.img } : require('../../assets/images/sushi.png')
          }
          className="h-20 w-20 rounded"
        />
      </View>
        <Text 
          className='absolute bottom-2 left-2 text-white'
          numberOfLines={1}
        >{category.title}</Text>
    </Pressable>
  )
}

export default CategoryCard