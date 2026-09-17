/**
 * Geolocation Service
 *
 * Detects the user's country using free IP geolocation APIs.
 * Uses a cascade of providers with a browser-timezone fallback
 * so we always return *something* — even without network.
 *
 * The result is cached in sessionStorage so we only make one API
 * call per browser session regardless of how many times it's invoked.
 */

export interface GeoInfo {
  country_code: string;   // ISO 3166-1 alpha-2 (e.g. "IN", "US")
  country_name: string;   // Human-readable (e.g. "India", "United States")
}

const SESSION_CACHE_KEY = 'hb-geo-cache';

/**
 * Convert a 2-letter country code to its flag emoji.
 * Works by mapping each letter to its Regional Indicator Symbol.
 */
export function countryCodeToFlag(code: string): string {
  if (!code || code.length !== 2) return '🌍';
  const codePoints = [...code.toUpperCase()].map(
    (ch) => 0x1f1e6 - 65 + ch.charCodeAt(0)
  );
  return String.fromCodePoint(...codePoints);
}

/**
 * Primary detection — uses the free ip-api.com endpoint.
 * • No API key required
 * • Returns country code + name
 * • Note: free tier is HTTP-only on some plans; we try HTTPS first.
 */
async function detectViaIpApi(): Promise<GeoInfo | null> {
  try {
    const res = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.success === false) return null;
    return {
      country_code: data.country_code,
      country_name: data.country,
    };
  } catch {
    return null;
  }
}

/**
 * Fallback — uses api.country.is (lightweight, HTTPS, no key).
 * Only returns the country code, so we map it to a name.
 */
async function detectViaCountryIs(): Promise<GeoInfo | null> {
  try {
    const res = await fetch('https://api.country.is/', { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.country) return null;
    return {
      country_code: data.country,
      country_name: COUNTRY_NAMES[data.country] || data.country,
    };
  } catch {
    return null;
  }
}

/**
 * Last-resort fallback — use the browser's timezone to guess the country.
 * Imprecise (multiple countries share timezones) but works offline.
 */
function detectFromTimezone(): GeoInfo | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone; // e.g. "Asia/Kolkata"
    const match = TIMEZONE_TO_COUNTRY[tz];
    if (match) return match;
  } catch { /* Intl not available */ }
  return null;
}

/**
 * Main entry point — cascades through providers, caches result.
 */
export async function detectCountry(): Promise<GeoInfo | null> {
  if (typeof window === 'undefined') return null;

  // Check session cache first
  try {
    const cached = sessionStorage.getItem(SESSION_CACHE_KEY);
    if (cached) return JSON.parse(cached) as GeoInfo;
  } catch { /* ignore */ }

  // Cascade through providers
  let geo = await detectViaIpApi();
  if (!geo) geo = await detectViaCountryIs();
  if (!geo) geo = detectFromTimezone();

  // Cache the result for this session
  if (geo) {
    try {
      sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(geo));
    } catch { /* storage full, ignore */ }
  }

  return geo;
}

