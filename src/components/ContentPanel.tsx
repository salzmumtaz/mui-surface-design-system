import { ArrowForwardRounded, CheckCircleRounded, TuneRounded } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useState, type FormEvent } from 'react';
import { Surface } from '../theme/Surface';
import type { TenantId, ThemeFamily } from '../theme/types';
import { ContentFrame, FeatureGrid } from './layout';

const features = [
  ['Typed resolver', 'Family and surface form a finite, testable matrix.'],
  ['Cached themes', 'Stable MUI theme objects prevent unnecessary reconstruction.'],
  ['Local boundaries', 'Providers exist only where visual context really changes.'],
];

export function ContentPanel({ tenant, family }: { tenant: TenantId; family: ThemeFamily }) {
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <Surface tenant={tenant} family={family} variant="content">
      <ContentFrame>
        <Card variant="content">
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
            <Box>
              <Chip label="Portfolio case study" size="small" color="primary" />
              <Typography variant="h2" mt={2}>
                A calm surface inside a complex shell
              </Typography>
              <Typography variant="body1" color="text.secondary" mt={1} maxWidth={560}>
                This content island changes contrast while preserving the selected brand family.
                Components consume semantic tokens—not hard-coded mode checks.
              </Typography>
            </Box>
            <Button variant="contained" endIcon={<ArrowForwardRounded />} href="#surface-map">
              Inspect surface map
            </Button>
          </Stack>
          <FeatureGrid>
            {features.map(([title, body]) => (
              <Card variant="feature" key={title}>
                <CheckCircleRounded color="secondary" fontSize="small" />
                <Typography variant="subtitle1" mt={1}>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  {body}
                </Typography>
              </Card>
            ))}
          </FeatureGrid>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.25fr) minmax(260px, .75fr)' },
              gap: 2,
              mt: 2,
            }}
          >
            <Card variant="feature" component="form" onSubmit={handleSubmit}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TuneRounded color="primary" />
                <Typography variant="subtitle1">Content-surface controls</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" mt={0.75} mb={2}>
                Inputs remain opaque and readable even when their parent workspace is translucent.
              </Typography>
              <Stack spacing={2} onChange={() => setSaved(false)}>
                <TextField
                  name="workspaceName"
                  label="Workspace name"
                  defaultValue="Design operations"
                  fullWidth
                  size="small"
                />
                <TextField
                  name="cadence"
                  select
                  label="Review cadence"
                  defaultValue="weekly"
                  fullWidth
                  size="small"
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </TextField>
                <FormControlLabel
                  control={<Switch name="notify" defaultChecked />}
                  label="Notify collaborators when tokens change"
                />
                {saved && <Alert severity="success">Preferences saved for this demo.</Alert>}
                <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start' }}>
                  Save preferences
                </Button>
              </Stack>
            </Card>
            <Card variant="feature">
              <Typography variant="subtitle1">Why this boundary exists</Typography>
              <Typography variant="body2" color="text.secondary" mt={0.75} mb={2}>
                Dense controls need stable contrast. The content surface changes background, text,
                divider, and component defaults together.
              </Typography>
              <Alert severity="success">
                Contrast stays predictable without component-level mode checks.
              </Alert>
              <Stack spacing={1.25} mt={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">
                    Parent
                  </Typography>
                  <Typography variant="caption" fontWeight={800}>
                    Glass
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">
                    Local surface
                  </Typography>
                  <Typography variant="caption" fontWeight={800}>
                    Content
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">
                    MUI mode
                  </Typography>
                  <Typography variant="caption" fontWeight={800}>
                    Light
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          </Box>
        </Card>
      </ContentFrame>
    </Surface>
  );
}
