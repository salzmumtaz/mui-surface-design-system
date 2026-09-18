import { BusinessRounded, DarkModeRounded, LightModeRounded, NotificationsNoneRounded, SearchRounded } from '@mui/icons-material';
import { CircularProgress, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import type { TenantConfig } from '../config/tenant-config';
import { Surface } from '../theme/Surface';
import type { TenantId, ThemeFamily } from '../theme/types';
import { ContentPanel } from './ContentPanel';
import { AmbientGlow, AppShell, GlassFrame, GlassHeader, Hero, HeroSummary, Main, MetricGrid, Page, Topbar } from './layout';
import { MetricCard } from './MetricCard';
import { Sidebar } from './Sidebar';

interface DashboardProps {
  config: TenantConfig;
  family: ThemeFamily;
  isSwitchingTenant: boolean;
  onToggleTenant: () => void;
  onToggleTheme: () => void;
}

export function Dashboard({ config, family, isSwitchingTenant, onToggleTenant, onToggleTheme }: DashboardProps) {
  const tenant: TenantId = config.themePreset;
  return (
    <AppShell direction="row">
      <Sidebar tenant={tenant} family={family} displayName={config.displayName} />
      <Main>
        <AmbientGlow />
        <Topbar direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <SearchRounded color="disabled" />
            <Typography variant="body2" color="text.secondary">Search your workspace</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="Notifications"><NotificationsNoneRounded /></IconButton>
            <Tooltip title={`Switch tenant from ${config.displayName}`}>
              <span>
                <IconButton aria-label={`Switch tenant from ${config.displayName}`} onClick={onToggleTenant} disabled={isSwitchingTenant}>
                  {isSwitchingTenant ? <CircularProgress size={20} color="inherit" /> : <BusinessRounded />}
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title={`Use ${family === 'dark' ? 'light' : 'dark'} mode`}>
              <IconButton aria-label={`Switch to ${family === 'dark' ? 'light' : 'dark'} theme`} onClick={onToggleTheme}>
                {family === 'dark' ? <LightModeRounded /> : <DarkModeRounded />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Topbar>
        <Page>
          <Hero spacing={2}>
            <div>
              <Typography variant="overline" color="secondary.main">Multi-surface system</Typography>
              <Typography variant="h1" mt={1}>One family.<br />Many contexts.</Typography>
            </div>
            <HeroSummary>A clean-room MUI architecture demonstrating nested visual contexts without misusing <code>palette.mode</code>.</HeroSummary>
          </Hero>
          <Surface tenant={tenant} family={family} variant="glass">
            <GlassFrame>
              <GlassHeader direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1}>
                <div>
                  <Typography variant="overline" color="secondary.main">Glass workspace</Typography>
                  <Typography variant="h2">Translucent context over the application shell</Typography>
                </div>
                <Typography variant="body2" color="text.secondary">Glass tokens apply to everything in this boundary.</Typography>
              </GlassHeader>
              <MetricGrid>
                <MetricCard label="Adoption" value="84%" change="12.4%" progress={84} />
                <MetricCard label="Token coverage" value="126" change="8 new" progress={68} />
                <MetricCard label="Theme variants" value="04" change="stable" progress={100} />
              </MetricGrid>
              <ContentPanel tenant={tenant} family={family} />
            </GlassFrame>
          </Surface>
        </Page>
      </Main>
    </AppShell>
  );
}
