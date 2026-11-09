import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({ title, description = 'MediHive - Your Health, Our Priority. Connect with India\'s top doctors, book appointments, and manage your health journey.', image = 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&h=630&fit=crop', url = 'https://medihive.com', type = 'website' }: SEOProps) {
  const fullTitle = `${title} | MediHive Healthcare`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
