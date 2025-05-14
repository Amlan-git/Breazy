import Head from 'next/head';

interface SeoProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

export default function Seo({
  title = 'Breazy – Breathwork & Breathing Exercise App',
  description = 'A breathwork web app guiding inhale, hold, exhale with a climbing visual. Practice guided breathing exercises for relaxation and mindfulness.',
  url = 'https://breazy.stackblitz.io',
  image = 'https://breazy.stackblitz.io/og-image.png',
}: SeoProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </Head>
  );
} 