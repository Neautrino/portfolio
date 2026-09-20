import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Plain BrowserRouter doesn't reset scroll position on navigation. Reset to
 * top on pathname change, but skip it when only the hash changed (Home's
 * own section nav relies on staying put and smooth-scrolling instead).
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
