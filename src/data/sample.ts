// SAMPLE DATA. Made-up findings for designing the interface. None of this is
// real analysis of these companies.

export type Kind = 'signal' | 'challenge' | 'opportunity'
export type SourceType = 'Filing' | 'News' | 'Newsroom' | 'Annual report'

export interface Source {
  label: string
  type: SourceType
  date: string
}

export interface Finding {
  id: string
  brand: string
  kind: Kind
  theme: string
  title: string
  summary: string
  why: string
  strength: 1 | 2 | 3
  /** Weeks ago, 0 = this week. */
  week: number
  isNew?: boolean
  sources: Source[]
}

export interface Theme {
  id: string
  name: string
  blurb: string
}

export const THEMES: Theme[] = [
  { id: 'majors', name: 'Majors 2027', blurb: 'Who owns race weekend at Boston, London, Berlin, Chicago and New York.' },
  { id: 'clubs', name: 'Run clubs as media', blurb: 'Clubs replacing ads as the way brands reach new runners.' },
  { id: 'supershoe', name: 'Super shoes go mainstream', blurb: 'Carbon plates move from racing flats to everyday trainers.' },
  { id: 'wholesale', name: 'Wholesale vs. direct', blurb: 'Where brands sell, and who they need running stores for.' },
  { id: 'community', name: 'Community-built brands', blurb: 'Smaller labels growing from a scene outward.' },
  { id: 'margin', name: 'Price and margin pressure', blurb: 'Discounting, tariffs and inventory clean-up.' },
]

