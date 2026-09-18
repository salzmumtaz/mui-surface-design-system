import { AutoAwesomeRounded, BoltRounded, GridViewRounded, LayersRounded, PeopleAltOutlined, SettingsOutlined } from '@mui/icons-material';
import { Avatar, Box, Card, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, styled } from '@mui/material';
import { Surface } from '../theme/Surface';
import type { TenantId, ThemeFamily } from '../theme/types';
import { SidebarFrame } from './layout';

const navItems = [
  { label: 'Overview', icon: GridViewRounded, active: true },
  { label: 'Projects', icon: LayersRounded },
  { label: 'Team', icon: PeopleAltOutlined },
  { label: 'Settings', icon: SettingsOutlined },
];

const BrandMark = styled(Box)(({ theme }) => ({
  width: 34, height: 34, borderRadius: 11, display: 'grid', placeItems: 'center',
  color: theme.palette.primary.contrastText, backgroundColor: theme.palette.primary.main,
  transform: 'rotate(-7deg)',
}));

const SidebarNote = styled(Card)(({ theme }) => ({
  marginTop: 'auto', padding: theme.spacing(2), backgroundColor: theme.palette.background.paper,
}));

export function Sidebar({ tenant, family, displayName }: { tenant: TenantId; family: ThemeFamily; displayName: string }) {
  return (
    <Surface tenant={tenant} family={family} variant="sidebar">
      <SidebarFrame>
        <Stack direction="row" alignItems="center" spacing={1.25} mb={4}>
          <BrandMark><BoltRounded /></BrandMark>
          <Typography variant="h2">{displayName}</Typography>
        </Stack>
        <List disablePadding>
          {navItems.map(({ label, icon: Icon, active }) => (
            <ListItemButton key={label} selected={active}>
              <ListItemIcon><Icon /></ListItemIcon>
              <ListItemText primary={label} primaryTypographyProps={{ variant: 'subtitle1' }} />
            </ListItemButton>
          ))}
        </List>
        <SidebarNote>
          <AutoAwesomeRounded color="primary" />
          <Typography variant="subtitle1" mt={1}>Design tokens synced</Typography>
          <Typography variant="caption" color="text.secondary">4 semantic surfaces · 2 families</Typography>
        </SidebarNote>
        <Stack direction="row" spacing={1.25} alignItems="center" mt={2}>
          <Avatar>SK</Avatar>
          <Box>
            <Typography variant="subtitle1">Salman Khan</Typography>
            <Typography variant="caption" color="text.secondary">Designer & engineer</Typography>
          </Box>
        </Stack>
      </SidebarFrame>
    </Surface>
  );
}
