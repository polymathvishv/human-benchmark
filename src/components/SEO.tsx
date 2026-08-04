import { Helmet } from 'react-helmet-async';
import { type ReactNode } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  type?: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  children?: ReactNode;
}

export default function SEO({
  title = 'Human Benchmark - Brain Tests, Reaction Time & Cognitive Benchmarks',
  description = 'Measure your brain\'s performance with the official Human Benchmark test suite. Accurate tests for reaction time, sequence memory, aim trainer, typing speed, verbal memory, and more.',
  keywords = 'human benchmark, human benchmark test, humanbenchmark, human bench mark, human benchmarks, human bench mrk, human bechmark, human benchamrk, human benchnmark, human becnhmark, cognitive tests, brain benchmarks',
  canonical = 'https://humanbenchmark.in',
  type = 'website',
  image = 'https://humanbenchmark.in/og-image.png?v=2.0',
  jsonLd,
  children
}: SEOProps) {
  const siteTitle = title.includes('Human Benchmark') ? title : `${title} | Human Benchmark`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
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

      {/* Additional Tags (passed as children if any) */}
      {children}

      {/* JSON-LD Schema */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
