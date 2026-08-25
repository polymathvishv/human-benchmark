import { type ReactNode } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  children?: ReactNode;
}

/**
 * SEO component using React 19's native head hoisting.
 *
 * React 19 automatically hoists <title>, <meta>, and <link> elements to
 * document.head during both SSR and client rendering.  This eliminates the
 * need for react-helmet-async and avoids the hydration-time duplication bug
 * it caused (Helmet re-injected tags into <head> even though the prerender
 * script had already placed them there from the SSR output).
 *
 * <script type="application/ld+json"> is NOT auto-hoisted by React 19, but
 * the prerender script extracts it from the rendered body HTML and moves it
 * into <head> for the static build.  At hydration time it is harmless
 * because browsers treat JSON-LD the same regardless of position.
 */
export default function SEO({
  title = 'Human Benchmark - Reaction Time, Memory & Brain Tests',
  description = 'How fast is your brain? Test your reaction time, sequence memory, aim, and typing speed. Compare your score with global averages. Free instant brain tests.',
  canonical = 'https://humanbenchmark.in',
  type = 'website',
  image = 'https://humanbenchmark.in/logo.webp',
  jsonLd,
  children
}: SEOProps) {
  const siteTitle = title.includes('Human Benchmark') ? title : `${title} | Human Benchmark`;

  return (
    <>
      {/* React 19 auto-hoists these to <head> */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* OpenGraph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Human Benchmark" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional tags passed as children */}
      {children}

      {/* JSON-LD Structured Data — placed inline; prerender moves it to <head> */}
      {jsonLd && (
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
}
