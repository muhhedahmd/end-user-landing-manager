"use client"

import type React from "react"
import { memo,  useEffect, useState } from "react"
import { BlurhashCanvas } from "react-blurhash"
import Image from "next/image"
import { ImageIcon } from "lucide-react"

interface Props {
  imageUrl: string
  width: number
  height: number
  className: string
  alt: string
  quality?: number
  blurhash?: string
  style?: React.CSSProperties
  minLoadingTime?: number 
}

const BlurredImage = memo<Props>(({ 
  style, 
  imageUrl, 
  width, 
  height, 
  className, 
  alt, 
  quality = 100, 
  blurhash,
  minLoadingTime = 20 // No minimum by default
}: Props) => {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading')
  const [showImage, setShowImage] = useState(false)

  // Preload image in background
  useEffect(() => {
    let isCancelled = false
    const startTime = Date.now()

    // Create image loader in background
    const img = new window.Image()
    img.src = imageUrl
    img.width = width
    img.height = height

    img.onload = () => {
      if (isCancelled) return

      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime)

      // Wait for minimum loading time if specified
      if (remainingTime > 0) {
        setTimeout(() => {
          if (!isCancelled) {
            setImageState('loaded')
            setShowImage(true)
          }
        }, remainingTime)
      } else {
        setImageState('loaded')
        setShowImage(true)
      }
    }

    img.onerror = () => {
      if (!isCancelled) {
        setImageState('error')
        setShowImage(true)
      }
    }

    return () => {
      isCancelled = true
      img.onload = null
      img.onerror = null
    }
  }, [imageUrl, minLoadingTime])

  if (imageState === 'error') {
    return (
      <div 
        style={style}
        className={`flex items-center justify-center bg-gray-100 ${className}`}
      >
        <ImageIcon className="w-6 h-6 text-gray-400" />
      </div>
    )
  }

  const isLoading = imageState === 'loading'

  return (
    <div style={style} className={`relative overflow-hidden ${className}`}>
      {blurhash && (
        <div 
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            showImage ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <BlurhashCanvas 
            hash={blurhash}
            width={32}
            height={32}
            punch={1}
            className="w-full h-full"
          />
        </div>
      )}

      {/* Actual image - hidden until loaded */}
      {showImage && (
        <Image
          alt={alt}
          src={imageUrl}
          quality={quality}
          width={width}
          height={height}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

      {/* Loading indicator (optional) */}
      {isLoading && !blurhash && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      )}
    </div>
  )
}, (prevProps, nextProps) => {
  return (
    prevProps.imageUrl === nextProps.imageUrl &&
    prevProps.blurhash === nextProps.blurhash &&
    prevProps.className === nextProps.className
  )
})

BlurredImage.displayName = "BlurredImage"

export default BlurredImage