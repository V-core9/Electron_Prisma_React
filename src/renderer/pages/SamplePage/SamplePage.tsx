import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import DashboardLayout from '../../layouts/dashboard';
import Copyright from '../../components/Copyright';

export default function SamplePage() {
  return (
    <DashboardLayout title="Sample Page">
      <>
        <Grid container spacing={3}>
          {/* Recent Deposits */}
          <Grid item xs={12} md={12} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              YEA CONTENT
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              sdnapsnpdn
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </>
    </DashboardLayout>
  );
}
