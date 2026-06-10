import Image from 'next/image'

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const height = size === 'lg' ? 56 : size === 'sm' ? 36 : 46
  return (
    <Image
      src="/assets/logo.png"
      alt="Nacholito"
      width={height * 3}
      height={height}
      style={{ height, width: 'auto' }}
      priority
    />
  )
}
