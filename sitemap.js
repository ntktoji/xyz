import { SITE } from '@/lib/site';
export default function sitemap() {
  return ['', '/about', '/services', '/industries', '/careers', '/track', '/contact', '/privacy', '/terms'].map((p) => ({ url: `${SITE.url}${p}`, lastModified: new Date() }));
}
