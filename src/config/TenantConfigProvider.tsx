import type { ReactNode } from 'react';
import type { TenantConfig } from './tenant-config';
import { TenantConfigContext } from './tenant-config-context';

export function TenantConfigProvider({
  config,
  children,
}: {
  config: TenantConfig;
  children: ReactNode;
}) {
  return <TenantConfigContext.Provider value={config}>{children}</TenantConfigContext.Provider>;
}
