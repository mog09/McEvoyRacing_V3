import { getHomePageData } from '@/lib/queries'
import HonourRollTicker   from '@/components/sections/HonourRollTicker'
import ScoreboardSection  from '@/components/sections/ScoreboardSection'
import SyndicatesSection  from '@/components/sections/SyndicatesSection'
import RaceScheduleSection from '@/components/sections/RaceScheduleSection'
import CareersSection     from '@/components/sections/CareersSection'

// ISR — revalidate every 60 seconds
export const revalidate = 60

export default async function HomePage() {
  const { results, schedule, syndicates, positions, honourRollItems, settings } =
    await getHomePageData()

  return (
    <>
      {/* Honour Roll Ticker — fixed, reveals on scroll-up (JS in layout) */}
      <HonourRollTicker items={honourRollItems} />

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#0a0a08]" id="hero">
        {/* Video background — swap src with settings.heroVideoUrl when available */}
        {settings?.heroVideoUrl ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay muted loop playsInline
            src={settings.heroVideoUrl}
          />
        ) : (
          // Animated gradient placeholder until real video is added
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #0a1208 0%, #1a0a08 25%, #08100a 50%, #180810 75%, #0a0e18 100%)',
              backgroundSize: '400% 400%',
              animation: 'heroBgShift 18s ease infinite',
            }}
          />
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

        {/* Copy */}
        <div className="absolute z-10 top-1/2 left-[clamp(2rem,7vw,8rem)] -translate-y-[54%] max-w-[680px]">
          <div className="flex items-center gap-4 mb-5">
            <span className="w-8 h-px bg-[#e8621a]" />
            <span className="text-[0.7rem] font-light tracking-[0.2em] uppercase text-[#e8621a]">
              Adelaide &amp; Melbourne
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-title)] text-[clamp(4rem,9vw,10rem)] font-bold leading-[0.88] tracking-[0.06em] uppercase text-white mb-4">
            Run With <em className="not-italic text-[#e8621a] block">Us</em>
          </h1>
          <p className="text-[0.7rem] font-light tracking-[0.15em] uppercase text-white/55 mb-8">
            Group 1 Winners &middot; Premium Syndicates &middot; World-Class Facilities
          </p>
          <a
            href="#syndicates"
            className="inline-flex items-center gap-4 bg-[#e8621a] text-white text-[0.65rem] font-medium tracking-[0.22em] uppercase px-8 py-4 rounded hover:bg-[#c44e0f] hover:gap-6 transition-all duration-250"
          >
            Get In The Game <span>→</span>
          </a>
        </div>

        {/* Section nav dock */}
        <nav className="absolute bottom-0 left-0 right-0 z-10 flex bg-black/72 backdrop-blur-[20px] border-t border-white/7">
          {[
            { num: '01', label: 'Scoreboard',      sub: 'Latest results',         href: '#news' },
            { num: '02', label: 'Facilities',       sub: 'Ballarat & Flemington',  href: '#facilities' },
            { num: '03', label: 'Get In The Game',  sub: 'Available syndicates',   href: '#syndicates' },
            { num: '04', label: 'The Process',      sub: 'Selection method',       href: '#process' },
            { num: '05', label: 'Tony McEvoy',      sub: 'Head coach',             href: '#trainer' },
            { num: '06', label: 'The Team',         sub: 'Coaching staff',         href: '#team' },
            { num: '07', label: 'Game Day',         sub: 'Race schedule',          href: '#races' },
            { num: '08', label: 'Join The Team',    sub: 'Careers',                href: '#careers' },
          ].map((item) => (
            <a
              key={item.num}
              href={item.href}
              className="flex-1 group flex flex-col justify-center px-4 py-5 border-r border-white/6 last:border-r-0 min-h-[82px] relative overflow-hidden hover:bg-[#e8621a] transition-colors duration-300"
            >
              <span className="text-[0.6rem] tracking-[0.2em] text-white/22 mb-1 relative z-10 font-[family-name:var(--font-display)]">
                {item.num}
              </span>
              <span className="font-[family-name:var(--font-title)] text-[clamp(0.7rem,1.1vw,0.95rem)] font-bold tracking-[0.06em] uppercase text-white relative z-10">
                {item.label}
              </span>
              <span className="text-[0.54rem] tracking-[0.1em] uppercase text-white/32 mt-1 relative z-10 overflow-hidden text-ellipsis whitespace-nowrap">
                {item.sub}
              </span>
            </a>
          ))}
        </nav>
      </section>

      {/* ── DYNAMIC SECTIONS ─────────────────────────────────────────────── */}
      <ScoreboardSection  results={results}      />
      <SyndicatesSection  syndicates={syndicates} />
      <RaceScheduleSection schedule={schedule}   />
      <CareersSection     positions={positions}  />

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#1c1c1a] text-white px-[clamp(2rem,7vw,8rem)] py-20">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div>
            <p className="font-[family-name:var(--font-title)] text-2xl font-bold tracking-[0.08em] uppercase text-white">McEvoy Racing</p>
            <p className="text-[0.6rem] font-light tracking-[0.15em] uppercase text-white/40 mt-1">
              Est. Adelaide — Run With Us
            </p>
          </div>
          <div className="text-[0.75rem] font-light text-white/40">
            {settings?.contactEmail && <p>Email: {settings.contactEmail}</p>}
            {settings?.contactPhone && <p>Phone: {settings.contactPhone}</p>}
          </div>
        </div>
        <div className="border-t border-white/8 mt-12 pt-6 flex justify-between items-center">
          <p className="text-[0.6rem] font-light tracking-[0.1em] uppercase text-white/25">
            © {new Date().getFullYear()} McEvoy Racing Pty Ltd. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Keyframe for hero bg animation */}
      <style>{`
        @keyframes heroBgShift {
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
        }
        @keyframes tickerScroll {
          0%{transform:translateX(0)}
          100%{transform:translateX(-50%)}
        }
      `}</style>
    </>
  )
}
