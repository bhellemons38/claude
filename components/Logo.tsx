export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const textSize = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-lg' : 'text-2xl'
  const subSize = size === 'lg' ? 'text-sm' : 'text-xs'
  return (
    <div className="flex flex-col items-start">
      <span className={`${textSize} font-black tracking-[0.2em] text-gold`}>NACHOLITO</span>
      <span className={`${subSize} tracking-widest text-slate-400 font-medium uppercase -mt-0.5`}>
        Liquid Bumbu Sauces
      </span>
    </div>
  )
}
