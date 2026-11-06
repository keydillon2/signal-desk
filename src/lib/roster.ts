// The demo category: running brands. Each brand says where its evidence comes
// from, because public, foreign and private companies disclose very differently.

export type SourceKind = 'sec-domestic' | 'sec-foreign' | 'ir-reports' | 'private'

export interface Brand {
  id: string
  name: string
  /** Who files or reports, when that's a parent company. */
  parent?: string
  ticker?: string
  /** SEC Central Index Key, for companies that file with the SEC. */
  cik?: number
  kind: SourceKind
  /** Investor-relations page for annual reports (non-SEC public companies). */
  irUrl?: string
  newsroomUrl?: string
  /** Query sent to the news search. */
  newsQuery: string
  note?: string
}

export const SOURCE_LABEL: Record<SourceKind, string> = {
  'sec-domestic': 'SEC filer (10-K, 10-Q, 8-K)',
  'sec-foreign': 'SEC foreign filer (20-F, 6-K)',
  'ir-reports': 'Public, not SEC (annual reports)',
  private: 'Private (news only)',
}

export const CATEGORY = {
  name: 'Running brands',
  context: 'How running brands are positioning after the NYC Marathon and ahead of next year’s majors.',
}

export const ROSTER: Brand[] = [
  { id: 'nike', name: 'Nike', ticker: 'NKE', cik: 320187, kind: 'sec-domestic', newsroomUrl: 'https://about.nike.com/en/newsroom', newsQuery: 'Nike running' },
  { id: 'adidas', name: 'Adidas', ticker: 'ADS (Xetra)', kind: 'ir-reports', irUrl: 'https://www.adidas-group.com/en/investors/', newsroomUrl: 'https://news.adidas.com/running', newsQuery: 'Adidas running' },
  { id: 'on', name: 'On', ticker: 'ONON', cik: 1858985, kind: 'sec-foreign', irUrl: 'https://investors.on-running.com/', newsQuery: '"On Running" OR "On Holding"' },
  { id: 'hoka', name: 'Hoka', parent: 'Deckers Brands', ticker: 'DECK', cik: 910521, kind: 'sec-domestic', newsQuery: 'Hoka running' },
  { id: 'asics', name: 'Asics', ticker: '7936 (Tokyo)', kind: 'ir-reports', irUrl: 'https://corp.asics.com/en/investor_relations', newsQuery: 'Asics running' },
  { id: 'brooks', name: 'Brooks', parent: 'Berkshire Hathaway', kind: 'private', newsroomUrl: 'https://www.brooksrunning.com/en_us/newsroom/', newsQuery: '"Brooks Running"', note: 'Owned by Berkshire Hathaway, which discloses little about it.' },
  { id: 'new-balance', name: 'New Balance', kind: 'private', newsroomUrl: 'https://www.newbalance.com/press-releases/', newsQuery: '"New Balance" running' },
  { id: 'saucony', name: 'Saucony', parent: 'Wolverine World Wide', ticker: 'WWW', cik: 110471, kind: 'sec-domestic', newsQuery: 'Saucony' },
  { id: 'puma', name: 'Puma', ticker: 'PUM (Xetra)', kind: 'ir-reports', irUrl: 'https://about.puma.com/en/investor-relations', newsQuery: 'Puma running' },
  { id: 'bandit', name: 'Bandit', kind: 'private', newsroomUrl: 'https://banditrunning.com/', newsQuery: '"Bandit Running"' },
]
