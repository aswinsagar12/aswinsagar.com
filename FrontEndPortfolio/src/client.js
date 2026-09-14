import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Public portfolio content is readable without exposing a token in the bundle.
export const client = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2022-03-05',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
