import { type MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://tailwindmate.jaleelbennett.com',
      lastModified: new Date(),
    },
    {
      url: 'https://tailwindmate.jaleelbennett.com/from-tailwind',
      lastModified: new Date(),
    },
  ];
}
