/**
 * Country list used by the blog country filter.
 *
 * Each entry uses the ISO 3166-1 alpha-2 code (`code`) which is what the
 * `posts.country` column stores, plus a display name and a flag image URL
 * served from the flagcdn.com CDN.
 */
export interface Country {
  code: string;
  name: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', flag: 'https://flagcdn.com/w40/us.png' },
  { code: 'GB', name: 'United Kingdom', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'CA', name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png' },
  { code: 'AU', name: 'Australia', flag: 'https://flagcdn.com/w40/au.png' },
  { code: 'DE', name: 'Germany', flag: 'https://flagcdn.com/w40/de.png' },
  { code: 'FR', name: 'France', flag: 'https://flagcdn.com/w40/fr.png' },
  { code: 'IT', name: 'Italy', flag: 'https://flagcdn.com/w40/it.png' },
  { code: 'ES', name: 'Spain', flag: 'https://flagcdn.com/w40/es.png' },
  { code: 'NL', name: 'Netherlands', flag: 'https://flagcdn.com/w40/nl.png' },
  { code: 'BE', name: 'Belgium', flag: 'https://flagcdn.com/w40/be.png' },
  { code: 'CH', name: 'Switzerland', flag: 'https://flagcdn.com/w40/ch.png' },
  { code: 'AT', name: 'Austria', flag: 'https://flagcdn.com/w40/at.png' },
  { code: 'SE', name: 'Sweden', flag: 'https://flagcdn.com/w40/se.png' },
  { code: 'NO', name: 'Norway', flag: 'https://flagcdn.com/w40/no.png' },
  { code: 'DK', name: 'Denmark', flag: 'https://flagcdn.com/w40/dk.png' },
  { code: 'FI', name: 'Finland', flag: 'https://flagcdn.com/w40/fi.png' },
  { code: 'PL', name: 'Poland', flag: 'https://flagcdn.com/w40/pl.png' },
  { code: 'CZ', name: 'Czech Republic', flag: 'https://flagcdn.com/w40/cz.png' },
  { code: 'PT', name: 'Portugal', flag: 'https://flagcdn.com/w40/pt.png' },
  { code: 'GR', name: 'Greece', flag: 'https://flagcdn.com/w40/gr.png' },
  { code: 'IE', name: 'Ireland', flag: 'https://flagcdn.com/w40/ie.png' },
  { code: 'NZ', name: 'New Zealand', flag: 'https://flagcdn.com/w40/nz.png' },
  { code: 'ZA', name: 'South Africa', flag: 'https://flagcdn.com/w40/za.png' },
  { code: 'IN', name: 'India', flag: 'https://flagcdn.com/w40/in.png' },
  { code: 'JP', name: 'Japan', flag: 'https://flagcdn.com/w40/jp.png' },
  { code: 'KR', name: 'South Korea', flag: 'https://flagcdn.com/w40/kr.png' },
  { code: 'CN', name: 'China', flag: 'https://flagcdn.com/w40/cn.png' },
  { code: 'SG', name: 'Singapore', flag: 'https://flagcdn.com/w40/sg.png' },
  { code: 'HK', name: 'Hong Kong', flag: 'https://flagcdn.com/w40/hk.png' },
  { code: 'AE', name: 'United Arab Emirates', flag: 'https://flagcdn.com/w40/ae.png' },
  { code: 'SA', name: 'Saudi Arabia', flag: 'https://flagcdn.com/w40/sa.png' },
  { code: 'BR', name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png' },
  { code: 'AR', name: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png' },
  { code: 'CL', name: 'Chile', flag: 'https://flagcdn.com/w40/cl.png' },
  { code: 'CO', name: 'Colombia', flag: 'https://flagcdn.com/w40/co.png' },
  { code: 'MX', name: 'Mexico', flag: 'https://flagcdn.com/w40/mx.png' },
  { code: 'RU', name: 'Russia', flag: 'https://flagcdn.com/w40/ru.png' },
  { code: 'TR', name: 'Turkey', flag: 'https://flagcdn.com/w40/tr.png' },
  { code: 'NG', name: 'Nigeria', flag: 'https://flagcdn.com/w40/ng.png' },
  { code: 'EG', name: 'Egypt', flag: 'https://flagcdn.com/w40/eg.png' },
  { code: 'MA', name: 'Morocco', flag: 'https://flagcdn.com/w40/ma.png' },
  { code: 'ID', name: 'Indonesia', flag: 'https://flagcdn.com/w40/id.png' },
  { code: 'TH', name: 'Thailand', flag: 'https://flagcdn.com/w40/th.png' },
  { code: 'MY', name: 'Malaysia', flag: 'https://flagcdn.com/w40/my.png' },
  { code: 'PH', name: 'Philippines', flag: 'https://flagcdn.com/w40/ph.png' },
  { code: 'VN', name: 'Vietnam', flag: 'https://flagcdn.com/w40/vn.png' },
];

export function getCountryByCode(code: string | null | undefined): Country | undefined {
  if (!code) return undefined;
  return COUNTRIES.find((c) => c.code.toUpperCase() === code.toUpperCase());
}