export const FINDINGS: Finding[] = [
  { id: 'f1', brand: 'nike', kind: 'challenge', theme: 'margin', week: 0, isNew: true, strength: 3,
    title: 'Nike leans on discounting to clear running inventory',
    summary: 'The latest quarterly filing points to heavier markdowns in running footwear as older franchises are cleared.',
    why: 'Discounting buys time but teaches runners to wait for sales, which makes the next launch harder to price.',
    sources: [{ label: 'Form 10-Q, quarter ended Aug 31', type: 'Filing', date: 'Oct 2' }, { label: 'Retail analyst note on markdowns', type: 'News', date: 'Oct 28' }] },
  { id: 'f2', brand: 'nike', kind: 'opportunity', theme: 'majors', week: 0, isNew: true, strength: 2,
    title: 'NYC Marathon activation drew the week’s biggest share of coverage',
    summary: 'Nike’s finish-line pop-up and athlete content outpaced every other brand in post-race headlines.',
    why: 'It’s proof the brand still wins race weekend when it shows up in person, a playbook to repeat across all six majors.',
    sources: [{ label: 'Marathon week coverage roundup', type: 'News', date: 'Nov 3' }] },
  { id: 'f3', brand: 'on', kind: 'signal', theme: 'wholesale', week: 1, strength: 3,
    title: 'On keeps growing direct sales faster than wholesale',
    summary: 'The 6-K shows direct-to-consumer growing ahead of wholesale for a third straight quarter.',
    why: 'More direct sales means more pricing control and better data on who buys, at the cost of running-store goodwill.',
    sources: [{ label: 'Form 6-K, Q3 results', type: 'Filing', date: 'Oct 30' }] },
  { id: 'f4', brand: 'on', kind: 'opportunity', theme: 'clubs', week: 2, strength: 2,
    title: 'On tests branded run clubs in three new cities',
    summary: 'Weekly community runs launch in Chicago, Austin and Denver ahead of spring race season.',
    why: 'Clubs give On a reason to meet runners weekly, not just at checkout.',
    sources: [{ label: 'On newsroom: community runs', type: 'Newsroom', date: 'Oct 21' }] },
  { id: 'f5', brand: 'hoka', kind: 'signal', theme: 'supershoe', week: 0, isNew: true, strength: 2,
    title: 'Hoka’s plated trainer sells through faster than expected',
    summary: 'Deckers called out strong full-price sell-through for Hoka’s newest plated daily trainer.',
    why: 'Shows everyday runners will pay for race tech in a shoe they train in, the line Hoka has been betting on.',
    sources: [{ label: 'Deckers 10-Q, quarter ended Sep 30', type: 'Filing', date: 'Oct 31' }] },
  { id: 'f6', brand: 'hoka', kind: 'challenge', theme: 'wholesale', week: 3, strength: 1,
    title: 'Hoka pulls back from some smaller wholesale accounts',
    summary: 'Commentary suggests a trimmed retail footprint to protect positioning.',
    why: 'Fewer doors protects the brand but risks ceding local running stores to Brooks and Asics.',
    sources: [{ label: 'Earnings call coverage', type: 'News', date: 'Oct 14' }] },
  { id: 'f7', brand: 'adidas', kind: 'signal', theme: 'majors', week: 1, strength: 3,
    title: 'Adidas books its third straight Berlin win in its shoes',
    summary: 'A record-chasing performance in Berlin dominated the brand’s marathon messaging this fall.',
    why: 'Elite wins are Adidas’s clearest claim to the super-shoe crown going into 2027.',
    sources: [{ label: 'Adidas running news', type: 'Newsroom', date: 'Sep 29' }, { label: 'Race recap coverage', type: 'News', date: 'Sep 30' }] },
  { id: 'f8', brand: 'adidas', kind: 'opportunity', theme: 'supershoe', week: 4, strength: 2,
    title: 'Adidas brings its racing foam to a lower price point',
    summary: 'The annual report outlines plans to spread top-tier foam across more of the line.',
    why: 'Trickle-down tech could make Adidas the default choice for runners trading up.',
    sources: [{ label: 'Annual report 2025, running section', type: 'Annual report', date: 'Mar 5' }] },
  { id: 'f9', brand: 'asics', kind: 'signal', theme: 'clubs', week: 2, strength: 2,
    title: 'Asics turns its run app into a club finder',
    summary: 'The app now matches runners with local clubs and training groups.',
    why: 'Owning the club directory puts Asics at the start of a new runner’s routine.',
    sources: [{ label: 'Product update coverage', type: 'News', date: 'Oct 18' }] },
  { id: 'f10', brand: 'asics', kind: 'opportunity', theme: 'wholesale', week: 5, strength: 2,
    title: 'Running stores say Asics is their most reliable partner',
    summary: 'Specialty retailers describe steady supply and fewer surprise markdowns.',
    why: 'If Nike and Hoka pull back, Asics is positioned to win the shelf in specialty stores.',
    sources: [{ label: 'Trade publication survey', type: 'News', date: 'Sep 24' }] },
  { id: 'f11', brand: 'brooks', kind: 'signal', theme: 'wholesale', week: 1, strength: 2,
    title: 'Brooks holds the top spot in US running stores',
    summary: 'Industry coverage puts Brooks first in specialty run retail for another year.',
    why: 'Brooks wins on fit and reliability, not hype. That’s a moat that’s hard to buy.',
    sources: [{ label: 'Specialty retail rankings', type: 'News', date: 'Oct 27' }] },
  { id: 'f12', brand: 'brooks', kind: 'challenge', theme: 'majors', week: 6, strength: 1,
    title: 'Brooks is nearly invisible on marathon weekend',
    summary: 'Coverage of the fall majors barely mentions Brooks despite strong sales.',
    why: 'Being the best-selling shoe without a race-day story leaves room for rivals to define running culture.',
    sources: [{ label: 'Marathon coverage analysis', type: 'News', date: 'Sep 22' }] },
  { id: 'f13', brand: 'new-balance', kind: 'opportunity', theme: 'majors', week: 0, isNew: true, strength: 3,
    title: 'New Balance signs on as a London Marathon partner',
    summary: 'A multi-year partnership puts New Balance at the start and finish of one of the six majors.',
    why: 'A major of its own gives New Balance a stage to rival Nike and Adidas on race weekend.',
    sources: [{ label: 'New Balance press release', type: 'Newsroom', date: 'Nov 4' }] },
  { id: 'f14', brand: 'new-balance', kind: 'signal', theme: 'community', week: 3, strength: 2,
    title: 'New Balance collaborations keep pulling in non-runners',
    summary: 'Lifestyle collaborations continue to drive the brand’s cultural coverage.',
    why: 'Culture is the on-ramp. The question is whether lifestyle buyers ever become runners.',
    sources: [{ label: 'Fashion trade coverage', type: 'News', date: 'Oct 10' }] },
  { id: 'f15', brand: 'saucony', kind: 'challenge', theme: 'margin', week: 2, strength: 2,
    title: 'Saucony faces tariff pressure on imported footwear',
    summary: 'Wolverine’s filing flags tariff costs as a headwind for the brand next year.',
    why: 'Price increases could push value-minded runners toward Brooks or Asics.',
    sources: [{ label: 'Wolverine 10-Q, risk factors', type: 'Filing', date: 'Oct 22' }] },
  { id: 'f16', brand: 'saucony', kind: 'opportunity', theme: 'supershoe', week: 4, strength: 1,
    title: 'Saucony’s racing shoe gets strong reviews at a lower price',
    summary: 'Reviewers rank its newest racer among the best values of the year.',
    why: 'A credible budget super shoe is a way in for runners priced out of the category.',
    sources: [{ label: 'Running media review roundup', type: 'News', date: 'Oct 8' }] },
  { id: 'f17', brand: 'puma', kind: 'signal', theme: 'supershoe', week: 1, strength: 2,
    title: 'Puma’s nitrogen foam keeps winning elite podiums',
    summary: 'Puma-sponsored athletes placed at several fall marathons in its racing shoe.',
    why: 'Puma has the product. It hasn’t yet turned elite results into everyday demand.',
    sources: [{ label: 'Puma newsroom', type: 'Newsroom', date: 'Oct 29' }] },
  { id: 'f18', brand: 'puma', kind: 'challenge', theme: 'margin', week: 5, strength: 2,
    title: 'Puma cuts its outlook on weaker demand',
    summary: 'The latest report trims guidance and points to inventory clean-up.',
    why: 'Less money to spend on marketing just as rivals go big for the majors.',
    sources: [{ label: 'Quarterly statement', type: 'Annual report', date: 'Oct 15' }] },
  { id: 'f19', brand: 'bandit', kind: 'signal', theme: 'community', week: 0, isNew: true, strength: 3,
    title: 'Bandit sells out a marathon-week capsule in hours',
    summary: 'A limited NYC drop tied to its Brooklyn club sold out before the race.',
    why: 'Scarcity plus community gives Bandit cultural reach far beyond its size.',
    sources: [{ label: 'Streetwear coverage', type: 'News', date: 'Nov 1' }] },
  { id: 'f20', brand: 'bandit', kind: 'opportunity', theme: 'clubs', week: 3, strength: 2,
    title: 'Bandit takes its club model to Europe',
    summary: 'A Barcelona store and club follow the brand’s New York playbook.',
    why: 'If the model travels, Bandit becomes the template every big brand copies.',
    sources: [{ label: 'Expansion coverage', type: 'News', date: 'Oct 11' }] },
  { id: 'f21', brand: 'nike', kind: 'signal', theme: 'clubs', week: 4, strength: 1,
    title: 'Nike Run Club app adds in-person group runs',
    summary: 'The app now lists store-hosted runs alongside guided runs.',
    why: 'Nike is trying to bring the digital club back into the physical world.',
    sources: [{ label: 'App update coverage', type: 'News', date: 'Oct 7' }] },
  { id: 'f22', brand: 'on', kind: 'challenge', theme: 'margin', week: 6, strength: 1,
    title: 'On’s premium pricing meets a more cautious shopper',
    summary: 'Commentary notes slower growth at the top price tier.',
    why: 'Premium is On’s identity. If shoppers trade down, the brand has fewer levers than rivals.',
    sources: [{ label: 'Consumer survey coverage', type: 'News', date: 'Sep 23' }] },
  { id: 'f23', brand: 'asics', kind: 'challenge', theme: 'supershoe', week: 7, strength: 1,
    title: 'Asics racing shoes lag in elite podium share',
    summary: 'Fewer top finishes this season than Nike, Adidas or Puma.',
    why: 'Without elite proof, Asics competes on comfort and value rather than speed.',
    sources: [{ label: 'Season results analysis', type: 'News', date: 'Sep 15' }] },
  { id: 'f24', brand: 'adidas', kind: 'challenge', theme: 'wholesale', week: 7, strength: 1,
    title: 'Adidas narrows its specialty running store list',
    summary: 'Some independent stores report losing access to key models.',
    why: 'Stores that lose Adidas tend to push Brooks and Asics harder at the wall.',
    sources: [{ label: 'Trade coverage', type: 'News', date: 'Sep 16' }] },
]

