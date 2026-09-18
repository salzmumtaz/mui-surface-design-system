import { MoreHorizRounded, TrendingUpRounded } from '@mui/icons-material';
import { Card, Chip, LinearProgress, Stack, Typography } from '@mui/material';

interface MetricCardProps { label: string; value: string; change: string; progress: number }

export function MetricCard({ label, value, change, progress }: MetricCardProps) {
  return (
    <Card variant="metric">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" color="text.secondary">{label}</Typography>
        <MoreHorizRounded color="disabled" />
      </Stack>
      <Typography variant="h3" my={1}>{value}</Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Chip size="small" icon={<TrendingUpRounded />} label={change} color="secondary" variant="outlined" />
        <LinearProgress variant="determinate" value={progress} color="secondary" />
      </Stack>
    </Card>
  );
}
