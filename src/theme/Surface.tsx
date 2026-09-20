import { ThemeProvider } from '@mui/material';
import { useMemo, type PropsWithChildren } from 'react';
import { resolveTheme } from './create-surface-theme';
import type { SurfaceVariant, TenantId, ThemeFamily } from './types';

type SurfaceProps = PropsWithChildren<{
  family: ThemeFamily;
  variant: SurfaceVariant;
  tenant: TenantId;
}>;

export function Surface({ tenant, family, variant, children }: SurfaceProps) {
  const theme = useMemo(() => resolveTheme(tenant, family, variant), [tenant, family, variant]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
