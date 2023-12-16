import Image, { ImageProps } from 'next/image'
import React, { useEffect, useState } from 'react'


// Source: https://stackoverflow.com/questions/66949606/what-is-the-best-way-to-have-a-fallback-image-in-nextjs
export default function ImageFallback(props) {
  const {
    src,
    fallbackSrc,
    ...rest
  } = props

  const [imgSrc, setImgSrc] = useState(src)

  useEffect(() => {
    setImgSrc(src)
  }, [src])
  return (
    <Image
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...rest}
      alt={rest.alt ?? ''}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
    />
  )
}
