import { describe, expect, it } from 'vitest';
import { resolveTheme } from './create-surface-theme';
import type { SurfaceVariant, TenantId, ThemeFamily } from './types';

const tenants: TenantId[] = ['prism', 'northstar'];
const families: ThemeFamily[] = ['light', 'dark'];
const variants: SurfaceVariant[] = ['application', 'sidebar', 'glass', 'content'];

describe('resolveTheme', () => {
  it.each(
    tenants.flatMap((tenant) =>
      families.flatMap((family) => variants.map((variant) => [tenant, family, variant] as const)),
    ),
  )('resolves %s/%s/%s with valid metadata and mode', (tenant, family, variant) => {
    const theme = resolveTheme(tenant, family, variant);

    expect(theme.surface).toMatchObject({ tenant, family, variant });
    expect(['light', 'dark']).toContain(theme.palette.mode);
  });

  it('caches a stable theme for the same key', () => {
    expect(resolveTheme('prism', 'dark', 'glass')).toBe(resolveTheme('prism', 'dark', 'glass'));
  });

  it.each(tenants)('keeps %s content readable and sidebar dark across families', (tenant) => {
    for (const family of families) {
      expect(resolveTheme(tenant, family, 'content').palette.mode).toBe('light');
      expect(resolveTheme(tenant, family, 'sidebar').palette.mode).toBe('dark');
      expect(resolveTheme(tenant, family, 'glass').palette.mode).toBe(family);
    }
  });
});
