import type { PaletteMode } from '@mui/material';
import type { SurfaceVariant, TenantId, ThemeFamily } from './types';

export interface SurfacePalette {
  mode: PaletteMode;
  background: { default: string; paper: string };
  text: { primary: string; secondary: string };
  divider: string;
  backdropFilter: string;
  shadow: string;
}

const prismPalettes: Record<ThemeFamily, Record<SurfaceVariant, SurfacePalette>> = {
  dark: {
    application: {
      mode: 'dark',
      background: { default: '#090B16', paper: '#12172A' },
      text: { primary: '#F7F8FE', secondary: '#A4ADC4' },
      divider: '#252B41',
      backdropFilter: 'none',
      shadow: 'none',
    },
    sidebar: {
      mode: 'dark',
      background: { default: '#12112B', paper: '#1B193A' },
      text: { primary: '#FAF8FF', secondary: '#C0BCD2' },
      divider: '#514B79',
      backdropFilter: 'none',
      shadow: 'none',
    },
    glass: {
      mode: 'dark',
      background: { default: 'rgba(233, 244, 254, 0.06)', paper: 'rgba(233, 244, 254, 0.09)' },
      text: { primary: '#FFFFFF', secondary: '#CDD4E6' },
      divider: 'rgba(233, 244, 254, 0.24)',
      backdropFilter: 'blur(18px)',
      shadow: '0 8px 32px rgba(2, 4, 16, 0.32)',
    },
    content: {
      mode: 'light',
      background: { default: '#F6F2E9', paper: '#FFFDF8' },
      text: { primary: '#222536', secondary: '#5F6678' },
      divider: '#D8D1C5',
      backdropFilter: 'none',
      shadow: '0 18px 55px rgba(25, 31, 51, 0.10)',
    },
  },
  light: {
    application: {
      mode: 'light',
      background: { default: '#E9EDF7', paper: '#FFFFFF' },
      text: { primary: '#182033', secondary: '#59657B' },
      divider: '#D3DAE8',
      backdropFilter: 'none',
      shadow: 'none',
    },
    sidebar: {
      mode: 'dark',
      background: { default: '#292644', paper: '#332F53' },
      text: { primary: '#FFFFFF', secondary: '#CBC7DC' },
      divider: '#5B5575',
      backdropFilter: 'none',
      shadow: 'none',
    },
    glass: {
      mode: 'light',
      background: { default: 'rgba(255, 255, 255, 0.58)', paper: 'rgba(255, 255, 255, 0.78)' },
      text: { primary: '#182033', secondary: '#526078' },
      divider: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(18px)',
      shadow: '0 8px 32px rgba(54, 64, 94, 0.14)',
    },
    content: {
      mode: 'light',
      background: { default: '#FFFDF8', paper: '#FFFFFF' },
      text: { primary: '#1E2433', secondary: '#606879' },
      divider: '#DDD8CE',
      backdropFilter: 'none',
      shadow: '0 18px 55px rgba(25, 31, 51, 0.09)',
    },
  },
};

const northstarPalettes: Record<ThemeFamily, Record<SurfaceVariant, SurfacePalette>> = {
  dark: {
    application: {
      mode: 'dark',
      background: { default: '#071A17', paper: '#0E2924' },
      text: { primary: '#F3F1E8', secondary: '#ADC8C0' },
      divider: '#285249',
      backdropFilter: 'none',
      shadow: 'none',
    },
    sidebar: {
      mode: 'dark',
      background: { default: '#3A1323', paper: '#4A1A2E' },
      text: { primary: '#FFF4E6', secondary: '#E6BCC8' },
      divider: '#73344B',
      backdropFilter: 'none',
      shadow: 'none',
    },
    glass: {
      mode: 'dark',
      background: { default: 'rgba(107, 225, 192, 0.08)', paper: 'rgba(244, 197, 116, 0.10)' },
      text: { primary: '#FFF8E9', secondary: '#C7DCD4' },
      divider: 'rgba(244, 197, 116, 0.30)',
      backdropFilter: 'blur(12px)',
      shadow: '0 12px 40px rgba(0, 12, 10, 0.38)',
    },
    content: {
      mode: 'light',
      background: { default: '#F2E8D5', paper: '#FFF9EC' },
      text: { primary: '#26342F', secondary: '#596A64' },
      divider: '#D6C6AA',
      backdropFilter: 'none',
      shadow: '0 20px 50px rgba(39, 62, 54, 0.13)',
    },
  },
  light: {
    application: {
      mode: 'light',
      background: { default: '#DDEFE8', paper: '#F7FFF9' },
      text: { primary: '#17332B', secondary: '#4D6960' },
      divider: '#B7D5CA',
      backdropFilter: 'none',
      shadow: 'none',
    },
    sidebar: {
      mode: 'dark',
      background: { default: '#3A1323', paper: '#4A1A2E' },
      text: { primary: '#FFF4E6', secondary: '#E6BCC8' },
      divider: '#73344B',
      backdropFilter: 'none',
      shadow: 'none',
    },
    glass: {
      mode: 'light',
      background: { default: 'rgba(247, 255, 249, 0.58)', paper: 'rgba(255, 249, 236, 0.82)' },
      text: { primary: '#17332B', secondary: '#4D6960' },
      divider: 'rgba(255, 249, 236, 0.94)',
      backdropFilter: 'blur(12px)',
      shadow: '0 12px 36px rgba(39, 78, 66, 0.18)',
    },
    content: {
      mode: 'light',
      background: { default: '#F2E8D5', paper: '#FFF9EC' },
      text: { primary: '#26342F', secondary: '#596A64' },
      divider: '#D6C6AA',
      backdropFilter: 'none',
      shadow: '0 20px 50px rgba(39, 62, 54, 0.12)',
    },
  },
};

export const surfacePalettes: Record<
  TenantId,
  Record<ThemeFamily, Record<SurfaceVariant, SurfacePalette>>
> = {
  prism: prismPalettes,
  northstar: northstarPalettes,
};
