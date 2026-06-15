'use client'

import React, { useRef } from 'react'
import { useScroll, useTransform, motion, useReducedMotion, type MotionValue } from 'framer-motion'

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode
  children: React.ReactNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scaleDimensions = () => (isMobile ? [0.7, 0.9] : [1.05, 1])

  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : scaleDimensions())
  const translate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -100])

  return (
    <div
      className="h-[44rem] md:h-[72rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div className="py-10 md:py-32 w-full relative" style={{ perspective: '1000px' }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  )
}

export const Header = ({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: React.ReactNode }) => {
  return (
    <motion.div style={{ translateY: translate }} className="max-w-5xl mx-auto text-center">
      {titleComponent}
    </motion.div>
  )
}

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  translate: MotionValue<number>
  children: React.ReactNode
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000001a, 0 9px 20px #0000001a, 0 37px 37px #00000017, 0 84px 50px #0000000d, 0 149px 60px #00000003',
      }}
      className="max-w-5xl -mt-12 mx-auto h-[26rem] md:h-[40rem] w-full rounded-[30px] border border-inkt/15 bg-wit p-2 md:p-4 shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-zand-donker md:rounded-2xl">
        {children}
      </div>
    </motion.div>
  )
}
