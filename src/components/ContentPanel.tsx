import { ArrowForwardRounded, CheckCircleRounded } from '@mui/icons-material';
import { Box, Button, Card, Chip, Stack, Typography } from '@mui/material';
import { Surface } from '../theme/Surface';
import type { TenantId, ThemeFamily } from '../theme/types';
import { ContentFrame, FeatureGrid } from './layout';

const features = [
  ['Typed resolver', 'Family and surface form a finite, testable matrix.'],
  ['Cached themes', 'Stable MUI theme objects prevent unnecessary reconstruction.'],
  ['Local boundaries', 'Providers exist only where visual context really changes.'],
];

export function ContentPanel({ tenant, family }: { tenant: TenantId; family: ThemeFamily }) {
  return (
    <Surface tenant={tenant} family={family} variant="content">
      <ContentFrame>
        <Card variant="content">
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
            <Box>
              <Chip label="Portfolio case study" size="small" color="primary" />
              <Typography variant="h2" mt={2}>A calm surface inside a complex shell</Typography>
              <Typography variant="body1" color="text.secondary" mt={1} maxWidth={560}>
                This content island changes contrast while preserving the selected brand family. Components consume semantic tokens—not hard-coded mode checks.
              </Typography>
            </Box>
            <Button variant="contained" endIcon={<ArrowForwardRounded />}>Read architecture</Button>
          </Stack>
          <FeatureGrid>
            {features.map(([title, body]) => (
              <Card variant="feature" key={title}>
                <CheckCircleRounded color="secondary" fontSize="small" />
                <Typography variant="subtitle1" mt={1}>{title}</Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>{body}</Typography>
              </Card>
            ))}
          </FeatureGrid>
        </Card>
      </ContentFrame>
    </Surface>
  );
}
