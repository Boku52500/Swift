import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface ImageProps extends Omit<NextImageProps, 'alt'> {
  alt: string
  className?: string
}

export function OptimizedImage({ alt, className, ...props }: ImageProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <NextImage
        {...props}
        alt={alt}
        quality={85}
        loading={props.priority ? 'eager' : 'lazy'}
        className={cn('object-cover', className)}
      />
    </div>
  )
}
