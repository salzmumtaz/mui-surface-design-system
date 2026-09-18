import { alpha, type Components, type Theme } from '@mui/material/styles';

export const components: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    styleOverrides: {
      body: { margin: 0 },
      '*': { boxSizing: 'border-box' },
      code: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
    },
  },
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.surface.tenant === 'northstar' ? 2 : 11,
        minHeight: theme.surface.tenant === 'northstar' ? 36 : 40,
        paddingInline: 18,
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: { root: ({ theme }) => ({ border: `1px solid ${theme.palette.divider}`, color: theme.palette.text.primary }) },
  },
  MuiCard: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: ({ theme }) => ({ backgroundImage: 'none', border: `1px solid ${theme.palette.divider}` }),
    },
    variants: [
      { props: { variant: 'metric' }, style: { padding: 20, flex: 1, minWidth: 180 } },
      { props: { variant: 'feature' }, style: ({ theme }) => ({ padding: 16, flex: 1, backgroundColor: 'transparent', borderColor: theme.palette.divider }) },
      { props: { variant: 'content' }, style: ({ theme }) => ({ padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: theme.surface.shadow }) },
    ],
  },
  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({ borderRadius: theme.surface.tenant === 'northstar' ? 2 : 9 }),
    },
  },
  MuiLinearProgress: { styleOverrides: { root: { height: 5, borderRadius: 5, flex: 1, minWidth: 48 } } },
  MuiListItemIcon: {
    styleOverrides: { root: ({ theme }) => ({ color: 'inherit', minWidth: theme.spacing(4.5) }) },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 11,
        color: theme.palette.text.secondary,
        '&.Mui-selected': { color: theme.palette.text.primary, backgroundColor: alpha(theme.palette.primary.main, 0.18) },
        '&.Mui-selected:hover, &:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.12) },
      }),
    },
  },
};