// ── Timezone → Country mapping (top 80+ timezones) ──────────────────────────
const TIMEZONE_TO_COUNTRY: Record<string, GeoInfo> = {
  'Asia/Kolkata':        { country_code: 'IN', country_name: 'India' },
  'Asia/Calcutta':       { country_code: 'IN', country_name: 'India' },
  'America/New_York':    { country_code: 'US', country_name: 'United States' },
  'America/Chicago':     { country_code: 'US', country_name: 'United States' },
  'America/Denver':      { country_code: 'US', country_name: 'United States' },
  'America/Los_Angeles': { country_code: 'US', country_name: 'United States' },
  'America/Phoenix':     { country_code: 'US', country_name: 'United States' },
  'America/Anchorage':   { country_code: 'US', country_name: 'United States' },
  'Pacific/Honolulu':    { country_code: 'US', country_name: 'United States' },
  'Europe/London':       { country_code: 'GB', country_name: 'United Kingdom' },
  'Europe/Paris':        { country_code: 'FR', country_name: 'France' },
  'Europe/Berlin':       { country_code: 'DE', country_name: 'Germany' },
  'Europe/Madrid':       { country_code: 'ES', country_name: 'Spain' },
  'Europe/Rome':         { country_code: 'IT', country_name: 'Italy' },
  'Europe/Amsterdam':    { country_code: 'NL', country_name: 'Netherlands' },
  'Europe/Moscow':       { country_code: 'RU', country_name: 'Russia' },
  'Europe/Istanbul':     { country_code: 'TR', country_name: 'Turkey' },
  'Europe/Warsaw':       { country_code: 'PL', country_name: 'Poland' },
  'Europe/Bucharest':    { country_code: 'RO', country_name: 'Romania' },
  'Europe/Stockholm':    { country_code: 'SE', country_name: 'Sweden' },
  'Europe/Oslo':         { country_code: 'NO', country_name: 'Norway' },
  'Europe/Helsinki':     { country_code: 'FI', country_name: 'Finland' },
  'Europe/Athens':       { country_code: 'GR', country_name: 'Greece' },
  'Europe/Lisbon':       { country_code: 'PT', country_name: 'Portugal' },
  'Europe/Dublin':       { country_code: 'IE', country_name: 'Ireland' },
  'Europe/Zurich':       { country_code: 'CH', country_name: 'Switzerland' },
  'Europe/Vienna':       { country_code: 'AT', country_name: 'Austria' },
  'Europe/Prague':       { country_code: 'CZ', country_name: 'Czech Republic' },
  'Europe/Copenhagen':   { country_code: 'DK', country_name: 'Denmark' },
  'Europe/Brussels':     { country_code: 'BE', country_name: 'Belgium' },
  'Europe/Kiev':         { country_code: 'UA', country_name: 'Ukraine' },
  'Europe/Kyiv':         { country_code: 'UA', country_name: 'Ukraine' },
  'Asia/Tokyo':          { country_code: 'JP', country_name: 'Japan' },
  'Asia/Shanghai':       { country_code: 'CN', country_name: 'China' },
  'Asia/Hong_Kong':      { country_code: 'HK', country_name: 'Hong Kong' },
  'Asia/Singapore':      { country_code: 'SG', country_name: 'Singapore' },
  'Asia/Seoul':          { country_code: 'KR', country_name: 'South Korea' },
  'Asia/Taipei':         { country_code: 'TW', country_name: 'Taiwan' },
  'Asia/Bangkok':        { country_code: 'TH', country_name: 'Thailand' },
  'Asia/Jakarta':        { country_code: 'ID', country_name: 'Indonesia' },
  'Asia/Kuala_Lumpur':   { country_code: 'MY', country_name: 'Malaysia' },
  'Asia/Manila':         { country_code: 'PH', country_name: 'Philippines' },
  'Asia/Karachi':        { country_code: 'PK', country_name: 'Pakistan' },
  'Asia/Dhaka':          { country_code: 'BD', country_name: 'Bangladesh' },
  'Asia/Colombo':        { country_code: 'LK', country_name: 'Sri Lanka' },
  'Asia/Dubai':          { country_code: 'AE', country_name: 'UAE' },
  'Asia/Riyadh':         { country_code: 'SA', country_name: 'Saudi Arabia' },
  'Asia/Tehran':         { country_code: 'IR', country_name: 'Iran' },
  'Asia/Baghdad':        { country_code: 'IQ', country_name: 'Iraq' },
  'Asia/Kathmandu':      { country_code: 'NP', country_name: 'Nepal' },
  'Asia/Ho_Chi_Minh':    { country_code: 'VN', country_name: 'Vietnam' },
  'Asia/Yangon':         { country_code: 'MM', country_name: 'Myanmar' },
  'Australia/Sydney':    { country_code: 'AU', country_name: 'Australia' },
  'Australia/Melbourne': { country_code: 'AU', country_name: 'Australia' },
  'Australia/Brisbane':  { country_code: 'AU', country_name: 'Australia' },
  'Australia/Perth':     { country_code: 'AU', country_name: 'Australia' },
  'Pacific/Auckland':    { country_code: 'NZ', country_name: 'New Zealand' },
  'America/Toronto':     { country_code: 'CA', country_name: 'Canada' },
  'America/Vancouver':   { country_code: 'CA', country_name: 'Canada' },
  'America/Sao_Paulo':   { country_code: 'BR', country_name: 'Brazil' },
  'America/Argentina/Buenos_Aires': { country_code: 'AR', country_name: 'Argentina' },
  'America/Mexico_City': { country_code: 'MX', country_name: 'Mexico' },
  'America/Bogota':      { country_code: 'CO', country_name: 'Colombia' },
  'America/Lima':        { country_code: 'PE', country_name: 'Peru' },
  'America/Santiago':    { country_code: 'CL', country_name: 'Chile' },
  'Africa/Cairo':        { country_code: 'EG', country_name: 'Egypt' },
  'Africa/Lagos':        { country_code: 'NG', country_name: 'Nigeria' },
  'Africa/Johannesburg': { country_code: 'ZA', country_name: 'South Africa' },
  'Africa/Nairobi':      { country_code: 'KE', country_name: 'Kenya' },
  'Africa/Casablanca':   { country_code: 'MA', country_name: 'Morocco' },
  'Asia/Jerusalem':      { country_code: 'IL', country_name: 'Israel' },
};

