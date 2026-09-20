import { Alert, CssBaseline, Snackbar, ThemeProvider } from '@mui/material';
import { useEffect, useMemo, type ReactNode } from 'react';
import { AppLoader } from './components/AppLoader';
import { Dashboard } from './components/Dashboard';
import { TenantConfigProvider } from './config/TenantConfigProvider';
import { useTenantAppState } from './store/use-tenant-store';
import { resolveTheme } from './theme/create-surface-theme';

export default function App() {
  const {
    config,
    family,
    isBootstrapping,
    isSwitching,
    error,
    bootstrap,
    switchTenant,
    toggleFamily,
    clearError,
  } = useTenantAppState();
  const tenant = config?.themePreset ?? 'prism';
  const theme = useMemo(() => resolveTheme(tenant, family, 'application'), [tenant, family]);

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme.palette.background.default);
  }, [theme]);

  let content: ReactNode;

  if (config) {
    content = (
      <TenantConfigProvider config={config}>
        <Dashboard
          family={family}
          isSwitchingTenant={isSwitching}
          onToggleTenant={() => {
            void switchTenant();
          }}
          onToggleTheme={toggleFamily}
        />
      </TenantConfigProvider>
    );
  } else if (isBootstrapping) {
    content = <AppLoader />;
  } else {
    content = <Alert severity="error">{error ?? 'Unable to start the application.'}</Alert>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {content}
      <Snackbar open={Boolean(error && config)} autoHideDuration={5000} onClose={clearError}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
