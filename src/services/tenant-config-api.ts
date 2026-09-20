import { parseTenantConfig, type TenantConfig } from '../config/tenant-config';
import type { TenantId } from '../theme/types';

const mockResponses: Record<TenantId, unknown> = {
  prism: {
    tenantId: 'tenant-prism-demo',
    displayName: 'Prism',
    themePreset: 'prism',
    brandingVersion: '2026.09.1',
    defaultMode: 'dark',
    branding: { logoSize: 'default', density: 'comfortable' },
    features: { analytics: true, teamWorkspace: true, selfService: false },
  },
  northstar: {
    tenantId: 'tenant-northstar-demo',
    displayName: 'Northstar',
    themePreset: 'northstar',
    brandingVersion: '2026.09.3',
    defaultMode: 'light',
    branding: { logoSize: 'small', density: 'compact' },
    features: { analytics: false, teamWorkspace: false, selfService: true },
  },
};

const wait = (duration: number) =>
  new Promise((resolve) => globalThis.setTimeout(resolve, duration));

export async function fetchTenantConfig(
  tenant: TenantId,
  signal?: AbortSignal,
): Promise<TenantConfig> {
  // Production: fetch(`/api/ui-config?tenant=${tenant}`, { signal, credentials: 'include' })
  await wait(650);
  if (signal?.aborted) throw new DOMException('Request aborted', 'AbortError');

  const payload = structuredClone(mockResponses[tenant]);
  return parseTenantConfig(payload);
}
