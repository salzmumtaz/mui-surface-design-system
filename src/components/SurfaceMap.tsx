import { LayersRounded } from '@mui/icons-material';
import { Box, Card, Chip, Stack, Typography } from '@mui/material';
import { resolveTheme } from '../theme/create-surface-theme';
import type { SurfaceVariant, TenantId, ThemeFamily } from '../theme/types';

const surfaceDetails: Array<{ variant: SurfaceVariant; role: string }> = [
  { variant: 'application', role: 'Global page canvas' },
  { variant: 'sidebar', role: 'Persistent navigation' },
  { variant: 'glass', role: 'Translucent workspace' },
  { variant: 'content', role: 'Opaque reading and form area' },
];

export function SurfaceMap({ tenant, family }: { tenant: TenantId; family: ThemeFamily }) {
  return (
    <Card
      id="surface-map"
      variant="feature"
      sx={{ mb: 3, bgcolor: 'background.paper', scrollMarginTop: 24 }}
    >
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
        <Box maxWidth={420}>
          <Stack direction="row" spacing={1} alignItems="center">
            <LayersRounded color="secondary" />
            <Typography variant="subtitle1">Resolved surface map</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" mt={1}>
            One global family resolves into four semantic contexts. Notice that the content island
            remains light even inside the dark family.
          </Typography>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} flexWrap="wrap" useFlexGap>
          {surfaceDetails.map(({ variant, role }) => {
            const theme = resolveTheme(tenant, family, variant);
            return (
              <Box
                key={variant}
                sx={{
                  minWidth: 145,
                  p: 1.25,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1.5,
                  bgcolor: 'background.default',
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Typography variant="caption" fontWeight={800} textTransform="capitalize">
                    {variant}
                  </Typography>
                  <Box
                    aria-label={`${variant} background color`}
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      bgcolor: theme.palette.background.default,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  />
                </Stack>
                <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                  {role}
                </Typography>
                <Chip
                  label={theme.palette.mode}
                  size="small"
                  variant="outlined"
                  sx={{ mt: 1, height: 20 }}
                />
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </Card>
  );
}