// ── Country code → name mapping (ISO 3166-1 alpha-2, ~200 entries) ──────────
const COUNTRY_NAMES: Record<string, string> = {
  AF: 'Afghanistan', AL: 'Albania', DZ: 'Algeria', AD: 'Andorra', AO: 'Angola',
  AG: 'Antigua & Barbuda', AR: 'Argentina', AM: 'Armenia', AU: 'Australia', AT: 'Austria',
  AZ: 'Azerbaijan', BS: 'Bahamas', BH: 'Bahrain', BD: 'Bangladesh', BB: 'Barbados',
  BY: 'Belarus', BE: 'Belgium', BZ: 'Belize', BJ: 'Benin', BT: 'Bhutan',
  BO: 'Bolivia', BA: 'Bosnia', BW: 'Botswana', BR: 'Brazil', BN: 'Brunei',
  BG: 'Bulgaria', BF: 'Burkina Faso', BI: 'Burundi', KH: 'Cambodia', CM: 'Cameroon',
  CA: 'Canada', CV: 'Cape Verde', CF: 'Central African Republic', TD: 'Chad', CL: 'Chile',
  CN: 'China', CO: 'Colombia', KM: 'Comoros', CG: 'Congo', CD: 'DR Congo',
  CR: 'Costa Rica', CI: "Côte d'Ivoire", HR: 'Croatia', CU: 'Cuba', CY: 'Cyprus',
  CZ: 'Czech Republic', DK: 'Denmark', DJ: 'Djibouti', DM: 'Dominica', DO: 'Dominican Republic',
  EC: 'Ecuador', EG: 'Egypt', SV: 'El Salvador', GQ: 'Equatorial Guinea', ER: 'Eritrea',
  EE: 'Estonia', SZ: 'Eswatini', ET: 'Ethiopia', FJ: 'Fiji', FI: 'Finland',
  FR: 'France', GA: 'Gabon', GM: 'Gambia', GE: 'Georgia', DE: 'Germany',
  GH: 'Ghana', GR: 'Greece', GD: 'Grenada', GT: 'Guatemala', GN: 'Guinea',
  GW: 'Guinea-Bissau', GY: 'Guyana', HT: 'Haiti', HN: 'Honduras', HU: 'Hungary',
  IS: 'Iceland', IN: 'India', ID: 'Indonesia', IR: 'Iran', IQ: 'Iraq',
  IE: 'Ireland', IL: 'Israel', IT: 'Italy', JM: 'Jamaica', JP: 'Japan',
  JO: 'Jordan', KZ: 'Kazakhstan', KE: 'Kenya', KI: 'Kiribati', KP: 'North Korea',
  KR: 'South Korea', KW: 'Kuwait', KG: 'Kyrgyzstan', LA: 'Laos', LV: 'Latvia',
  LB: 'Lebanon', LS: 'Lesotho', LR: 'Liberia', LY: 'Libya', LI: 'Liechtenstein',
  LT: 'Lithuania', LU: 'Luxembourg', MG: 'Madagascar', MW: 'Malawi', MY: 'Malaysia',
  MV: 'Maldives', ML: 'Mali', MT: 'Malta', MH: 'Marshall Islands', MR: 'Mauritania',
  MU: 'Mauritius', MX: 'Mexico', FM: 'Micronesia', MD: 'Moldova', MC: 'Monaco',
  MN: 'Mongolia', ME: 'Montenegro', MA: 'Morocco', MZ: 'Mozambique', MM: 'Myanmar',
  NA: 'Namibia', NR: 'Nauru', NP: 'Nepal', NL: 'Netherlands', NZ: 'New Zealand',
  NI: 'Nicaragua', NE: 'Niger', NG: 'Nigeria', MK: 'North Macedonia', NO: 'Norway',
  OM: 'Oman', PK: 'Pakistan', PW: 'Palau', PA: 'Panama', PG: 'Papua New Guinea',
  PY: 'Paraguay', PE: 'Peru', PH: 'Philippines', PL: 'Poland', PT: 'Portugal',
  QA: 'Qatar', RO: 'Romania', RU: 'Russia', RW: 'Rwanda', KN: 'Saint Kitts & Nevis',
  LC: 'Saint Lucia', VC: 'Saint Vincent', WS: 'Samoa', SM: 'San Marino',
  ST: 'São Tomé & Príncipe', SA: 'Saudi Arabia', SN: 'Senegal', RS: 'Serbia',
  SC: 'Seychelles', SL: 'Sierra Leone', SG: 'Singapore', SK: 'Slovakia', SI: 'Slovenia',
  SB: 'Solomon Islands', SO: 'Somalia', ZA: 'South Africa', SS: 'South Sudan',
  ES: 'Spain', LK: 'Sri Lanka', SD: 'Sudan', SR: 'Suriname', SE: 'Sweden',
  CH: 'Switzerland', SY: 'Syria', TW: 'Taiwan', TJ: 'Tajikistan', TZ: 'Tanzania',
  TH: 'Thailand', TL: 'Timor-Leste', TG: 'Togo', TO: 'Tonga', TT: 'Trinidad & Tobago',
  TN: 'Tunisia', TR: 'Turkey', TM: 'Turkmenistan', TV: 'Tuvalu', UG: 'Uganda',
  UA: 'Ukraine', AE: 'UAE', GB: 'United Kingdom', US: 'United States',
  UY: 'Uruguay', UZ: 'Uzbekistan', VU: 'Vanuatu', VE: 'Venezuela', VN: 'Vietnam',
  YE: 'Yemen', ZM: 'Zambia', ZW: 'Zimbabwe', HK: 'Hong Kong', PS: 'Palestine',
};
