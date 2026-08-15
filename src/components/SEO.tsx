import { Helmet } from 'react-helmet-async';
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
    <Helmet>
      {/* Standard Metadata */}
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
