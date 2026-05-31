import type { HonourRoll } from '@/types'

export default function HonourRollTicker({ items }: { items: HonourRoll[] }) {
  if (!items.length) return null
  const doubled = [...items, ...items] // Duplicate for seamless loop

  return (
    <div
      className="fixed top-[var(--nav-h,72px)] left-0 right-0 z-[90] bg-[#1c1c1a] border-b-2 border-[#e8621a] h-[52px] overflow-hidden pointer-events-none opacity-0 transition-all duration-[450ms]"
      id="honourRoll"
    >
      {/* Label */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center gap-2.5 bg-[#e8621a] px-5">
        <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
        <span className="font-[family-name:var(--font-body)] text-[0.68rem] font-bold tracking-[0.18em] uppercase text-white whitespace-nowrap">
          G1 Hall of Fame
        </span>
      </div>

      {/* Scrolling track */}
      <div className="flex items-stretch h-full pl-[168px] animate-[tickerScroll_60s_linear_infinite]">
        {doubled.map((item, i) => (
          <div key={`${item._id}-${i}`} className="inline-flex flex-col justify-center px-10 border-r border-white/8 flex-shrink-0">
            <span className="font-[family-name:var(--font-title)] text-[1rem] font-bold tracking-[0.06em] uppercase text-[#e8621a] leading-none">
              {item.horse}
            </span>
            <span className="font-[family-name:var(--font-body)] text-[0.54rem] font-light tracking-[0.14em] uppercase text-white/85 mt-1 leading-none">
              {item.race}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
