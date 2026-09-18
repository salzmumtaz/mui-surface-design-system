import { Box, Stack, styled } from '@mui/material';
import { layout } from '../theme/foundations';

export const AppShell = styled(Stack)({ minHeight: '100dvh', overflow: 'clip' });

export const SidebarFrame = styled('aside')(({ theme }) => ({
  width: layout.sidebarWidth,
  height: '100dvh',
  flexShrink: 0,
  padding: theme.spacing(2.5),
  display: 'flex',
  flexDirection: 'column',
  position: 'sticky',
  top: 0,
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  backgroundColor: theme.palette.background.default,
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: { display: 'none' },
}));

export const Main = styled('main')({ flex: 1, minWidth: 0, position: 'relative' });

export const Topbar = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2.5, 5),
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  [theme.breakpoints.down('md')]: { padding: theme.spacing(2) },
}));

export const Page = styled(Box)({
  width: '100%',
  maxWidth: layout.contentMaxWidth,
  marginInline: 'auto',
  padding: layout.pageGutter,
  position: 'relative',
});

export const Hero = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('lg')]: { flexDirection: 'row', justifyContent: 'space-between' },
}));

export const HeroSummary = styled('p')(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.secondary,
  maxWidth: 400,
  margin: 0,
  alignSelf: 'flex-end',
}));

export const AmbientGlow = styled(Box)(({ theme }) => ({
  position: 'absolute', width: 480, height: 480, borderRadius: '50%',
  backgroundColor: theme.palette.primary.main, filter: 'blur(140px)', opacity: 0.2,
  top: -260, right: -100, pointerEvents: 'none',
}));

export const GlassFrame = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: typeof theme.shape.borderRadius === 'number'
    ? theme.shape.borderRadius * 2
    : theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  backdropFilter: theme.surface.backdropFilter,
  boxShadow: theme.surface.shadow,
  [theme.breakpoints.down('sm')]: { padding: theme.spacing(2) },
}));

export const GlassHeader = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  paddingInline: theme.spacing(0.5),
}));

export const ContentFrame = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
}));

export const MetricGrid = styled(Box)(({ theme }) => ({
  display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: theme.spacing(2), marginBottom: theme.spacing(3),
  [theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr' },
}));

export const FeatureGrid = styled(Box)(({ theme }) => ({
  display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: theme.spacing(2), marginTop: theme.spacing(4),
  [theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr' },
}));
