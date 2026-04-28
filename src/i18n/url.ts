import type { Lang } from './translations';

export function localUrl(path: string, lang: Lang): string {
  const clean = path === '' || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  if (lang === 'fr') return clean === '' ? '/' : clean;
  return clean === '' ? '/en/' : `/en${clean}`;
}

export function alternateUrl(currentPath: string, currentLang: Lang): string {
  if (currentLang === 'fr') {
    return currentPath === '/' ? '/en/' : `/en${currentPath}`;
  }
  const stripped = currentPath.replace(/^\/en/, '');
  return stripped === '' ? '/' : stripped;
}
