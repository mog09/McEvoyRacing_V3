import { client } from './sanity'
import type {
  RaceResult, RaceSchedule, Syndicate,
  CareerPosition, HonourRoll, SiteSettings,
} from '@/types'

// ── Race Results (On The Board scoreboard) ────────────────────────────────────
export async function getRaceResults(): Promise<RaceResult[]> {
  return client.fetch(
    `*[_type == "raceResult" && active == true] | order(sortOrder asc) {
      _id, horse, tag, result, race, detail, bg, active, sortOrder
    }`,
    {},
    { next: { revalidate: 60 } }
  )
}

// ── Race Schedule (Game Day) ──────────────────────────────────────────────────
export async function getRaceSchedule(): Promise<RaceSchedule[]> {
  return client.fetch(
    `*[_type == "raceSchedule" && active == true] | order(sortOrder asc) {
      _id, horse, day, month, race, venue, distance, status, active, sortOrder
    }`,
    {},
    { next: { revalidate: 60 } }
  )
}

// ── Syndicates (Get In The Game) ──────────────────────────────────────────────
export async function getSyndicates(): Promise<Syndicate[]> {
  return client.fetch(
    `*[_type == "syndicate" && active == true] | order(num asc) {
      _id, active, num, name, breeding, desc,
      horseImage { asset },
      spotsTotal, spotsTaken, buyIn, monthly, base, target,
      badgeType, badgeText, btnText,
      syndId
    }`,
    {},
    { next: { revalidate: 60 } }
  )
}

// ── Career Positions (Sign For The Team) ──────────────────────────────────────
export async function getCareerPositions(): Promise<CareerPosition[]> {
  return client.fetch(
    `*[_type == "careerPosition" && active == true] | order(sortOrder asc) {
      _id, active, title, type, badge, desc, requirements, sortOrder
    }`,
    {},
    { next: { revalidate: 60 } }
  )
}

// ── Honour Roll (G1 ticker) ───────────────────────────────────────────────────
export async function getHonourRoll(): Promise<HonourRoll[]> {
  return client.fetch(
    `*[_type == "honourRoll"] | order(order asc) {
      _id, horse, race, order
    }`,
    {},
    { next: { revalidate: 3600 } } // G1 winners change rarely — 1hr cache is fine
  )
}

// ── Site Settings (singleton) ─────────────────────────────────────────────────
export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(
    `*[_type == "siteSettings"][0] {
      _id, heroVideoUrl, contactEmail, contactPhone,
      instagramUrl, facebookUrl, youtubeUrl
    }`,
    {},
    { next: { revalidate: 3600 } }
  )
}

// ── All data in one call (used by homepage) ───────────────────────────────────
export async function getHomePageData() {
  const [results, schedule, syndicates, positions, honourRollItems, settings] =
    await Promise.all([
      getRaceResults(),
      getRaceSchedule(),
      getSyndicates(),
      getCareerPositions(),
      getHonourRoll(),
      getSiteSettings(),
    ])
  return { results, schedule, syndicates, positions, honourRollItems, settings }
}
