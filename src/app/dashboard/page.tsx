// Imports
import {Card, CardHeader, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";

// Export
export default function Dashboard() {
    return (
        <Grid container padding={5}>
            <Grid container minWidth={"100%"}>
                <Grid size={12}>
                    <Typography variant="h3">Dashboard</Typography>
                </Grid>
                <Grid size={12}>
                    <Typography variant="h5">Dashboard /</Typography>
                </Grid>
            </Grid>
            <Grid container minWidth={"100%"} marginY={3}>
                <Card sx={{minWidth: "100%"}}>
                    <CardHeader title="Dashboard" />
                    <Grid container spacing={3} padding={3}>
                        <Grid>
                            <Typography>asdf</Typography>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
}
