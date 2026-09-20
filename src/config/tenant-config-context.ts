import { createContext } from 'react';
import type { TenantConfig } from './tenant-config';

export const TenantConfigContext = createContext<TenantConfig | null>(null);
