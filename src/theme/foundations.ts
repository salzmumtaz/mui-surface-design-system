import type { ThemeOptions } from '@mui/material/styles';
import type { TenantId } from './types';

export const brand = {
  violet: '#7667E8',
  violetSoft: '#A99DF4',
  mint: '#2BC7A5',
  ink: '#171A2B',
  white: '#FFFFFF',
} as const;

export const tenantBrands = {
  prism: {
    primary: { dark: brand.violetSoft, light: brand.violet },
    secondary: { dark: brand.mint, light: '#087F6C' },
    contrast: { dark: brand.ink, light: brand.white },
  },
  northstar: {
    primary: { dark: '#F4C574', light: '#8A3D58' },
    secondary: { dark: '#6BE1C0', light: '#176B59' },
    contrast: { dark: '#2B1A10', light: '#FFFFFF' },
  },
} as const satisfies Record<TenantId, object>;

export const layout = {
  sidebarWidth: 248,
  contentMaxWidth: 1440,
  pageGutter: 'clamp(1.25rem, 4vw, 3rem)',
} as const;

const prismFoundations: ThemeOptions = {
  spacing: 8,
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.06em', lineHeight: 0.98 },
    h2: { fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.3 },
    h3: { fontSize: '1.875rem', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.2 },
    subtitle1: { fontSize: '0.875rem', fontWeight: 700, lineHeight: 1.4 },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '0.875rem', lineHeight: 1.55 },
    caption: { fontSize: '0.75rem', lineHeight: 1.5 },
    overline: { fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.16em', lineHeight: 1.5 },
    button: { fontSize: '0.875rem', fontWeight: 700, textTransform: 'none' },
  },
};

const northstarFoundations: ThemeOptions = {
  spacing: 8,
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    h1: { fontFamily: 'Georgia, Times New Roman, serif', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 400, letterSpacing: '-0.045em', lineHeight: 0.92 },
    h2: { fontFamily: 'Georgia, Times New Roman, serif', fontSize: '1.5rem', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.25 },
    h3: { fontFamily: 'Georgia, Times New Roman, serif', fontSize: '2.25rem', fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 1.1 },
    subtitle1: { fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.03em', lineHeight: 1.45 },
    body1: { fontSize: '1.0625rem', lineHeight: 1.75 },
    body2: { fontSize: '0.8125rem', lineHeight: 1.6 },
    caption: { fontSize: '0.6875rem', lineHeight: 1.5 },
    overline: { fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.22em', lineHeight: 1.5 },
    button: { fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.02em', textTransform: 'uppercase' },
  },
};

const tenantFoundations: Record<TenantId, ThemeOptions> = {
  prism: prismFoundations,
  northstar: northstarFoundations,
};

export const getFoundations = (tenant: TenantId): ThemeOptions => tenantFoundations[tenant];
