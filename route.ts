import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { Syndicate } from '@/types'

const badgeStyles = {
  urgent:  'bg-[#e8621a] text-white',
  filling: 'bg-black/55 text-white backdrop-blur border border-white/20',
  bespoke: 'bg-[#1c1c1a] text-[#e8621a] border border-[#e8621a]/40',
}

export default function SyndicatesSection({ syndicates }: { syndicates: Syndicate[] }) {
  if (!syndicates.length) return null

  return (
    <section className="section-pad bg-[#f0efed]" id="syndicates">
      <div className="text-center mb-14">
        <p className="text-[0.7rem] font-medium tracking-[0.38em] uppercase text-[#e8621a] mb-2">Claim Your Spot</p>
        <h2 className="font-[family-name:var(--font-title)] text-[clamp(2.4rem,4vw,4rem)] font-bold leading-none tracking-[0.04em] uppercase text-black">
          Get In <em className="not-italic text-[#e8621a]">The Game</em>
        </h2>
        <p className="text-[0.9rem] font-light text-[#8a8880] mt-3 max-w-xl mx-auto leading-[1.75]">
          Forget watching from the sidelines. Own a piece of the action.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {syndicates.map((s) => {
          const pct = s.spotsTotal && s.spotsTaken != null
            ? Math.round((s.spotsTaken / s.spotsTotal) * 100)
            : null

          return (
            <div
              key={s._id}
              className="bg-white rounded-2xl border border-[#e2e0dc] overflow-hidden flex flex-col hover:-translate-y-1 hover:border-[#e8621a]/40 hover:shadow-xl transition-all duration-300"
            >
              {/* Photo */}
              <div className="relative aspect-[3/2] bg-[#1c1c1a] overflow-hidden">
                {s.horseImage?.asset ? (
                  <Image
                    src={urlFor(s.horseImage).width(800).height(533).fit('crop').url()}
                    alt={s.name}
                    fill
                    className="object-contain object-bottom bg-[#f5f3ee]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#1a1208] to-[#0e1008]" />
                )}
                <span className={`absolute top-4 right-4 text-[0.6rem] font-semibold tracking-[0.12em] uppercase px-3 py-1.5 rounded ${badgeStyles[s.badgeType]}`}>
                  {s.badgeText}
                </span>
              </div>

              {/* Body */}
              <div className="p-7 flex flex-col flex-1">
                <span className="text-[0.6rem] font-bold tracking-[0.3em] uppercase text-[#e8621a] mb-1">
                  Syndicate {s.num}
                </span>
                <h3 className="font-[family-name:var(--font-title)] text-[1.8rem] font-bold uppercase tracking-[0.04em] text-black leading-none mb-1">
                  {s.name}
                </h3>
                <p className="text-[0.68rem] font-light tracking-[0.1em] uppercase text-[#8a8880] mb-4">
                  {s.breeding}
                </p>
                <p className="text-[0.82rem] font-light leading-[1.8] text-[#6a6a62] mb-5 flex-1">
                  {s.desc}
                </p>

                {/* Meta row */}
                <div className="flex gap-0 border-t border-b border-[#e2e0dc] py-4 mb-4">
                  <div className="flex-1">
                    <span className="block text-[0.52rem] font-medium tracking-[0.18em] uppercase text-[#8a8880] mb-1">Buy-In</span>
                    <span className="font-[family-name:var(--font-title)] text-xl font-bold tracking-[0.03em] text-black">{s.buyIn}</span>
                  </div>
                  {s.monthly && (
                    <div className="flex-1">
                      <span className="block text-[0.52rem] font-medium tracking-[0.18em] uppercase text-[#8a8880] mb-1">Monthly</span>
                      <span className="font-[family-name:var(--font-title)] text-xl font-bold tracking-[0.03em] text-black">{s.monthly}</span>
                    </div>
                  )}
                  {s.base && (
                    <div className="flex-1">
                      <span className="block text-[0.52rem] font-medium tracking-[0.18em] uppercase text-[#8a8880] mb-1">Base</span>
                      <span className="font-[family-name:var(--font-title)] text-xl font-bold tracking-[0.03em] text-black">{s.base}</span>
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                {pct !== null && (
                  <div className="mb-5">
                    <div className="flex justify-between text-[0.55rem] font-medium tracking-[0.15em] uppercase text-[#8a8880] mb-1.5">
                      <span>Shares Taken</span>
                      <span>{s.spotsTaken} of {s.spotsTotal}</span>
                    </div>
                    <div className="w-full h-1 bg-[#e2e0dc] rounded-full overflow-hidden">
                      <div className="h-full bg-[#e8621a] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )}

                {/* CTA */}
                <button className="w-full py-3.5 bg-black text-white text-[0.72rem] font-medium tracking-[0.15em] uppercase rounded-lg hover:bg-[#e8621a] transition-colors duration-250 flex items-center justify-center gap-2">
                  {s.btnText} <span>→</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
