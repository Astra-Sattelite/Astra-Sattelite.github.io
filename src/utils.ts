import { useLayoutEffect, useState } from 'react'

export const useIsMobile = () => {

  const [[width, height], setSize] = useState([0, 0])

  useLayoutEffect(() => {

    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', updateSize)

    updateSize();

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return height > width && height >= 320 ? true : false
}