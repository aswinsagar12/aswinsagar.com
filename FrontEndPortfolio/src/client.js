import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// These identifiers are public and safe to bundle. Environment values can override them.
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim() || 'l04crhjd';
const dataset = import.meta.env.VITE_SANITY_DATASET?.trim() || 'production';

export const client = sanityClient({
  projectId,
  dataset,
  apiVersion: '2022-03-05',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
