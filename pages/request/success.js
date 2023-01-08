import { Box, TextField, Paper, Typography, Stack, Button } from "@mui/material";

import { useTheme, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Success({ session }) {

    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    const { status } = router.query;

    return (
        <div>
            {status && status === 'success' && (
                <Box sx={{ mt: mobile ? 15 : 20, mb: 20 }}>
                    <Paper elevation={3} sx={{ mx: mobile ? 1 : 40, px: 3, py: 3 }}>
                        <Box sx={{ mb: 5 }}>
                            <Typography variant="h4">Thank You!</Typography>
                            <Typography variant="subtitle1">Our team will contact you for payment and grab your parcel as soon as possible!</Typography>
                        </Box>
                        <Box>
                            <Stack direction={"row"} spacing={1}>
                                <Button onClick={() => router.push("/")}>Return hompage</Button>
                                <Button variant="contained">View history</Button>
                            </Stack>
                        </Box>
                    </Paper>
                </Box>
            )}
            {status && status === 'cancel' && (
                <Box sx={{ mt: mobile ? 15 : 20, mb: 20 }}>
                    <Paper elevation={3} sx={{ mx: mobile ? 1 : 40, px: 3, py: 3 }}>
                        <Box sx={{ mb: 5 }}>
                            <Typography variant="h4">Sorry your payment unsuccesfully!</Typography>
                            <Typography variant="subtitle1">Please try again to request any parcel grab</Typography>
                        </Box>
                        <Box>
                            <Stack direction={"row"} spacing={1}>
                                <Button onClick={() => router.push("/")}>Return hompage</Button>
                                <Button variant="contained">View history</Button>
                            </Stack>
                        </Box>
                    </Paper>
                </Box>
            )}
        </div>
    );
}