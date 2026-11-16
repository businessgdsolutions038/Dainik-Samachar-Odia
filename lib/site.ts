/*
 * Editable publication details. Leave a value empty until it is verified;
 * the site shows a "to be confirmed" placeholder in its place.
 */
export const siteConfig: {
  url: string;
  email: string;
  phone: string;
  address: { en: string; or: string };
  social: { facebook: string; x: string; instagram: string; youtube: string };
} = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  email: '',
  phone: '',
  address: {
    en: '',
    or: '',
  },
  social: {
    facebook: '',
    x: '',
    instagram: '',
    youtube: '',
  },
};

export type SocialNetwork = keyof typeof siteConfig.social;
