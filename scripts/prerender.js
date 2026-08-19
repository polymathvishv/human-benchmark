/**
 * prerender.js
 *
 * Vite SSG prerender script for Human Benchmark.
 *
 * Usage (called automatically by `npm run build`):
 *   node scripts/prerender.js
 *
 * What it does:
 *  1. Reads the built client index.html (the shell template)
 *  2. Loads the SSR build of the app (entry-server)
 *  3. For every known route, calls render(url) → gets HTML string
 *  4. Extracts route-specific <title>, <meta>, <link>, and JSON-LD structured data
 *  5. Injects them into the <head> of index.html
 *  6. Injects rendered application HTML into <div id="root">
 *  7. Writes dist/client/<route>/index.html
 *
 * Result: every single URL gets its own fully-rendered static HTML file with
 * authentic headings, meta tags, JSON-LD schema, and full body content.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.resolve(ROOT, 'dist')

// ─── Route List ──────────────────────────────────────────────────────────────
const STATIC_ROUTES = [
  '/',
  '/reaction-time',
  '/sequence-memory',
  '/aim-trainer',
  '/number-memory',
  '/verbal-memory',
  '/chimp-test',
  '/visual-memory',
  '/typing',
  '/mobile-typing',
  '/science',
  '/about',
  '/privacy',
  '/terms',
  '/contact',
  '/leaderboard',
  '/battle',
  '/dashboard',
]

// Science article slugs — sourced from scienceArticles.ts
const SCIENCE_SLUGS = [
  'what-is-reaction-time',
  'choice-vs-simple-reaction-time',
  'how-sleep-affects-reaction-time',
  'does-gaming-improve-reaction-time',
  'does-240hz-improve-scores',
  'why-reaction-time-changes-with-age',
  'working-memory-explained',
  'why-humans-forget',
  'visual-vs-spatial-memory',
  'chunking-explained',
  'chimp-memory-research',
  'how-stress-affects-memory',
  'the-stroop-effect',
  'change-blindness',
  'inattentional-blindness',
  'multitasking-myth',
  'global-vs-local-attention',
  'hicks-law',
  'fitts-law',
  'processing-speed-vs-reaction-time',
  'why-fast-decisions-matter',
  'neuroplasticity',
  'dopamine-and-learning',
  'circadian-rhythm',
  'cognitive-fatigue',
  'brain-myths-debunked',
]

const ALL_ROUTES = [
  ...STATIC_ROUTES,
  ...SCIENCE_SLUGS.map((slug) => `/science/${slug}`),
]

// Default Fallback Metadata
const DEFAULT_TITLE = 'Human Benchmark - Reaction Time, Memory & Brain Tests'
const DEFAULT_DESC = 'How fast is your brain? Test your reaction time, sequence memory, aim, and typing speed. Compare your score with global averages. Free instant brain tests.'
const DEFAULT_CANONICAL = 'https://humanbenchmark.in'
const DEFAULT_IMAGE = 'https://humanbenchmark.in/logo.webp'

// ─── Main ─────────────────────────────────────────────────────────────────────

async function prerender() {
  console.log('\n🔧 Starting SSG prerender...\n')

  // Read the client-built HTML template
  const templatePath = path.resolve(DIST, 'client', 'index.html')
  if (!fs.existsSync(templatePath)) {
    throw new Error(
      `Client build not found at ${templatePath}.\nRun the client build first.`
    )
  }
  const template = fs.readFileSync(templatePath, 'utf-8')

  // Load the SSR bundle
  const ssrEntryPath = path.resolve(DIST, 'server', 'entry-server.js')
  if (!fs.existsSync(ssrEntryPath)) {
    throw new Error(
      `SSR build not found at ${ssrEntryPath}.\nRun the SSR build first.`
    )
  }
  const { render } = await import(ssrEntryPath)

  let rendered = 0

  for (const route of ALL_ROUTES) {
    try {
      const { html: appHtml } = await render(route)

      // 1. Extract JSON-LD script blocks from rendered HTML
      const jsonLdBlocks = []
      const jsonLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
      let jsonLdMatch
      while ((jsonLdMatch = jsonLdRegex.exec(appHtml)) !== null) {
        jsonLdBlocks.push(jsonLdMatch[0])
      }

      // 2. Extract hoisted <title>, <meta>, <link> tags emitted at the start of appHtml by React 19 SSR
      const hoistedMatch = appHtml.match(/^(?:<link[^>]*\/>|<meta[^>]*\/>|<title>[^<]*<\/title>)+/)
      const hoistedTags = hoistedMatch ? hoistedMatch[0] : ''

      let headTags = ''
      if (hoistedTags) {
        // Use the exact hoisted tags from React 19 + JSON-LD blocks
        headTags = [hoistedTags, ...jsonLdBlocks].filter(Boolean).join('\n')
      } else {
        // Fallback for routes without explicit SEO component
        const canonical = `${DEFAULT_CANONICAL}${route === '/' ? '' : route}`
        headTags = [
          `  <title>${DEFAULT_TITLE}</title>`,
          `  <meta name="description" content="${DEFAULT_DESC}" />`,
          `  <link rel="canonical" href="${canonical}" />`,
          `  <meta property="og:title" content="${DEFAULT_TITLE}" />`,
          `  <meta property="og:description" content="${DEFAULT_DESC}" />`,
          `  <meta property="og:type" content="website" />`,
          `  <meta property="og:url" content="${canonical}" />`,
          `  <meta property="og:image" content="${DEFAULT_IMAGE}" />`,
          `  <meta property="og:site_name" content="Human Benchmark" />`,
          `  <meta name="twitter:card" content="summary_large_image" />`,
          `  <meta name="twitter:title" content="${DEFAULT_TITLE}" />`,
          `  <meta name="twitter:description" content="${DEFAULT_DESC}" />`,
          `  <meta name="twitter:image" content="${DEFAULT_IMAGE}" />`,
          ...jsonLdBlocks,
        ].filter(Boolean).join('\n')
      }

      // 3. Clean appHtml so that #root contains ONLY valid body markup with ZERO duplicate head tags or JSON-LD
      const cleanAppHtml = appHtml
        .replace(hoistedTags, '')
        .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')

      // 4. Inject head tags into <head> and clean body into <div id="root">
      let pageHtml = template
        .replace('<!--app-head-->', headTags)
        .replace('<!--app-html-->', cleanAppHtml)

      // Determine output file path
      let outPath
      if (route === '/') {
        outPath = path.resolve(DIST, 'client', 'index.html')
      } else {
        const routeDir = path.resolve(DIST, 'client', route.slice(1))
        fs.mkdirSync(routeDir, { recursive: true })
        outPath = path.resolve(routeDir, 'index.html')
      }

      fs.writeFileSync(outPath, pageHtml, 'utf-8')
      rendered++
      console.log(`  ✅ ${route}`)
    } catch (err) {
      console.warn(`  ⚠️  Failed to render ${route}:`, err.message)
    }
  }

  console.log(`\n✨ Successfully prerendered ${rendered}/${ALL_ROUTES.length} routes into static HTML files.\n`)
}

prerender().catch((err) => {
  console.error('❌ Prerender failed:', err)
  process.exit(1)
})
