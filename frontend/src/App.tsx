// Root React component that wraps the telemetry dashboard with the MUI theme provider and React Query client.
import { ThemeProvider, CssBaseline, Box, Container, Typography, Grid, Card, CardContent, CircularProgress, Button, Paper } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import theme from './theme';

const queryClient = new QueryClient();

const fetchTelemetryData = async () => {
  const response = await axios.get('http://localhost:5079/api/flightlogs/summary');
  return response.data;
};

const triggerSync = async () => {
  const response = await axios.post('http://localhost:5079/api/flightlogs/sync');
  return response.data;
};

function Dashboard() {
  const { data, isLoading } = useQuery({ queryKey: ['telemetry'], queryFn: fetchTelemetryData });
  const syncMutation = useMutation({
    mutationFn: triggerSync,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['telemetry'] });
    }
  });

  return (
    <Container maxWidth="lg" sx={{ pt: 8, pb: 8 }}>
      <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h1" gutterBottom sx={{ fontSize: '3rem' }}>
            AeroMetrix
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Drone Telemetry & Battery Analytics Engine
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => syncMutation.mutate()}
          disabled={syncMutation.isPending}
        >
          {syncMutation.isPending ? 'Syncing...' : 'Sync Flight Logs'}
        </Button>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
          <CircularProgress color="primary" size={60} thickness={4} />
        </Box>
      ) : (
        <>
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>Active Fleet</Typography>
                  <Typography variant="h3" color="primary">{data?.activeDrones}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>Avg Battery Drain</Typography>
                  <Typography variant="h3" color="secondary">{data?.avgBatteryDrain}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>Peak Wind Resist.</Typography>
                  <Typography variant="h3" sx={{ color: '#ffb74d' }}>{data?.windResistanceMax}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>Fleet Status</Typography>
                  <Typography variant="h4" sx={{ color: '#69f0ae', mt: 1 }}>{data?.status}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Paper sx={{ p: 4, borderRadius: 3, backgroundColor: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(148, 163, 184, 0.1)' }}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>Battery Degradation vs Wind Resistance</Typography>
            <Box sx={{ width: '100%', height: 400 }}>
              <ResponsiveContainer>
                <AreaChart data={data?.recentLogs || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBattery" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: 8 }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Legend />
                  <Area type="monotone" name="Battery Drain (mAh/m)" dataKey="batteryDrain" stroke="#ec4899" fillOpacity={1} fill="url(#colorBattery)" />
                  <Area type="monotone" name="Wind Resistance (m/s)" dataKey="windResistance" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorWind)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </>
      )}

      {/* Decorative background element */}
      <Box
        sx={{
          position: 'fixed',
          top: '-20%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(0,229,255,0.1) 0%, rgba(10,14,23,0) 70%)',
          borderRadius: '50%',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
    </Container>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Dashboard />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
