import { useContext } from 'react';
import type { TenantConfig } from './tenant-config';
import { TenantConfigContext } from './tenant-config-context';

export function useTenantConfig<TResult>(selector: (config: TenantConfig) => TResult): TResult {
  const config = useContext(TenantConfigContext);
  if (!config) throw new Error('useTenantConfig must be used inside TenantConfigProvider.');
  return selector(config);
}
