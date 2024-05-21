import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import CategoryCard from '../CategoryCard'
import { Category } from '@/types/globalTypes'
import sanityClient from '@/sanity'

interface Props {}

const Categories: React.FC<Props> = props => {
    const [categories,setCategories] = useState<Category[]>([])

    useEffect(() => {
      sanityClient.fetch(`
        *[_type == "category"] {
            _id,
            title,
            img {
                asset->{
                    url
                }
            }
        }
      `).then(data => {
        const categories:Category[] = data.map((category:any) => {
            const categoryTemp:Category = {
                id: category._id,
                img: category.img.asset.url,
                title: category.title
            }
            return categoryTemp
        })
        setCategories(categories)
      })
    }, [])
    
    return (
        <View>
            <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                className='pl-4'
            >
                {
                    categories.map((category:Category) => {
                        return <CategoryCard key={category.id} category={category}/>
                    })
                }
            </ScrollView>
        </View>
    )
}

export default Categories