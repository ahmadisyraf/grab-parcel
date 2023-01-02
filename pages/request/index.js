import { Box, TextField, Paper, Typography, Stack, Button } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState, useRef } from "react";
import { useRouter } from "next/router";

import { Slide, Fade } from "@mui/material";

import { useTheme, useMediaQuery } from "@mui/material";
export default function Request() {

    const [value, setValue] = useState(dayjs('2022-04-07'));
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();

    const containerRef = useRef();

    const handleSubmit = () => {
        router.push("/request/success");
    }

    return (
        <div>
            <Box sx={{ mt: mobile ? 15 : 20, mb: 20 }} ref={containerRef}>
                <Slide direction="up" in={true} container={containerRef.current} timeout={{ enter: 800 }} >
                    <Paper elevation={3} sx={{ mx: mobile ? 1 : 40, px: 3, py: 3 }}>
                        <Box sx={{ mb: 5 }}>
                            <Typography variant="h4">Request for parcel pickup</Typography>
                            <Typography variant="subtitle1">Fill in the form to proceed our services</Typography>
                        </Box>
                        <Box>
                            <Stack direction={"column"} spacing={3}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Full name"
                                    defaultValue="AHMAD HAFIZZUDDIN ZAINI BIN ABQORI AFIQ"
                                    fullWidth
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Matric number"
                                    defaultValue="CB23098"
                                    fullWidth
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Phone number"
                                    defaultValue="0123456789"
                                    fullWidth
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Residence room number"
                                    defaultValue="A-1-24"
                                    fullWidth
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Tracking number"
                                    defaultValue="0123456789"
                                    fullWidth
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Estimate pacel arrive"
                                        openTo="year"
                                        views={['year', 'month', 'day']}
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Extra information"
                                    defaultValue="Parcel is inside A bucket"
                                    fullWidth
                                />
                                {/* <Paper variant="outlined" sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 10}}>
                                <Button variant="contained" component="label">
                                    Upload Image
                                    <input hidden accept="image/*" multiple type="file" />
                                </Button>
                            </Paper> */}
                                <Button variant="contained" type="submit" onClick={handleSubmit}>
                                    Confirm request
                                </Button>
                                <Typography variant="caption">Note :  Every parcel will be charge RM 2.00</Typography>
                            </Stack>
                        </Box>
                    </Paper>
                </Slide>
            </Box>
        </div>
    );
}