/** Made-up "momentum" for each brand: a score and eight weeks of signal volume. */
export const MOMENTUM: Record<string, { score: number; change: number; weeks: number[] }> = {
  nike: { score: 54, change: -6, weeks: [9, 8, 8, 7, 6, 7, 6, 8] },
  adidas: { score: 71, change: 4, weeks: [5, 6, 7, 6, 7, 8, 9, 8] },
  on: { score: 66, change: 2, weeks: [6, 6, 7, 7, 6, 7, 7, 8] },
  hoka: { score: 74, change: 5, weeks: [5, 6, 6, 7, 8, 8, 9, 9] },
  asics: { score: 58, change: 1, weeks: [5, 5, 4, 5, 6, 5, 6, 6] },
  brooks: { score: 61, change: 0, weeks: [6, 6, 6, 5, 6, 6, 6, 6] },
  'new-balance': { score: 69, change: 7, weeks: [4, 5, 5, 6, 6, 7, 8, 10] },
  saucony: { score: 47, change: -2, weeks: [4, 4, 5, 4, 4, 3, 4, 3] },
  puma: { score: 44, change: -4, weeks: [5, 5, 4, 4, 3, 4, 3, 3] },
  bandit: { score: 63, change: 9, weeks: [2, 2, 3, 3, 4, 5, 6, 8] },
}

export const ASK_SUGGESTIONS = [
  'Who is best set up for the 2027 majors?',
  'Where is Nike most exposed right now?',
  'Which brands are betting on run clubs?',
  'What changed since last week?',
]

export const SAMPLE_ANSWER = {
  question: 'Who is best set up for the 2027 majors?',
  paragraphs: [
    'Adidas and New Balance have the strongest race-weekend positions going into 2027. Adidas has three straight Berlin wins in its shoes, and New Balance just signed a multi-year London partnership.',
    'Nike still owns the most coverage when it activates in person, as it did in New York, but it’s doing so while discounting heavily, which limits what it can spend elsewhere.',
    'Brooks is the outlier: the best seller in running stores, but nearly absent from marathon coverage.',
  ],
  cites: ['f7', 'f13', 'f2', 'f1', 'f12'],
}
