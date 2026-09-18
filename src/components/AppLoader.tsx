import { CircularProgress, Stack, Typography } from '@mui/material';

export function AppLoader() {
  return (
    <Stack minHeight="100dvh" alignItems="center" justifyContent="center" spacing={2}>
      <CircularProgress size={28} />
      <Typography variant="body2" color="text.secondary">Loading workspace configuration…</Typography>
    </Stack>
  );
}
