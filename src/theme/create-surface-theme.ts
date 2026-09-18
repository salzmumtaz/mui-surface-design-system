import { createTheme, type Theme } from '@mui/material/styles';
import { getFoundations, tenantBrands } from './foundations';
import { components } from './components';
import { surfacePalettes } from './surfaces';
import type { SurfaceVariant, TenantId, ThemeFamily } from './types';

const cache = new Map<string, Theme>();

export function resolveTheme(tenant: TenantId, family: ThemeFamily, variant: SurfaceVariant): Theme {
  const key = `${tenant}:${family}:${variant}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const surface = surfacePalettes[tenant][family][variant];
  const tenantBrand = tenantBrands[tenant];
  const modeKey = surface.mode;
  const theme = createTheme(getFoundations(tenant), {
    surface: {
      family,
      variant,
      tenant,
      backdropFilter: surface.backdropFilter,
      shadow: surface.shadow,
    },
    palette: {
      mode: surface.mode,
      primary: {
        main: tenantBrand.primary[modeKey],
        contrastText: tenantBrand.contrast[modeKey],
      },
      secondary: {
        main: tenantBrand.secondary[modeKey],
        contrastText: tenantBrand.contrast[modeKey],
      },
      background: surface.background,
      text: surface.text,
      divider: surface.divider,
      action: {
        active: surface.text.primary,
        hover: surface.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(23, 26, 43, 0.06)',
        selected: surface.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(23, 26, 43, 0.10)',
        disabled: surface.mode === 'dark' ? 'rgba(255, 255, 255, 0.46)' : 'rgba(23, 26, 43, 0.42)',
        disabledBackground: surface.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(23, 26, 43, 0.08)',
      },
    },
    components,
  });

  cache.set(key, theme);
  return theme;
}
