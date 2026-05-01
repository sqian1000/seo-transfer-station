import themeConfig from "./themeConfig"

function getBasePath(): string {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:4321';
  }

  return themeConfig.general.seo.url;
}

export function getOGImage(slug?: string) {
  const basePath: string = getBasePath().replace(/\/$/, '');
  const safeSlug = slug && slug.trim() ? slug.replace(/^\//, '') : 'seo-transfer-station';
  return `${basePath}/og/${safeSlug}.png`;
}