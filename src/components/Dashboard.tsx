import { BusinessRounded, DarkModeRounded, LightModeRounded } from '@mui/icons-material';
import { Button, Chip, CircularProgress, Stack, Tooltip, Typography } from '@mui/material';
import { useTenantConfig } from '../config/use-tenant-config';
import { Surface } from '../theme/Surface';
import type { TenantId, ThemeFamily } from '../theme/types';
import { ContentPanel } from './ContentPanel';
import {
  AmbientGlow,
  AppShell,
  GlassFrame,
  GlassHeader,
  Hero,
  HeroSummary,
  Main,
  MetricGrid,
  Page,
  Topbar,
} from './layout';
import { MetricCard } from './MetricCard';
import { Sidebar } from './Sidebar';
import { SurfaceMap } from './SurfaceMap';

interface DashboardProps {
  family: ThemeFamily;
  isSwitchingTenant: boolean;
  onToggleTenant: () => void;
  onToggleTheme: () => void;
}

export function Dashboard({
  family,
  isSwitchingTenant,
  onToggleTenant,
  onToggleTheme,
}: DashboardProps) {
  const tenant: TenantId = useTenantConfig((config) => config.themePreset);
  const displayName = useTenantConfig((config) => config.displayName);
  const analyticsEnabled = useTenantConfig((config) => config.features.analytics);
  const selfServiceEnabled = useTenantConfig((config) => config.features.selfService);
  return (
    <AppShell direction="row">
      <Sidebar tenant={tenant} family={family} />
      <Main>
        <AmbientGlow />
        <Topbar
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Stack>
            <Typography variant="overline" color="text.secondary">
              Theme playground
            </Typography>
            <Typography variant="subtitle1">Surface overview</Typography>
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {selfServiceEnabled && <Chip label="Self-service" color="secondary" size="small" />}
            <Tooltip title={`Switch tenant from ${displayName}`}>
              <span>
                <Button
                  aria-label={`Switch tenant from ${displayName}`}
                  onClick={onToggleTenant}
                  disabled={isSwitchingTenant}
                  variant="outlined"
                  size="small"
                  startIcon={
                    isSwitchingTenant ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : (
                      <BusinessRounded />
                    )
                  }
                >
                  {displayName}
                </Button>
              </span>
            </Tooltip>
            <Tooltip title={`Use ${family === 'dark' ? 'light' : 'dark'} mode`}>
              <Button
                aria-label={`Switch to ${family === 'dark' ? 'light' : 'dark'} theme`}
                onClick={onToggleTheme}
                variant="outlined"
                size="small"
                startIcon={family === 'dark' ? <LightModeRounded /> : <DarkModeRounded />}
              >
                {family === 'dark' ? 'Dark' : 'Light'}
              </Button>
            </Tooltip>
          </Stack>
        </Topbar>
        <Page>
          <Hero spacing={2}>
            <div>
              <Typography variant="overline" color="secondary.main">
                Multi-surface system
              </Typography>
              <Typography variant="h1" mt={1}>
                One family.
                <br />
                Many contexts.
              </Typography>
            </div>
            <HeroSummary>
              A clean-room MUI architecture demonstrating nested visual contexts without misusing{' '}
              <code>palette.mode</code>.
            </HeroSummary>
          </Hero>
          <Surface tenant={tenant} family={family} variant="glass">
            <GlassFrame>
              <GlassHeader
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                spacing={1}
              >
                <div>
                  <Typography variant="overline" color="secondary.main">
                    Glass workspace
                  </Typography>
                  <Typography variant="h2">
                    Translucent context over the application shell
                  </Typography>
                </div>
                <Typography variant="body2" color="text.secondary">
                  Glass tokens apply to everything in this boundary.
                </Typography>
              </GlassHeader>
              <MetricGrid>
                {analyticsEnabled && (
                  <MetricCard label="Adoption" value="84%" change="12.4%" progress={84} />
                )}
                <MetricCard label="Token coverage" value="126" change="8 new" progress={68} />
                <MetricCard label="Theme variants" value="04" change="stable" progress={100} />
              </MetricGrid>
              <SurfaceMap tenant={tenant} family={family} />
              <ContentPanel tenant={tenant} family={family} />
            </GlassFrame>
          </Surface>
        </Page>
      </Main>
    </AppShell>
  );
}
