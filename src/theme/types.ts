export type ThemeFamily = 'light' | 'dark';
export type SurfaceVariant = 'application' | 'sidebar' | 'glass' | 'content';
export type TenantId = 'prism' | 'northstar';

declare module '@mui/material/styles' {
  interface Theme {
    surface: {
      family: ThemeFamily;
      variant: SurfaceVariant;
      tenant: TenantId;
      backdropFilter: string;
      shadow: string;
    };
  }

  interface ThemeOptions {
    surface?: {
      family: ThemeFamily;
      variant: SurfaceVariant;
      tenant: TenantId;
      backdropFilter: string;
      shadow: string;
    };
  }
}

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    metric: true;
    feature: true;
    content: true;
  }
}
