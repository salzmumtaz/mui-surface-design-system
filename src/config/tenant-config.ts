import type { TenantId, ThemeFamily } from '../theme/types';

export interface TenantConfig {
  tenantId: string;
  displayName: string;
  themePreset: TenantId;
  brandingVersion: string;
  defaultMode: ThemeFamily;
  logoUrl: string | null;
  features: {
    analytics: boolean;
    teamWorkspace: boolean;
  };
}

const tenantIds: TenantId[] = ['prism', 'northstar'];

export function parseTenantConfig(payload: unknown): TenantConfig {
  if (!payload || typeof payload !== 'object') throw new Error('Tenant configuration is missing.');

  const value = payload as Record<string, unknown>;
  const features = value.features as Record<string, unknown> | undefined;
  if (
    typeof value.tenantId !== 'string' ||
    typeof value.displayName !== 'string' ||
    typeof value.brandingVersion !== 'string' ||
    !tenantIds.includes(value.themePreset as TenantId) ||
    !['light', 'dark'].includes(value.defaultMode as string) ||
    (value.logoUrl !== null && typeof value.logoUrl !== 'string') ||
    !features ||
    typeof features.analytics !== 'boolean' ||
    typeof features.teamWorkspace !== 'boolean'
  ) {
    throw new Error('Tenant configuration failed validation.');
  }

  return value as unknown as TenantConfig;
}
