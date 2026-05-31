export interface RaceResult {
  _id:       string
  horse:     string
  tag:       'Touchdown' | 'First Down' | 'In The Hunt' | 'Showstopper'
  result:    'Group 1' | 'Group 2' | 'Group 3' | 'Listed' | 'Winner' | 'Placed'
  race:      string
  detail:    string
  bg:        'sc-bg-1' | 'sc-bg-2' | 'sc-bg-3' | 'sc-bg-4' | 'sc-bg-5'
  active:    boolean
  sortOrder: number
}

export interface RaceSchedule {
  _id:       string
  horse:     string
  day:       string
  month:     string
  race:      string
  venue:     string
  distance:  string
  status:    string
  active:    boolean
  sortOrder: number
}

export interface Syndicate {
  _id:        string
  active:     boolean
  num:        string
  name:       string
  breeding:   string
  desc:       string
  horseImage?: { asset: { _ref: string } }
  spotsTotal?: number
  spotsTaken?: number
  buyIn:      string
  monthly?:   string
  base?:      string
  target?:    string
  badgeType:  'urgent' | 'filling' | 'bespoke'
  badgeText:  string
  btnText:    string
  syndId:     { current: string }
}

export interface CareerPosition {
  _id:          string
  active:       boolean
  title:        string
  type:         string
  badge:        'now' | 'always'
  desc:         string
  requirements: string[]
  sortOrder:    number
}

export interface HonourRoll {
  _id:   string
  horse: string
  race:  string
  order: number
}

export interface SiteSettings {
  _id:           string
  heroVideoUrl?: string
  contactEmail?: string
  contactPhone?: string
  instagramUrl?: string
  facebookUrl?:  string
  youtubeUrl?:   string
}
