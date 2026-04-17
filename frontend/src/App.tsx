import { ThemeProvider, CssBaseline, Box, Container, Typography, Grid, Card, CardContent, CircularProgress, Button } from '@mui/material';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import theme from './theme';

const queryClient = new QueryClient();

// Simulated API Call
const fetchTelemetryData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        activeDrones: 24,
        avgBatteryDrain: '4.2 mAh/m',
        windResistanceMax: '12 m/s',
        status: 'Optimal Health',
      });
    }, 1500);
  });
};

function Dashboard() {
  const { data, isLoading } = useQuery({ queryKey: ['telemetry'], queryFn: fetchTelemetryData });

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
        <Button variant="contained" color="primary" size="large">
          Sync Flight Logs
        </Button>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
          <CircularProgress color="primary" size={60} thickness={4} />
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>Active Fleet</Typography>
                <Typography variant="h3" color="primary">{data?.activeDrones}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>Avg Battery Drain</Typography>
                <Typography variant="h3" color="secondary">{data?.avgBatteryDrain}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>Peak Wind Resist.</Typography>
                <Typography variant="h3" sx={{ color: '#ffb74d' }}>{data?.windResistanceMax}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>Fleet Status</Typography>
                <Typography variant="h4" sx={{ color: '#69f0ae', mt: 1 }}>{data?.status}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
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
