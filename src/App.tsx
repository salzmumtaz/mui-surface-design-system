import { Alert, CssBaseline, Snackbar, ThemeProvider } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { AppLoader } from './components/AppLoader';
import { Dashboard } from './components/Dashboard';
import { useTenantStore } from './store/use-tenant-store';
import { resolveTheme } from './theme/create-surface-theme';

export default function App() {
  const config = useTenantStore((state) => state.config);
  const family = useTenantStore((state) => state.family);
  const isBootstrapping = useTenantStore((state) => state.isBootstrapping);
  const isSwitching = useTenantStore((state) => state.isSwitching);
  const error = useTenantStore((state) => state.error);
  const bootstrap = useTenantStore((state) => state.bootstrap);
  const switchTenant = useTenantStore((state) => state.switchTenant);
  const toggleFamily = useTenantStore((state) => state.toggleFamily);
  const clearError = useTenantStore((state) => state.clearError);
  const tenant = config?.themePreset ?? 'prism';
  const theme = useMemo(() => resolveTheme(tenant, family, 'application'), [tenant, family]);

  useEffect(() => { void bootstrap(); }, [bootstrap]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!config && isBootstrapping ? (
        <AppLoader />
      ) : config ? (
        <Dashboard
          config={config}
          family={family}
          isSwitchingTenant={isSwitching}
          onToggleTenant={() => { void switchTenant(); }}
          onToggleTheme={toggleFamily}
        />
      ) : (
        <Alert severity="error">{error ?? 'Unable to start the application.'}</Alert>
      )}
      <Snackbar open={Boolean(error && config)} autoHideDuration={5000} onClose={clearError}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
