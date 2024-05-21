import { createClient } from '@sanity/client'
import imageUrlBuilder from "@sanity/image-url"
import { ImageURISource } from 'react-native'
const sanityClient  = createClient({
    projectId:"t6dzwlb1",
    dataset:"production",
    useCdn:true,
    apiVersion:"2024-05-18"
})

const builder = imageUrlBuilder(sanityClient)

export const urlFor = (source:ImageURISource) => builder.image(source)

export default sanityClient