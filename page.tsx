'use client'

import { useRef, useState } from 'react'
import type { RaceResult } from '@/types'

const resultBadgeClass: Record<string, string> = {
  'Group 1': 'bg-[#e8621a] text-white',
  'Group 2': 'bg-[#e8621a] text-white',
  'Group 3': 'bg-[#e8621a] text-white',
  'Listed':  'bg-gray-700 text-white',
  'Winner':  'bg-green-800 text-white',
  'Placed':  'bg-gray-600 text-white',
}

export default function ScoreboardSection({ results }: { results: RaceResult[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    setStartX(e.pageX - (trackRef.current?.offsetLeft ?? 0))
    setScrollLeft(trackRef.current?.scrollLeft ?? 0)
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - (trackRef.current.offsetLeft ?? 0)
    trackRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5
  }

  if (!results.length) return null

  return (
    <section className="bg-[#f4f4f2] border-t border-[#e2e0dc] overflow-hidden py-16 md:py-28">
      {/* Header */}
      <div className="px-[clamp(2rem,7vw,8rem)] pb-10 flex items-end justify-between">
        <div>
          <p className="text-[0.7rem] font-medium tracking-[0.38em] uppercase text-[#e8621a] mb-2">
            This Week's Scoreboard
          </p>
          <h2 className="font-[family-name:var(--font-title)] text-[clamp(2.4rem,4vw,4.2rem)] font-bold leading-none tracking-[0.04em] uppercase text-black">
            On The <em className="not-italic text-[#e8621a]">Board</em>
          </h2>
          <p className="text-[0.9rem] font-light text-[#8a8880] mt-2 max-w-md leading-[1.7]">
            Your horse. Your colours. Your moment. Drag to scroll.
          </p>
        </div>
      </div>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing select-none px-[clamp(2rem,7vw,8rem)] pb-2"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
      >
        {results.map((r) => (
          <div
            key={r._id}
            className={`flex-none w-[clamp(260px,28vw,360px)] rounded-2xl overflow-hidden relative aspect-[3/4] ${r.bg}`}
          >
            {/* Result badge */}
            <span className={`absolute top-4 right-4 text-[0.6rem] font-semibold tracking-[0.12em] uppercase px-3 py-1 rounded ${resultBadgeClass[r.result] ?? 'bg-gray-600 text-white'}`}>
              {r.result}
            </span>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="block text-[0.62rem] font-medium tracking-[0.2em] uppercase text-[#e8621a] mb-2">
                {r.tag}
              </span>
              <h3 className="font-[family-name:var(--font-title)] text-[1.8rem] font-bold uppercase text-white leading-none tracking-[0.04em] mb-2">
                {r.horse}
              </h3>
              <p className="text-[0.7rem] font-light text-white/60 leading-[1.6]">
                {r.race}<br />{r.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
