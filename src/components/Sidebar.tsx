import {
  AutoAwesomeRounded,
  BoltRounded,
  GridViewRounded,
  LayersRounded,
  PeopleAltOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import type { SvgIconComponent } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { Surface } from '../theme/Surface';
import { useTenantConfig } from '../config/use-tenant-config';
import type { TenantId, ThemeFamily } from '../theme/types';
import { SidebarFrame } from './layout';

interface NavItem {
  label: string;
  icon: SvgIconComponent;
  active?: boolean;
  feature?: 'teamWorkspace';
}

const navItems: NavItem[] = [
  { label: 'Overview', icon: GridViewRounded, active: true },
  { label: 'Projects', icon: LayersRounded },
  { label: 'Team', icon: PeopleAltOutlined, feature: 'teamWorkspace' },
  { label: 'Settings', icon: SettingsOutlined },
];

const BrandMark = styled(Box)(({ theme }) => ({
  width: 34,
  height: 34,
  borderRadius: 11,
  display: 'grid',
  placeItems: 'center',
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  transform: 'rotate(-7deg)',
}));

const SidebarNote = styled(Card)(({ theme }) => ({
  marginTop: 'auto',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

export function Sidebar({ tenant, family }: { tenant: TenantId; family: ThemeFamily }) {
  const displayName = useTenantConfig((config) => config.displayName);
  const logoSize = useTenantConfig((config) => config.branding.logoSize);
  const density = useTenantConfig((config) => config.branding.density);
  const brandingVersion = useTenantConfig((config) => config.brandingVersion);
  const teamWorkspaceEnabled = useTenantConfig((config) => config.features.teamWorkspace);
  const logoPixels = { default: 34, small: 30, 'x-small': 26 }[logoSize];
  return (
    <Surface tenant={tenant} family={family} variant="sidebar">
      <SidebarFrame>
        <Stack direction="row" alignItems="center" spacing={1.25} mb={4}>
          <BrandMark sx={{ width: logoPixels, height: logoPixels }}>
            <BoltRounded fontSize={logoSize === 'x-small' ? 'small' : 'medium'} />
          </BrandMark>
          <Typography variant="h2">{displayName}</Typography>
        </Stack>
        <List disablePadding>
          {navItems
            .filter((item) => item.feature !== 'teamWorkspace' || teamWorkspaceEnabled)
            .map(({ label, icon: Icon, active }) => (
              <ListItemButton
                key={label}
                selected={active}
                sx={{ py: density === 'compact' ? 0.75 : 1.25 }}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={label} primaryTypographyProps={{ variant: 'subtitle1' }} />
              </ListItemButton>
            ))}
        </List>
        <SidebarNote>
          <AutoAwesomeRounded color="primary" />
          <Typography variant="subtitle1" mt={1}>
            Design tokens synced
          </Typography>
          <Typography variant="caption" color="text.secondary">
            4 surfaces · tokens {brandingVersion}
          </Typography>
        </SidebarNote>
        <Stack
          direction="row"
          spacing={1.25}
          alignItems="center"
          mt={2}
          pt={2}
          borderTop={1}
          borderColor="divider"
        >
          <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 800 }}>
            SK
          </Avatar>
          <Box minWidth={0}>
            <Typography variant="subtitle1" color="text.primary" noWrap>
              Salman Khan
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              Designer &amp; engineer
            </Typography>
          </Box>
        </Stack>
      </SidebarFrame>
    </Surface>
  );
}
