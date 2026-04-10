const TICKER_SEGMENTS = [
  'Real Estate',
  'Software',
  'AI',
  'Web and mobile',
  'Content',
  'Videography',
] as const

/** Infinite horizontal ticker; duplicate content for seamless -50% marquee. */
export default function ServicesMarquee({ className = '' }: { className?: string }) {
  const chunk = TICKER_SEGMENTS.join(', ')
  const repeated = Array(8).fill(chunk).join('   ')

  return (
    <div className={`overflow-hidden border-t border-white/10 bg-black/25 ${className}`}>
      <div className="flex w-max animate-marquee whitespace-nowrap py-4 md:py-5">
        <span className="inline-block px-6 text-xs sm:text-sm font-semibold text-white/65 tracking-wide">
          {repeated}
        </span>
        <span className="inline-block px-6 text-xs sm:text-sm font-semibold text-white/65 tracking-wide" aria-hidden>
          {repeated}
        </span>
      </div>
    </div>
  )
}
