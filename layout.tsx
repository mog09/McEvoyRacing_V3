'use client'

import { useState } from 'react'
import type { CareerPosition } from '@/types'

export default function CareersSection({ positions }: { positions: CareerPosition[] }) {
  const [open, setOpen] = useState<string | null>(null)
  const [role, setRole] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const toggle = (id: string) => setOpen(prev => prev === id ? null : id)

  return (
    <section className="bg-[#1c1c1a]" id="careers">
      {/* Hero band */}
      <div className="section-pad border-b border-white/7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-[0.7rem] font-medium tracking-[0.38em] uppercase text-[#e8621a] mb-3">Now Recruiting</p>
            <h2 className="font-[family-name:var(--font-title)] text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.88] tracking-[0.04em] uppercase text-white">
              Sign For<br /><em className="not-italic text-[#e8621a]">The Team</em>
            </h2>
            <p className="text-[0.9rem] font-light text-white/55 mt-6 leading-[1.85]">
              McEvoy Racing is more than a stable — it is a squad. We are always looking for passionate, driven people who want to build a career in thoroughbred racing at the highest level.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {['Competitive Pay','Career Development','Race Day Passes','Elite Horses','Dual State Bases','Real Team Culture','Industry Mentors'].map(p => (
              <span key={p} className="text-[0.58rem] font-medium tracking-[0.12em] uppercase text-white bg-[#e8621a]/15 border border-[#e8621a]/30 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8621a]" />{p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Positions */}
      {positions.length > 0 && (
        <div className="px-[clamp(2rem,7vw,8rem)] py-20 border-b border-white/7">
          <p className="text-[0.7rem] font-medium tracking-[0.38em] uppercase text-[#e8621a] mb-2">Open Positions</p>
          <h3 className="font-[family-name:var(--font-title)] text-[clamp(1.8rem,3vw,2.8rem)] font-bold uppercase tracking-[0.04em] text-white mb-8">
            Spots On The <em className="not-italic text-[#e8621a]">Team</em>
          </h3>
          <div className="space-y-3">
            {positions.map((p) => (
              <div
                key={p._id}
                className={`border rounded-xl overflow-hidden transition-colors duration-300 ${open === p._id ? 'border-[#e8621a]/40' : 'border-white/7 hover:border-white/12'}`}
              >
                <button
                  onClick={() => toggle(p._id)}
                  className="w-full grid grid-cols-[1fr_auto_auto] items-center gap-6 p-6 bg-white/2 hover:bg-white/4 transition-colors text-left"
                >
                  <div>
                    <p className="font-[family-name:var(--font-title)] text-[1.1rem] font-bold tracking-[0.06em] uppercase text-white">{p.title}</p>
                    <p className="text-[0.55rem] font-light tracking-[0.12em] uppercase text-white/40 mt-1">{p.type}</p>
                  </div>
                  <span className={`text-[0.55rem] font-semibold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full ${p.badge === 'now' ? 'bg-[#e8621a] text-white' : 'bg-white/8 text-white/50'}`}>
                    {p.badge === 'now' ? 'Hiring Now' : 'Always Open'}
                  </span>
                  <span className={`w-7 h-7 rounded-full border flex items-center justify-center text-sm transition-transform duration-300 ${open === p._id ? 'rotate-45 border-[#e8621a] text-[#e8621a]' : 'border-white/15 text-white/40'}`}>
                    +
                  </span>
                </button>

                {open === p._id && (
                  <div className="px-6 pb-6 border-t border-white/6">
                    <p className="text-[0.82rem] font-light text-white/55 leading-[1.85] mt-4 mb-4">{p.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.requirements.map((req, i) => (
                        <span key={i} className="text-[0.56rem] font-light tracking-[0.1em] uppercase text-white/50 bg-white/5 border border-white/8 px-2.5 py-1 rounded">
                          {req}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => { setRole(p.title); document.getElementById('careersForm')?.scrollIntoView({ behavior: 'smooth' }) }}
                      className="inline-flex items-center gap-2 bg-[#e8621a] text-white text-[0.72rem] font-medium tracking-[0.15em] uppercase px-5 py-2.5 rounded-lg hover:bg-[#c44e0f] transition-colors"
                    >
                      Apply For This Position →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Application Form */}
      <div className="section-pad grid grid-cols-1 md:grid-cols-2 gap-16 items-start" id="careersForm">
        <div>
          <p className="text-[0.7rem] font-medium tracking-[0.38em] uppercase text-[#e8621a] mb-3">Ready To Sign</p>
          <h3 className="font-[family-name:var(--font-title)] text-[clamp(2rem,3.5vw,3.5rem)] font-bold leading-[0.92] tracking-[0.04em] uppercase text-white mb-4">
            Submit Your<br /><em className="not-italic text-[#e8621a]">Highlights Reel</em>
          </h3>
          <p className="text-[0.9rem] font-light text-white/50 leading-[1.85] mb-6">We read every application personally. If you're the right fit, you'll hear from us within five business days.</p>
          <ul className="space-y-3">
            {['Work with Group 1 horses every day','Learn directly from Tony and Calvin McEvoy','Race day passes and owner experiences','Career development and industry connections','World-class facilities at Ballarat and Flemington','Competitive pay and a real team culture'].map(item => (
              <li key={item} className="flex items-start gap-3 text-[0.82rem] font-light text-white/60 leading-[1.6]">
                <span className="w-5 h-5 rounded-full bg-[#e8621a]/15 border border-[#e8621a]/35 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#e8621a] text-xs font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <div className="bg-white/3 border border-white/7 rounded-2xl p-8">
          {submitted ? (
            <div className="text-center py-8">
              <span className="block text-5xl text-[#e8621a] mb-4">✓</span>
              <p className="font-[family-name:var(--font-title)] text-2xl font-bold uppercase text-white mb-2">Application Received</p>
              <p className="text-[0.82rem] font-light text-white/50 leading-[1.7]">Thanks for putting your hand up. We'll be in touch within five business days. Welcome to the squad — almost.</p>
            </div>
          ) : (
            <>
              <p className="font-[family-name:var(--font-title)] text-[1.1rem] font-bold tracking-[0.08em] uppercase text-white mb-6 pb-4 border-b border-white/8">
                Your Application
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Full Name', id: 'cf-name', type: 'text', placeholder: 'Your full name' },
                  { label: 'Email Address', id: 'cf-email', type: 'email', placeholder: 'your@email.com' },
                  { label: 'Phone Number', id: 'cf-phone', type: 'tel', placeholder: 'Your phone number' },
                ].map(f => (
                  <div key={f.id}>
                    <label className="block text-[0.58rem] font-medium tracking-[0.15em] uppercase text-white/45 mb-1.5">{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder}
                      className="w-full bg-white/6 border border-white/10 rounded-lg px-4 py-3 text-[0.82rem] text-white placeholder-white/20 focus:outline-none focus:border-[#e8621a] transition-colors" />
                  </div>
                ))}
                <div>
                  <label className="block text-[0.58rem] font-medium tracking-[0.15em] uppercase text-white/45 mb-1.5">Position of Interest</label>
                  <select value={role} onChange={e => setRole(e.target.value)}
                    className="w-full bg-white/6 border border-white/10 rounded-lg px-4 py-3 text-[0.82rem] text-white/70 focus:outline-none focus:border-[#e8621a] transition-colors">
                    <option value="">Select a position...</option>
                    {positions.map(p => <option key={p._id} value={p.title}>{p.title}</option>)}
                    <option value="General Expression of Interest">General Expression of Interest</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[0.58rem] font-medium tracking-[0.15em] uppercase text-white/45 mb-1.5">Your Experience</label>
                  <textarea placeholder="Tell us about your background with horses and why you want to join McEvoy Racing..."
                    className="w-full bg-white/6 border border-white/10 rounded-lg px-4 py-3 text-[0.82rem] text-white placeholder-white/20 focus:outline-none focus:border-[#e8621a] transition-colors min-h-[90px] resize-y" />
                </div>
              </div>
              <button
                onClick={() => setSubmitted(true)}
                className="w-full mt-6 py-4 bg-[#e8621a] text-white text-[0.72rem] font-semibold tracking-[0.15em] uppercase rounded-lg hover:bg-[#c44e0f] hover:-translate-y-0.5 transition-all duration-200"
              >
                Sign Me Up →
              </button>
              <p className="text-[0.55rem] text-white/25 text-center mt-3">We respect your privacy. Your details are only used for recruitment purposes.</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
