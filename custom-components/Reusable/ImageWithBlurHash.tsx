"use client"

import { blurHashToDataURL } from '@/lib/blurhash'
import { ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface interFaceImageWithBlurHash {
    image: {
        url?: string
        alt?: string
        width?: number
        height?: number
        blurHash?: string
        className: string
    }
}
const ImageWithBlurHash = ({
    image
}: interFaceImageWithBlurHash) => {
    
    if (!image.url || !image.blurHash) {
        return <div>
            <ImageIcon />
        </div>
    }
    return (
        <Image
            src={image.url ||  ""}
            alt={image.alt || "image"}
            width={image.width || 100}
            height={image.height || 100}
            blurDataURL={blurHashToDataURL(image.blurHash)}
            placeholder="blur"
            className={image.className || "w-full h-full object-cover"}
        />
    )
}

export default ImageWithBlurHash